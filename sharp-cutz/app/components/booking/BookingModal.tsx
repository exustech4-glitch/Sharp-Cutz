"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent, MouseEvent, SyntheticEvent } from "react";
import styles from "./BookingModal.module.css";

const services = ["Shop cut", "Kids' cut", "Home service"] as const;
const preferredDays = ["Weekday afternoon", "Friday", "Saturday", "Sunday", "Not sure"] as const;

type BookingResponse = { ok?: boolean; field?: string };

export default function BookingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [service, setService] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
      dialog.querySelector<HTMLInputElement>("input[name='name']")?.focus();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    if (!open && isSent) {
      setIsSent(false);
      setService("");
      setErrorMessage("");
    }
  }, [open, isSent]);

  function handleCancel(event: SyntheticEvent<HTMLDialogElement>) {
    event.preventDefault();
    onClose();
  }

  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target !== event.currentTarget) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const outsidePanel =
      event.clientX < rect.left || event.clientX > rect.right ||
      event.clientY < rect.top || event.clientY > rect.bottom;
    if (outsidePanel) onClose();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSending) return;

    setIsSending(true);
    setErrorMessage("");

    const values = Object.fromEntries(new FormData(event.currentTarget).entries());
    const payload = {
      name: values.name,
      phone: values.phone,
      service: values.service,
      preferred_day: values.preferred_day,
      area: values.area,
      note: values.note,
      website: values.website,
    };

    try {
      const response = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => ({}))) as BookingResponse;

      if (!response.ok || result.ok !== true) {
        const messages: Record<string, string> = {
          name: "Enter your name to continue.",
          phone: "Enter a valid phone number so the shop can reach you.",
          service: "Choose a service to continue.",
          preferred_day: "Choose a preferred day to continue.",
          area: "Enter your area for home service.",
        };
        setErrorMessage(messages[result.field ?? ""] ?? "Something went wrong. Please try again.");
        return;
      }

      setIsSent(true);
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="booking-title"
      onCancel={handleCancel}
      onClick={handleBackdropClick}
    >
      {isSent ? (
        <section className={styles.success} aria-live="polite">
          <div className={styles.successMark} aria-hidden="true">OK</div>
          <div>
            <h2 id="booking-title">Request sent</h2>
            <p>Thanks. The shop will contact you to confirm a time.</p>
          </div>
          <button className={styles.closeSuccess} type="button" onClick={onClose}>
            Close
          </button>
        </section>
      ) : (
        <>
          <header className={styles.header}>
            <div>
              <h2 id="booking-title">Book a cut</h2>
              <p>Send a request. The shop will contact you to confirm a time.</p>
            </div>
            <button className={styles.closeButton} type="button" aria-label="Close booking form" onClick={onClose}>
              ×
            </button>
          </header>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label htmlFor="booking-name">Name</label>
              <input id="booking-name" name="name" autoComplete="name" maxLength={60} required placeholder="Your name" />
            </div>

            <div className={styles.field}>
              <label htmlFor="booking-phone">Phone</label>
              <input
                id="booking-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                maxLength={24}
                required
                placeholder="+234 ..."
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="booking-service">Service</label>
              <select
                id="booking-service"
                name="service"
                required
                value={service}
                onChange={(event) => setService(event.target.value)}
              >
                <option value="" disabled>Choose a service</option>
                {services.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="booking-day">Preferred day</label>
              <select id="booking-day" name="preferred_day" required defaultValue="">
                <option value="" disabled>Choose a preferred day</option>
                {preferredDays.map((day) => <option key={day} value={day}>{day}</option>)}
              </select>
            </div>

            {service === "Home service" && (
              <div className={styles.field}>
                <label htmlFor="booking-area">Area</label>
                <input id="booking-area" name="area" maxLength={80} required placeholder="Your area in Benin City" />
              </div>
            )}

            <div className={styles.field}>
              <label htmlFor="booking-note">Note <span>(optional)</span></label>
              <textarea id="booking-note" name="note" maxLength={300} rows={3} placeholder="Anything the shop should know" />
            </div>

            <div className={styles.honeypot} aria-hidden="true">
              <label htmlFor="booking-website">Leave this field empty</label>
              <input id="booking-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            {errorMessage && <p className={styles.error} role="alert">{errorMessage}</p>}

            <button className={styles.submitButton} type="submit" disabled={isSending}>
              {isSending ? "Sending…" : "Send request"}
            </button>
          </form>
        </>
      )}
    </dialog>
  );
}
