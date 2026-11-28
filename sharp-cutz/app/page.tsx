import Image from "next/image";
import { shop } from "@/lib/config";
import BookingProvider from "./components/booking/BookingProvider";
import BookButton from "./components/booking/BookButton";
import Reveal from "./components/Reveal";
import MobileNav from "./components/MobileNav";
import ThemeToggle from "./components/ThemeToggle";
import styles from "./page.module.css";

const cuts = [
  {
    title: "Shop cuts",
    text: "Fades, low cuts and clean line-ups, done by our barbers.",
    src: "/images/shop-cuts.jpg",
    alt: "Clippers shaping a clean hairline",
  },
  {
    title: "Kids' cuts",
    text: "Gentle, quick cuts for boys. Weekday afternoons are fastest.",
    src: "/images/kids-cuts.jpg",
    alt: "A smiling Nigerian boy in a barber cape during a haircut",
  },
  {
    title: "Home service",
    text: "We come to you. Ask us, and the shop confirms your time.",
    src: "/images/home-service-20261128.jpg",
    alt: "A barber cutting a client's hair in a home compound",
  },
];

const bestTimes = [
  "Weekday afternoons are the quickest.",
  "Friday and Saturday are the busiest.",
  "Saturday has the longest wait, so come early or pick a weekday.",
];

function TopBar() {
  return (
    <header className={styles.topBar}>
      <a className={styles.wordmark} href="#top" aria-label="Sharp Cutz home">
        SHARP CUTZ
      </a>
      <nav className={styles.nav} aria-label="Main navigation">
        <a href="#cuts">Our cuts</a>
        <a href="#times">Best times</a>
        <a href="#home">Home service</a>
        <a href="#visit">Find us</a>
      </nav>
      <div className={styles.topActions}>
        <ThemeToggle />
        <BookButton label="Book a cut" />
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className={styles.hero} id="top" aria-labelledby="hero-title">
      <div className={`${styles.imageSurface} ${styles.heroImage}`}>
        <Image
          src="/images/hero-barbershop-20261128.jpg"
          alt="A Nigerian barber giving a fade to a client in a busy barbershop"
          fill
          preload
          sizes="100vw"
          className={styles.heroPhoto}
        />
      </div>
      <div className={styles.heroShade} aria-hidden="true" />
      <div className={styles.heroContent}>
        <Reveal mode="load" fadeOnly><span className={styles.tag}>BARBERSHOP · BENIN CITY</span></Reveal>
        <Reveal mode="load" delay={0.08} fadeOnly><h1 id="hero-title">{shop.name}</h1></Reveal>
        <Reveal mode="load" delay={0.16} fadeOnly><p>{shop.tagline}</p></Reveal>
        <Reveal mode="load" delay={0.24} fadeOnly><BookButton label="Book a cut" /></Reveal>
      </div>
    </section>
  );
}

function CutsGrid() {
  return (
    <section className={styles.section} id="cuts" aria-labelledby="cuts-title">
      <div className={styles.sectionHeading}>
        <h2 id="cuts-title">Our cuts</h2>
        <span className={styles.tag}>3 CUTS</span>
      </div>
      <div className={styles.cutsGrid}>
        {cuts.map((cut, index) => (
          <Reveal key={cut.title} delay={index * 0.06}>
          <article className={styles.cutCard}>
            <div className={`${styles.imageSurface} ${styles.cardImage}`}>
              <Image
                src={cut.src}
                alt={cut.alt}
                fill
                sizes="(min-width: 900px) 33vw, (min-width: 600px) 50vw, 100vw"
                className={styles.cardPhoto}
              />
            </div>
            <div className={styles.cardCopy}>
              <h3>{cut.title}</h3>
              <p>{cut.text}</p>
            </div>
          </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function BestTimes() {
  return (
    <Reveal>
    <section className={`${styles.section} ${styles.bestTimes}`} id="times" aria-labelledby="times-title">
      <div className={styles.sectionHeading}>
        <h2 id="times-title">Best times to come</h2>
        <span className={styles.tag}>3 BEST TIMES</span>
      </div>
      <ul>
        {bestTimes.map((time, index) => (
          <li key={time}>
            <span className={`${styles.timeDot} ${index === 2 ? styles.busyDot : ""}`} aria-hidden="true" />
            {time}
          </li>
        ))}
      </ul>
    </section>
    </Reveal>
  );
}

function HomeService() {
  return (
    <Reveal fadeOnly>
    <section className={`${styles.section} ${styles.splitSection}`} id="home" aria-labelledby="home-title">
      <div className={styles.splitCopy}>
        <span className={styles.tag}>A HOME SERVICE WHEN YOU NEED IT</span>
        <h2 id="home-title">Home service</h2>
        <p>Send us your request and your area. The shop will contact you to confirm a time.</p>
        <BookButton label="Book now" />
      </div>
      <div className={`${styles.imageSurface} ${styles.wideImage} ${styles.homeImage}`}>
        <Image
          src="/images/home-service-20261128.jpg"
          alt="A Nigerian barber arriving with a kit bag and cutting a client's hair at home"
          fill
          sizes="(min-width: 900px) 50vw, 100vw"
          className={styles.widePhoto}
        />
      </div>
    </section>
    </Reveal>
  );
}

const mapQuery = "Sapele Road, Benin City, Edo State, Nigeria";

function VisitInfo() {
  return (
    <Reveal>
    <section className={`${styles.section} ${styles.splitSection} ${styles.visitSection}`} id="visit" aria-labelledby="visit-title">
      <div className={styles.splitCopy}>
        <span className={styles.tag}>FIND US</span>
        <h2 id="visit-title">Find us</h2>
        <p>{shop.name}, {shop.address}</p>
        <p className={styles.hours}>Hours: {shop.hours}</p>
      </div>
      <div className={styles.mapCard}>
        <iframe
          className={styles.mapFrame}
          title="Map showing Sharp Cutz on Sapele Road, Benin City"
          src={`https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=15&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
        <div className={styles.mapBar}>
          <span><span className={styles.locationMark} aria-hidden="true">●</span> {shop.address}</span>
          <a
            className={styles.directionsLink}
            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapQuery)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get directions →
          </a>
        </div>
      </div>
    </section>
    </Reveal>
  );
}

function BookCta() {
  return (
    <Reveal fadeOnly>
    <section className={styles.bookCta} id="book" aria-labelledby="book-title">
      <span className={styles.tag}>BOOK A CUT</span>
      <h2 id="book-title">Ready for a fresh cut?</h2>
      <p>Tell us when you'd like to come.</p>
      <BookButton label="Book now" />
    </section>
    </Reveal>
  );
}

function Footer() {
  return <Reveal fadeOnly><footer className={styles.footer}>{shop.name} · {shop.owner} · {shop.address}</footer></Reveal>;
}

export default function Home() {
  return (
    <BookingProvider>
      <main className={styles.page}>
        <MobileNav />
        <TopBar />
        <Hero />
        <div className={styles.content}>
          <CutsGrid />
          <BestTimes />
          <HomeService />
          <VisitInfo />
          <BookCta />
          <Footer />
        </div>
        <div className={styles.mobileBook}>
          <BookButton label="Book a cut" />
        </div>
      </main>
    </BookingProvider>
  );
}
