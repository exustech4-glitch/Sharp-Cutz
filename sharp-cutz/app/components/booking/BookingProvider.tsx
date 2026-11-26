"use client";

import { createContext, useCallback, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import BookingModal from "./BookingModal";

type BookingContextValue = {
  openBooking: (trigger: HTMLElement) => void;
};

export const BookingContext = createContext<BookingContextValue | null>(null);

export default function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);

  const openBooking = useCallback((trigger: HTMLElement) => {
    triggerRef.current = trigger;
    setIsOpen(true);
  }, []);

  const closeBooking = useCallback(() => {
    setIsOpen(false);
    window.requestAnimationFrame(() => {
      if (triggerRef.current?.isConnected) triggerRef.current.focus();
    });
  }, []);

  const contextValue = useMemo(() => ({ openBooking }), [openBooking]);

  return (
    <BookingContext.Provider value={contextValue}>
      {children}
      <BookingModal open={isOpen} onClose={closeBooking} />
    </BookingContext.Provider>
  );
}
