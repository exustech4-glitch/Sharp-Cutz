"use client";

import { useState } from "react";
import BookButton from "./booking/BookButton";
import styles from "./MobileNav.module.css";

const links = [
  ["Our cuts", "#cuts"],
  ["Best times", "#times"],
  ["Home service", "#home"],
  ["Find us", "#visit"],
] as const;

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <a className={styles.wordmark} href="#top" onClick={() => setOpen(false)} aria-label="Sharp Cutz home">
        SHARP CUTZ
      </a>
      <button
        className={styles.toggle}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setOpen((value) => !value)}
      >
        <span className={`${styles.icon} ${open ? styles.iconOpen : ""}`} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span>{open ? "Close" : "Menu"}</span>
      </button>
      {open && (
        <nav className={styles.menu} id="mobile-navigation" aria-label="Mobile navigation">
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
          ))}
          <div className={styles.menuBook} onClick={() => setOpen(false)}>
            <BookButton label="Book a cut" />
          </div>
        </nav>
      )}
    </header>
  );
}
