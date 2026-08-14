import { useCallback, useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import SiteFooter from "../components/SiteFooter";
import { api } from "../api/client";

const FILTERS = [
  "All",
  "Events",
  "Retreats",
  "Workshops",
  "Teachings",
  "Meditation",
  "Nature",
  "Community",
];

const INITIAL_COUNT = 9;
const LOAD_MORE_COUNT = 6;

function Sparkle({ className = "h-3 w-3" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M12 0c.6 5.4 2.4 8.6 12 12-9.6 3.4-11.4 6.6-12 12-.6-5.4-2.4-8.6-12-12C9.6 8.6 11.4 5.4 12 0Z" />
    </svg>
  );
}

function Lightbox({ items, index, onClose, onPrev, onNext }) {
  const item = items[index];

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    }
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onPrev, onNext]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Gallery image viewer"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Previous image"
        className="absolute left-3 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M15 6l-6 6 6 6" />
        </svg>
      </button>

      <div
        className="relative z-10 flex max-h-[88vh] w-full max-w-5xl flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={item.src}
          alt={item.alt}
          className="max-h-[78vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
        />
        <div className="mt-4 flex flex-col items-center gap-1 text-center">
          <span
            className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#E8D9B8]"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            {item.category}
          </span>
          <p
            className="max-w-lg text-[14px] text-white/85"
            style={{ fontFamily: "'Lora', serif" }}
          >
            {item.alt}
          </p>
          <p
            className="text-[12px] text-white/50"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            {index + 1} / {items.length}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next image"
        className="absolute right-3 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>
    </div>
  );
}

export default function GalleryPage() {
  const [filter, setFilter] = useState("All");
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    let cancelled = false;
    (async () => {
      try {
        const data = await api("/api/gallery");
        if (cancelled) return;
        setItems(
          (data || []).map((item) => ({
            id: item.id,
            src: item.src || item.thumb || item.url,
            alt: item.alt || "",
            category: item.category || "Events",
            tall: !!item.tall,
          })),
        );
      } catch {
        if (!cancelled) setItems([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(
    () => (filter === "All" ? items : items.filter((item) => item.category === filter)),
    [filter, items],
  );

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;
  const lightboxOpen = lightboxIndex !== null;

  function changeFilter(next) {
    setFilter(next);
    setVisibleCount(INITIAL_COUNT);
    setLightboxIndex(null);
  }

  const openLightbox = useCallback((index) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const showPrev = useCallback(() => {
    setLightboxIndex((current) => {
      if (current === null) return current;
      return (current - 1 + filtered.length) % filtered.length;
    });
  }, [filtered.length]);

  const showNext = useCallback(() => {
    setLightboxIndex((current) => {
      if (current === null) return current;
      return (current + 1) % filtered.length;
    });
  }, [filtered.length]);

  return (
    <div className="min-h-screen bg-[#F7F4EE] flex flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="relative w-full overflow-hidden bg-[#F9F7F2]">
          <img
            src="/gallerybanner.png"
            alt="Our Gallery — Moments that Inspire Inner Transformation. Explore beautiful moments from our programs, retreats, and gatherings that celebrate healing, growth, and mindfulness."
            className="hidden w-full h-auto object-cover md:block"
          />
          <div className="relative md:hidden">
            <img
              src="/gallerybanner.png"
              alt=""
              className="h-52 w-full object-cover object-right sm:h-64"
            />
            <div className="absolute inset-y-0 left-0 w-[78%] bg-gradient-to-r from-[#F9F7F2] via-[#F9F7F2]/95 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center px-5 pr-20">
              <div className="mb-2 flex items-center gap-2 text-[#A68A5B]">
                <svg viewBox="0 0 64 64" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M32 14c-2.8 7.5-4.2 13.2 0 22 4.2-8.8 2.8-14.5 0-22Z" />
                  <path d="M32 22c-9.5.6-16.8 7.8-15.2 18.4 5.2-2.2 9.8-5.8 15.2-12.6 5.4 6.8 10 10.4 15.2 12.6C48.8 29.8 41.5 22.6 32 22Z" />
                </svg>
                <span
                  className="text-[11px] font-medium uppercase tracking-[0.28em]"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  Our Gallery
                </span>
              </div>
              <h1
                className="engrave-green max-w-xs text-[26px] leading-[1.15] font-normal sm:text-[30px]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Moments that Inspire Inner Transformation
              </h1>
              <div className="my-3 flex max-w-[150px] items-center gap-2 text-[#C4A15A]">
                <span className="h-px flex-1 bg-[#C4A15A]/80" />
                <Sparkle className="h-2.5 w-2.5" />
                <span className="h-px flex-1 bg-[#C4A15A]/80" />
              </div>
              <p
                className="max-w-[240px] text-[12.5px] leading-relaxed text-[#5C5348]"
                style={{ fontFamily: "'Lora', serif" }}
              >
                Explore beautiful moments from our programs, retreats, and gatherings that celebrate healing, growth, and mindfulness.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 md:py-12">
          <div className="mb-8 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {FILTERS.map((item) => {
              const active = item === filter;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => changeFilter(item)}
                  className={`rounded-full px-4 py-2 text-[12px] font-medium transition-all sm:px-5 ${
                    active
                      ? "bg-[#1A3A28] text-white shadow-sm"
                      : "border border-[#E2D6C2] bg-white text-[#3A342C] hover:border-[#C4A15A] hover:text-[#1A3A28]"
                  }`}
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  {item}
                </button>
              );
            })}
          </div>

          {loading ? (
            <p
              className="py-16 text-center text-[15px] text-[#5C5348]"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Loading gallery…
            </p>
          ) : visible.length === 0 ? (
            <p
              className="py-16 text-center text-[15px] text-[#5C5348]"
              style={{ fontFamily: "'Lora', serif" }}
            >
              No images in this category yet.
            </p>
          ) : (
            <div className="columns-1 gap-4 sm:columns-2 sm:gap-5 lg:columns-3">
              {visible.map((item, index) => (
                <button
                  key={`${item.id}-${item.category}-${index}`}
                  type="button"
                  onClick={() => openLightbox(index)}
                  className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-[14px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C4A15A] sm:mb-5"
                >
                  <span className="relative block overflow-hidden rounded-[14px]">
                    <img
                      src={item.src}
                      alt={item.alt}
                      className={`w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] ${
                        item.tall ? "aspect-[3/4]" : "aspect-[4/3]"
                      }`}
                    />
                    <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span
                      className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#1A3A28] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{ fontFamily: "'Lato', sans-serif" }}
                    >
                      {item.category}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          )}

          {hasMore && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setVisibleCount((count) => count + LOAD_MORE_COUNT)}
                className="inline-flex items-center gap-2.5 rounded-full bg-[#1A3A28] px-7 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-white shadow-[0_10px_24px_-12px_rgba(18,58,26,0.5)] transition-all hover:bg-[#123A1A] hover:scale-[1.02]"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 animate-spin" style={{ animationDuration: "2.4s" }} fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 4a8 8 0 1 1-7.2 4.4" strokeLinecap="round" />
                </svg>
                Load More
              </button>
            </div>
          )}
        </section>
      </main>

      {lightboxOpen && (
        <Lightbox
          items={filtered}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={showPrev}
          onNext={showNext}
        />
      )}

      <SiteFooter />
    </div>
  );
}
