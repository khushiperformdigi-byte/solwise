import { useState } from "react";
import leavesImg from "../assets/faq/leaves.jpg";
import candleVaseImg from "../assets/faq/candle-vase.jpg";

const faqs = [
  {
    id: "expect",
    icon: "leaf",
    question: "What can I expect from a session?",
    answer:
      "Every session is personalized to your unique needs. You can expect a safe, compassionate space where we explore what's holding you back and align you with clarity, balance and positive direction.",
  },
  {
    id: "offering",
    icon: "person",
    question: "How do I know which offering is right for me?",
    answer:
      "If you're unsure where to begin, a discovery conversation can help. We'll listen to where you are, what you're seeking, and gently guide you toward the program, session or retreat that feels most aligned.",
  },
  {
    id: "format",
    icon: "lotus",
    question: "Are the sessions online or in-person?",
    answer:
      "Both. Online sessions are available worldwide via video, and in-person sessions and retreats are offered at select locations. Choose what feels most comfortable for your journey.",
  },
  {
    id: "duration",
    icon: "clock",
    question: "How long is a typical session?",
    answer:
      "Most one-on-one sessions last 60 to 90 minutes, depending on the offering. Workshops and retreats vary in length and are clearly listed with each event.",
  },
  {
    id: "privacy",
    icon: "heart",
    question: "Is everything I share kept private?",
    answer:
      "Yes. Everything you share is held in complete confidence. This is a sacred, private space built on trust, respect and compassion.",
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

function FaqIcon({ type, className = "h-5 w-5" }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  if (type === "leaf") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className={className} {...common}>
        <path d="M5 19c8-1 12-6 14-14-8 2-13 6-14 14Z" />
        <path d="M8 16c2.5-2 5.5-3.5 9-4" />
      </svg>
    );
  }
  if (type === "person") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className={className} {...common}>
        <circle cx="12" cy="8" r="3.2" />
        <path d="M5.5 19c1.2-3.2 3.4-4.8 6.5-4.8s5.3 1.6 6.5 4.8" />
      </svg>
    );
  }
  if (type === "lotus") {
    return <LotusIcon className={className} />;
  }
  if (type === "clock") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className={className} {...common}>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4.2l2.8 1.6" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} {...common}>
      <path d="M12 20s-6.2-4.4-8.4-8.2C2 9.2 3.2 6 6.4 6c1.8 0 3.2 1 3.6 2.4C10.4 7 11.8 6 13.6 6c3.2 0 4.4 3.2 2.8 5.8C18.2 15.6 12 20 12 20Z" />
    </svg>
  );
}

function ChatIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 17.5 4 21l3.6-1.2A8.8 8.8 0 1 0 5 17.5Z" />
    </svg>
  );
}

function FaqItem({ item, open, onToggle }) {
  return (
    <article className="rounded-[14px] bg-white shadow-[0_8px_24px_-12px_rgba(90,68,28,0.16)] ring-1 ring-[#EDE3D2]/90 transition-shadow duration-300 hover:shadow-[0_14px_30px_-14px_rgba(90,68,28,0.22)]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-start gap-4 px-4 py-4 text-left sm:gap-5 sm:px-5 sm:py-5"
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F4EDE1] text-[#1A3A28] sm:h-12 sm:w-12">
          <FaqIcon type={item.icon} className="h-5 w-5" />
        </span>

        <span className={`mt-1 w-px self-stretch ${open ? "bg-[#C4A15A]" : "bg-[#E5D9C4]"}`} />

        <span className="min-w-0 flex-1 pt-1.5">
          <span className="flex items-start justify-between gap-3">
            <span
              className="engrave-green text-[16px] leading-snug font-medium sm:text-[18px]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {item.question}
            </span>
            <svg
              viewBox="0 0 24 24"
              aria-hidden
              className={`mt-1 h-4 w-4 shrink-0 text-[#1A3A28] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </span>

          <span
            className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
          >
            <span className="overflow-hidden">
              <span
                className="mt-3 block text-[13.5px] leading-relaxed font-light text-[#6B6358] sm:text-[14.5px]"
                style={{ fontFamily: "'Lora', serif" }}
              >
                {item.answer}
              </span>
            </span>
          </span>
        </span>
      </button>
    </article>
  );
}

export default function FaqSection() {
  const [openId, setOpenId] = useState(faqs[0].id);

  return (
    <section
      id="faq"
      className="relative overflow-hidden border-b border-[#D9C79E]/30 py-8 sm:py-10 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('/ChatGPT Image Aug 14, 2026, 10_57_50 AM.png')` }}
    >

      <div className="relative z-10 mx-auto w-full max-w-3xl px-5 sm:px-8">
        <header className="mb-5 flex flex-col items-center text-center md:mb-7">
          
          <div className="mb-2 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#C4A15A]/70 sm:w-14" />
            <span
              className="text-[11px] font-medium uppercase tracking-[0.34em] text-[#B08A3A] sm:text-[12px]"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              FAQ
            </span>
            <span className="h-px w-10 bg-[#C4A15A]/70 sm:w-14" />
          </div>

          <h2
            className="engrave-green mb-2 text-[32px] leading-[1.12] font-normal sm:text-[42px] md:text-[48px]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Frequently Asked Questions
          </h2>

          <div className="mb-2 flex w-full max-w-[200px] items-center gap-2 text-[#C4A15A]">
            <span className="h-px flex-1 bg-[#C4A15A]/80" />
            <Sparkle className="h-3 w-3" />
            <span className="h-px flex-1 bg-[#C4A15A]/80" />
          </div>

          <p
            className="max-w-xl text-[13.5px] leading-relaxed font-light text-[#5C5348] sm:text-[14.5px]"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Everything you need to know to begin your journey with clarity and confidence.
          </p>
        </header>

        <div className="mb-6 flex flex-col gap-3 sm:mb-8">
          {faqs.map((item) => (
            <FaqItem
              key={item.id}
              item={item}
              open={openId === item.id}
              onToggle={() => setOpenId(openId === item.id ? "" : item.id)}
            />
          ))}
        </div>

        <div className="flex flex-col items-center justify-center gap-4 text-center sm:flex-row sm:gap-6">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#C4A15A] text-[#C4A15A]">
              <Sparkle className="h-3.5 w-3.5" />
            </span>
            <p
              className="text-[13.5px] text-[#2C261E] sm:text-[14.5px]"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Still have questions? I&apos;m here to help.
            </p>
          </div>

          <span className="hidden h-8 w-px bg-[#C4A15A]/70 sm:block" />

          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-[#C4A15A]/70 bg-[#123A1A] hover:bg-[#0d2a13] px-5 py-2 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#C4A15A] transition-all duration-300 hover:scale-[1.03] sm:px-6 sm:text-[11.5px]"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            <ChatIcon className="h-4 w-4 text-[#C4A15A]" />
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
}
