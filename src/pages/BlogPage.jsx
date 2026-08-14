import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import SiteFooter from "../components/SiteFooter";
import { BLOG_CATEGORIES, BLOG_POSTS } from "../data/blogPosts.js";

const CATEGORIES = ["All Articles", ...BLOG_CATEGORIES];
const POSTS = BLOG_POSTS;

const PER_PAGE = 6;

function Sparkle({ className = "h-3 w-3" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M12 0c.6 5.4 2.4 8.6 12 12-9.6 3.4-11.4 6.6-12 12-.6-5.4-2.4-8.6-12-12C9.6 8.6 11.4 5.4 12 0Z" />
    </svg>
  );
}

export default function BlogPage() {
  const [searchParams] = useSearchParams();
  const [category, setCategory] = useState("All Articles");
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [page, setPage] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return POSTS.filter((post) => {
      const matchesCategory = category === "All Articles" || post.category === category;
      const matchesQuery =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  function changeCategory(next) {
    setCategory(next);
    setPage(1);
  }

  function changeQuery(value) {
    setQuery(value);
    setPage(1);
  }

  const pageNumbers = useMemo(() => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 3) return [1, 2, 3, "…", totalPages];
    if (currentPage >= totalPages - 2) return [1, "…", totalPages - 2, totalPages - 1, totalPages];
    return [1, "…", currentPage, "…", totalPages];
  }, [currentPage, totalPages]);

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Banner from public/blogbanner.png */}
        <section className="relative w-full overflow-hidden bg-[#FCF6EC]">
          <img
            src="/blogbanner.png"
            alt="Our Blog — Wisdom for Your Soul’s Journey. Explore insights on mindfulness, spiritual growth, healing practices, and living a purposeful life."
            className="hidden w-full h-auto object-cover md:block"
          />
          <div className="relative md:hidden">
            <img
              src="/blogbanner.png"
              alt=""
              className="h-52 w-full object-cover object-right sm:h-64"
            />
            <div className="absolute inset-y-0 left-0 w-[72%] bg-gradient-to-r from-[#FCF6EC] via-[#FCF6EC]/95 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center px-5 pr-24">
              <div className="mb-2 flex items-center gap-2 text-[#B89354]">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                  <path d="M5 19c8-1 12-6 14-14-8 2-13 6-14 14Z" />
                  <path d="M8 16c2.5-2 5.5-3.5 9-4" />
                </svg>
                <span
                  className="text-[11px] font-medium uppercase tracking-[0.28em]"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Our Blog
                </span>
              </div>
              <h1
                className="engrave-green max-w-xs text-[28px] leading-[1.12] font-normal"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Wisdom for Your Soul’s Journey
              </h1>
              <div className="my-3 flex max-w-[160px] items-center gap-2 text-[#C4A15A]">
                <span className="h-px flex-1 bg-[#C4A15A]/80" />
                <Sparkle className="h-2.5 w-2.5" />
                <span className="h-px flex-1 bg-[#C4A15A]/80" />
              </div>
              <p
                className="max-w-[240px] text-[13px] leading-relaxed text-[#5C5348]"
                style={{ fontFamily: "'Lora', serif" }}
              >
                Explore insights on mindfulness, spiritual growth, healing practices, and living a purposeful life.
              </p>
            </div>
          </div>
        </section>

        {/* Filters + search */}
        <section className="border-b border-[#E8DCC8]/80 bg-white">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((item) => {
                const active = item === category;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => changeCategory(item)}
                    className={`rounded-full px-3.5 py-1.5 text-[12px] font-medium transition-all ${
                      active
                        ? "bg-[#1A3A28] text-white shadow-sm"
                        : "bg-[#F4EFE6] text-[#3A342C] hover:bg-[#E8DCC8]"
                    }`}
                    style={{ fontFamily: "'Lato', sans-serif" }}
                  >
                    {item}
                  </button>
                );
              })}
            </div>

            <label className="relative w-full max-w-xs lg:w-64">
              <span className="sr-only">Search articles</span>
              <input
                type="search"
                value={query}
                onChange={(e) => changeQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full rounded-full border border-[#E2D6C2] bg-[#FFFcf8] py-2 pr-4 pl-10 text-[13px] text-[#2C261E] outline-none placeholder:text-[#A39888] focus:border-[#C4A15A] focus:ring-2 focus:ring-[#C4A15A]/20"
                style={{ fontFamily: "'Lora', serif" }}
              />
              <svg viewBox="0 0 24 24" aria-hidden className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#B08A3A]" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="11" cy="11" r="6.5" />
                <path d="M16 16.5 20 20.5" strokeLinecap="round" />
              </svg>
            </label>
          </div>
        </section>

        {/* Article grid */}
        <section className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 md:py-14">
          {visible.length === 0 ? (
            <p
              className="py-16 text-center text-[16px] text-[#5C5348]"
              style={{ fontFamily: "'Lora', serif" }}
            >
              No articles match your search. Try another keyword or category.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
              {visible.map((post) => (
                <article
                  key={post.slug}
                  className="group flex h-full flex-col overflow-hidden rounded-[16px] bg-white shadow-[0_10px_28px_-14px_rgba(90,68,28,0.16)] ring-1 ring-[#E8DCC8]/80 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-18px_rgba(90,68,28,0.24)]"
                >
                  <div className="overflow-hidden">
                    <img
                      src={post.image}
                      alt=""
                      className="h-48 w-full object-cover transition-transform duration-700 group-hover:scale-[1.05] sm:h-52"
                    />
                  </div>
                  <div className="flex flex-1 flex-col px-5 pt-4 pb-5">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <span
                        className="rounded-md bg-[#E8F0EA] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#1A3A28]"
                        style={{ fontFamily: "'Lato', sans-serif" }}
                      >
                        {post.category}
                      </span>
                      <span
                        className="text-[12px] text-[#7A7266]"
                        style={{ fontFamily: "'Lato', sans-serif" }}
                      >
                        {post.date}
                      </span>
                    </div>
                    <h2
                      className="engrave-green mb-2 text-[20px] leading-snug font-semibold"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {post.title}
                    </h2>
                    <p
                      className="mb-4 flex-1 text-[13.5px] leading-relaxed text-[#5C5348]"
                      style={{ fontFamily: "'Lora', serif" }}
                    >
                      {post.excerpt}
                    </p>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#1A3A28] transition-colors hover:text-[#B08A3A]"
                      style={{ fontFamily: "'Lato', sans-serif" }}
                    >
                      Read More
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          {filtered.length > 0 && (
            <nav className="mt-12 flex items-center justify-center gap-2" aria-label="Pagination">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className="flex h-9 w-9 items-center justify-center rounded-full text-[#1A3A28] transition-colors hover:bg-[#F4EFE6] disabled:opacity-30"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M15 6l-6 6 6 6" />
                </svg>
              </button>

              {pageNumbers.map((item, index) =>
                item === "…" ? (
                  <span key={`ellipsis-${index}`} className="px-1 text-[#7A7266]">
                    …
                  </span>
                ) : (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setPage(item)}
                    aria-current={item === currentPage ? "page" : undefined}
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-[13px] font-medium transition-all ${
                      item === currentPage
                        ? "bg-[#1A3A28] text-white"
                        : "text-[#1A3A28] hover:bg-[#F4EFE6]"
                    }`}
                    style={{ fontFamily: "'Lato', sans-serif" }}
                  >
                    {item}
                  </button>
                ),
              )}

              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className="flex h-9 w-9 items-center justify-center rounded-full text-[#1A3A28] transition-colors hover:bg-[#F4EFE6] disabled:opacity-30"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </button>
            </nav>
          )}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
