import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { api, compressImage, isLoggedIn } from "../../api/client";

const CATEGORIES = [
  "Wellness",
  "Yoga",
  "Healing",
  "Workshop",
  "Retreat",
  "Special Event",
];

const INITIAL = {
  title: "",
  slug: "",
  description: "",
  category: "Workshop",
  status: "published",
  eventDate: new Date().toISOString().slice(0, 10),
  endDate: "",
  startTime: "",
  endTime: "",
  location: "",
  price: "",
  image: "",
  imagePublicId: "",
  bookingUrl: "",
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

export default function AdminEventEditor() {
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
        const event = await api(`/api/events/admin/${id}`);
        if (cancelled) return;
        setForm({
          ...INITIAL,
          ...event,
          eventDate: String(event.eventDate || "").slice(0, 10),
          endDate: event.endDate ? String(event.endDate).slice(0, 10) : "",
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
      const result = await api("/api/events/upload-image", { method: "POST", body: data });
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
      };
      if (isEdit) {
        await api(`/api/events/${id}`, { method: "PUT", body: payload });
      } else {
        const created = await api("/api/events", { method: "POST", body: payload });
        navigate(`/admin/events/${created.id}`, { replace: true });
        return;
      }
      navigate("/admin/events");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p className="text-sm text-[#7A7266]">Loading event…</p>;
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1
          className="engrave-green text-[36px] font-semibold"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {isEdit ? "Edit Event" : "New Event"}
        </h1>
        <Link
          to="/admin/events"
          className="text-[13px] font-medium text-[#123A1A] underline hover:text-[#C4A15A]"
        >
          ← Back to Events
        </Link>
      </div>

      {error && (
        <p className="mb-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">{error}</p>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-5 rounded-xl bg-white p-5 ring-1 ring-[#E8DCC8]">
            <label className="block">
              <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7A7266]">
                Title *
              </span>
              <input
                required
                value={form.title}
                onChange={(e) => setField("title", e.target.value)}
                className="w-full rounded-lg border border-[#E2D6C2] px-3 py-2.5 text-[14px] outline-none focus:border-[#C4A15A]"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7A7266]">
                Slug
              </span>
              <input
                value={slugTouched ? form.slug : form.slug || autoSlug}
                onChange={(e) => {
                  setSlugTouched(true);
                  setField("slug", e.target.value);
                }}
                placeholder={autoSlug}
                className="w-full rounded-lg border border-[#E2D6C2] px-3 py-2.5 text-[14px] outline-none focus:border-[#C4A15A]"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7A7266]">
                Description
              </span>
              <textarea
                rows={6}
                value={form.description}
                onChange={(e) => setField("description", e.target.value)}
                className="w-full rounded-lg border border-[#E2D6C2] px-3 py-2.5 text-[14px] leading-relaxed outline-none focus:border-[#C4A15A]"
                placeholder="Describe the event, what participants can expect…"
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7A7266]">
                  Start Date *
                </span>
                <input
                  required
                  type="date"
                  value={form.eventDate}
                  onChange={(e) => setField("eventDate", e.target.value)}
                  className="w-full rounded-lg border border-[#E2D6C2] px-3 py-2.5 text-[14px] outline-none focus:border-[#C4A15A]"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7A7266]">
                  End Date (optional)
                </span>
                <input
                  type="date"
                  value={form.endDate}
                  onChange={(e) => setField("endDate", e.target.value)}
                  className="w-full rounded-lg border border-[#E2D6C2] px-3 py-2.5 text-[14px] outline-none focus:border-[#C4A15A]"
                />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7A7266]">
                  Start Time
                </span>
                <input
                  value={form.startTime}
                  onChange={(e) => setField("startTime", e.target.value)}
                  placeholder="10:00 AM"
                  className="w-full rounded-lg border border-[#E2D6C2] px-3 py-2.5 text-[14px] outline-none focus:border-[#C4A15A]"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7A7266]">
                  End Time
                </span>
                <input
                  value={form.endTime}
                  onChange={(e) => setField("endTime", e.target.value)}
                  placeholder="1:00 PM"
                  className="w-full rounded-lg border border-[#E2D6C2] px-3 py-2.5 text-[14px] outline-none focus:border-[#C4A15A]"
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7A7266]">
                Location
              </span>
              <input
                value={form.location}
                onChange={(e) => setField("location", e.target.value)}
                placeholder="New Delhi / Online (Zoom)"
                className="w-full rounded-lg border border-[#E2D6C2] px-3 py-2.5 text-[14px] outline-none focus:border-[#C4A15A]"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7A7266]">
                Price
              </span>
              <input
                value={form.price}
                onChange={(e) => setField("price", e.target.value)}
                placeholder="Free / ₹500 / ₹2,500"
                className="w-full rounded-lg border border-[#E2D6C2] px-3 py-2.5 text-[14px] outline-none focus:border-[#C4A15A]"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7A7266]">
                Booking URL (optional)
              </span>
              <input
                value={form.bookingUrl}
                onChange={(e) => setField("bookingUrl", e.target.value)}
                placeholder="https://… or leave blank to use site booking modal"
                className="w-full rounded-lg border border-[#E2D6C2] px-3 py-2.5 text-[14px] outline-none focus:border-[#C4A15A]"
              />
            </label>
          </div>

          <div className="space-y-5">
            <div className="rounded-xl bg-white p-5 ring-1 ring-[#E8DCC8]">
              <label className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7A7266]">
                Featured Image
              </label>
              {form.image ? (
                <img
                  src={form.image}
                  alt=""
                  className="mb-3 aspect-[4/3] w-full rounded-lg object-cover"
                />
              ) : (
                <div className="mb-3 flex aspect-[4/3] items-center justify-center rounded-lg bg-[#F7F4EE] text-[12px] text-[#7A7266]">
                  No image
                </div>
              )}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(e) => handleImageFile(e.target.files?.[0])}
                className="text-[12px]"
              />
              {uploading && <p className="mt-2 text-[11px] text-[#7A7266]">Uploading…</p>}
            </div>

            <div className="rounded-xl bg-white p-5 ring-1 ring-[#E8DCC8]">
              <label className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7A7266]">
                Category
              </label>
              <select
                value={form.category}
                onChange={(e) => setField("category", e.target.value)}
                className="mb-4 w-full rounded-lg border border-[#E2D6C2] px-3 py-2.5 text-[14px]"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <label className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7A7266]">
                Status
              </label>
              <select
                value={form.status}
                onChange={(e) => setField("status", e.target.value)}
                className="w-full rounded-lg border border-[#E2D6C2] px-3 py-2.5 text-[14px]"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-full bg-[#123A1A] py-3 text-[12px] font-bold uppercase tracking-[0.14em] text-white hover:bg-[#0d2a13] disabled:opacity-60"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              {saving ? "Saving…" : isEdit ? "Update Event" : "Publish Event"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
