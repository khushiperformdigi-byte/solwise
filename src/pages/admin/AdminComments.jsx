import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { api, isLoggedIn } from "../../api/client";

export default function AdminComments() {
  const [comments, setComments] = useState([]);
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
      const data = await api(`/api/comments/admin/all?${params}`);
      setComments(data);
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

  async function setCommentStatus(id, next) {
    try {
      const updated = await api(`/api/comments/${id}/status`, {
        method: "PATCH",
        body: { status: next },
      });
      setComments((prev) => prev.map((c) => (c.id === id ? updated : c)));
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this comment and its replies?")) return;
    try {
      await api(`/api/comments/${id}`, { method: "DELETE" });
      setComments((prev) => prev.filter((c) => c.id !== id && c.parentId !== id));
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div>
      <h1
        className="engrave-green mb-6 text-[36px] font-semibold"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        Comments
      </h1>

      <div className="mb-5 flex flex-wrap items-end gap-3 rounded-xl bg-white p-4 ring-1 ring-[#E8DCC8]">
        <label className="min-w-[200px] flex-1">
          <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7A7266]">
            Search
          </span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Author, comment, post slug"
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
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
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

      <div className="rounded-xl bg-white ring-1 ring-[#E8DCC8]">
        {loading ? (
          <p className="p-8 text-[#7A7266]">Loading…</p>
        ) : comments.length === 0 ? (
          <p className="p-8 text-[13px] text-[#8A8174]">No comments found.</p>
        ) : (
          <div className="divide-y divide-[#F0E8DA]">
            {comments.map((comment) => (
              <article key={comment.id} className="p-5">
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-semibold text-[#2C261E]">{comment.authorName}</p>
                    <p className="text-[11px] text-[#8A8174]">
                      {comment.authorEmail} · {comment.postSlug}
                      {comment.parentId ? " · reply" : ""}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${
                      comment.status === "approved"
                        ? "bg-[#1A3A28] text-white"
                        : comment.status === "rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-[#E8DCC8] text-[#5C5348]"
                    }`}
                  >
                    {comment.status}
                  </span>
                </div>
                <p className="mb-3 text-[14px] leading-relaxed text-[#3A342C]">{comment.content}</p>
                <div className="flex flex-wrap gap-3 text-[12px]">
                  {comment.status !== "approved" && (
                    <button
                      type="button"
                      onClick={() => setCommentStatus(comment.id, "approved")}
                      className="font-semibold text-[#1A3A28] hover:underline"
                    >
                      Approve
                    </button>
                  )}
                  {comment.status !== "rejected" && (
                    <button
                      type="button"
                      onClick={() => setCommentStatus(comment.id, "rejected")}
                      className="text-[#8A6621] hover:underline"
                    >
                      Reject
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleDelete(comment.id)}
                    className="text-red-700 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
