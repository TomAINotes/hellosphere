import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const year  = parseInt(searchParams.get('year')  ?? String(new Date().getFullYear()));
  const month = parseInt(searchParams.get('month') ?? String(new Date().getMonth()));

  // If credentials aren't configured yet, return empty so calendar shows all available
  if (
    !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ||
    !process.env.GOOGLE_PRIVATE_KEY ||
    !process.env.GOOGLE_CALENDAR_ID
  ) {
    return NextResponse.json({ booked: [], limited: [] });
  }

  try {
    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key:   process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
    });

    const calendar = google.calendar({ version: 'v3', auth });

    // First and last moment of the requested month
    const timeMin = new Date(year, month, 1).toISOString();
    const timeMax = new Date(year, month + 1, 0, 23, 59, 59).toISOString();

    const res = await calendar.events.list({
      calendarId:  process.env.GOOGLE_CALENDAR_ID,
      timeMin,
      timeMax,
      singleEvents: true,
      orderBy:      'startTime',
    });

    const events = res.data.items ?? [];

    // Count how many events fall on each day of the month
    const counts: Record<number, number> = {};
    for (const ev of events) {
      const raw = ev.start?.date ?? ev.start?.dateTime;
      if (!raw) continue;
      // date-only strings ("2025-06-15") need to be parsed as local midnight
      const d = raw.includes('T')
        ? new Date(raw)
        : new Date(raw + 'T00:00:00');
      const day = d.getDate();
      counts[day] = (counts[day] ?? 0) + 1;
    }

    // 1 event → "limited availability", 2+ → "booked"
    const booked:  number[] = [];
    const limited: number[] = [];

    for (const [dayStr, count] of Object.entries(counts)) {
      const day = parseInt(dayStr);
      if (count >= 2) booked.push(day);
      else limited.push(day);
    }

    return NextResponse.json({ booked, limited });
  } catch (err) {
    console.error('[availability] Google Calendar error:', err);
    // Fail silently — don't break the page
    return NextResponse.json({ booked: [], limited: [] });
  }
}
