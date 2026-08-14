import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const BookingModalContext = createContext(null);

export function BookingModalProvider({ children }) {
  const [open, setOpen] = useState(false);

  const openBooking = useCallback(() => setOpen(true), []);
  const closeBooking = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ open, openBooking, closeBooking }),
    [open, openBooking, closeBooking],
  );

  return (
    <BookingModalContext.Provider value={value}>
      {children}
    </BookingModalContext.Provider>
  );
}

export function useBookingModal() {
  const ctx = useContext(BookingModalContext);
  if (!ctx) {
    throw new Error("useBookingModal must be used within BookingModalProvider");
  }
  return ctx;
}

/** Opens the booking modal when URL hash is #book or #contact. */
export function useBookingHashListener() {
  const { openBooking } = useBookingModal();

  useEffect(() => {
    function maybeOpen() {
      const hash = window.location.hash.replace("#", "");
      if (hash === "book" || hash === "contact") {
        openBooking();
      }
    }
    maybeOpen();
    window.addEventListener("hashchange", maybeOpen);
    return () => window.removeEventListener("hashchange", maybeOpen);
  }, [openBooking]);
}
