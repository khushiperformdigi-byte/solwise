import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { api, isLoggedIn } from "../../api/client";

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const loggedIn = isLoggedIn();

  async function load() {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      if (status !== "All") params.set("status", status);
      const data = await api(`/api/events/admin/all?${params}`);
      setEvents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!loggedIn) return <Navigate to="/admin/login" replace />;

  async function handleDelete(id) {
    if (!confirm("Delete this event permanently?")) return;
    try {
      await api(`/api/events/${id}`, { method: "DELETE" });
      setEvents((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1
          className="engrave-green text-[36px] font-semibold"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Events
        </h1>
        <Link
          to="/admin/events/new"
          className="rounded-full bg-[#123A1A] px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.14em] text-white hover:bg-[#0d2a13]"
          style={{ fontFamily: "'Lato', sans-serif" }}
        >
          + Add New Event
        </Link>
      </div>

      <div className="mb-5 flex flex-wrap items-end gap-3 rounded-xl bg-white p-4 ring-1 ring-[#E8DCC8]">
        <label className="min-w-[200px] flex-1">
          <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7A7266]">
            Search
          </span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Title, location, category"
            className="w-full rounded-lg border border-[#E2D6C2] px-3 py-2 text-[13px] outline-none focus:border-[#C4A15A]"
          />
        </label>
        <label>
          <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7A7266]">
            Status
          </span>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-lg border border-[#E2D6C2] px-3 py-2 text-[13px]"
          >
            <option>All</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </label>
        <button
          type="button"
          onClick={load}
          className="rounded-lg border border-[#C4A15A] px-4 py-2 text-[12px] font-semibold text-[#123A1A] hover:bg-[#C4A15A]/10"
        >
          Filter
        </button>
      </div>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
      {loading ? (
        <p className="text-sm text-[#7A7266]">Loading events…</p>
      ) : events.length === 0 ? (
        <p className="text-sm text-[#7A7266]">No events yet. Create your first event.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl bg-white ring-1 ring-[#E8DCC8]">
          <table className="w-full min-w-[640px] text-left text-[13px]">
            <thead className="border-b border-[#E8DCC8] bg-[#F7F4EE] text-[10px] uppercase tracking-[0.14em] text-[#7A7266]">
              <tr>
                <th className="px-4 py-3 font-semibold">Event</th>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id} className="border-b border-[#F0E8DA] last:border-0">
                  <td className="px-4 py-3">
                    <p className="font-medium text-[#123A1A]">{event.title}</p>
                    {event.location && (
                      <p className="mt-0.5 text-[11px] text-[#7A7266]">{event.location}</p>
                    )}
                  </td>
                  <td className="px-4 py-3 text-[#5C5348]">{event.date || event.eventDate}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-[#E8DCC8]/60 px-2.5 py-0.5 text-[11px] font-medium text-[#123A1A]">
                      {event.category}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase ${
                        event.status === "published"
                          ? "bg-[#123A1A]/10 text-[#123A1A]"
                          : "bg-[#C4A15A]/20 text-[#7A5A12]"
                      }`}
                    >
                      {event.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <Link
                        to={`/admin/events/${event.id}`}
                        className="rounded border border-[#C4A15A] px-2.5 py-1 text-[11px] font-semibold text-[#123A1A] hover:bg-[#C4A15A]/10"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(event.id)}
                        className="rounded border border-red-300 px-2.5 py-1 text-[11px] font-semibold text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
