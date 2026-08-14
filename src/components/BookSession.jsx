import { useState } from "react";
import stillLifeImg from "../assets/booking/still-life.jpg";
import leavesImg from "../assets/faq/leaves.jpg";

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

const features = [
  {
    icon: "calendar",
    title: "Personalized Guidance",
    text: "Every session is tailored to your unique needs and intentions.",
  },
  {
    icon: "shield",
    title: "Safe & Confidential",
    text: "A completely private and supportive space for you.",
  },
  {
    icon: "sparkle",
    title: "Meaningful Transformation",
    text: "Practical tools and insights for lasting clarity and growth.",
  },
];

const trustItems = [
  { icon: "chat", title: "Quick Response", text: "We reply within 24 hours." },
  { icon: "lock", title: "Private & Secure", text: "Your details stay confidential." },
  { icon: "refresh", title: "Flexible Scheduling", text: "Choose a time that works for you." },
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

function Icon({ type, className = "h-5 w-5" }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" };
  if (type === "calendar") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className={className} {...p}>
        <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
        <path d="M8 3.5v3M16 3.5v3M3.5 10h17" />
      </svg>
    );
  }
  if (type === "calendarPlus") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className={className} {...p}>
        <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
        <path d="M8 3.5v3M16 3.5v3M3.5 10h17M12 13v5M9.5 15.5h5" />
      </svg>
    );
  }
  if (type === "shield") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className={className} {...p}>
        <path d="M12 3.5 19 6.5v6c0 4.4-3 6.8-7 8.5-4-1.7-7-4.1-7-8.5v-6L12 3.5Z" />
        <path d="M9 12.2 11 14.2 15.2 10" />
      </svg>
    );
  }
  if (type === "sparkle") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
        <path d="M12 0c.6 5.4 2.4 8.6 12 12-9.6 3.4-11.4 6.6-12 12-.6-5.4-2.4-8.6-12-12C9.6 8.6 11.4 5.4 12 0Z" />
      </svg>
    );
  }
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
  if (type === "chat") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className={className} {...p}>
        <path d="M5 17.5 4 21l3.6-1.2A8.8 8.8 0 1 0 5 17.5Z" />
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
  if (type === "refresh") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className={className} {...p}>
        <path d="M20 12a8 8 0 1 1-2.2-5.6" />
        <path d="M20 4v6h-6" />
      </svg>
    );
  }
  return null;
}

function Field({ label, icon, children }) {
  return (
    <label className="block">
      <span
        className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#3A342C]"
        style={{ fontFamily: "'Lato', sans-serif" }}
      >
        {label}
      </span>
      <span className="relative block">
        {children}
        {icon && (
          <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[#B08A3A]">
            <Icon type={icon} className="h-4 w-4" />
          </span>
        )}
      </span>
    </label>
  );
}

const inputClass =
  "w-full rounded-lg border border-[#E2D6C2] bg-[#FFFcf8] px-3.5 py-2 pr-10 text-[14px] text-[#2C261E] outline-none transition-colors placeholder:text-[#A39888] focus:border-[#C4A15A] focus:ring-2 focus:ring-[#C4A15A]/20";

export default function BookSession() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    sessionType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function update(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <div id="contact" className="h-0 scroll-mt-28" />
      <section
        id="book"
        className="relative overflow-hidden border-b border-[#D9C79E]/30 py-8 sm:py-10"
        style={{ backgroundColor: "#F9F8F4" }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,252,246,0.9)_0%,_transparent_70%)]" />

        <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-start gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
          {/* Left column */}
          <div className="relative lg:col-span-5 lg:pt-2">
            <div className="mb-2 flex items-center justify-center gap-3 w-full">
              <span className="h-px w-10 bg-[#C4A15A]/70 sm:w-14" />
              <span
                className="text-[11px] font-medium uppercase tracking-[0.34em] text-[#B08A3A] sm:text-[12px]"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                Book Your Session
              </span>
              <span className="h-px w-10 bg-[#C4A15A]/70 sm:w-14" />
            </div>
            <h2
              className="mb-3 text-[34px] leading-[1.12] font-normal sm:text-[42px] md:text-[46px]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              <span className="engrave-green">Your Journey to </span>
              <span className="engrave-gold italic">Clarity</span>
              <br />
              <span className="engrave-green">Begins Here</span>
            </h2>
            <p
              className="mb-9 max-w-md text-[14.5px] leading-relaxed font-light text-[#5C5348] sm:text-[15.5px]"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Share a few details and I’ll create a space for healing, clarity and inner alignment — at a time that works for you.
            </p>

            <ul className="space-y-3.5">
              {features.map((item) => (
                <li key={item.title} className="flex gap-3.5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F3EAD8] text-[#C4A15A]">
                    <Icon type={item.icon} className={item.icon === "sparkle" ? "h-4 w-4" : "h-5 w-5"} />
                  </span>
                  <span>
                    <span
                      className="engrave-green block text-[16px] font-semibold"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {item.title}
                    </span>
                    <span
                      className="mt-0.5 block text-[13px] leading-relaxed text-[#5C5348]"
                      style={{ fontFamily: "'Lora', serif" }}
                    >
                      {item.text}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right column — form card */}
          <div className="lg:col-span-7">
            <div className="rounded-[22px] bg-white p-4 sm:p-6 md:p-6 shadow-[0_18px_50px_-24px_rgba(90,68,28,0.28)] ring-1 ring-[#E8DCC8]/80">
              <div className="mb-4 flex items-start gap-3.5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E8F0EA] text-[#1A3A28]">
                  <Icon type="calendarPlus" className="h-5 w-5" />
                </span>
                <div>
                  <h3
                    className="engrave-green text-[24px] leading-tight font-medium sm:text-[26px]"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    Book a Session
                  </h3>
                  <p
                    className="mt-1 text-[13.5px] text-[#6B6358]"
                    style={{ fontFamily: "'Lora', serif" }}
                  >
                    Fill in the details below and I’ll get back to you soon.
                  </p>
                </div>
              </div>

              {submitted ? (
                <div className="rounded-xl bg-[#F7F1E7] px-5 py-10 text-center">
                  <LotusIcon className="mx-auto mb-3 h-8 w-8 text-[#C4A15A]" />
                  <p
                    className="engrave-green text-[22px]"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    Your request has been received.
                  </p>
                  <p
                    className="mt-2 text-[14px] text-[#5C5348]"
                    style={{ fontFamily: "'Lora', serif" }}
                  >
                    I’ll review your details and reach out shortly to confirm your session.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
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
                    <Field label="Preferred Date" icon="calendar">
                      <input
                        required
                        type="date"
                        value={form.date}
                        onChange={(e) => update("date", e.target.value)}
                        className={inputClass}
                        style={{ fontFamily: "'Lora', serif" }}
                      />
                    </Field>
                    <Field label="Preferred Time" icon="clock">
                      <select
                        required
                        value={form.time}
                        onChange={(e) => update("time", e.target.value)}
                        className={`${inputClass} appearance-none bg-[#FFFcf8]`}
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
                        className={`${inputClass} appearance-none bg-[#FFFcf8]`}
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
                      rows={3}
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      placeholder="Share what you're seeking..."
                      className={`${inputClass} resize-y pt-3.5`}
                      style={{ fontFamily: "'Lora', serif" }}
                    />
                  </Field>

                  <div className="flex flex-col items-start gap-3 rounded-xl bg-[#F7F1E7] px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#C4A15A]">
                        <Icon type="leaf" className="h-4 w-4" />
                      </span>
                      <p
                        className="text-[13px] leading-snug text-[#3A342C] sm:text-[13.5px]"
                        style={{ fontFamily: "'Lora', serif" }}
                      >
                        Not sure yet? Book a free 15-minute clarity call to find the right path.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => update("sessionType", "Clarity Call (15 min)")}
                      className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#C4A15A]/70 bg-[#123A1A] hover:bg-[#0d2a13] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#C4A15A] transition-all hover:scale-[1.03]"
                      style={{ fontFamily: "'Lato', sans-serif" }}
                    >
                      <Icon type="phone" className="h-3.5 w-3.5 text-[#C4A15A]" />
                      Book a Clarity Call
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2.5 rounded-lg bg-[#123A1A] px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#C4A15A] shadow-[0_10px_24px_-12px_rgba(18,58,26,0.55)] border border-[#C4A15A]/35 transition-all duration-300 hover:bg-[#0d2a13] hover:scale-[1.01]"
                    style={{ fontFamily: "'Lato', sans-serif" }}
                  >
                    <Icon type="calendar" className="h-4 w-4 text-[#C4A15A]" />
                    Book My Session
                  </button>

                  <div className="grid grid-cols-1 gap-3 border-t border-[#E8DCC8] pt-4 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-[#E8DCC8]">
                    {trustItems.map((item) => (
                      <div key={item.title} className="flex flex-col items-center px-2 text-center">
                        <span className="mb-1.5 text-[#C4A15A]">
                          <Icon type={item.icon} className="h-4 w-4" />
                        </span>
                        <span
                          className="engrave-green text-[12.5px] font-semibold"
                          style={{ fontFamily: "'Lato', sans-serif" }}
                        >
                          {item.title}
                        </span>
                        <span
                          className="mt-0.5 text-[11px] text-[#6B6358]"
                          style={{ fontFamily: "'Lora', serif" }}
                        >
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
