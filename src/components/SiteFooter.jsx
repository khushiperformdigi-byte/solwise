import { useState } from "react";
import { Link } from "react-router-dom";
import leavesImg from "../assets/faq/leaves.jpg";
import stillLifeImg from "../assets/footer/still-life.jpg";
import { useBookingModal } from "../context/BookingModalContext";

const exploreLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#programs" },
  { label: "Workshops & Retreats", href: "/#events" },
  { label: "Meditation", href: "/#programs" },
  { label: "Wisdom & Teachings", href: "/blog" },
  { label: "Blog", href: "/blog" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "#book" },
];

const serviceLinks = [
  { label: "1:1 Coaching", href: "/#programs" },
  { label: "Meditation Programs", href: "/#programs" },
  { label: "Healing Sessions", href: "/#programs" },
  { label: "Wellness Programs", href: "/#programs" },
  { label: "Corporate Wellness", href: "/#programs" },
  { label: "Online Courses", href: "/#events" },
];

const resourceLinks = [
  { label: "Blog", href: "/blog" },
  { label: "Gallery", href: "/gallery" },
  { label: "Guided Meditations", href: "/#programs" },
  { label: "Free Resources", href: "/blog" },
  { label: "FAQs", href: "/#faq" },
  { label: "Community", href: "/#transformations" },
  { label: "Events", href: "/#events" },
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

function Diamond({ className = "h-1.5 w-1.5" }) {
  return (
    <svg viewBox="0 0 8 8" aria-hidden className={`shrink-0 ${className}`} fill="currentColor">
      <path d="M4 0l4 4-4 4-4-4z" />
    </svg>
  );
}

function ColumnTitle({ children }) {
  return (
    <div className="mb-5">
      <h3
        className="engrave-gold-dark text-[12px] font-semibold uppercase tracking-[0.28em]"
        style={{ fontFamily: "'Lato', sans-serif" }}
      >
        {children}
      </h3>
      <div className="mt-2 flex max-w-[88px] items-center gap-1.5 text-[#C5A060]">
        <span className="h-px flex-1 bg-[#C5A060]/70" />
        <Diamond className="h-[6px] w-[6px]" />
        <span className="h-px flex-1 bg-[#C5A060]/70" />
      </div>
    </div>
  );
}

function FooterLink({ href, children }) {
  const { openBooking } = useBookingModal();
  const className = "block text-[13.5px] text-[#F4EFE6]/90 transition-colors hover:text-[#C5A060]";
  const style = { fontFamily: "'Lato', sans-serif" };

  if (href === "#book" || href === "/#book" || href === "/#contact") {
    return (
      <button type="button" onClick={() => openBooking()} className={`${className} text-left`} style={style}>
        {children}
      </button>
    );
  }

  if (href.startsWith("/") && !href.includes("#")) {
    return (
      <Link to={href} className={className} style={style}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={className} style={style}>
      {children}
    </a>
  );
}

function SocialIcon({ type, href }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" };
  return (
    <a
      href={href}
      aria-label={type}
      target="_blank"
      rel="noreferrer"
      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/35 text-white/90 transition-all hover:border-[#C5A060] hover:text-[#C5A060]"
    >
      {type === "instagram" && (
        <svg viewBox="0 0 24 24" className="h-4 w-4" {...common}>
          <rect x="4" y="4" width="16" height="16" rx="4" />
          <circle cx="12" cy="12" r="3.4" />
          <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
        </svg>
      )}
      {type === "youtube" && (
        <svg viewBox="0 0 24 24" className="h-4 w-4" {...common}>
          <path d="M4.8 8.2A3 3 0 0 1 7.6 5.8h8.8a3 3 0 0 1 2.8 2.4l.6 3.4-.6 3.4a3 3 0 0 1-2.8 2.4H7.6a3 3 0 0 1-2.8-2.4L4.2 11.6l.6-3.4Z" />
          <path d="M10.5 9.6v4.8L15 12l-4.5-2.4Z" fill="currentColor" stroke="none" />
        </svg>
      )}
      {type === "facebook" && (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
          <path d="M14.5 8.5h2V5.8h-2c-2.2 0-3.6 1.4-3.6 3.7v1.7H9v2.6h1.9V20h2.8v-6.2h2.2l.4-2.6h-2.6V9.7c0-.7.3-1.2 1.2-1.2Z" />
        </svg>
      )}
      {type === "linkedin" && (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
          <path d="M7.2 9.2H4.8V19h2.4V9.2ZM6 4.8A1.4 1.4 0 1 0 6 7.6 1.4 1.4 0 0 0 6 4.8ZM19.2 12.3c0-2.5-1.3-4-3.6-4-1.3 0-2.1.6-2.5 1.3h-.1V9.2H10.8c0 1.1 0 9.8 0 9.8h2.4v-5.5c0-.3 0-.6.1-.8.3-.6.9-1.2 1.9-1.2 1.3 0 1.8.9 1.8 2.3V19h2.4v-6.7Z" />
        </svg>
      )}
    </a>
  );
}

export default function SiteFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const { openBooking } = useBookingModal();

  function handleSubscribe(e) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
  }

  return (
    <footer>
      {/* Pre-footer CTA */}
      <section className="relative overflow-hidden border-t border-[#E8DCC8]/80" style={{ backgroundColor: "#F5F2EB" }}>
        <div className="pointer-events-none absolute left-0 top-0 h-40 w-40 bg-[radial-gradient(circle,_rgba(140,160,110,0.18)_0%,_transparent_70%)] blur-2xl" />

        <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-6 px-5 py-6 sm:px-8 md:grid-cols-[1fr_auto_1.4fr] md:gap-8 md:py-8">
          <div>
            <p
              className="engrave-ink text-[26px] leading-tight sm:text-[30px]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Your journey matters.
            </p>
            <p
              className="engrave-gold mt-1 text-[28px] leading-tight sm:text-[32px]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              We&apos;re here for you.
            </p>
          </div>

          <span className="hidden h-20 w-px bg-[#D9CDB8] md:block" />

          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3.5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[#C5A060] shadow-[0_8px_20px_-10px_rgba(90,68,28,0.25)]">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                  <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
                  <path d="M8 3.5v3M16 3.5v3M3.5 10h17" />
                </svg>
              </span>
              <div>
                <h3
                  className="engrave-ink text-[20px] leading-tight sm:text-[22px]"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Ready to begin?
                </h3>
                <p
                  className="mt-1 text-[13px] text-[#5C5348] sm:text-[14px]"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  Book a personalized session and take the first step.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => openBooking()}
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#C4A15A]/70 bg-[#123A1A] hover:bg-[#0d2a13] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C4A15A] shadow-[0_10px_24px_-12px_rgba(18,58,26,0.55)] transition-all hover:scale-[1.02]"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              Book Your Session
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-[#C4A15A]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Main footer */}
      <section className="relative overflow-hidden bg-[#0d1e1c] text-white">
        <img
          src={stillLifeImg}
          alt=""
          aria-hidden
          className="pointer-events-none absolute -bottom-8 -left-6 w-52 opacity-70 mix-blend-lighten sm:w-64 md:w-72"
        />

        <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 py-14 sm:px-8 md:grid-cols-2 lg:grid-cols-12 lg:gap-0 lg:py-16">
          <div className="lg:col-span-3 lg:pr-8">
            <img
              src="/logo_white.png"
              alt="Dr. Sachin Bansal Logo"
              className="mb-3.5 h-[52px] sm:h-[60px] w-auto object-contain"
            />
            <h2
              className="engrave-gold-dark text-[18px] font-semibold uppercase tracking-[0.18em]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              The Mystic Guru
            </h2>
            <div className="my-3 flex max-w-[120px] items-center gap-1.5 text-[#C5A060]">
              <span className="h-px flex-1 bg-[#C5A060]/70" />
              <Diamond className="h-[6px] w-[6px]" />
              <span className="h-px flex-1 bg-[#C5A060]/70" />
            </div>
            <p
              className="mb-5 max-w-[220px] text-[13px] leading-relaxed text-white/80"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Guiding you to inner clarity, emotional balance and spiritual transformation.
            </p>
            <div className="flex gap-2.5">
              <SocialIcon type="instagram" href="https://instagram.com" />
              <SocialIcon type="youtube" href="https://youtube.com" />
              <SocialIcon type="facebook" href="https://facebook.com" />
              <SocialIcon type="linkedin" href="https://linkedin.com" />
            </div>
          </div>

          <div className="lg:col-span-2 lg:border-l lg:border-[#C5A060]/25 lg:px-7">
            <ColumnTitle>Explore</ColumnTitle>
            <ul className="space-y-2.5">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 lg:border-l lg:border-[#C5A060]/25 lg:px-7">
            <ColumnTitle>Services</ColumnTitle>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 lg:border-l lg:border-[#C5A060]/25 lg:px-7">
            <ColumnTitle>Resources</ColumnTitle>
            <ul className="space-y-2.5">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 lg:border-l lg:border-[#C5A060]/25 lg:pl-7">
            <ColumnTitle>Stay Connected</ColumnTitle>
            <p
              className="mb-4 text-[13px] leading-relaxed text-white/80"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Get wisdom, updates and invitations to our events.
            </p>

            {subscribed ? (
              <p
                className="text-[13.5px] text-[#C5A060]"
                style={{ fontFamily: "'Lora', serif" }}
              >
                Thank you — you&apos;re on the list.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <label className="relative block">
                  <span className="sr-only">Email address</span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full rounded-md border border-white/25 bg-transparent px-3 py-2.5 pr-10 text-[13px] text-white outline-none placeholder:text-white/45 focus:border-[#C5A060]"
                    style={{ fontFamily: "'Lato', sans-serif" }}
                  />
                  <svg viewBox="0 0 24 24" aria-hidden className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-white/50" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
                    <path d="M4 7l8 6 8-6" />
                  </svg>
                </label>
                <button
                  type="submit"
                  className="w-full rounded-md bg-gradient-to-b from-[#d4b36a] to-[#a67b2a] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_8px_18px_-10px_rgba(166,123,42,0.7)] transition-all hover:brightness-110"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  Subscribe
                </button>
              </form>
            )}
            <p
              className="mt-3 text-[11px] leading-relaxed text-white/45"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="relative z-10 border-t border-white/10">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 py-5 text-center sm:px-8 md:flex-row md:justify-between md:text-left">
            <p
              className="text-[12px] text-white/55"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              © 2025 The Mystic Guru. All Rights Reserved.
            </p>

            <div className="flex items-center gap-2 text-[#C5A060]">
              <Diamond className="h-1.5 w-1.5 opacity-70" />
              <Diamond className="h-1.5 w-1.5 opacity-70" />
              <LotusIcon className="h-4 w-4" />
              <Diamond className="h-1.5 w-1.5 opacity-70" />
              <Diamond className="h-1.5 w-1.5 opacity-70" />
            </div>

            <p
              className="text-[12px] text-white/55"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              <a href="#privacy" className="transition-colors hover:text-[#C5A060]">Privacy Policy</a>
              <span className="mx-1.5 text-white/30">|</span>
              <a href="#terms" className="transition-colors hover:text-[#C5A060]">Terms &amp; Conditions</a>
              <span className="mx-1.5 text-white/30">|</span>
              <a href="#refund" className="transition-colors hover:text-[#C5A060]">Refund Policy</a>
            </p>
          </div>
        </div>
      </section>
    </footer>
  );
}
