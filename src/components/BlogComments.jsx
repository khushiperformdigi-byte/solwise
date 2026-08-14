import { useEffect, useState } from "react";
import { api } from "../api/client";

function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return String(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function CommentForm({ postSlug, postId, parentId, onDone, onCancel }) {
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    setError("");
    setMessage("");
    try {
      const data = await api("/api/comments", {
        method: "POST",
        body: { postSlug, postId, parentId, authorName, authorEmail, content },
      });
      setMessage(data.message || "Comment submitted and awaiting admin approval.");
      setAuthorName("");
      setAuthorEmail("");
      setContent("");
      onDone?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-3 space-y-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder="Your name"
          required
          className="rounded-lg border border-[#E2D6C2] bg-white px-3 py-2 text-[13px] outline-none focus:border-[#C4A15A]"
        />
        <input
          type="email"
          value={authorEmail}
          onChange={(e) => setAuthorEmail(e.target.value)}
          placeholder="Email (optional)"
          className="rounded-lg border border-[#E2D6C2] bg-white px-3 py-2 text-[13px] outline-none focus:border-[#C4A15A]"
        />
      </div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={parentId ? "Write a reply..." : "Share your reflection..."}
        required
        rows={4}
        className="w-full rounded-lg border border-[#E2D6C2] bg-white px-3 py-2 text-[13px] outline-none focus:border-[#C4A15A]"
      />
      {error && <p className="text-[12px] text-red-700">{error}</p>}
      {message && <p className="text-[12px] text-[#1A3A28]">{message}</p>}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={sending}
          className="rounded-full bg-[#1A3A28] px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white disabled:opacity-60"
          style={{ fontFamily: "'Lato', sans-serif" }}
        >
          {sending ? "Sending…" : parentId ? "Post Reply" : "Post Comment"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-[#E2D6C2] px-4 py-2 text-[11px] text-[#5C5348]"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

function CommentItem({ comment, postSlug, postId }) {
  const [replyOpen, setReplyOpen] = useState(false);

  return (
    <li className="border-b border-[#EFE6D8] py-5 last:border-0">
      <p className="font-semibold text-[#2C261E]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
        {comment.authorName}
      </p>
      <p className="mb-2 text-[11px] text-[#8A8174]" style={{ fontFamily: "'Lato', sans-serif" }}>
        {formatDate(comment.createdAt)}
      </p>
      <p className="text-[14.5px] leading-relaxed text-[#3A342C]" style={{ fontFamily: "'Lora', serif" }}>
        {comment.content}
      </p>
      <button
        type="button"
        onClick={() => setReplyOpen((v) => !v)}
        className="mt-2 text-[12px] font-semibold text-[#B08A3A] hover:underline"
      >
        Reply
      </button>
      {replyOpen && (
        <CommentForm
          postSlug={postSlug}
          postId={postId}
          parentId={comment.id}
          onCancel={() => setReplyOpen(false)}
          onDone={() => setReplyOpen(false)}
        />
      )}
      {comment.replies?.length > 0 && (
        <ul className="mt-3 ml-5 border-l border-[#E8DCC8] pl-4">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} postSlug={postSlug} postId={postId} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function BlogComments({ post }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      const data = await api(`/api/comments/post/${post.slug}`);
      setComments(data);
    } catch {
      setComments([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post.slug]);

  if (!post.allowComments) return null;

  return (
    <section className="mt-12 border-t border-[#E5D9C4] pt-8">
      <h2
        className="engrave-green mb-2 text-[26px] font-semibold"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        Comments
      </h2>
      <p className="mb-6 text-[13px] text-[#7A7266]" style={{ fontFamily: "'Lora', serif" }}>
        Comments appear after they are approved by the admin. You can reply to any approved comment.
      </p>

      {loading ? (
        <p className="text-[13px] text-[#8A8174]">Loading comments…</p>
      ) : comments.length === 0 ? (
        <p className="mb-6 text-[13px] text-[#8A8174]">No comments yet. Be the first to share a reflection.</p>
      ) : (
        <ul className="mb-8">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} postSlug={post.slug} postId={post.id} />
          ))}
        </ul>
      )}

      <h3
        className="engrave-green mb-3 text-[20px] font-semibold"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        Leave a comment
      </h3>
      <CommentForm postSlug={post.slug} postId={post.id} />
    </section>
  );
}
