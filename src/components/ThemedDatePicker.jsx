import { useEffect, useMemo, useRef, useState } from "react";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function pad(n) {
  return String(n).padStart(2, "0");
}

function toISODate(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function parseISODate(value) {
  if (!value) return null;
  const [y, m, d] = value.split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}

function formatDisplay(value) {
  const date = parseISODate(value);
  if (!date) return "";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function CalendarIcon({ className = "h-3.5 w-3.5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M8 3.5v3M16 3.5v3M3.5 10h17" />
    </svg>
  );
}

export default function ThemedDatePicker({
  value,
  onChange,
  required = false,
  inputClassName = "",
  placeholder = "Select a date",
  minDate,
}) {
  const rootRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [panelPos, setPanelPos] = useState({ top: 0, left: 0 });
  const today = useMemo(() => startOfDay(new Date()), []);
  const min = minDate ? startOfDay(minDate) : today;

  const selected = parseISODate(value);
  const [view, setView] = useState(() => selected || today);

  useEffect(() => {
    if (selected) {
      setView(new Date(selected.getFullYear(), selected.getMonth(), 1));
    }
  }, [value]);

  useEffect(() => {
    if (!open) return undefined;

    function placePanel() {
      const rect = rootRef.current?.getBoundingClientRect();
      if (!rect) return;
      const panelWidth = 272;
      const panelHeight = 320;
      const gap = 6;
      let left = rect.right - panelWidth;
      left = Math.max(12, Math.min(left, window.innerWidth - panelWidth - 12));
      let top = rect.bottom + gap;
      if (top + panelHeight > window.innerHeight - 12) {
        top = Math.max(12, rect.top - panelHeight - gap);
      }
      setPanelPos({ top, left });
    }

    placePanel();

    function onPointerDown(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    function onKey(e) {
      if (e.key === "Escape") {
        e.stopPropagation();
        setOpen(false);
      }
    }

    window.addEventListener("resize", placePanel);
    window.addEventListener("scroll", placePanel, true);
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey, true);
    return () => {
      window.removeEventListener("resize", placePanel);
      window.removeEventListener("scroll", placePanel, true);
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey, true);
    };
  }, [open]);

  const year = view.getFullYear();
  const month = view.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < firstDay; i += 1) cells.push(null);
  for (let day = 1; day <= daysInMonth; day += 1) cells.push(day);

  function shiftMonth(delta) {
    setView((prev) => new Date(prev.getFullYear(), prev.getMonth() + delta, 1));
  }

  function selectDay(day) {
    const next = new Date(year, month, day);
    if (startOfDay(next) < min) return;
    onChange(toISODate(next));
    setOpen(false);
  }

  const display = formatDisplay(value);

  return (
    <div ref={rootRef} className="relative">
      <div className="relative">
        <input
          readOnly
          required={required}
          value={display}
          placeholder={placeholder}
          onClick={() => setOpen((v) => !v)}
          onFocus={() => setOpen(true)}
          className={`${inputClassName} cursor-pointer caret-transparent`}
          style={{ fontFamily: "'Lora', serif" }}
          aria-haspopup="dialog"
          aria-expanded={open}
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setOpen((v) => !v)}
          className="absolute top-1/2 right-2.5 -translate-y-1/2 text-[#B08A3A] transition-colors hover:text-[#1A3A28]"
          aria-label="Open calendar"
        >
          <CalendarIcon className="h-3.5 w-3.5" />
        </button>
      </div>

      {open && (
        <div
          role="dialog"
          aria-label="Choose a date"
          className="fixed z-[140] w-[272px] rounded-xl border border-[#E2D6C2] bg-[#FDFBF7] p-3 shadow-[0_18px_40px_-20px_rgba(26,58,40,0.45)]"
          style={{ top: panelPos.top, left: panelPos.left }}
        >
          <div className="mb-2.5 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => shiftMonth(-1)}
              className="flex h-7 w-7 items-center justify-center rounded-full text-[#1A3A28] transition-colors hover:bg-[#EFE6D6]"
              aria-label="Previous month"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M14.5 6.5 9 12l5.5 5.5" />
              </svg>
            </button>
            <p
              className="engrave-green text-[17px] font-semibold tracking-wide text-[#1A3A28]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {MONTHS[month]} {year}
            </p>
            <button
              type="button"
              onClick={() => shiftMonth(1)}
              className="flex h-7 w-7 items-center justify-center rounded-full text-[#1A3A28] transition-colors hover:bg-[#EFE6D6]"
              aria-label="Next month"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M9.5 6.5 15 12l-5.5 5.5" />
              </svg>
            </button>
          </div>

          <div className="mb-1 grid grid-cols-7 gap-0.5">
            {WEEKDAYS.map((d) => (
              <span
                key={d}
                className="py-1 text-center text-[10px] font-semibold uppercase tracking-[0.08em] text-[#C4A15A]"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                {d}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-0.5">
            {cells.map((day, idx) => {
              if (!day) {
                return <span key={`e-${idx}`} className="h-8" />;
              }

              const date = new Date(year, month, day);
              const iso = toISODate(date);
              const disabled = startOfDay(date) < min;
              const isSelected = value === iso;
              const isToday = toISODate(today) === iso;

              return (
                <button
                  key={iso}
                  type="button"
                  disabled={disabled}
                  onClick={() => selectDay(day)}
                  className={[
                    "flex h-8 items-center justify-center rounded-full text-[12px] transition-colors",
                    disabled
                      ? "cursor-not-allowed text-[#C9C0B2]"
                      : isSelected
                        ? "bg-[#1A3A28] font-semibold text-[#F7F1E4]"
                        : isToday
                          ? "border border-[#C4A15A] text-[#1A3A28] hover:bg-[#EFE6D6]"
                          : "text-[#3A342C] hover:bg-[#EFE6D6]",
                  ].join(" ")}
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  {day}
                </button>
              );
            })}
          </div>

          <div className="mt-2.5 flex items-center justify-between border-t border-[#E2D6C2] pt-2">
            <button
              type="button"
              onClick={() => {
                const pick = today < min ? min : today;
                onChange(toISODate(pick));
                setView(new Date(pick.getFullYear(), pick.getMonth(), 1));
                setOpen(false);
              }}
              className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#C4A15A] transition-colors hover:text-[#1A3A28]"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              Today
            </button>
            <button
              type="button"
              onClick={() => {
                onChange("");
                setOpen(false);
              }}
              className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6B6358] transition-colors hover:text-[#1A3A28]"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
