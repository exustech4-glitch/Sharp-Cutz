import { shop } from "@/lib/config";
import styles from "./page.module.css";

const cuts = [
  {
    title: "Shop cuts",
    text: "Fades, low cuts and clean line-ups, done by our barbers.",
    image: "Clippers shaping a clean hairline",
    imageClass: styles.shopImage,
  },
  {
    title: "Kids' cuts",
    text: "Gentle, quick cuts for boys. Weekday afternoons are fastest.",
    image: "A smiling boy in a barber cape",
    imageClass: styles.kidsImage,
  },
  {
    title: "Home service",
    text: "We come to you. Ask us, and the shop confirms your time.",
    image: "A barber cutting hair in a home compound",
    imageClass: styles.homeImage,
  },
];

const bestTimes = [
  "Weekday afternoons are the quickest.",
  "Friday and Saturday are the busiest.",
  "Saturday has the longest wait, so come early or pick a weekday.",
];

function BookLink({ label }: { label: string }) {
  return (
    <a className={styles.bookButton} href="#book">
      {label}
    </a>
  );
}

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
      <BookLink label="Book a cut" />
    </header>
  );
}

function Hero() {
  return (
    <section className={styles.hero} id="top" aria-labelledby="hero-title">
      <div className={`${styles.imageSurface} ${styles.heroImage}`} role="img" aria-label="Barber giving a fade in a busy Benin City barbershop" />
      <div className={styles.heroShade} aria-hidden="true" />
      <div className={styles.heroContent}>
        <span className={styles.tag}>BARBERSHOP · BENIN CITY</span>
        <h1 id="hero-title">{shop.name}</h1>
        <p>{shop.tagline}</p>
        <BookLink label="Book a cut" />
      </div>
      <div className={styles.poleStripe} aria-hidden="true" />
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
        {cuts.map((cut) => (
          <article className={styles.cutCard} key={cut.title}>
            <div className={`${styles.imageSurface} ${styles.cardImage} ${cut.imageClass}`} role="img" aria-label={cut.image} />
            <div className={styles.cardCopy}>
              <h3>{cut.title}</h3>
              <p>{cut.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function BestTimes() {
  return (
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
  );
}

function HomeService() {
  return (
    <section className={`${styles.section} ${styles.splitSection}`} id="home" aria-labelledby="home-title">
      <div className={styles.splitCopy}>
        <span className={styles.tag}>A HOME SERVICE WHEN YOU NEED IT</span>
        <h2 id="home-title">Home service</h2>
        <p>Send us your request and your area. The shop will contact you to confirm a time.</p>
        <BookLink label="Book now" />
      </div>
      <div className={`${styles.imageSurface} ${styles.wideImage} ${styles.homeImage}`} role="img" aria-label="A barber with a kit bag cutting hair in a home compound" />
    </section>
  );
}

function VisitInfo() {
  return (
    <section className={`${styles.section} ${styles.splitSection} ${styles.visitSection}`} id="visit" aria-labelledby="visit-title">
      <div className={styles.splitCopy}>
        <span className={styles.tag}>FIND US</span>
        <h2 id="visit-title">Find us</h2>
        <p>{shop.name}, {shop.address}</p>
        <p className={styles.hours}>Hours: {shop.hours}</p>
      </div>
      <div className={styles.addressPanel} aria-label="Sharp Cutz location">
        <span className={styles.locationMark} aria-hidden="true">●</span>
        <span>{shop.address}</span>
      </div>
    </section>
  );
}

function BookCta() {
  return (
    <section className={styles.bookCta} id="book" aria-labelledby="book-title">
      <span className={styles.tag}>BOOK A CUT</span>
      <h2 id="book-title">Ready for a fresh cut?</h2>
      <p>Tell us when you'd like to come.</p>
      <BookLink label="Book now" />
    </section>
  );
}

function Footer() {
  return <footer className={styles.footer}>{shop.name} · {shop.owner} · {shop.address}</footer>;
}

export default function Home() {
  return (
    <main className={styles.page}>
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
        <BookLink label="Book a cut" />
      </div>
      <button className={styles.chatButton} type="button" aria-label="Chat with Sharp Cutz Assistant">
        Chat
      </button>
    </main>
  );
}
