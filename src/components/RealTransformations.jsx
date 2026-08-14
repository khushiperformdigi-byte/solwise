import priyaImg from "../assets/transformations/priya.jpg";
import rahulImg from "../assets/transformations/rahul.jpg";
import ananyaImg from "../assets/transformations/ananya.jpg";
import candleImg from "../assets/transformations/candle.jpg";

const stories = [
  {
    image: priyaImg,
    alt: "Priya S.",
    quote:
      "I found clarity where there was confusion. His guidance helped me heal deeply and align with my true purpose.",
    name: "Priya S.",
    location: "Bengaluru, India",
  },
  {
    image: rahulImg,
    alt: "Rahul M.",
    quote:
      "The sessions helped me release years of emotional weight. Today I feel lighter, more confident and at peace within myself.",
    name: "Rahul M.",
    location: "Pune, India",
  },
  {
    image: ananyaImg,
    alt: "Ananya K.",
    quote:
      "The meditations and energy work changed my mindset, my health and my relationships. I'm grateful beyond words.",
    name: "Ananya K.",
    location: "Mumbai, India",
  },
];

function Diamond({ className = "h-1.5 w-1.5" }) {
  return (
    <svg viewBox="0 0 8 8" aria-hidden className={`shrink-0 text-[#C4A15A] ${className}`} fill="currentColor">
      <path d="M4 0l4 4-4 4-4-4z" />
    </svg>
  );
}

function LotusIcon({ className = "h-6 w-6" }) {
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

function Star({ className = "h-3.5 w-3.5" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M12 2.2l2.55 5.9 6.4.7-4.78 4.32 1.32 6.3L12 16.7 6.51 19.42l1.32-6.3L3.05 8.8l6.4-.7L12 2.2z" />
    </svg>
  );
}

function LotusWatermark() {
  return (
    <svg viewBox="0 0 220 220" aria-hidden className="h-full w-full" fill="none" stroke="#C4A15A" strokeWidth="1.15" strokeLinejoin="round">
      <path d="M110 28c-6 18-10 32 0 54 10-22 6-36 0-54Z" />
      <path d="M110 40c-18 4-34 16-30 40 10-7 20-14 30-30 10 16 20 23 30 30-4-24-20-36-30-40Z" />
      <path d="M110 52c-24 2-42 18-38 44 12-6 24-14 38-30 14 16 26 24 38 30 4-26-14-42-38-44Z" />
      <path d="M72 88c-14 8-24 22-20 38 14-4 26-10 38-22" />
      <path d="M148 88c14 8 24 22 20 38-14-4-26-10-38-22" />
      <path d="M84 112c-4 12-2 24 10 32 6-10 10-18 16-30" />
      <path d="M136 112c4 12 2 24-10 32-6-10-10-18-16-30" />
      <path d="M110 96c-8 14-12 26 0 42 12-16 8-28 0-42Z" />
      <circle cx="110" cy="108" r="5" fill="#C4A15A" stroke="none" opacity="0.7" />
      <path d="M40 168c22-10 46-16 70-16s48 6 70 16" opacity="0.55" />
      <path d="M52 184c18-8 38-12 58-12s40 4 58 12" opacity="0.4" />
    </svg>
  );
}

function GoldWaves() {
  return (
    <svg viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden className="h-full w-full">
      <path d="M0 72c120-28 240-42 360-36 180 8 240 48 420 42 150-5 240-40 390-38 90 1 180 14 270 34v46H0V72Z" fill="#E8D5B0" fillOpacity="0.28" />
      <path d="M0 88c140-22 280-34 420-28 170 8 250 36 400 30 140-6 230-32 380-28 80 2 160 12 240 26v32H0V88Z" fill="#C4A15A" fillOpacity="0.12" />
      <path d="M0 98c160-16 300-24 440-18 160 6 260 22 400 18 130-4 220-20 360-16 80 2 160 10 240 20v18H0V98Z" fill="none" stroke="#C4A15A" strokeOpacity="0.35" strokeWidth="1.2" />
    </svg>
  );
}

function StoryCard({ story }) {
  return (
    <article className="group flex h-full flex-col rounded-[18px] bg-[#F7F1E7]/90 p-5 shadow-[0_12px_30px_-14px_rgba(90,68,28,0.2)] ring-1 ring-[#E8DCC8]/90 backdrop-blur-[2px] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_22px_44px_-16px_rgba(90,68,28,0.28)] sm:p-6">
      <div className="mb-3.5 flex items-start gap-4">
        <div className="relative h-[60px] w-[60px] shrink-0 sm:h-[66px] sm:w-[66px]">
          <span className="absolute -inset-[3px] rounded-full bg-gradient-to-br from-[#E8C98A] via-[#C4A15A] to-[#A67B2A] opacity-90" />
          <img
            src={story.image}
            alt={story.alt}
            className="relative h-full w-full rounded-full object-cover ring-2 ring-[#FBF6EE]"
          />
        </div>

        <div className="min-w-0 flex-1 pt-0.5">
          <span
            className="block leading-none text-[42px] text-[#C4A15A] sm:text-[46px]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            aria-hidden
          >
            “
          </span>
          <p
            className="-mt-3 text-[14.5px] leading-relaxed font-light text-[#3A342C] sm:text-[15px]"
            style={{ fontFamily: "'Lora', serif" }}
          >
            {story.quote}
          </p>
        </div>
      </div>

      <div className="mt-auto flex flex-col items-center text-center">
        <div className="mb-2 flex w-full max-w-[150px] items-center gap-1.5">
          <span className="h-px flex-1 bg-[#C4A15A]/80" />
          <Diamond className="h-[7px] w-[7px]" />
          <span className="h-px flex-1 bg-[#C4A15A]/80" />
        </div>

        <h3
          className="engrave-gold text-[15px] font-semibold uppercase tracking-[0.16em] sm:text-[16px]"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {story.name}
        </h3>
        <p
          className="mt-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[#3A342C] sm:text-[11px]"
          style={{ fontFamily: "'Lato', sans-serif" }}
        >
          {story.location}
        </p>

        <div className="mt-2 flex items-center justify-center gap-1 text-[#C4A15A]">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5" />
          ))}
        </div>
      </div>
    </article>
  );
}

export default function RealTransformations() {
  return (
    <section
      id="transformations"
      className="relative overflow-hidden border-b border-[#D9C79E]/30 py-6 sm:py-8 bg-cover bg-center"
      style={{ backgroundImage: "url('/ChatGPT Image Aug 14, 2026, 09_34_36 AM.png')" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,252,246,0.78)_0%,_rgba(249,245,240,0.35)_58%,_transparent_100%)]" />

      {/* Soft leaves wash — top left */}
      <div className="pointer-events-none absolute -left-16 -top-10 h-56 w-56 rounded-full bg-[radial-gradient(circle,_rgba(140,160,110,0.18)_0%,_transparent_70%)] blur-2xl sm:h-72 sm:w-72" />
      <div className="pointer-events-none absolute left-0 top-8 h-40 w-32 opacity-20 sm:h-52 sm:w-40">
        <svg viewBox="0 0 160 220" className="h-full w-full" fill="none" aria-hidden>
          <g stroke="#8FA37A" strokeWidth="1.1" opacity="0.6">
            <path d="M30 20c18 30 22 70 18 120" />
            <path d="M40 48c16-12 36-14 52-8-12 16-30 24-52 18Z" fill="#A8B896" fillOpacity="0.2" />
            <path d="M44 88c18-10 40-8 56 6-14 16-34 22-56 14Z" fill="#A8B896" fillOpacity="0.18" />
            <path d="M46 128c16-8 36-4 50 10-12 14-32 18-50 10Z" fill="#A8B896" fillOpacity="0.15" />
          </g>
        </svg>
      </div>



      {/* Soft gold waves — bottom */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 sm:h-24">
        <GoldWaves />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8">
        <header className="mb-4 flex flex-col items-center text-center md:mb-6">
          <img
            src="/logo_white.png"
            alt="The Mystic Guru — Dr. Sachin Bansal"
            className="mb-2 h-[72px] sm:h-[80px] md:h-[90px] w-auto object-contain"
          />

          <div className="mb-2 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#C4A15A]/70 sm:w-14" />
            <span
              className="text-[11px] font-medium uppercase tracking-[0.34em] text-[#B08A3A] sm:text-[12px]"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              Real Transformations
            </span>
            <span className="h-px w-10 bg-[#C4A15A]/70 sm:w-14" />
          </div>

          <h2
            className="mb-1.5 max-w-4xl text-[30px] leading-[1.15] font-normal sm:text-[38px] md:text-[44px]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            <span className="engrave-ink">Real Stories.</span>{" "}
            <span className="engrave-gold">Real Transformations.</span>
          </h2>

          <p
            className="max-w-xl text-[13.5px] leading-relaxed font-light text-[#5C5348] sm:text-[14.5px]"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Lives transformed through guidance, healing and inner awakening.
          </p>
        </header>

        <div className="mb-4 grid grid-cols-1 gap-5 sm:mb-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {stories.map((story, index) => (
            <div
              key={story.name}
              className={index === 2 ? "md:col-span-2 md:mx-auto md:max-w-[calc(50%-0.875rem)] lg:col-span-1 lg:max-w-none" : ""}
            >
              <StoryCard story={story} />
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <a
            href="#stories"
            className="inline-flex items-center gap-2.5 rounded-full bg-[#123A1A] hover:bg-[#0d2a13] text-[#C4A15A] px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] shadow-md border border-[#C4A15A]/70 transition-all duration-300 hover:scale-[1.03] sm:px-8 sm:py-3.5 sm:text-[12px]"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            Read More Stories
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-[#C4A15A]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
