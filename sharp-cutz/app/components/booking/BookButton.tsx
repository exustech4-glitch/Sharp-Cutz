"use client";

import { useContext } from "react";
import { BookingContext } from "./BookingProvider";
import styles from "../../page.module.css";

export default function BookButton({ label }: { label: string }) {
  const booking = useContext(BookingContext);

  if (!booking) throw new Error("BookButton must be rendered inside BookingProvider.");

  return (
    <button
      className={styles.bookButton}
      type="button"
      aria-haspopup="dialog"
      onClick={(event) => booking.openBooking(event.currentTarget)}
    >
      {label}
    </button>
  );
}
