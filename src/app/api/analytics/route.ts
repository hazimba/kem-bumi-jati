import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL! || "https://mlapxffieyehdpvuzsyw.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY! || "sb_publishable_ZOmLKMqnmBsr9RgREljNkw_D9-H3i0x"
);

const VISIT_WINDOW_MS = 5 * 60 * 60 * 1000; // 5 hours
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function isPrivateIp(ip: string): boolean {
  const v = ip.replace(/^::ffff:/i, "");
  return (
    v === "::1" ||
    v.startsWith("127.") ||
    v.startsWith("10.") ||
    v.startsWith("192.168.") ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(v) ||
    v.startsWith("169.254.") ||
    /^f[cd][0-9a-f]{2}:/i.test(v) ||
    v.startsWith("fe80:")
  );
}

function getClientIp(request: Request): string | null {
  const h = request.headers;

  // Single-value headers set by the platform/CDN (most trustworthy first)
  const direct = h.get("cf-connecting-ip") || h.get("x-vercel-forwarded-for") || h.get("x-real-ip") || h.get("true-client-ip");
  if (direct && !isPrivateIp(direct.trim())) return direct.trim();

  // Chain header: take the first public IP in the list
  const xff = h.get("x-forwarded-for");
  if (xff) {
    for (const part of xff.split(",")) {
      const ip = part.trim().replace(/^::ffff:/i, "");
      if (ip && !isPrivateIp(ip)) return ip;
    }
  }
  return null;
}

export async function POST(request: Request) {
  try {
    const { url, visitorId } = await request.json();

    if (typeof visitorId !== "string" || !UUID_RE.test(visitorId)) {
      return NextResponse.json({ success: false, error: "invalid visitorId" }, { status: 400 });
    }

    const ip = getClientIp(request);
    if (!ip) {
      // Helps you debug proxy config in production logs
      console.warn("No public client IP found. Headers:", {
        xff: request.headers.get("x-forwarded-for"),
        xri: request.headers.get("x-real-ip"),
        cf: request.headers.get("cf-connecting-ip"),
      });
      return NextResponse.json({ success: true, skipped: true });
    }

    const since = new Date(Date.now() - VISIT_WINDOW_MS).toISOString();
    const { data: recent, error: checkError } = await supabase
      .from("site_visitors")
      .select("id")
      .eq("visitor_id", visitorId)
      .gte("visited_at", since)
      .limit(1);

    if (checkError) {
      console.error("Analytics check error:", checkError);
      return NextResponse.json({ success: false, error: checkError.message }, { status: 500 });
    }
    if (recent && recent.length > 0) {
      return NextResponse.json({ success: true, skipped: true });
    }

    const h = request.headers;
    const rawCity = h.get("x-vercel-ip-city") || h.get("cf-ipcity") || "";
    let city = rawCity ? decodeURIComponent(rawCity) : "";
    const country = h.get("x-vercel-ip-country") || h.get("cf-ipcountry") || "";
    const region = h.get("x-vercel-ip-country-region") || h.get("cf-region") || "";

    if (!city) {
      try {
        const geoRes = await fetch(`http://ip-api.com/json/${ip}?fields=status,city`, {
          signal: AbortSignal.timeout(2000),
        });
        if (geoRes.ok) {
          const geoData = await geoRes.json();
          if (geoData.status === "success" && geoData.city) city = geoData.city;
        }
      } catch {
        // ignore geo failure
      }
    }
    if (!city) city = "Lain-lain / Tidak diketahui";

    const { error } = await supabase.from("site_visitors").insert({
      ip_address: ip,
      visitor_id: visitorId,
      url: url || "/",
      city,
      country,
      region,
    });

    if (error) {
      console.error("Analytics insert error:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
