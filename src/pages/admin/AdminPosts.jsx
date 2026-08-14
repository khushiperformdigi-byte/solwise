import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { api, isLoggedIn } from "../../api/client";

export default function AdminPosts() {
  const [posts, setPosts] = useState([]);
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
      const data = await api(`/api/blogs/admin/all?${params}`);
      setPosts(data);
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
    if (!confirm("Delete this post permanently?")) return;
    try {
      await api(`/api/blogs/${id}`, { method: "DELETE" });
      setPosts((prev) => prev.filter((p) => p.id !== id));
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
          All Posts
        </h1>
        <Link
          to="/admin/posts/new"
          className="rounded-full bg-[#123A1A] px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.14em] text-white hover:bg-[#0d2a13]"
          style={{ fontFamily: "'Lato', sans-serif" }}
        >
          + Add New Post
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
            placeholder="Title, slug, category, tags"
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
        <p className="text-[#7A7266]">Loading…</p>
      ) : posts.length === 0 ? (
        <div className="rounded-xl bg-white p-10 text-center text-[#8A8174] ring-1 ring-[#E8DCC8]">
          No posts found.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl bg-white ring-1 ring-[#E8DCC8]">
          <table className="w-full min-w-[720px] text-left text-[13px]">
            <thead className="border-b border-[#E8DCC8] bg-[#FBF8F2] text-[11px] uppercase tracking-[0.12em] text-[#6B6358]">
              <tr>
                <th className="px-4 py-3">Thumbnail</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-[#F0E8DA]">
                  <td className="px-4 py-3">
                    {post.image ? (
                      <img src={post.image} alt="" className="h-12 w-12 rounded-lg object-cover" />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#F0E8DA] text-[10px] text-[#8A8174]">
                        N/A
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-[#2C261E]">{post.title}</p>
                    <p className="text-[11px] text-[#8A8174]">{post.slug}</p>
                  </td>
                  <td className="px-4 py-3 uppercase tracking-wide text-[#6B6358]">
                    {post.category}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${
                        post.status === "published"
                          ? "bg-[#1A3A28] text-white"
                          : "bg-[#E8DCC8] text-[#5C5348]"
                      }`}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#6B6358]">{post.publishDate}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-1">
                      <Link to={`/admin/posts/${post.id}`} className="text-[#B08A3A] hover:underline">
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(post.id)}
                        className="text-left text-red-700 hover:underline"
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
