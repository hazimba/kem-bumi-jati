"use server";

export type CalendarEvent = {
  id: string;
  summary: string;
  description?: string;
  start: string;
  end: string;
  isAllDay: boolean;
};

export async function fetchGoogleCalendarEvents(): Promise<{ events: CalendarEvent[]; error?: string }> {
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  const apiKey = process.env.GOOGLE_CALENDAR_API_KEY;

  console.log("Calendar ID present:", !!calendarId, calendarId);
  console.log("API Key present:", !!apiKey);

  if (!calendarId || !apiKey) {
    return {
      events: [],
      error: "Google Calendar API Key or Calendar ID is missing in environment variables (.env.local).",
    };
  }

  try {
    const now = new Date();
    const timeMin = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString();

    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
      calendarId
    )}/events?key=${apiKey}&timeMin=${timeMin}&singleEvents=true&orderBy=startTime&maxResults=250`;

    const res = await fetch(url, { cache: "no-store" });

    console.log("Google Calendar API Response Status:", res.status, res.statusText);

    if (!res.ok) {
      const responseText = await res.text();

      let errorMessage = `Google Calendar API failed (${res.status} ${res.statusText})`;

      try {
        const errorData = JSON.parse(responseText);

        errorMessage = errorData?.error?.message || errorData?.error?.errors?.[0]?.message || errorMessage;

        console.error("Google Calendar API Error:", {
          status: res.status,
          statusText: res.statusText,
          error: errorData,
        });
      } catch {
        console.error("Google Calendar API returned a non-JSON response:", responseText);
      }

      return {
        events: [],
        error: errorMessage,
      };
    }

    const data = await res.json();

    const events: CalendarEvent[] = (data.items || []).map((item: any) => ({
      id: item.id,
      summary: item.summary || "Tempahan Kem",
      description: item.description || "",
      start: item.start.dateTime || item.start.date,
      end: item.end.dateTime || item.end.date,
      isAllDay: !item.start.dateTime,
    }));

    return { events };
  } catch (err: any) {
    console.error("Google Calendar Fetch Exception:", err);
    return { events: [], error: err.message || "An unexpected error occurred while fetching events." };
  }
}
