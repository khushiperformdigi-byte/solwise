import { useEffect, useState } from "react";
import { useBookingModal } from "../context/BookingModalContext";
import ThemedDatePicker from "./ThemedDatePicker";
import modalLeftImg from "../assets/booking/modal-left.png";

const sessionTypes = [
  "Life Coaching & Guidance",
  "Crystal Guidance & Energy Healing",
  "Aura Reading & Analysis",
  "Astro Numerology Consultation",
  "Vaastu Consultation & Corrections",
  "Meditations",
  "Aura Reset Self-Healing Workshop",
  "Clarity Call (15 min)",
];

const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",
];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  date: "",
  time: "",
  sessionType: "",
  message: "",
};

function Icon({ type, className = "h-4 w-4" }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" };
  if (type === "user") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className={className} {...p}>
        <circle cx="12" cy="8" r="3.2" />
        <path d="M5.5 19c1.2-3.2 3.4-4.8 6.5-4.8s5.3 1.6 6.5 4.8" />
      </svg>
    );
  }
  if (type === "email") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className={className} {...p}>
        <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
        <path d="M4 7l8 6 8-6" />
      </svg>
    );
  }
  if (type === "phone") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className={className} {...p}>
        <path d="M7.2 3.8h2.8l1.2 3-1.8 1.2a12 12 0 0 0 6.4 6.4l1.2-1.8 3 1.2v2.8c0 .9-.7 1.7-1.6 1.8C9.2 19.1 4.9 14.8 4 6.4c.1-.9.9-1.6 1.8-1.6Z" />
      </svg>
    );
  }
  if (type === "calendar") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className={className} {...p}>
        <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
        <path d="M8 3.5v3M16 3.5v3M3.5 10h17" />
      </svg>
    );
  }
  if (type === "clock") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className={className} {...p}>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4.2l2.8 1.6" />
      </svg>
    );
  }
  if (type === "chevron") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className={className} {...p}>
        <path d="M6 9l6 6 6-6" />
      </svg>
    );
  }
  if (type === "pencil") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className={className} {...p}>
        <path d="M4 20h4l11.2-11.2a2.1 2.1 0 0 0-3-3L5 17v3Z" />
        <path d="M13.5 6.5l3 3" />
      </svg>
    );
  }
  if (type === "leaf") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className={className} {...p}>
        <path d="M5 19c8-1 12-6 14-14-8 2-13 6-14 14Z" />
        <path d="M8 16c2.5-2 5.5-3.5 9-4" />
      </svg>
    );
  }
  if (type === "lock") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className={className} {...p}>
        <rect x="5" y="11" width="14" height="10" rx="2" />
        <path d="M8 11V8a4 4 0 0 1 8 0v3" />
      </svg>
    );
  }
  return null;
}

function LotusIcon({ className = "h-10 w-10" }) {
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

function Field({ label, icon, children }) {
  return (
    <label className="block">
      <span
        className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.12em] text-[#3A342C]"
        style={{ fontFamily: "'Lato', sans-serif" }}
      >
        {label}
      </span>
      <span className="relative block">
        {children}
        {icon && (
          <span className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-[#B08A3A]">
            <Icon type={icon} className="h-3.5 w-3.5" />
          </span>
        )}
      </span>
    </label>
  );
}

const inputClass =
  "w-full rounded-md border border-[#E2D6C2] bg-[#FFFcf8] px-3 py-2 pr-9 text-[13px] text-[#2C261E] outline-none transition-colors placeholder:text-[#A39888] focus:border-[#C4A15A] focus:ring-2 focus:ring-[#C4A15A]/20";

function ThankYouView({ onClose }) {
  return (
    <div className="flex min-h-[360px] flex-col items-center justify-center px-6 py-8 text-center sm:px-10">
      <span className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#E8F0EA] text-[#C4A15A]">
        <LotusIcon className="h-8 w-8" />
      </span>
      <h2
        className="engrave-green mb-2 text-[28px] leading-tight font-semibold sm:text-[32px]"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        Thank You
      </h2>
      <div className="mb-3 flex w-full max-w-[140px] items-center gap-2 text-[#C4A15A]">
        <span className="h-px flex-1 bg-[#C4A15A]/80" />
        <svg viewBox="0 0 8 8" className="h-1.5 w-1.5" fill="currentColor" aria-hidden>
          <path d="M4 0l4 4-4 4-4-4z" />
        </svg>
        <span className="h-px flex-1 bg-[#C4A15A]/80" />
      </div>
      <p
        className="mb-1.5 max-w-md text-[15px] leading-relaxed text-[#1A3A28]"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        Your session request has been received.
      </p>
      <p
        className="mb-6 max-w-sm text-[13px] leading-relaxed text-[#5C5348]"
        style={{ fontFamily: "'Lora', serif" }}
      >
        I’ll review your details and get back to you soon to confirm your booking. Until then, take a gentle breath — your journey has already begun.
      </p>
      <button
        type="button"
        onClick={onClose}
        className="inline-flex items-center gap-2 rounded-full bg-[#1A3A28] px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#F7F1E4] transition-all hover:bg-[#123A1A]"
        style={{ fontFamily: "'Lato', sans-serif" }}
      >
        Close
      </button>
    </div>
  );
}

export default function BookingModal() {
  const { open, closeBooking } = useBookingModal();
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(e) {
      if (e.key === "Escape") closeBooking();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, closeBooking]);

  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => {
        setSubmitted(false);
        setForm(initialForm);
      }, 250);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [open]);

  if (!open) return null;

  function update(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  function handleClose() {
    closeBooking();
    if (window.location.hash === "#book" || window.location.hash === "#contact") {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/55 p-2 backdrop-blur-[3px] sm:p-4"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="Book a Session"
    >
      <div
        className="relative flex max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-[18px] bg-white shadow-[0_30px_80px_-28px_rgba(20,30,20,0.55)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close booking form"
          className="absolute top-2.5 right-2.5 z-30 flex h-8 w-8 items-center justify-center rounded-full border border-[#E2D6C2] bg-white/95 text-[#5C5348] transition-colors hover:border-[#C4A15A] hover:text-[#1A3A28]"
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>

        {submitted ? (
          <div className="w-full overflow-y-auto bg-[#FBF7F0]">
            <ThankYouView onClose={handleClose} />
          </div>
        ) : (
          <div className="flex w-full max-h-[92vh] flex-col overflow-y-auto lg:flex-row lg:items-stretch lg:overflow-hidden">
            <aside className="relative hidden shrink-0 items-center justify-center bg-[#F3EDE3] lg:flex">
              <img
                src={modalLeftImg}
                alt="Book a Session — Personalized Guidance, Private & Confidential, Meaningful Transformation"
                className="block h-auto max-h-[92vh] w-auto max-w-[260px]"
              />
            </aside>

            <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-[#FFFcf8] px-4 pt-5 pb-4 sm:px-6 sm:pt-6 sm:pb-5 lg:overflow-y-auto">
              <header className="mb-4 pr-8 sm:mb-5">
                <div className="mb-1.5 flex items-center gap-2 text-[#C4A15A] lg:hidden">
                  <LotusIcon className="h-6 w-6" />
                </div>
                <h2
                  className="engrave-green text-[26px] leading-tight font-semibold sm:text-[30px]"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Book a Session
                </h2>
                <div className="mt-1.5 mb-2 flex w-16 items-center gap-1.5 text-[#C4A15A]">
                  <span className="h-px flex-1 bg-[#C4A15A]/80" />
                  <svg viewBox="0 0 8 8" className="h-1 w-1" fill="currentColor" aria-hidden>
                    <path d="M4 0l4 4-4 4-4-4z" />
                  </svg>
                  <span className="h-px flex-1 bg-[#C4A15A]/80" />
                </div>
                <p
                  className="text-[13px] leading-snug text-[#5C5348]"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  Fill in the details below and I’ll get back to you soon.
                </p>
              </header>

              <form onSubmit={handleSubmit} className="mt-1 space-y-2.5">
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  <Field label="Full Name" icon="user">
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="Your full name"
                      className={inputClass}
                      style={{ fontFamily: "'Lora', serif" }}
                    />
                  </Field>
                  <Field label="Email Address" icon="email">
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="you@email.com"
                      className={inputClass}
                      style={{ fontFamily: "'Lora', serif" }}
                    />
                  </Field>
                  <Field label="Phone Number" icon="phone">
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="+91 00000 00000"
                      className={inputClass}
                      style={{ fontFamily: "'Lora', serif" }}
                    />
                  </Field>
                  <label className="block">
                    <span
                      className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.12em] text-[#3A342C]"
                      style={{ fontFamily: "'Lato', sans-serif" }}
                    >
                      Preferred Date
                    </span>
                    <ThemedDatePicker
                      required
                      value={form.date}
                      onChange={(value) => update("date", value)}
                      placeholder="Select a date"
                      inputClassName={inputClass}
                    />
                  </label>
                  <Field label="Preferred Time" icon="clock">
                    <select
                      required
                      value={form.time}
                      onChange={(e) => update("time", e.target.value)}
                      className={`${inputClass} appearance-none`}
                      style={{ fontFamily: "'Lora', serif" }}
                    >
                      <option value="">Select a time</option>
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Session Type" icon="chevron">
                    <select
                      required
                      value={form.sessionType}
                      onChange={(e) => update("sessionType", e.target.value)}
                      className={`${inputClass} appearance-none`}
                      style={{ fontFamily: "'Lora', serif" }}
                    >
                      <option value="">Choose a session</option>
                      {sessionTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field label="How can I support you?" icon="pencil">
                  <textarea
                    rows={2}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Share your intention or anything you'd like me to know"
                    className={`${inputClass} resize-none pt-2`}
                    style={{ fontFamily: "'Lora', serif" }}
                  />
                </Field>

                <div className="flex flex-col items-start gap-2 rounded-lg bg-[#F3EDE3] px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-[#C4A15A]">
                      <Icon type="leaf" className="h-3.5 w-3.5" />
                    </span>
                    <p
                      className="text-[12px] leading-snug text-[#3A342C]"
                      style={{ fontFamily: "'Lora', serif" }}
                    >
                      Not sure which session is right for you? Book a free 15-minute clarity call.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => update("sessionType", "Clarity Call (15 min)")}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#1A3A28] bg-transparent px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#1A3A28] transition-all hover:bg-[#1A3A28] hover:text-[#F7F1E4]"
                    style={{ fontFamily: "'Lato', sans-serif" }}
                  >
                    <Icon type="phone" className="h-3 w-3" />
                    Book a Clarity Call
                  </button>
                </div>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#1A3A28] px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#F7F1E4] shadow-[0_8px_20px_-10px_rgba(18,58,26,0.55)] transition-all hover:bg-[#123A1A]"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  <Icon type="calendar" className="h-3.5 w-3.5 text-[#C4A15A]" />
                  Book My Session
                </button>

                
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
