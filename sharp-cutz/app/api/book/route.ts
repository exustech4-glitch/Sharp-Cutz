import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

const SERVICES = ["Shop cut", "Kids' cut", "Home service"] as const;
const DAYS = ["Weekday afternoon", "Friday", "Saturday", "Sunday", "Not sure"] as const;

function bad(field: string, status = 400) {
  return NextResponse.json({ ok: false, field }, { status });
}

function field(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return bad("origin", 403);

  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > 8_000) return bad("body", 413);

  const body: unknown = await request.json().catch(() => null);
  if (!body || typeof body !== "object" || Array.isArray(body)) return bad("body");

  const values = body as Record<string, unknown>;
  if (field(values.website)) return NextResponse.json({ ok: true });

  const name = field(values.name);
  const phone = field(values.phone);
  const digits = phone.replace(/\D/g, "");
  const service = field(values.service);
  const preferredDay = field(values.preferred_day);
  const areaInput = field(values.area);
  const note = field(values.note);

  if (name.length < 2 || name.length > 60) return bad("name");
  if (!/^\+?[0-9\s]+$/.test(phone) || digits.length < 7 || digits.length > 15) return bad("phone");
  if (!SERVICES.includes(service as (typeof SERVICES)[number])) return bad("service");
  if (!DAYS.includes(preferredDay as (typeof DAYS)[number])) return bad("preferred_day");
  if (service === "Home service" && (areaInput.length < 1 || areaInput.length > 80)) return bad("area");
  if (areaInput.length > 80) return bad("area");
  if (note.length > 300) return bad("note");

  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("bookings").insert({
      name,
      phone,
      service,
      preferred_day: preferredDay,
      area: service === "Home service" ? areaInput : null,
      note: note || null,
    });

    if (error) {
      console.error("Booking request could not be saved:", error.code);
      return bad("save", 500);
    }
  } catch {
    return bad("configuration", 503);
  }

  return NextResponse.json({ ok: true });
}
