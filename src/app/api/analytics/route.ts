import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL! || "https://mlapxffieyehdpvuzsyw.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY! || "sb_publishable_ZOmLKMqnmBsr9RgREljNkw_D9-H3i0x"
);
const VISIT_WINDOW_MS = 5 * 60 * 60 * 1000; // 5 hours
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function POST(request: Request) {
  try {
    const { url, visitorId } = await request.json();
    console.log("Analytics POST request:", { url, visitorId });

    if (typeof visitorId !== "string" || !UUID_RE.test(visitorId)) {
      return NextResponse.json({ success: false, error: "invalid visitorId" }, { status: 400 });
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

    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";
    const isLocal = ip === "127.0.0.1" || ip === "::1";
    // if (isLocal) {
    //   return NextResponse.json({ success: true, skipped: true });
    // }

    const rawCity = request.headers.get("x-vercel-ip-city") || request.headers.get("cf-ipcity") || "";
    let city = rawCity ? decodeURIComponent(rawCity) : "";
    const country = request.headers.get("x-vercel-ip-country") || request.headers.get("cf-ipcountry") || "";
    const region = request.headers.get("x-vercel-ip-country-region") || request.headers.get("cf-region") || "";

    if (!city && !isLocal) {
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

    if (!city) city = isLocal ? "Localhost / Test" : "Lain-lain / Tidak diketahui";

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
