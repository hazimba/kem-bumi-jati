import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL! || "https://mlapxffieyehdpvuzsyw.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY! || "sb_publishable_ZOmLKMqnmBsr9RgREljNkw_D9-H3i0x"
);

export async function POST(request: Request) {
  try {
    const { url, visitorId } = await request.json();

    // Extract IP address from headers
    const forwardedFor = request.headers.get("x-forwarded-for");
    console.log("Forwarded For Header:", forwardedFor); // Debugging line
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

    // Extract city from Vercel headers if deployed
    let city = request.headers.get("x-vercel-ip-city") || request.headers.get("cf-ipcity") || "";
    console.log("City Header:", city); // Debugging line
    const country = request.headers.get("cf-ipcountry") || "";
    const region = request.headers.get("cf-region") || "";

    // If local or missing city header, fetch city from free IP geolocation service
    if (!city && ip && ip !== "127.0.0.1" && ip !== "::1") {
      try {
        const geoRes = await fetch(`http://ip-api.com/json/${ip}?fields=status,city`, {
          signal: AbortSignal.timeout(2000),
        });
        if (geoRes.ok) {
          const geoData = await geoRes.json();
          if (geoData.status === "success" && geoData.city) {
            city = geoData.city;
          }
        }
      } catch {
        // Fallback silently if geo lookup fails
      }
    }

    if (!city) {
      city = ip === "127.0.0.1" || ip === "::1" ? "Localhost / Test" : "Lain-lain / Tidak diketahui";
    }

    const { error } = await supabase.from("site_visitors").insert({
      ip_address: ip,
      visitor_id: visitorId,
      url: url || "/",
      city: city,
      country: country,
      region: region,
      // timezone: timezone,
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
