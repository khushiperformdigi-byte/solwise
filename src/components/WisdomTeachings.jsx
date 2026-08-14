import spiritualityImg from "../assets/wisdom/spirituality.jpg";
import meditationImg from "../assets/wisdom/meditation.jpg";
import healingImg from "../assets/wisdom/healing.jpg";

const articles = [
  {
    image: spiritualityImg,
    alt: "Stacked zen stones beside a lit candle",
    badge: "Spirituality",
    title: "The Power of Inner Alignment",
    description:
      "Discover how aligning your thoughts, energy, and actions can transform your reality.",
  },
  {
    image: meditationImg,
    alt: "Person meditating on a rock at sunrise over misty mountains",
    badge: "Meditation",
    title: "Stillness: The Gateway Within",
    description:
      "Learn how stillness and presence open the door to deeper wisdom and inner peace.",
  },
  {
    image: healingImg,
    alt: "Journal with gold mandala, quartz crystal, and pen",
    badge: "Healing",
    title: "Energy Healing: Restoring Balance",
    description:
      "Explore the gentle art of energy healing and how it helps restore your natural balance.",
  },
];

function Diamond({ className = "h-1.5 w-1.5" }) {
  return (
    <svg viewBox="0 0 8 8" aria-hidden className={`shrink-0 text-[#C4A15A] ${className}`} fill="currentColor">
      <path d="M4 0l4 4-4 4-4-4z" />
    </svg>
  );
}

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

function BotanicalLeaf() {
  return (
    <svg viewBox="0 0 280 360" aria-hidden className="h-full w-full" fill="none">
      <g stroke="#C9B48A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M42 28c28 48 38 108 34 178" />
        <path d="M58 62c22-18 48-22 72-14-18 22-42 34-72 28Z" fill="#D8C6A0" fillOpacity="0.35" />
        <path d="M64 108c26-14 54-12 78 2-20 24-48 32-78 22Z" fill="#D8C6A0" fillOpacity="0.28" />
        <path d="M70 154c24-12 52-8 74 10-22 22-50 28-74 16Z" fill="#D8C6A0" fillOpacity="0.32" />
        <path d="M72 202c22-10 48-4 68 14-20 20-46 24-68 12Z" fill="#D8C6A0" fillOpacity="0.26" />
        <path d="M48 86c-20-10-40-8-58 6 16 18 36 24 58 14Z" fill="#D8C6A0" fillOpacity="0.22" />
        <path d="M52 138c-18-8-38-4-54 12 14 16 34 20 54 10Z" fill="#D8C6A0" fillOpacity="0.2" />
        <path d="M56 186c-16-8-34-4-48 10 12 14 30 18 48 8Z" fill="#D8C6A0" fillOpacity="0.18" />
        <path d="M76 246c18-8 40 0 56 16-16 16-38 18-56 8Z" fill="#D8C6A0" fillOpacity="0.22" />
      </g>
    </svg>
  );
}

function BookIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5.2A2.2 2.2 0 0 1 6.2 3H12v18H6.2A2.2 2.2 0 0 1 4 18.8V5.2Z" />
      <path d="M20 5.2A2.2 2.2 0 0 0 17.8 3H12v18h5.8A2.2 2.2 0 0 0 20 18.8V5.2Z" />
      <path d="M12 3v18" />
    </svg>
  );
}

function ArticleCard({ article }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[18px] bg-white shadow-[0_10px_28px_-12px_rgba(90,68,28,0.18)] ring-1 ring-[#E8DCC8]/80 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-18px_rgba(90,68,28,0.28)]">
      <div className="relative overflow-hidden">
        <img
          src={article.image}
          alt={article.alt}
          className="h-48 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06] sm:h-52 md:h-56"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/18 via-transparent to-transparent" />
        <span
          className="absolute bottom-3 left-4 rounded-md bg-[#123A1A] border border-[#C4A15A]/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#C4A15A] shadow-[0_4px_10px_rgba(90,68,28,0.18)]"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          {article.badge}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-6 pb-6 pt-6 text-left">
        <h3
          className="engrave-green mb-3 text-[22px] leading-snug font-semibold sm:text-[23px]"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {article.title}
        </h3>

        <div className="mb-3.5 flex max-w-[92px] items-center gap-1.5">
          <span className="h-px flex-1 bg-[#C4A15A]/80" />
          <Diamond className="h-[7px] w-[7px]" />
          <span className="h-px flex-1 bg-[#C4A15A]/80" />
        </div>

        <p
          className="mb-5 flex-1 text-[17.5px] md:text-[18.5px] leading-relaxed font-normal text-[#4A4235]"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {article.description}
        </p>

        <a
          href="/blog"
          className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B08A3A] transition-colors hover:text-[#8C6621]"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Read More
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>
    </article>
  );
}

export default function WisdomTeachings() {
  return (
    <section
      id="blog"
      className="relative overflow-hidden border-b border-[#D9C79E]/30 py-8 sm:py-10 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('/ChatGPT Image Aug 14, 2026, 09_40_16 AM.png')` }}
    >

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8">
        <header className="mb-6 flex flex-col items-center text-center md:mb-8">
          <div className="mb-2 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#C4A15A]/70 sm:w-14" />
            <span
              className="text-[11px] font-semibold uppercase tracking-[0.34em] text-[#B08A3A] sm:text-[12px]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Wisdom &amp; Teachings
            </span>
            <span className="h-px w-10 bg-[#C4A15A]/70 sm:w-14" />
          </div>

          <h2
            className="mb-4 max-w-3xl text-[34px] leading-[1.12] font-normal sm:text-[44px] md:text-[52px]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            <span className="engrave-green">Timeless Wisdom for</span>
            <br />
            <span className="engrave-gold">Modern Living</span>
          </h2>

          <div className="mb-5 flex w-full max-w-[220px] items-center gap-2 sm:max-w-[260px]">
            <span className="h-px flex-1 bg-[#C4A15A]/80" />
            <Diamond className="h-2 w-2" />
            <span className="h-px flex-1 bg-[#C4A15A]/80" />
          </div>

          <p
            className="max-w-xl text-[17px] leading-relaxed font-normal text-[#5C5348] sm:text-[18.5px]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Insights, reflections, and teachings to inspire clarity, inner peace, and transformation.
          </p>
        </header>

        <div className="mb-6 grid grid-cols-1 gap-6 sm:mb-8 md:grid-cols-2 md:gap-7 lg:grid-cols-3">
          {articles.map((article, index) => (
            <div
              key={article.title}
              className={index === 2 ? "md:col-span-2 md:mx-auto md:max-w-[calc(50%-0.875rem)] lg:col-span-1 lg:max-w-none" : ""}
            >
              <ArticleCard article={article} />
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <a
            href="/blog"
            className="inline-flex items-center gap-2.5 rounded-full border border-[#C4A15A]/70 bg-[#123A1A] hover:bg-[#0d2a13] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C4A15A] shadow-[0_10px_24px_-12px_rgba(18,58,26,0.55)] transition-all duration-300 hover:scale-[1.03] sm:px-8 sm:py-3.5 sm:text-[12px]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            <BookIcon className="h-4 w-4 text-[#C4A15A]" />
            Explore All Articles
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-[#C4A15A]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
