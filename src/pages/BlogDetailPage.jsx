import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import SiteFooter from "../components/SiteFooter";
import { useBookingModal } from "../context/BookingModalContext";
import { api } from "../api/client";
import BlogComments from "../components/BlogComments";

function LotusIcon({ className = "h-8 w-8" }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className} fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinejoin="round">
      <path d="M32 14c-2.8 7.5-4.2 13.2 0 22 4.2-8.8 2.8-14.5 0-22Z" />
      <path d="M32 18c-7.2 1.8-13.5 7.2-12.2 16.8 4.4-2.8 8.2-5.6 12.2-12.2 4 6.6 7.8 9.4 12.2 12.2C45.5 25.2 39.2 19.8 32 18Z" />
      <path d="M32 22c-9.5.6-16.8 7.8-15.2 18.4 5.2-2.2 9.8-5.8 15.2-12.6 5.4 6.8 10 10.4 15.2 12.6C48.8 29.8 41.5 22.6 32 22Z" />
      <path d="M18 34c-4.8 3.2-8.6 8.6-7.4 14.6 5.4-1.4 10.2-4.2 14.8-9.2" />
      <path d="M46 34c4.8 3.2 8.6 8.6 7.4 14.6-5.4-1.4-10.2-4.2-14.8-9.2" />
      <path d="M22 42c-1.6 4.8-.4 9.6 4.2 12.4 2.2-3.8 3.8-7.2 5.8-11.6" />
      <path d="M42 42c1.6 4.8.4 9.6-4.2 12.4-2.2-3.8-3.8-7.2-5.8-11.6" />
      <path d="M32 36c-3.4 5.6-4.6 10.2 0 16.4 4.6-6.2 3.4-10.8 0-16.4Z" />
      <circle cx="32" cy="40" r="2.2" fill="currentColor" stroke="none" opacity="0.85" />
    </svg>
  );
}

function Diamond() {
  return (
    <svg viewBox="0 0 8 8" aria-hidden className="h-1.5 w-1.5 shrink-0 text-[#C4A15A]" fill="currentColor">
      <path d="M4 0l4 4-4 4-4-4z" />
    </svg>
  );
}

function Divider() {
  return (
    <div className="my-8 flex items-center gap-2 text-[#C4A15A]">
      <span className="h-px flex-1 bg-[#E5D9C4]" />
      <Diamond />
      <span className="h-px flex-1 bg-[#E5D9C4]" />
    </div>
  );
}

function MetaIcon({ type }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: "1.7", strokeLinecap: "round", strokeLinejoin: "round" };
  if (type === "user") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" {...p}>
        <circle cx="12" cy="8" r="3.2" />
        <path d="M5.5 19c1.2-3.2 3.4-4.8 6.5-4.8s5.3 1.6 6.5 4.8" />
      </svg>
    );
  }
  if (type === "calendar") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" {...p}>
        <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
        <path d="M8 3.5v3M16 3.5v3M3.5 10h17" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" {...p}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4.2l2.8 1.6" />
    </svg>
  );
}

function CategoryIcon({ name, className = "h-4 w-4" }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" };
  if (name === "Meditation") {
    return (
      <svg viewBox="0 0 24 24" className={className} {...p}>
        <circle cx="12" cy="8" r="2.4" />
        <path d="M8 20c1.2-3 2.6-4.5 4-4.5S14.8 17 16 20M7 13.5c1.8-.8 3.4-1.2 5-1.2s3.2.4 5 1.2" />
      </svg>
    );
  }
  if (name === "Healing") {
    return (
      <svg viewBox="0 0 24 24" className={className} {...p}>
        <path d="M12 20s-6.2-4.4-8.4-8.2C2 9.2 3.2 6 6.4 6c1.8 0 3.2 1 3.6 2.4C10.4 7 11.8 6 13.6 6c3.2 0 4.4 3.2 2.8 5.8C18.2 15.6 12 20 12 20Z" />
      </svg>
    );
  }
  if (name === "Mindfulness") {
    return (
      <svg viewBox="0 0 24 24" className={className} {...p}>
        <path d="M5 19c8-1 12-6 14-14-8 2-13 6-14 14Z" />
        <path d="M8 16c2.5-2 5.5-3.5 9-4" />
      </svg>
    );
  }
  if (name === "Wellness") {
    return (
      <svg viewBox="0 0 24 24" className={className} {...p}>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v8M8 12h8" />
      </svg>
    );
  }
  if (name === "Life-Coaching") {
    return (
      <svg viewBox="0 0 24 24" className={className} {...p}>
        <path d="M4 19V6.5A2.5 2.5 0 0 1 6.5 4H20v12H7.5A3.5 3.5 0 0 0 4 19Z" />
        <path d="M8 8h8M8 12h5" />
      </svg>
    );
  }
  return <LotusIcon className={className} />;
}

function SocialButton({ type, href, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E2D6C2] text-[#5C5348] transition-colors hover:border-[#C4A15A] hover:text-[#C4A15A]"
    >
      {type === "facebook" && (
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
          <path d="M14.5 8.5h2V5.8h-2c-2.2 0-3.6 1.4-3.6 3.7v1.7H9v2.6h1.9V20h2.8v-6.2h2.2l.4-2.6h-2.6V9.7c0-.7.3-1.2 1.2-1.2Z" />
        </svg>
      )}
      {type === "x" && (
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
          <path d="M4 4h4.2l4.1 5.6L16.8 4H20l-6.3 8.2L20.4 20h-4.2l-4.5-6.1L7.2 20H4l6.7-8.6L4 4Z" />
        </svg>
      )}
      {type === "linkedin" && (
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
          <path d="M7.2 9.2H4.8V19h2.4V9.2ZM6 4.8A1.4 1.4 0 1 0 6 7.6 1.4 1.4 0 0 0 6 4.8ZM19.2 12.3c0-2.5-1.3-4-3.6-4-1.3 0-2.1.6-2.5 1.3h-.1V9.2H10.8c0 1.1 0 9.8 0 9.8h2.4v-5.5c0-.3 0-.6.1-.8.3-.6.9-1.2 1.9-1.2 1.3 0 1.8.9 1.8 2.3V19h2.4v-6.7Z" />
        </svg>
      )}
      {type === "whatsapp" && (
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
          <path d="M12 3.5A8.5 8.5 0 0 0 5.2 16.4L4 20l3.7-1.2A8.5 8.5 0 1 0 12 3.5Zm4.6 12c-.2.5-1.1.9-1.8 1-1 .2-1.7 0-4.8-1.9-2.6-1.7-4.3-4.1-4.4-4.3-.2-.2-1.3-1.8-1.3-3.4 0-1.6.8-2.4 1.1-2.7.3-.3.7-.4 1-.4h.8c.2 0 .5 0 .7.6l1 2.4c.1.2.1.4 0 .6l-.5.8c-.1.2-.2.4 0 .6.4.7 1.1 1.5 1.9 2.1.7.6 1.4.9 1.6 1 .2.1.4.1.6-.1l.9-.9c.2-.2.4-.2.6-.1l2.3 1.1c.6.3.4.5.4.7 0 .2-.1.8-.3 1.3Z" />
        </svg>
      )}
      {type === "instagram" && (
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.7">
          <rect x="4" y="4" width="16" height="16" rx="4" />
          <circle cx="12" cy="12" r="3.4" />
          <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
        </svg>
      )}
      {type === "youtube" && (
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
          <path d="M19.6 7.2A2.4 2.4 0 0 0 17.9 5.6C16.4 5.2 12 5.2 12 5.2s-4.4 0-5.9.4A2.4 2.4 0 0 0 4.4 7.2 25 25 0 0 0 4 12a25 25 0 0 0 .4 4.8 2.4 2.4 0 0 0 1.7 1.6c1.5.4 5.9.4 5.9.4s4.4 0 5.9-.4a2.4 2.4 0 0 0 1.7-1.6A25 25 0 0 0 20 12a25 25 0 0 0-.4-4.8ZM10.4 15.1V8.9L15.2 12l-4.8 3.1Z" />
        </svg>
      )}
    </a>
  );
}

export default function BlogDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { openBooking } = useBookingModal();
  const [query, setQuery] = useState("");
  const [post, setPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    let cancelled = false;
    (async () => {
      setLoading(true);
      setNotFound(false);
      try {
        const [detail, list] = await Promise.all([
          api(`/api/blogs/slug/${slug}`),
          api("/api/blogs").catch(() => []),
        ]);
        if (cancelled) return;
        setPost(detail);
        setPosts(Array.isArray(list) ? list : []);
      } catch {
        if (!cancelled) setNotFound(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const related = useMemo(() => {
    if (!post) return [];
    return posts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3);
  }, [posts, post]);

  const categories = useMemo(() => {
    const map = {};
    for (const p of posts) {
      if (!p.category) continue;
      map[p.category] = (map[p.category] || 0) + 1;
    }
    return Object.entries(map).map(([name, count]) => ({ name, count }));
  }, [posts]);

  const { prev, next } = useMemo(() => {
    const index = posts.findIndex((p) => p.slug === slug);
    return {
      prev: index > 0 ? posts[index - 1] : null,
      next: index >= 0 && index < posts.length - 1 ? posts[index + 1] : null,
    };
  }, [posts, slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F4EE] flex flex-col">
        <Navbar />
        <p className="mx-auto max-w-6xl flex-1 px-5 py-20 text-[#7A7266]">Loading article…</p>
        <SiteFooter />
      </div>
    );
  }

  if (notFound || !post) return <Navigate to="/blog" replace />;

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const html = post.content || "";
  const faqJson = (post.faqs || []).filter((f) => f.question && f.answer);

  function handleSearch(e) {
    e.preventDefault();
    const q = query.trim();
    navigate(q ? `/blog?q=${encodeURIComponent(q)}` : "/blog");
  }

  return (
    <div className="min-h-screen bg-[#F7F4EE] flex flex-col">
      <Navbar />

      <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-8 sm:px-8 md:py-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <article className="lg:col-span-8">
            <nav
              className="mb-5 text-[12px] text-[#8A8174]"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              <Link to="/" className="hover:text-[#1A3A28]">Home</Link>
              <span className="mx-1.5">›</span>
              <Link to="/blog" className="hover:text-[#1A3A28]">Blog</Link>
              <span className="mx-1.5">›</span>
              <span className="text-[#5C5348]">{post.title}</span>
            </nav>

            <span
              className="mb-3 inline-flex rounded-full bg-[#E8F0EA] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#1A3A28]"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              {post.category}
            </span>

            <h1
              className="engrave-green mb-4 text-[32px] leading-[1.15] font-semibold sm:text-[40px] md:text-[44px]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {post.title}
            </h1>

            <div
              className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-[#6B6358]"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              <span className="inline-flex items-center gap-1.5">
                <MetaIcon type="user" />
                By {post.author}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MetaIcon type="calendar" />
                {post.date}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MetaIcon type="clock" />
                {post.readTime}
              </span>
            </div>

            {post.image && (
              <img
                src={post.image}
                alt=""
                className="mb-8 h-[240px] w-full rounded-[18px] object-cover sm:h-[320px] md:h-[380px]"
              />
            )}

            <div className="blog-content" dangerouslySetInnerHTML={{ __html: html }} />

            {faqJson.length > 0 && (
              <div className="mt-10">
                <Divider />
                <h2
                  className="engrave-green mb-4 text-[24px] font-semibold"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {faqJson.map((faq) => (
                    <div key={faq.question} className="rounded-xl bg-white p-4 ring-1 ring-[#E8DCC8]">
                      <h3
                        className="mb-2 text-[16px] font-semibold text-[#1A3A28]"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      >
                        {faq.question}
                      </h3>
                      <p className="text-[14.5px] leading-relaxed text-[#3A342C]" style={{ fontFamily: "'Lora', serif" }}>
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                      "@context": "https://schema.org",
                      "@type": "FAQPage",
                      mainEntity: faqJson.map((faq) => ({
                        "@type": "Question",
                        name: faq.question,
                        acceptedAnswer: { "@type": "Answer", text: faq.answer },
                      })),
                    }),
                  }}
                />
              </div>
            )}

            <div className="mt-10 flex flex-col gap-5 border-t border-[#E5D9C4] pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-2.5">
                <span
                  className="text-[13px] text-[#5C5348]"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  Share this article:
                </span>
                <SocialButton type="facebook" label="Share on Facebook" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} />
                <SocialButton type="x" label="Share on X" href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`} />
                <SocialButton type="linkedin" label="Share on LinkedIn" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} />
                <SocialButton type="whatsapp" label="Share on WhatsApp" href={`https://wa.me/?text=${encodeURIComponent(`${post.title} ${shareUrl}`)}`} />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-4">
              {prev ? (
                <Link
                  to={`/blog/${prev.slug}`}
                  className="inline-flex items-center gap-2 text-[13px] text-[#1A3A28] transition-colors hover:text-[#B08A3A]"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M15 6l-6 6 6 6" />
                  </svg>
                  Previous Article
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link
                  to={`/blog/${next.slug}`}
                  className="inline-flex items-center gap-2 text-[13px] text-[#1A3A28] transition-colors hover:text-[#B08A3A]"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  Next Article
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </Link>
              ) : (
                <span />
              )}
            </div>

            <BlogComments post={post} />
          </article>

          <aside className="space-y-5 lg:col-span-4">
            <form onSubmit={handleSearch} className="flex overflow-hidden rounded-xl bg-white shadow-[0_8px_24px_-14px_rgba(90,68,28,0.18)] ring-1 ring-[#E8DCC8]/80">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles..."
                className="min-w-0 flex-1 bg-transparent px-4 py-3 text-[13px] text-[#2C261E] outline-none placeholder:text-[#A39888]"
                style={{ fontFamily: "'Lora', serif" }}
              />
              <button
                type="submit"
                aria-label="Search"
                className="flex w-12 items-center justify-center bg-[#EDE6DA] text-[#5C5348] transition-colors hover:bg-[#E2D6C2]"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="11" cy="11" r="6.5" />
                  <path d="M16 16.5 20 20.5" strokeLinecap="round" />
                </svg>
              </button>
            </form>

            <div className="rounded-[18px] bg-[#F3EDE3] p-5">
              <h3
                className="engrave-green mb-4 text-[18px] font-semibold"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                About the Author
              </h3>
              <div className="mb-3 flex items-center gap-3">
                <img
                  src="/solwise_logo.PNG"
                  alt="Dr. Sachin Bansal"
                  className="h-14 w-14 rounded-full object-cover ring-2 ring-white"
                />
                <div>
                  <p
                    className="engrave-green text-[16px] font-semibold"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    Dr. Sachin Bansal
                  </p>
                  <p className="text-[12px] text-[#7A7266]" style={{ fontFamily: "'Lato', sans-serif" }}>
                    The Mystic Guru
                  </p>
                </div>
              </div>
              <p
                className="mb-4 text-[13px] leading-relaxed text-[#5C5348]"
                style={{ fontFamily: "'Lora', serif" }}
              >
                Guiding seekers toward inner clarity, emotional balance and spiritual transformation through ancient wisdom and modern understanding.
              </p>
              <div className="flex gap-2">
                <SocialButton type="instagram" label="Instagram" href="https://instagram.com" />
                <SocialButton type="facebook" label="Facebook" href="https://facebook.com" />
                <SocialButton type="youtube" label="YouTube" href="https://youtube.com" />
                <SocialButton type="linkedin" label="LinkedIn" href="https://linkedin.com" />
              </div>
            </div>

            <div className="rounded-[18px] bg-white p-5 shadow-[0_8px_24px_-14px_rgba(90,68,28,0.14)] ring-1 ring-[#E8DCC8]/80">
              <h3
                className="engrave-green mb-4 text-[18px] font-semibold"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Categories
              </h3>
              <ul className="space-y-3">
                {categories.map((item) => (
                  <li key={item.name}>
                    <Link
                      to="/blog"
                      className="flex items-center justify-between gap-3 text-[13.5px] text-[#3A342C] transition-colors hover:text-[#B08A3A]"
                      style={{ fontFamily: "'Lato', sans-serif" }}
                    >
                      <span className="inline-flex items-center gap-2.5">
                        <span className="text-[#C4A15A]">
                          <CategoryIcon name={item.name} />
                        </span>
                        {item.name}
                      </span>
                      <span className="text-[#8A8174]">({item.count})</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                to="/blog"
                className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-[#1A3A28] hover:text-[#B08A3A]"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                View All Categories
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>

            <div className="rounded-[18px] bg-white p-5 shadow-[0_8px_24px_-14px_rgba(90,68,28,0.14)] ring-1 ring-[#E8DCC8]/80">
              <h3
                className="engrave-green mb-4 text-[18px] font-semibold"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Related Articles
              </h3>
              <ul className="space-y-4">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link to={`/blog/${item.slug}`} className="flex gap-3 group">
                      <img
                        src={item.image}
                        alt=""
                        className="h-16 w-16 shrink-0 rounded-xl object-cover"
                      />
                      <span className="min-w-0">
                        <span
                          className="mb-1 inline-block rounded bg-[#E8F0EA] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#1A3A28]"
                          style={{ fontFamily: "'Lato', sans-serif" }}
                        >
                          {item.category}
                        </span>
                        <span
                          className="engrave-green mt-1 block text-[14px] leading-snug font-semibold group-hover:opacity-80"
                          style={{ fontFamily: "'Cormorant Garamond', serif" }}
                        >
                          {item.title}
                        </span>
                        <span
                          className="mt-1 block text-[11px] text-[#8A8174]"
                          style={{ fontFamily: "'Lato', sans-serif" }}
                        >
                          {item.date} · {item.readTime}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative overflow-hidden rounded-[18px] bg-[#F3EDE3] p-6">
              <svg viewBox="0 0 160 180" aria-hidden className="pointer-events-none absolute -right-6 -bottom-8 h-32 w-28 opacity-30">
                <g stroke="#C4A15A" strokeWidth="1.1" fill="none">
                  <path d="M30 20c18 30 22 70 18 120" />
                  <path d="M40 48c16-12 36-14 52-8-12 16-30 24-52 18Z" fill="#C4A15A" fillOpacity="0.15" />
                  <path d="M44 88c18-10 40-8 56 6-14 16-34 22-56 14Z" fill="#C4A15A" fillOpacity="0.12" />
                </g>
              </svg>
              <LotusIcon className="relative mb-3 h-8 w-8 text-[#C4A15A]" />
              <h3
                className="engrave-green relative mb-2 text-[22px] leading-snug font-semibold"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Begin Your Transformation Journey Today
              </h3>
              <p
                className="relative mb-4 text-[13px] leading-relaxed text-[#5C5348]"
                style={{ fontFamily: "'Lora', serif" }}
              >
                Book a personalized session and take the first step toward clarity, healing and inner peace.
              </p>
              <button
                type="button"
                onClick={() => openBooking()}
                className="relative inline-flex items-center gap-2 rounded-full bg-[#1A3A28] px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#F7F1E4] transition-all hover:bg-[#123A1A]"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-[#C4A15A]" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
                  <path d="M8 3.5v3M16 3.5v3M3.5 10h17" />
                </svg>
                Book a Session
              </button>
            </div>
          </aside>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
