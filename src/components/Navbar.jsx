import { useState } from "react";
import { Link } from "react-router-dom";
import { useBookingModal } from "../context/BookingModalContext";

const links = [
  { label: "About", href: "/#about" },
  { label: "Programs", href: "/#programs" },
  { label: "Transformations", href: "/#transformations" },
  { label: "Resources", href: "/gallery", type: "route" },
  { label: "Events", href: "/events", type: "route" },
  { label: "Blog", href: "/blog", type: "route" },
  { label: "Contact", type: "contact" },
];

function NavLink({ item, onClick, className = "" }) {
  const { openBooking } = useBookingModal();
  const base =
    "text-[12px] font-medium uppercase tracking-[0.16em] text-[#3A342C] transition-colors hover:text-[#1A3A28] " +
    className;

  if (item.type === "contact") {
    return (
      <button
        type="button"
        onClick={() => {
          onClick?.();
          openBooking();
        }}
        className={base}
        style={{ fontFamily: "'Lato', sans-serif" }}
      >
        {item.label}
      </button>
    );
  }

  if (item.type === "route") {
    return (
      <Link
        to={item.href}
        onClick={onClick}
        className={base}
        style={{ fontFamily: "'Lato', sans-serif" }}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <a
      href={item.href}
      onClick={onClick}
      className={base}
      style={{ fontFamily: "'Lato', sans-serif" }}
    >
      {item.label}
    </a>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { openBooking } = useBookingModal();

  return (
    <header className="sticky top-0 z-50 border-b border-[#E5D9C4]/90 bg-[#F7F0E4]/92 backdrop-blur-md">
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-6 px-5 sm:px-8 lg:px-10">
        <Link
          to="/"
          aria-label="The Mystic Guru — Home"
          className="relative z-10 flex shrink-0 items-center"
          onClick={() => setOpen(false)}
        >
          <img
            src="/logo_white.png"
            alt="The Mystic Guru — Dr. Sachin Bansal"
            className="h-12 w-auto mix-blend-multiply sm:h-14"
          />
        </Link>

        <div className="hidden items-center gap-7 lg:flex xl:gap-8">
          {links.map((item) => (
            <NavLink key={item.label} item={item} />
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => openBooking()}
            className="hidden items-center rounded-full bg-[#1A3A28] px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#F7F1E4] transition-colors hover:bg-[#123A1A] sm:inline-flex"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            Book a Session
          </button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#3A342C] transition-colors hover:bg-[#EFE6D6] lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-[#E5D9C4] bg-[#F7F0E4] px-5 py-5 lg:hidden sm:px-8">
          <div className="flex flex-col gap-4">
            {links.map((item) => (
              <NavLink
                key={item.label}
                item={item}
                onClick={() => setOpen(false)}
                className="py-0.5 text-left"
              />
            ))}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openBooking();
              }}
              className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-[#1A3A28] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#F7F1E4] transition-colors hover:bg-[#123A1A] sm:hidden"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              Book a Session
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
