# Sharp Cutz Website

A one-page website for **Sharp Cutz**, a barbershop on Sapele Road, Benin City (owner: Mr Osaro Ehigie). It tells customers the best time to come, lets them send a booking request, and answers common questions with a chatbot.

Built with Next.js, Supabase and Botpress. Dark brass design. Works on phones and desktops.

## The problem it solves

Customers wait too long on Saturdays and some leave. The site shows the best times to come and takes booking requests, so the shop can reply and confirm a time.

## Features

- One scrolling page with seven sections: Hero, Our cuts, Best times, Home service, Find us, Book, Footer
- Booking popup opened by every Book button
- Booking requests saved to a Supabase table the shop can read
- Botpress chatbot widget (Sharp Cutz Assistant)
- Subtle animation, including a slow barber-pole stripe
- Sticky Book bar on phones, top bar with Book button on desktop
- Reduced-motion support and keyboard-friendly popup

## The never rule

The site and the chatbot **never confirm a time**. They never promise a home-service time. The shop contacts the customer to confirm. Do not add prices, time slots, staff cards or a calendar.

## Tech stack

| Part | Tool |
| --- | --- |
| Framework | Next.js (App Router), TypeScript |
| Styling | CSS Modules and CSS variables |
| Animation | CSS transitions and the `motion` package |
| Fonts | Space Grotesk (headings, labels, buttons), Hanken Grotesk (body) |
| Database | Supabase (Postgres) |
| Chatbot | Botpress webchat |
| Hosting | Vercel |

## Getting started

Requirements: current Node.js LTS and a free Supabase account.

```bash
git clone [YOUR REPO URL]
cd sharp-cutz
npm install
```

Create a file named `.env.local` in the project root:

```bash
SUPABASE_URL=[your project URL]
SUPABASE_SERVICE_ROLE_KEY=[your service role key]
```

These are server-only secrets. Never prefix them with `NEXT_PUBLIC` and never commit `.env.local`.

Run the site:

```bash
npm run dev
```

Open http://localhost:3000.

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the local site |
| `npm run build` | Build for production |
| `npm run start` | Run the production build |
| `npm run lint` | Check the code |

## Set up Supabase

1. Create a project at supabase.com.
2. Open the SQL editor and run:

```sql
create table bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  phone text not null,
  service text not null check (service in ('Shop cut','Kids'' cut','Home service')),
  preferred_day text not null check (preferred_day in ('Weekday afternoon','Friday','Saturday','Sunday','Not sure')),
  area text,
  note text,
  status text not null default 'new' check (status in ('new','contacted','confirmed','cancelled'))
);

alter table bookings enable row level security;
```

3. Copy the project URL and the service role key from the project settings into `.env.local`.
4. Add no policies. The public key must not be able to read or write the table. The server route uses the service role key.

The shop reads new requests in the Supabase table view and changes `status` as it follows up.

## How booking works

1. A customer taps any Book button. The popup opens.
2. They enter name, phone, service, preferred day, area (home service only) and an optional note.
3. The form posts to `app/api/book/route.ts`.
4. The route checks every field on the server and inserts a row into `bookings`.
5. The popup says: "Thanks. The shop will contact you to confirm a time."

A hidden spam field is ignored if filled. Phone numbers must have 7 to 15 digits.

## Project structure

```text
sharp-cutz/
  app/
    layout.tsx           fonts, metadata, chatbot script
    page.tsx             sections in order
    globals.css          colour and type variables
    api/book/route.ts    saves a booking to Supabase
  components/            Hero, CutsGrid, BestTimes, HomeService, VisitInfo,
                         BookCta, Footer, TopBar, StickyBook, BookingProvider,
                         BookButton, BookingModal, Reveal, PoleStripe
  lib/
    config.ts            shop name, hours, contact
    supabase.ts          server-side Supabase client
  public/images/         hero.jpg, shop-cuts.jpg, kids-cuts.jpg, home-service.jpg
```

## Change shop details

Edit `lib/config.ts`. The opening hours and contact appear across the site from this one file.

## Chatbot

The bot is built in Botpress. To add it:

1. Publish the bot in Botpress and copy the webchat embed snippet.
2. Load it in `app/layout.tsx` with the Next.js `Script` component, strategy `afterInteractive`.
3. Check the widget does not cover the sticky Book bar or the popup's Send button on a 360 px screen.

The Book button must still work if the widget fails to load.

## Design

Sharp Cutz Grooming Atelier: dark and modern, with brass accents.

| Name | Value | Used for |
| --- | --- | --- |
| Obsidian | `#121214` | Page background |
| Carbon | `#1A1B1F` | Cards |
| Hairline | `#2C2E35` | 1 px borders |
| Brass | `#D4AF37` | Book buttons, accents |
| Steel | `#E6E6EB` | Text |
| Slate | `#8A8D98` | Muted text |
| Leather | `#8C6239` | Small tags |
| Copper | `#C2593F` | Warnings |
| Pole red | `#C8372D` | Barber-pole stripe only |

Buttons have 4 px corners, cards 8 px at most, with no soft shadows.

## Images

Four AI images in one style: `hero.jpg` (1600 x 900), `shop-cuts.jpg`, `kids-cuts.jpg`, `home-service.jpg` (800 x 600 each). Keep the hero under 200 KB and the others under 100 KB. Every image prompt is saved in the prompt log.

Style line for every prompt: realistic photo, soft natural light, warm brass and amber tones, dark moody background, Benin City, Nigeria.

## Deploy

1. Push the code to GitHub.
2. Import the repo in Vercel.
3. Add `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in the Vercel project's environment variables.
4. Deploy, then send a test booking from the live site and check it appears in Supabase.
5. Open the live link on a second phone.

## Checklist before hand-in

- [ ] Hero says what the shop does in one line
- [ ] All seven sections present, with real words and no lorem ipsum
- [ ] Every Book button opens the popup
- [ ] A test booking appears in Supabase
- [ ] The public key cannot read the `bookings` table
- [ ] No secret keys in the browser or on GitHub
- [ ] Looks right at 360, 768, 1024 and 1440 px
- [ ] Reduced motion turns all movement off
- [ ] Chatbot passes the ten test questions and refuses to confirm a home-service time
- [ ] Live link works on another phone

## Credits

Built for the AG Southern AI class capstone. Client: Sharp Cutz, Sapele Road, Benin City.
