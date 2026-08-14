import crystalsImg from "../assets/workshops/crystals.jpg";
import meditationImg from "../assets/workshops/meditation.jpg";
import numerologyImg from "../assets/workshops/numerology.jpg";

const events = [
  {
    image: crystalsImg,
    alt: "Amethyst crystals and a lit candle",
    badge: "Workshop",
    day: "18",
    month: "May",
    year: "2025",
    title: "Crystal Healing Workshop",
    description: "Harness the vibrational energy of crystals to cleanse your aura and restore inner balance.",
    time: "10:00 AM – 1:00 PM",
    location: "New Delhi",
  },
  {
    image: meditationImg,
    alt: "Woman meditating by a lake at sunrise",
    badge: "Retreat",
    day: "24",
    month: "May",
    year: "2025",
    title: "Meditation & Inner Peace Retreat",
    description: "A two-day immersive retreat to deepen your practice, still the mind and awaken within.",
    time: "24 – 25 May, 2025",
    location: "Rishikesh",
  },
  {
    image: numerologyImg,
    alt: "Vintage calendar, pen and candle",
    badge: "Workshop",
    day: "01",
    month: "Jun",
    year: "2025",
    title: "Astro Numerology Workshop",
    description: "Decode the hidden language of numbers and align with your soul's true path.",
    time: "11:00 AM – 2:00 PM",
    location: "Online (Zoom)",
  },
];

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

function Sparkle({ className = "h-3 w-3" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M12 0c.6 5.4 2.4 8.6 12 12-9.6 3.4-11.4 6.6-12 12-.6-5.4-2.4-8.6-12-12C9.6 8.6 11.4 5.4 12 0Z" />
    </svg>
  );
}

function BotanicalLeaf({ className = "" }) {
  return (
    <svg viewBox="0 0 280 360" aria-hidden className={className} fill="none">
      <g stroke="#C9B48A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M42 28c28 48 38 108 34 178" />
        <path d="M58 62c22-18 48-22 72-14-18 22-42 34-72 28Z" fill="#D8C6A0" fillOpacity="0.35" />
        <path d="M64 108c26-14 54-12 78 2-20 24-48 32-78 22Z" fill="#D8C6A0" fillOpacity="0.28" />
        <path d="M70 154c24-12 52-8 74 10-22 22-50 28-74 16Z" fill="#D8C6A0" fillOpacity="0.32" />
        <path d="M72 202c22-10 48-4 68 14-20 20-46 24-68 12Z" fill="#D8C6A0" fillOpacity="0.26" />
        <path d="M48 86c-20-10-40-8-58 6 16 18 36 24 58 14Z" fill="#D8C6A0" fillOpacity="0.22" />
        <path d="M52 138c-18-8-38-4-54 12 14 16 34 20 54 10Z" fill="#D8C6A0" fillOpacity="0.2" />
        <path d="M76 246c18-8 40 0 56 16-16 16-38 18-56 8Z" fill="#D8C6A0" fillOpacity="0.22" />
      </g>
    </svg>
  );
}

function ClockIcon({ className = "h-3.5 w-3.5" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}

function PinIcon({ className = "h-3.5 w-3.5" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s6.5-5.4 6.5-11A6.5 6.5 0 0 0 5.5 10c0 5.6 6.5 11 6.5 11Z" />
      <circle cx="12" cy="10" r="2.2" />
    </svg>
  );
}

function EventCard({ event }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[16px] bg-white shadow-[0_10px_28px_-12px_rgba(90,68,28,0.16)] ring-1 ring-[#E8DCC8]/80 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_22px_44px_-16px_rgba(90,68,28,0.26)]">
      <div className="relative overflow-hidden">
        <img
          src={event.image}
          alt={event.alt}
          className="h-40 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05] sm:h-44"
        />
        <span
          className="absolute left-3 top-3 rounded-full bg-[#1A3A28] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#F7F1E4]"
          style={{ fontFamily: "'Lato', sans-serif" }}
        >
          {event.badge}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-4">
        <div className="mb-3 flex gap-3">
          <div className="flex w-[52px] shrink-0 flex-col items-center text-center">
            <span
              className="engrave-green text-[26px] leading-none font-semibold"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {event.day}
            </span>
            <span
              className="mt-1 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#1A3A28]"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              {event.month}
            </span>
            <span
              className="mt-0.5 text-[9.5px] text-[#7A7266]"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              {event.year}
            </span>
          </div>

          <span className="w-px self-stretch bg-[#E0D2B8]" />

          <div className="min-w-0 flex-1">
            <h3
              className="engrave-green mb-1.5 text-[17px] leading-snug font-semibold sm:text-[18px]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {event.title}
            </h3>
            <p
              className="text-[12px] leading-relaxed font-light text-[#5C5348]"
              style={{ fontFamily: "'Lora', serif" }}
            >
              {event.description}
            </p>
          </div>
        </div>

        <div
          className="mb-3 mt-auto flex flex-wrap items-center gap-x-3.5 gap-y-1.5 text-[10.5px] text-[#5C5348]"
          style={{ fontFamily: "'Lato', sans-serif" }}
        >
          <span className="inline-flex items-center gap-1.5">
            <ClockIcon className="h-3.5 w-3.5 text-[#B08A3A]" />
            {event.time}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <PinIcon className="h-3.5 w-3.5 text-[#B08A3A]" />
            {event.location}
          </span>
        </div>

        <a
          href="#event"
          className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#123A1A] hover:bg-[#0d2a13] px-3.5 py-2 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#C4A15A] border border-[#C4A15A]/40 transition-all duration-300"
          style={{ fontFamily: "'Lato', sans-serif" }}
        >
          Learn More
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-[#C4A15A]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>
    </article>
  );
}

export default function WorkshopsRetreats() {
  return (
    <section
      id="events"
      className="relative overflow-hidden border-b border-[#D9C79E]/30 py-6 sm:py-8"
      style={{ backgroundColor: "#FDFBF7" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,252,246,0.9)_0%,_transparent_70%)]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8">
        <header className="mb-5 flex flex-col items-center text-center md:mb-7">
          
          <div className="mb-2 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#C4A15A]/70 sm:w-14" />
            <span
              className="text-[11px] font-medium uppercase tracking-[0.34em] text-[#B08A3A] sm:text-[12px]"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              Upcoming Events
            </span>
            <span className="h-px w-10 bg-[#C4A15A]/70 sm:w-14" />
          </div>

          <h2
            className="engrave-green mb-1.5 text-[34px] leading-[1.12] font-normal sm:text-[44px] md:text-[52px]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Workshops &amp; Retreats
          </h2>

          <Sparkle className="mb-2 h-3 w-3 text-[#C4A15A]" />

          <p
            className="max-w-xl text-[14.5px] leading-relaxed font-light text-[#5C5348] sm:text-[16px]"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Join transformative experiences designed to help you heal, grow and connect with your inner self.
          </p>
        </header>

        <div className="mb-6 grid grid-cols-1 gap-6 sm:mb-8 md:grid-cols-2 md:gap-7 lg:grid-cols-3">
          {events.map((event, index) => (
            <div
              key={event.title}
              className={index === 2 ? "md:col-span-2 md:mx-auto md:max-w-[calc(50%-0.875rem)] lg:col-span-1 lg:max-w-none" : ""}
            >
              <EventCard event={event} />
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-center gap-5 text-center md:flex-row md:gap-8">
          <div className="flex max-w-md items-center gap-3 text-left sm:gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#C4A15A]">
              <LotusIcon className="h-5 w-5 text-[#C4A15A]" />
            </span>
            <p
              className="text-[14px] leading-snug text-[#2C261E] sm:text-[15px]"
              style={{ fontFamily: "'Lora', serif" }}
            >
              More events coming soon.
              <br className="hidden sm:block" /> Stay connected for updates!
            </p>
          </div>

          <span className="hidden h-10 w-px bg-[#C4A15A]/70 md:block" />

          <a
            href="#all-events"
            className="inline-flex items-center gap-2 rounded-full border border-[#C4A15A]/70 bg-[#123A1A] hover:bg-[#0d2a13] px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C4A15A] transition-all duration-300 hover:scale-[1.03] sm:px-7 sm:text-[12px]"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            View All Events
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-[#C4A15A]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
