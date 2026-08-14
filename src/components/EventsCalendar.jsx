import { useCallback, useEffect, useMemo, useState } from "react";
import { api } from "../api/client";
import { useBookingModal } from "../context/BookingModalContext";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const CATEGORY_STYLES = {
  Wellness: { bg: "#D4EDDA", text: "#123C2A", dot: "#28A745" },
  Yoga: { bg: "#FFF3CD", text: "#856404", dot: "#B88932" },
  Healing: { bg: "#D1ECF1", text: "#0C5460", dot: "#17A2B8" },
  Workshop: { bg: "#E2D5F5", text: "#5A3E8A", dot: "#7B5EA7" },
  Retreat: { bg: "#F8D7DA", text: "#721C24", dot: "#C0392B" },
  "Special Event": { bg: "#E8C8C4", text: "#123C2A", dot: "#B88932" },
};

export function categoryStyle(category) {
  return CATEGORY_STYLES[category] || { bg: "#F7F1E6", text: "#123C2A", dot: "#B88932" };
}

function dateKey(date) {
  if (!date) return "";
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function buildCalendarCells(year, month) {
  const first = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0).getDate();
  const startPad = first.getDay();
  const cells = [];
  for (let i = 0; i < startPad; i++) cells.push(null);
  for (let d = 1; d <= lastDay; d++) cells.push(new Date(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export function EventModal({ event, onClose }) {
  const { openBooking } = useBookingModal();
  const style = categoryStyle(event.category);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  function handleBook() {
    if (event.bookingUrl) {
      window.open(event.bookingUrl, "_blank", "noopener,noreferrer");
    } else {
      openBooking();
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#123C2A]/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-[#F7F1E6] shadow-2xl ring-1 ring-[#B88932]/30"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-modal-title"
      >
        {event.image && (
          <div className="relative aspect-[16/9] overflow-hidden rounded-t-2xl">
            <img src={event.image} alt="" className="h-full w-full object-cover" />
            <span
              className="absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]"
              style={{ backgroundColor: style.bg, color: style.text }}
            >
              {event.category}
            </span>
          </div>
        )}

        <div className="p-6 sm:p-8">
          {!event.image && (
            <span
              className="mb-3 inline-block rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]"
              style={{ backgroundColor: style.bg, color: style.text }}
            >
              {event.category}
            </span>
          )}

          <h2
            id="event-modal-title"
            className="engrave-green mb-2 text-[28px] leading-tight sm:text-[32px]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {event.title}
          </h2>

          <p
            className="mb-4 text-[14px] font-medium text-[#B88932]"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            {event.date}
            {event.time ? ` · ${event.time}` : ""}
          </p>

          {event.description && (
            <p
              className="mb-5 text-[15px] leading-relaxed text-[#5C5348]"
              style={{ fontFamily: "'Lora', serif" }}
            >
              {event.description}
            </p>
          )}

          <ul className="mb-6 space-y-2 text-[14px] text-[#2C261E]" style={{ fontFamily: "'Lora', serif" }}>
            {event.location && (
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-[#B88932]">📍</span>
                {event.location}
              </li>
            )}
            {event.price && (
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-[#B88932]">✦</span>
                {event.price}
              </li>
            )}
          </ul>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleBook}
              className="rounded-full bg-[#123C2A] px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#F7F1E6] transition hover:bg-[#0d2a13]"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              Book Now
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-[#B88932]/60 px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#123C2A] hover:bg-[#B88932]/10"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              Close
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#123C2A] shadow hover:bg-white"
          aria-label="Close"
        >
          ×
        </button>
      </div>
    </div>
  );
}

function EventListItem({ event, onSelect }) {
  const style = categoryStyle(event.category);
  return (
    <button
      type="button"
      onClick={() => onSelect(event)}
      className="group w-full rounded-xl border border-[#E8DCC8]/80 bg-white p-3 text-left transition hover:border-[#B88932]/50 hover:shadow-sm"
    >
      <div className="flex items-start gap-3">
        <div
          className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg text-center leading-none"
          style={{ backgroundColor: style.bg, color: style.text }}
        >
          <span className="text-[18px] font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            {event.day}
          </span>
          <span className="text-[9px] uppercase tracking-wider">{event.month}</span>
        </div>
        <div className="min-w-0 flex-1">
          <p
            className="truncate text-[14px] font-medium text-[#123C2A] group-hover:text-[#B88932]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {event.title}
          </p>
          <p className="mt-0.5 truncate text-[11px] text-[#7A7266]">{event.location || event.category}</p>
        </div>
      </div>
    </button>
  );
}

function buildEventsByDate(events, viewYear, viewMonth) {
  const monthStart = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-01`;
  const nextM = viewMonth === 11 ? 0 : viewMonth + 1;
  const nextY = viewMonth === 11 ? viewYear + 1 : viewYear;
  const monthEndExclusive = `${nextY}-${String(nextM + 1).padStart(2, "0")}-01`;

  const map = {};
  for (const ev of events) {
    const startStr = String(ev.eventDate || "").slice(0, 10);
    let endStr = String(ev.endDate || startStr).slice(0, 10);
    if (endStr && endStr < startStr) endStr = startStr;
    if (!startStr) continue;

    let d = new Date(`${startStr}T12:00:00`);
    const end = new Date(`${endStr}T12:00:00`);
    if (Number.isNaN(d.getTime()) || Number.isNaN(end.getTime())) continue;

    while (d <= end) {
      const key = dateKey(d);
      if (key >= monthStart && key < monthEndExclusive) {
        if (!map[key]) map[key] = [];
        if (!map[key].some((item) => item.id === ev.id)) map[key].push(ev);
      }
      d.setDate(d.getDate() + 1);
    }
  }
  return map;
}

function CalendarGrid({ today, viewYear, viewMonth, monthEvents, loading, onSelect, onPrev, onNext, onToday }) {
  const monthLabel = useMemo(
    () => new Date(viewYear, viewMonth, 1).toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    [viewYear, viewMonth],
  );

  const cells = useMemo(() => buildCalendarCells(viewYear, viewMonth), [viewYear, viewMonth]);

  const eventsByDate = useMemo(
    () => buildEventsByDate(monthEvents, viewYear, viewMonth),
    [monthEvents, viewYear, viewMonth],
  );

  return (
    <section className="rounded-2xl bg-white p-4 shadow-[0_10px_28px_-12px_rgba(90,68,28,0.12)] ring-1 ring-[#E8DCC8] sm:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h3
          className="text-[22px] text-[#123C2A] sm:text-[26px]"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {monthLabel}
        </h3>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToday}
            className="rounded-full border border-[#B88932]/50 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#123C2A] hover:bg-[#B88932]/10"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            Today
          </button>
          <button
            type="button"
            onClick={onPrev}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E8DCC8] text-[#123C2A] hover:border-[#B88932]"
            aria-label="Previous month"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={onNext}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E8DCC8] text-[#123C2A] hover:border-[#B88932]"
            aria-label="Next month"
          >
            ›
          </button>
        </div>
      </div>

      <div className="mb-2 grid grid-cols-7 gap-1">
        {WEEKDAYS.map((d) => (
          <div
            key={d}
            className="py-2 text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-[#7A7266]"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            {d}
          </div>
        ))}
      </div>

      {loading ? (
        <p className="py-12 text-center text-sm text-[#7A7266]">Loading calendar…</p>
      ) : (
        <div className="grid grid-cols-7 gap-1">
          {cells.map((cell, i) => {
            if (!cell) {
              return <div key={`empty-${i}`} className="min-h-[72px] sm:min-h-[88px]" />;
            }
            const key = dateKey(cell);
            const dayEvents = eventsByDate[key] || [];
            const isToday = key === dateKey(today);

            return (
              <div
                key={key}
                className={`min-h-[72px] rounded-lg border p-1.5 sm:min-h-[88px] sm:p-2 ${
                  isToday ? "border-[#B88932] bg-[#F7F1E6]/80" : "border-[#F0E8DA] bg-[#FDFBF7]"
                }`}
              >
                <span
                  className={`mb-1 block text-[12px] font-medium sm:text-[13px] ${
                    isToday ? "text-[#B88932]" : "text-[#5C5348]"
                  }`}
                >
                  {cell.getDate()}
                </span>
                <div className="space-y-0.5">
                  {dayEvents.slice(0, 2).map((ev) => {
                    const st = categoryStyle(ev.category);
                    return (
                      <button
                        key={ev.id}
                        type="button"
                        onClick={() => onSelect(ev)}
                        className="block w-full truncate rounded px-1 py-0.5 text-left text-[9px] font-medium leading-tight sm:text-[10px]"
                        style={{ backgroundColor: st.bg, color: st.text }}
                        title={ev.title}
                      >
                        {ev.title}
                      </button>
                    );
                  })}
                  {dayEvents.length > 2 && (
                    <span className="block px-1 text-[9px] text-[#7A7266]">+{dayEvents.length - 2} more</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-3 border-t border-[#E8DCC8] pt-5">
        {Object.entries(CATEGORY_STYLES).map(([name, st]) => (
          <span
            key={name}
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium"
            style={{ backgroundColor: st.bg, color: st.text }}
          >
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: st.dot }} />
            {name}
          </span>
        ))}
      </div>
    </section>
  );
}

/**
 * @param {{ showSidebar?: boolean, id?: string, className?: string }} props
 */
export default function EventsCalendar({ showSidebar = false, id, className = "" }) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [monthEvents, setMonthEvents] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);

  const monthKey = useMemo(
    () => `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}`,
    [viewYear, viewMonth],
  );

  const loadSidebar = useCallback(async () => {
    const [up, pa] = await Promise.all([
      api("/api/events?upcoming=true&limit=8"),
      api("/api/events?past=true&limit=8"),
    ]);
    setUpcoming(up);
    setPast(pa);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const data = await api(`/api/events?month=${monthKey}`);
        if (!cancelled) setMonthEvents(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [monthKey]);

  useEffect(() => {
    if (!showSidebar) return;
    loadSidebar().catch(() => {});
  }, [showSidebar, loadSidebar]);

  function prevMonth() {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else setViewMonth((m) => m - 1);
  }

  function nextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else setViewMonth((m) => m + 1);
  }

  function goToday() {
    setViewYear(today.getFullYear());
    setViewMonth(today.getMonth());
  }

  return (
    <div id={id} className={className}>
      {error && (
        <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-center text-sm text-red-700">{error}</p>
      )}

      <div className={showSidebar ? "grid gap-8 lg:grid-cols-[1fr_300px]" : ""}>
        <CalendarGrid
          today={today}
          viewYear={viewYear}
          viewMonth={viewMonth}
          monthEvents={monthEvents}
          loading={loading}
          onSelect={setSelected}
          onPrev={prevMonth}
          onNext={nextMonth}
          onToday={goToday}
        />

        {showSidebar && (
          <aside className="space-y-6">
            <div>
              <h3
                className="mb-3 text-[18px] text-[#123C2A]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Upcoming Events
              </h3>
              {upcoming.length === 0 ? (
                <p className="text-[13px] text-[#7A7266]">No upcoming events scheduled.</p>
              ) : (
                <div className="space-y-2">
                  {upcoming.map((ev) => (
                    <EventListItem key={ev.id} event={ev} onSelect={setSelected} />
                  ))}
                </div>
              )}
            </div>

            <div>
              <h3
                className="mb-3 text-[18px] text-[#123C2A]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Past Events
              </h3>
              {past.length === 0 ? (
                <p className="text-[13px] text-[#7A7266]">No past events yet.</p>
              ) : (
                <div className="space-y-2">
                  {past.map((ev) => (
                    <EventListItem key={ev.id} event={ev} onSelect={setSelected} />
                  ))}
                </div>
              )}
            </div>
          </aside>
        )}
      </div>

      {selected && <EventModal event={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
