import Navbar from "../components/Navbar";
import SiteFooter from "../components/SiteFooter";
import EventsCalendar from "../components/EventsCalendar";

function Sparkle({ className = "h-3 w-3" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M12 0c.6 5.4 2.4 8.6 12 12-9.6 3.4-11.4 6.6-12 12-.6-5.4-2.4-8.6-12-12C9.6 8.6 11.4 5.4 12 0Z" />
    </svg>
  );
}

export default function EventsPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F7F1E6" }}>
      <Navbar />

      <main id="all-events" className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        <header className="mb-10 text-center">
          <div className="mb-3 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#B88932]/70 sm:w-14" />
            <span
              className="text-[11px] font-medium uppercase tracking-[0.34em] text-[#B88932] sm:text-[12px]"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              Events Calendar
            </span>
            <span className="h-px w-10 bg-[#B88932]/70 sm:w-14" />
          </div>
          <h1
            className="engrave-green mb-2 text-[38px] leading-tight sm:text-[48px] md:text-[56px]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Workshops &amp; Retreats
          </h1>
          <Sparkle className="mx-auto mb-3 h-3 w-3 text-[#B88932]" />
          <p
            className="mx-auto max-w-xl text-[15px] leading-relaxed text-[#5C5348]"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Explore upcoming gatherings, healing circles, and transformative experiences on your spiritual path.
          </p>
        </header>

        <EventsCalendar showSidebar />
      </main>

      <SiteFooter />
    </div>
  );
}
