import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { api, compressImages, isLoggedIn } from "../../api/client";

const CATEGORIES = [
  "Events",
  "Retreats",
  "Workshops",
  "Teachings",
  "Meditation",
  "Nature",
  "Community",
];

export default function AdminGallery() {
  const [items, setItems] = useState([]);
  const [files, setFiles] = useState([]);
  const [category, setCategory] = useState("Events");
  const [alt, setAlt] = useState("");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const loggedIn = isLoggedIn();

  async function load() {
    setLoading(true);
    setError("");
    try {
      const data = await api("/api/gallery/admin/all");
      setItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  if (!loggedIn) return <Navigate to="/admin/login" replace />;

  function addFiles(list) {
    const next = Array.from(list || []).filter((f) => /^image\/(jpeg|png|webp)$/i.test(f.type));
    setFiles((prev) => [...prev, ...next].slice(0, 12));
  }

  async function handleUpload(e) {
    e.preventDefault();
    if (!files.length) {
      setError("Choose at least one image.");
      return;
    }
    setUploading(true);
    setError("");
    try {
      const compressed = await compressImages(files, { maxWidth: 1920, quality: 0.8 });
      const form = new FormData();
      compressed.forEach((file) => form.append("images", file));
      form.append("category", category);
      form.append("alt", alt);
      await api("/api/gallery/upload", { method: "POST", body: form });
      setFiles([]);
      setAlt("");
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Remove this image from the gallery?")) return;
    try {
      await api(`/api/gallery/${id}`, { method: "DELETE" });
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch (err) {
      alert(err.message);
    }
  }

  async function updateItem(id, patch) {
    try {
      const updated = await api(`/api/gallery/${id}`, { method: "PATCH", body: patch });
      setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...updated } : i)));
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div>
      <div className="mb-2">
        <h1
          className="engrave-green text-[36px] font-semibold"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Gallery Images
        </h1>
        <p className="text-[12px] text-[#8A8174]">Dashboard › Gallery › Upload Images</p>
      </div>

      {error && (
        <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-[13px] text-red-700">{error}</p>
      )}

      <form
        onSubmit={handleUpload}
        className="mb-8 rounded-xl bg-white p-5 ring-1 ring-[#E8DCC8]"
      >
        <h2
          className="engrave-green mb-4 text-[22px] font-semibold"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Upload New Images
        </h2>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <label
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              addFiles(e.dataTransfer.files);
            }}
            className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-10 text-center ${
              dragOver ? "border-[#C4A15A] bg-[#FBF8F2]" : "border-[#E2D6C2] bg-[#FFFcf8]"
            }`}
          >
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              className="hidden"
              onChange={(e) => addFiles(e.target.files)}
            />
            <p className="mb-2 text-[14px] text-[#5C5348]">Drag & drop images here or</p>
            <span className="rounded-full bg-[#123A1A] px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-white">
              Choose Files
            </span>
            <p className="mt-3 text-[11px] text-[#8A8174]">JPG, PNG, WEBP up to 10MB each · max 12 at once</p>
            {files.length > 0 && (
              <p className="mt-2 text-[12px] font-semibold text-[#1A3A28]">
                {files.length} file{files.length === 1 ? "" : "s"} selected
              </p>
            )}
          </label>

          <div className="space-y-3 text-[13px] text-[#5C5348]">
            <p>Use high resolution images. Recommended size: 1920×1080 px.</p>
            <p>Images are compressed in the browser before upload to protect the Cloudinary free tier.</p>
            <p>Uploads run one-by-one on the server to avoid rate spikes.</p>
            <label className="block">
              <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7A7266]">
                Category
              </span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-lg border border-[#E2D6C2] px-3 py-2"
              >
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7A7266]">
                Alt text
              </span>
              <input
                value={alt}
                onChange={(e) => setAlt(e.target.value)}
                placeholder="Optional caption for all selected images"
                className="w-full rounded-lg border border-[#E2D6C2] px-3 py-2 outline-none focus:border-[#C4A15A]"
              />
            </label>
            <button
              type="submit"
              disabled={uploading}
              className="rounded-full bg-[#123A1A] px-6 py-2.5 text-[12px] font-bold uppercase tracking-[0.14em] text-white disabled:opacity-60"
            >
              {uploading ? "Uploading…" : "Upload Selected"}
            </button>
          </div>
        </div>
      </form>

      <div>
        <h2
          className="engrave-green mb-4 text-[22px] font-semibold"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Uploaded Images ({items.length})
        </h2>
        {loading ? (
          <p className="text-[#7A7266]">Loading…</p>
        ) : items.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center text-[#8A8174] ring-1 ring-[#E8DCC8]">
            No gallery images yet.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {items.map((item) => (
              <div key={item.id} className="overflow-hidden rounded-xl bg-white ring-1 ring-[#E8DCC8]">
                <div className="relative">
                  <img src={item.thumb || item.url} alt={item.alt} className="h-32 w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="absolute top-2 right-2 rounded bg-black/60 px-2 py-1 text-[10px] text-white"
                  >
                    Delete
                  </button>
                </div>
                <div className="space-y-2 p-2">
                  <select
                    value={item.category}
                    onChange={(e) => updateItem(item.id, { category: e.target.value })}
                    className="w-full rounded border border-[#E2D6C2] px-1 py-1 text-[11px]"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                  <input
                    defaultValue={item.alt}
                    onBlur={(e) => {
                      if (e.target.value !== item.alt) updateItem(item.id, { alt: e.target.value });
                    }}
                    className="w-full rounded border border-[#E2D6C2] px-1 py-1 text-[11px]"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
