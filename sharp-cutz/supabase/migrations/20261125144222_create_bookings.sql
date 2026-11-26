create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(btrim(name)) between 2 and 60),
  phone text not null check (
    phone ~ '^\+?[0-9[:space:]]+$'
    and char_length(regexp_replace(phone, '[^0-9]', '', 'g')) between 7 and 15
  ),
  service text not null check (service in ('Shop cut', 'Kids'' cut', 'Home service')),
  preferred_day text not null check (
    preferred_day in ('Weekday afternoon', 'Friday', 'Saturday', 'Sunday', 'Not sure')
  ),
  area text check (area is null or char_length(btrim(area)) between 1 and 80),
  note text check (note is null or char_length(note) <= 300),
  status text not null default 'new' check (
    status in ('new', 'contacted', 'confirmed', 'cancelled')
  )
);

alter table public.bookings enable row level security;

revoke all on table public.bookings from public, anon, authenticated;
grant all on table public.bookings to service_role;
