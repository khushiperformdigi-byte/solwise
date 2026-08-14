import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { api, compressImage, isLoggedIn } from "../../api/client";
import TinyEditor from "../../components/TinyEditor";

const emptyFaq = () => ({ question: "", answer: "" });

const INITIAL = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "Meditation",
  tags: "",
  author: "Dr. Sachin Bansal",
  status: "published",
  image: "",
  imagePublicId: "",
  readTime: "",
  isPopular: false,
  allowComments: true,
  metaTitle: "",
  metaDescription: "",
  faqs: [emptyFaq()],
  publishDate: new Date().toISOString().slice(0, 10),
};

function slugify(text) {
  return String(text || "")
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

export default function AdminPostEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [form, setForm] = useState(INITIAL);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const loggedIn = isLoggedIn();

  useEffect(() => {
    if (!isEdit || !loggedIn) return;
    let cancelled = false;
    (async () => {
      try {
        const post = await api(`/api/blogs/admin/${id}`);
        if (cancelled) return;
        setForm({
          ...INITIAL,
          ...post,
          tags: Array.isArray(post.tags) ? post.tags.join(", ") : post.tags || "",
          faqs: post.faqs?.length ? post.faqs : [emptyFaq()],
          publishDate: String(post.publishDate || "").slice(0, 10),
        });
        setSlugTouched(true);
      } catch (err) {
        setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id, isEdit, loggedIn]);

  function setField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const autoSlug = useMemo(() => slugify(form.title), [form.title]);

  if (!loggedIn) return <Navigate to="/admin/login" replace />;

  async function handleImageFile(file) {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be 5MB or smaller.");
      return;
    }
    setUploading(true);
    setError("");
    try {
      const compressed = await compressImage(file, { maxWidth: 1600, quality: 0.8 });
      const data = new FormData();
      data.append("image", compressed);
      const result = await api("/api/blogs/upload-image", { method: "POST", body: data });
      setForm((prev) => ({
        ...prev,
        image: result.url,
        imagePublicId: result.publicId,
      }));
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = {
        ...form,
        slug: form.slug || autoSlug,
        faqs: (form.faqs || []).filter((f) => f.question.trim() && f.answer.trim()),
      };
      if (isEdit) {
        await api(`/api/blogs/${id}`, { method: "PUT", body: payload });
      } else {
        await api("/api/blogs", { method: "POST", body: payload });
      }
      navigate("/admin/posts");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="text-[#7A7266]">Loading post…</p>;

  return (
    <form onSubmit={handleSave}>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1
          className="engrave-green text-[36px] font-semibold"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {isEdit ? "Edit Post" : "Add New Post"}
        </h1>
        <Link
          to="/admin/posts"
          className="rounded-full border border-[#C4A15A] bg-white px-5 py-2 text-[12px] font-semibold text-[#123A1A] hover:bg-[#C4A15A]/10"
          style={{ fontFamily: "'Lato', sans-serif" }}
        >
          All Posts
        </Link>
      </div>

      {error && (
        <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-[13px] text-red-700">{error}</p>
      )}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="space-y-5 xl:col-span-8">
          <section className="rounded-xl bg-white p-5 ring-1 ring-[#E8DCC8]">
            <label className="mb-3 block">
              <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7A7266]">
                Title
              </span>
              <input
                value={form.title}
                onChange={(e) => {
                  const title = e.target.value;
                  setForm((prev) => ({
                    ...prev,
                    title,
                    slug: slugTouched ? prev.slug : slugify(title),
                  }));
                }}
                placeholder="Enter post title"
                className="w-full rounded-lg border border-[#E2D6C2] px-3 py-2.5 text-[15px] outline-none focus:border-[#C4A15A]"
                required
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7A7266]">
                Permalink slug
              </span>
              <input
                value={form.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  setField("slug", e.target.value);
                }}
                placeholder="auto-from-title"
                className="w-full rounded-lg border border-[#E2D6C2] px-3 py-2 text-[13px] text-[#6B6358] outline-none focus:border-[#C4A15A]"
              />
            </label>
          </section>

          <section className="overflow-hidden rounded-xl bg-white ring-1 ring-[#E8DCC8]">
            <div className="border-b border-[#E8DCC8] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7A7266]">
              Content
            </div>
            <TinyEditor value={form.content} onChange={(html) => setField("content", html)} />
          </section>

          <section className="rounded-xl bg-white p-5 ring-1 ring-[#E8DCC8]">
            <label className="block">
              <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7A7266]">
                Excerpt
              </span>
              <textarea
                value={form.excerpt}
                onChange={(e) => setField("excerpt", e.target.value)}
                placeholder="Short summary shown in blog cards..."
                rows={3}
                className="w-full rounded-lg border border-[#E2D6C2] px-3 py-2 text-[13px] outline-none focus:border-[#C4A15A]"
              />
            </label>
          </section>

          <section className="rounded-xl bg-white p-5 ring-1 ring-[#E8DCC8]">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7A7266]">
              SEO
            </p>
            <label className="mb-3 block">
              <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7A7266]">
                Meta Title
              </span>
              <input
                value={form.metaTitle}
                onChange={(e) => setField("metaTitle", e.target.value)}
                placeholder="Optional SEO title"
                className="w-full rounded-lg border border-[#E2D6C2] px-3 py-2 text-[13px] outline-none focus:border-[#C4A15A]"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7A7266]">
                Meta Description
              </span>
              <textarea
                value={form.metaDescription}
                onChange={(e) => setField("metaDescription", e.target.value)}
                placeholder="Optional SEO description"
                rows={3}
                className="w-full rounded-lg border border-[#E2D6C2] px-3 py-2 text-[13px] outline-none focus:border-[#C4A15A]"
              />
            </label>
          </section>

          <section className="rounded-xl bg-white p-5 ring-1 ring-[#E8DCC8]">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7A7266]">
                FAQs Schema
              </p>
              <button
                type="button"
                onClick={() => setField("faqs", [...form.faqs, emptyFaq()])}
                className="text-[12px] font-semibold text-[#B08A3A] hover:underline"
              >
                + Add FAQ
              </button>
            </div>
            <p className="mb-4 text-[12px] text-[#8A8174]">
              These FAQs appear on the blog detail page and generate Google FAQPage structured data.
            </p>
            <div className="space-y-4">
              {form.faqs.map((faq, index) => (
                <div key={index} className="rounded-lg border border-[#E8DCC8] p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[12px] font-semibold text-[#5C5348]">FAQ #{index + 1}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setField(
                          "faqs",
                          form.faqs.filter((_, i) => i !== index),
                        )
                      }
                      className="text-[12px] text-red-700 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                  <input
                    value={faq.question}
                    onChange={(e) => {
                      const next = [...form.faqs];
                      next[index] = { ...faq, question: e.target.value };
                      setField("faqs", next);
                    }}
                    placeholder="e.g. How do I start a daily meditation practice?"
                    className="mb-2 w-full rounded-lg border border-[#E2D6C2] px-3 py-2 text-[13px] outline-none focus:border-[#C4A15A]"
                  />
                  <textarea
                    value={faq.answer}
                    onChange={(e) => {
                      const next = [...form.faqs];
                      next[index] = { ...faq, answer: e.target.value };
                      setField("faqs", next);
                    }}
                    placeholder="Write a clear answer..."
                    rows={3}
                    className="w-full rounded-lg border border-[#E2D6C2] px-3 py-2 text-[13px] outline-none focus:border-[#C4A15A]"
                  />
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-5 xl:col-span-4">
          <section className="rounded-xl bg-white p-5 ring-1 ring-[#E8DCC8]">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7A7266]">
              Publish
            </p>
            <label className="mb-3 block">
              <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7A7266]">
                Status
              </span>
              <select
                value={form.status}
                onChange={(e) => setField("status", e.target.value)}
                className="w-full rounded-lg border border-[#E2D6C2] px-3 py-2 text-[13px]"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </label>
            <label className="mb-4 block">
              <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7A7266]">
                Publish Date
              </span>
              <input
                type="date"
                value={form.publishDate || ""}
                onChange={(e) => setField("publishDate", e.target.value)}
                className="w-full rounded-lg border border-[#E2D6C2] px-3 py-2 text-[13px]"
              />
            </label>
            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-full bg-[#123A1A] py-3 text-[12px] font-bold uppercase tracking-[0.16em] text-white hover:bg-[#0d2a13] disabled:opacity-60"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              {saving ? "Saving…" : "Save Post"}
            </button>
          </section>

          <section className="rounded-xl bg-white p-5 ring-1 ring-[#E8DCC8]">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7A7266]">
              Featured Image
            </p>
            <p className="mb-3 text-[12px] text-[#8A8174]">
              Uploaded once to Cloudinary (max 5MB). URL images are stored as-is — no extra Cloudinary call.
            </p>
            {form.image && (
              <img src={form.image} alt="" className="mb-3 h-36 w-full rounded-lg object-cover" />
            )}
            <label className="mb-3 block">
              <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7A7266]">
                Upload Image
              </span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={(e) => handleImageFile(e.target.files?.[0])}
                className="w-full text-[12px]"
              />
              {uploading && <p className="mt-1 text-[12px] text-[#B08A3A]">Uploading…</p>}
            </label>
            <label className="block">
              <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7A7266]">
                Or Image URL
              </span>
              <input
                value={form.imagePublicId ? form.image : form.image}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    image: e.target.value,
                    imagePublicId: "",
                  }))
                }
                placeholder="https://example.com/photo.jpg"
                className="w-full rounded-lg border border-[#E2D6C2] px-3 py-2 text-[13px] outline-none focus:border-[#C4A15A]"
              />
            </label>
          </section>

          <section className="rounded-xl bg-white p-5 ring-1 ring-[#E8DCC8]">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7A7266]">
              Post Details
            </p>
            <label className="mb-3 block">
              <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7A7266]">
                Category
              </span>
              <input
                value={form.category}
                onChange={(e) => setField("category", e.target.value)}
                className="w-full rounded-lg border border-[#E2D6C2] px-3 py-2 text-[13px] outline-none focus:border-[#C4A15A]"
              />
            </label>
            <label className="mb-3 block">
              <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7A7266]">
                Tags
              </span>
              <input
                value={form.tags}
                onChange={(e) => setField("tags", e.target.value)}
                placeholder="meditation, healing, peace"
                className="w-full rounded-lg border border-[#E2D6C2] px-3 py-2 text-[13px] outline-none focus:border-[#C4A15A]"
              />
              <span className="mt-1 block text-[11px] text-[#8A8174]">Comma-separated</span>
            </label>
            <label className="mb-3 block">
              <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7A7266]">
                Author
              </span>
              <input
                value={form.author}
                onChange={(e) => setField("author", e.target.value)}
                className="w-full rounded-lg border border-[#E2D6C2] px-3 py-2 text-[13px] outline-none focus:border-[#C4A15A]"
              />
            </label>
            <label className="mb-3 block">
              <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7A7266]">
                Read Time
              </span>
              <input
                value={form.readTime}
                onChange={(e) => setField("readTime", e.target.value)}
                placeholder="Auto if empty"
                className="w-full rounded-lg border border-[#E2D6C2] px-3 py-2 text-[13px] outline-none focus:border-[#C4A15A]"
              />
            </label>
            <label className="mb-2 flex items-center gap-2 text-[13px] text-[#3A342C]">
              <input
                type="checkbox"
                checked={form.isPopular}
                onChange={(e) => setField("isPopular", e.target.checked)}
              />
              Mark as popular
            </label>
            <label className="flex items-center gap-2 text-[13px] text-[#3A342C]">
              <input
                type="checkbox"
                checked={form.allowComments}
                onChange={(e) => setField("allowComments", e.target.checked)}
              />
              Allow comments
            </label>
          </section>
        </aside>
      </div>
    </form>
  );
}
