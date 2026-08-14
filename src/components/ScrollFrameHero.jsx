import { useEffect, useRef, useState } from "react";
import { useBookingModal } from "../context/BookingModalContext";

const DOOR_COUNT = 174;
const CLOUD_COUNT = 300;
const DOOR_BASE = "/6a7e47a8628f4_frames";
const CLOUD_BASE = "/6a7e4d954bedc_frames";
const BLEND = 20;
const TOTAL_FRAMES = DOOR_COUNT + CLOUD_COUNT;

/** Snappy scroll follow — low trail lag. */
const FOLLOW = 0.72;
const IDLE_EPSILON = 0.00035;

/** High-res paint budget (still capped so 4K/retina stays fluid). */
const MAX_CANVAS_WIDTH = 2560;
const MAX_DPR = 2;

/** Keep only nearby decoded frames in GPU/CPU memory. */
const CACHE_RADIUS = 18;
const PREFETCH_RADIUS = 14;
const MAX_CONCURRENT = 6;
const READY_NEED = 24;

/** Hero copy appears as the doorway opens into light / clouds. */
const COPY_START = DOOR_COUNT - 26;
const COPY_FULL = DOOR_COUNT + 55;

function doorSrc(i) {
  return `${DOOR_BASE}/frame_${String(i + 1).padStart(3, "0")}.png`;
}
function cloudSrc(i) {
  return `${CLOUD_BASE}/frame_${String(i + 1).padStart(3, "0")}.png`;
}
function clamp(n, a, b) {
  return Math.min(b, Math.max(a, n));
}
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function timelineToAsset(index) {
  if (index < DOOR_COUNT) return { kind: "door", local: index, src: doorSrc(index) };
  return { kind: "cloud", local: index - DOOR_COUNT, src: cloudSrc(index - DOOR_COUNT) };
}

function cacheKey(kind, local) {
  return `${kind}:${local}`;
}

/**
 * Dual-sequence scroll scrubber — playhead-first loading, high-res, high-FPS.
 */
export default function ScrollFrameHero() {
  const { openBooking } = useBookingModal();
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const copyWrapRef = useRef(null);
  const copyInnerRef = useRef(null);

  const bitmapsRef = useRef(new Map()); // key -> ImageBitmap
  const inflightRef = useRef(new Map()); // key -> Promise
  const wantedRef = useRef(new Set());
  const playheadRef = useRef(0);
  const maxReadyRef = useRef(0);
  const loadedFlagsRef = useRef(new Uint8Array(TOTAL_FRAMES));

  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const copyTargetRef = useRef(0);
  const copyCurrentRef = useRef(0);
  const lastPaintedRef = useRef(-1);
  const rafRef = useRef(0);
  const lastTimeRef = useRef(0);
  const inViewRef = useRef(true);
  const sizeRef = useRef({ w: 0, h: 0 });
  const schedulerRef = useRef(null);

  const [ready, setReady] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // ---- Bitmap loader (playhead prioritized, concurrency capped) ----
  useEffect(() => {
    let cancelled = false;
    let active = 0;
    const queue = [];

    function bumpProgress() {
      let n = 0;
      const flags = loadedFlagsRef.current;
      for (let i = 0; i < TOTAL_FRAMES; i += 1) if (flags[i]) n += 1;
      setLoadProgress(n / TOTAL_FRAMES);

      let contiguous = 0;
      while (contiguous < TOTAL_FRAMES && flags[contiguous]) contiguous += 1;
      maxReadyRef.current = Math.max(0, contiguous - 1);
      if (contiguous >= READY_NEED) setReady(true);
    }

    function evictFar(center) {
      const map = bitmapsRef.current;
      for (const [key, bmp] of map) {
        const [kind, localStr] = key.split(":");
        const local = Number(localStr);
        const timeline = kind === "door" ? local : DOOR_COUNT + local;
        if (Math.abs(timeline - center) > CACHE_RADIUS + 4) {
          bmp.close?.();
          map.delete(key);
        }
      }
    }

    async function fetchBitmap(kind, local, src, timelineIndex) {
      const key = cacheKey(kind, local);
      try {
        const res = await fetch(src, { cache: "force-cache" });
        const blob = await res.blob();
        if (cancelled) return;
        const bmp = await createImageBitmap(blob);
        if (cancelled) {
          bmp.close?.();
          return;
        }
        const prev = bitmapsRef.current.get(key);
        if (prev && prev !== bmp) prev.close?.();
        bitmapsRef.current.set(key, bmp);
        loadedFlagsRef.current[timelineIndex] = 1;
        bumpProgress();
        evictFar(playheadRef.current);
      } catch {
        // leave unloaded; scheduler may retry later if still wanted
      } finally {
        inflightRef.current.delete(key);
        wantedRef.current.delete(key);
        active -= 1;
        pump();
      }
    }

    function pump() {
      if (cancelled) return;
      while (active < MAX_CONCURRENT && queue.length) {
        // Always pick the request closest to playhead
        const center = playheadRef.current;
        let bestIdx = 0;
        let bestDist = Infinity;
        for (let i = 0; i < queue.length; i += 1) {
          const dist = Math.abs(queue[i].timelineIndex - center);
          if (dist < bestDist) {
            bestDist = dist;
            bestIdx = i;
          }
        }
        const job = queue.splice(bestIdx, 1)[0];
        const key = cacheKey(job.kind, job.local);
        if (bitmapsRef.current.has(key) || inflightRef.current.has(key)) continue;
        active += 1;
        const p = fetchBitmap(job.kind, job.local, job.src, job.timelineIndex);
        inflightRef.current.set(key, p);
      }
    }

    function requestTimelineIndex(timelineIndex) {
      if (timelineIndex < 0 || timelineIndex >= TOTAL_FRAMES) return;
      const { kind, local, src } = timelineToAsset(timelineIndex);
      const key = cacheKey(kind, local);
      if (bitmapsRef.current.has(key) || inflightRef.current.has(key) || wantedRef.current.has(key)) return;
      wantedRef.current.add(key);
      queue.push({ kind, local, src, timelineIndex });

      // Keep queue lean — drop farthest jobs if it grows
      if (queue.length > 48) {
        const center = playheadRef.current;
        queue.sort((a, b) => Math.abs(a.timelineIndex - center) - Math.abs(b.timelineIndex - center));
        const dropped = queue.splice(48);
        for (const job of dropped) {
          wantedRef.current.delete(cacheKey(job.kind, job.local));
        }
      }
      pump();
    }

    function prefetchAround(center) {
      playheadRef.current = center;
      // Near frames first
      for (let d = 0; d <= PREFETCH_RADIUS; d += 1) {
        requestTimelineIndex(center + d);
        if (d > 0) requestTimelineIndex(center - d);
      }
      // Warm the upcoming sequence lightly
      for (let d = PREFETCH_RADIUS + 1; d <= PREFETCH_RADIUS + 10; d += 1) {
        requestTimelineIndex(center + d);
      }
    }

    schedulerRef.current = { prefetchAround, requestTimelineIndex };

    // Kick off the start of the door sequence
    prefetchAround(0);

    return () => {
      cancelled = true;
      queue.length = 0;
      bitmapsRef.current.forEach((b) => b.close?.());
      bitmapsRef.current.clear();
      inflightRef.current.clear();
      wantedRef.current.clear();
      schedulerRef.current = null;
    };
  }, []);

  // ---- Render loop ----
  useEffect(() => {
    if (!ready) return undefined;

    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return undefined;

    const ctx = canvas.getContext("2d", {
      alpha: false,
      desynchronized: true,
      willReadFrequently: false,
    });
    if (!ctx) return undefined;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    function ensureSize() {
      const cssW = canvas.clientWidth;
      const cssH = canvas.clientHeight;
      if (!cssW || !cssH) return false;

      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      let tw = Math.round(cssW * dpr);
      let th = Math.round(cssH * dpr);
      if (tw > MAX_CANVAS_WIDTH) {
        const s = MAX_CANVAS_WIDTH / tw;
        tw = MAX_CANVAS_WIDTH;
        th = Math.round(th * s);
      }
      if (canvas.width !== tw || canvas.height !== th) {
        canvas.width = tw;
        canvas.height = th;
        sizeRef.current = { w: tw, h: th };
      }
      return true;
    }

    function getBitmap(timelineIndex) {
      if (timelineIndex < 0 || timelineIndex >= TOTAL_FRAMES) return null;
      const { kind, local } = timelineToAsset(timelineIndex);
      return bitmapsRef.current.get(cacheKey(kind, local)) || null;
    }

    function nearestBitmap(timelineIndex) {
      const direct = getBitmap(timelineIndex);
      if (direct) return { bmp: direct, index: timelineIndex };
      for (let d = 1; d <= CACHE_RADIUS; d += 1) {
        const lo = getBitmap(timelineIndex - d);
        if (lo) return { bmp: lo, index: timelineIndex - d };
        const hi = getBitmap(timelineIndex + d);
        if (hi) return { bmp: hi, index: timelineIndex + d };
      }
      return null;
    }

    function coverDraw(bmp, alpha = 1) {
      const { w: cw, h: ch } = sizeRef.current;
      const scale = Math.max(cw / bmp.width, ch / bmp.height);
      const dw = bmp.width * scale;
      const dh = bmp.height * scale;
      const x = (cw - dw) * 0.5;
      const y = (ch - dh) * 0.5;
      if (alpha < 1) ctx.globalAlpha = alpha;
      ctx.drawImage(bmp, x, y, dw, dh);
      if (alpha < 1) ctx.globalAlpha = 1;
    }

    function paint(frameFloat) {
      if (!ensureSize()) return;

      const maxReady = Math.max(maxReadyRef.current, 0);
      const i = clamp(Math.round(frameFloat), 0, Math.max(maxReady, TOTAL_FRAMES - 1));
      playheadRef.current = i;
      schedulerRef.current?.prefetchAround(i);

      const { w: cw, h: ch } = sizeRef.current;
      ctx.fillStyle = "#070c09";
      ctx.fillRect(0, 0, cw, ch);

      const blendStart = DOOR_COUNT - BLEND;
      const blendEnd = DOOR_COUNT + BLEND;

      if (i < blendStart || i >= blendEnd) {
        const hit = nearestBitmap(clamp(i, 0, TOTAL_FRAMES - 1));
        if (hit) coverDraw(hit.bmp, 1);
      } else {
        const doorIdx = clamp(Math.min(i, DOOR_COUNT - 1), 0, DOOR_COUNT - 1);
        const cloudIdx = clamp(DOOR_COUNT + (i - blendStart), DOOR_COUNT, TOTAL_FRAMES - 1);
        const t = easeInOutCubic(clamp((i - blendStart) / (blendEnd - blendStart), 0, 1));

        const doorHit = nearestBitmap(doorIdx);
        const cloudHit = nearestBitmap(cloudIdx);
        if (doorHit) coverDraw(doorHit.bmp, 1);
        if (cloudHit) coverDraw(cloudHit.bmp, t);

        const flash = Math.sin(Math.PI * t) * 0.22;
        if (flash > 0.03) {
          ctx.globalAlpha = flash;
          ctx.fillStyle = "#fff";
          ctx.fillRect(0, 0, cw, ch);
          ctx.globalAlpha = 1;
        }
      }

      lastPaintedRef.current = i;
    }

    function applyCopy(travel) {
      const wrap = copyWrapRef.current;
      const inner = copyInnerRef.current;
      if (!wrap || !inner) return;

      const t = clamp(travel, 0, 1);
      const eased = easeOutCubic(t);
      const settle = easeInOutCubic(t);

      const scale = 0.22 + settle * 0.86;
      const z = -720 + eased * 720;
      const y = 36 - settle * 36;
      const opacity = clamp((t - 0.04) / 0.38, 0, 1);
      const blur = (1 - eased) * 8;

      wrap.style.opacity = String(opacity);
      wrap.style.visibility = opacity < 0.02 ? "hidden" : "visible";
      wrap.style.pointerEvents = opacity > 0.35 ? "auto" : "none";
      inner.style.transform = `translate3d(0, ${y}px, ${z}px) scale(${scale})`;
      inner.style.transformOrigin = "center center";
      inner.style.filter = blur > 0.2 ? `blur(${blur}px)` : "none";
    }

    function copyTravelFromFrame(frame) {
      return clamp((frame - COPY_START) / (COPY_FULL - COPY_START), 0, 1);
    }

    function readTarget() {
      const rect = section.getBoundingClientRect();
      const scrollable = Math.max(section.offsetHeight - window.innerHeight, 0);
      const scrolled = clamp(-rect.top, 0, scrollable);
      const progress = scrollable > 0 ? scrolled / scrollable : 0;
      // Scrub the full timeline; missing frames fall back to nearest ready bitmap
      return progress * (TOTAL_FRAMES - 1);
    }

    function tick(now) {
      rafRef.current = requestAnimationFrame(tick);
      if (!inViewRef.current) {
        lastTimeRef.current = 0;
        return;
      }

      const last = lastTimeRef.current || now;
      const dt = clamp((now - last) / (1000 / 120), 0.4, 2.4);
      lastTimeRef.current = now;

      const target = readTarget();
      targetRef.current = target;

      const factor = 1 - Math.pow(1 - FOLLOW, dt);
      const copyFactor = 1 - Math.pow(1 - 0.28, dt);

      let next = currentRef.current + (target - currentRef.current) * factor;
      if (Math.abs(target - next) < IDLE_EPSILON) next = target;

      const copyTarget = copyTravelFromFrame(next);
      copyTargetRef.current = copyTarget;
      let nextCopy = copyCurrentRef.current + (copyTarget - copyCurrentRef.current) * copyFactor;
      if (Math.abs(copyTarget - nextCopy) < IDLE_EPSILON) nextCopy = copyTarget;

      const prev = currentRef.current;
      const prevCopy = copyCurrentRef.current;
      currentRef.current = next;
      copyCurrentRef.current = nextCopy;

      const prevFrame = Math.round(prev);
      const nextFrame = Math.round(next);
      if (
        nextFrame !== lastPaintedRef.current ||
        nextFrame !== prevFrame ||
        Math.abs(target - next) > IDLE_EPSILON
      ) {
        paint(next);
      }
      if (Math.abs(nextCopy - prevCopy) > 0.001 || Math.abs(copyTarget - nextCopy) > IDLE_EPSILON) {
        applyCopy(nextCopy);
      }
    }

    currentRef.current = readTarget();
    targetRef.current = currentRef.current;
    copyCurrentRef.current = copyTravelFromFrame(currentRef.current);
    copyTargetRef.current = copyCurrentRef.current;
    paint(currentRef.current);
    applyCopy(copyCurrentRef.current);

    const io = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
        if (entry.isIntersecting) lastTimeRef.current = 0;
      },
      { threshold: 0 },
    );
    io.observe(section);

    rafRef.current = requestAnimationFrame(tick);

    function onResize() {
      ensureSize();
      paint(currentRef.current);
      applyCopy(copyCurrentRef.current);
    }
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      io.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [ready]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#070c09]"
      style={{ height: "1200vh" }}
      aria-label="Scroll to play intro sequence"
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden contain-strict">
        <canvas
          ref={canvasRef}
          className="block h-full w-full"
          style={{
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
            imageRendering: "auto",
          }}
          aria-hidden={!ready}
        />

        {/* Copy flies out of the doorway light toward the viewer */}
        <div
          ref={copyWrapRef}
          className="absolute inset-0 z-10 flex items-center justify-center px-6"
          style={{
            opacity: 0,
            visibility: "hidden",
            pointerEvents: "none",
            perspective: "1200px",
            perspectiveOrigin: "50% 42%",
          }}
        >
                    <div
            ref={copyInnerRef}
            className="relative mx-auto flex w-full max-w-xl flex-col items-center text-center will-change-transform sm:max-w-2xl"
            style={{
              transformStyle: "preserve-3d",
              transform: "translate3d(0, 36px, -720px) scale(0.22)",
              transformOrigin: "center center",
            }}
          >
            <div
              className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[130%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(12,10,8,0.32) 0%, rgba(12,10,8,0.14) 42%, rgba(12,10,8,0) 72%)",
              }}
              aria-hidden
            />

            

            <h1
              className="mt-4 w-full text-[36px] leading-[1.12] font-medium sm:mt-5 sm:text-[52px] md:text-[62px]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: "#FDFBF7",
                textShadow:
                  "0 2px 4px rgba(0,0,0,0.45), 0 8px 28px rgba(0,0,0,0.35), 0 0 40px rgba(0,0,0,0.2)",
              }}
            >
              <span className="block">Clarity for the mind.</span>
              <span className="mt-1 block">
                Purpose for the{" "}
                <span
                  className="italic font-medium"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    color: "#E4B85C",
                    textShadow:
                      "0 2px 4px rgba(0,0,0,0.4), 0 0 28px rgba(228,184,92,0.45)",
                  }}
                >
                  path ahead
                </span>
                .
              </span>
            </h1>

            <p
              className="mt-3 max-w-lg text-[16.5px] leading-[1.6] sm:mt-3.5 sm:text-[18.5px] font-normal"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: "#F3EDE3",
                textShadow: "0 1px 3px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.35)",
              }}
            >
              One-to-one sessions with Dr. Sachin Bansal — thoughtful guidance for
              decision-making, energetic balance, and lasting personal growth.
            </p>

            <div className="mt-6 flex w-full flex-wrap items-center justify-center gap-x-3 gap-y-3 sm:mt-7">
              <button
                type="button"
                onClick={() => openBooking()}
                className="inline-flex items-center justify-center rounded-full bg-[#E4B85C] px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#1A1408] transition-colors hover:bg-[#F0D08A]"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Book a Session
              </button>
              <a
                href="#programs"
                className="inline-flex items-center justify-center rounded-full border border-[#F7F1E4]/70 bg-transparent px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#F7F1E4] transition-colors hover:border-[#E8C878] hover:text-[#E8C878]"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                View Programs
              </a>
            </div>
          </div>
        </div>

        {!ready && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#070c09]">
            <img
              src={doorSrc(0)}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-35"
            />
            <div className="relative z-10 flex flex-col items-center gap-3 px-6">
              <div className="h-[2px] w-44 overflow-hidden rounded-full bg-white/15">
                <div
                  className="h-full rounded-full bg-[#C4A15A] transition-[width] duration-200"
                  style={{ width: `${Math.round(loadProgress * 100)}%` }}
                />
              </div>
              <p
                className="text-[11px] tracking-[0.22em] text-[#C4A15A]/90 uppercase font-semibold"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Preparing cinematic sequence
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
