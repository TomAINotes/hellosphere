import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    return NextResponse.json(
      { error: 'Email is not configured. Add GMAIL_USER and GMAIL_APP_PASSWORD to .env.local.' },
      { status: 500 },
    );
  }

  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { name, email, phone, date, eventType, location, guests, pkg, message } = body;

  if (!name || !email) {
    return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body  { font-family: Arial, sans-serif; background: #f5f5f5; margin: 0; padding: 0; }
    .wrap { max-width: 580px; margin: 32px auto; background: #fff;
            border-radius: 8px; overflow: hidden;
            box-shadow: 0 4px 24px rgba(0,0,0,0.10); }
    .hdr  { background: #0a0a0a; padding: 28px 32px; }
    .hdr h1 { color: #E5C07B; font-size: 22px; margin: 0; letter-spacing: 4px; }
    .hdr p  { color: rgba(255,255,255,0.5); font-size: 11px;
              letter-spacing: 3px; text-transform: uppercase; margin: 4px 0 0; }
    .body { padding: 32px; }
    table { width: 100%; border-collapse: collapse; }
    td    { padding: 10px 0; vertical-align: top; border-bottom: 1px solid #f0f0f0; }
    td:first-child { width: 38%; font-size: 11px; text-transform: uppercase;
                     letter-spacing: 2px; color: #999; padding-right: 16px; }
    td:last-child  { font-size: 14px; color: #111; font-weight: 500; }
    .msg  { margin-top: 24px; padding: 16px; background: #f9f9f9;
            border-radius: 6px; font-size: 14px; color: #444; line-height: 1.6; }
    .ftr  { padding: 20px 32px; text-align: center;
            font-size: 11px; color: #bbb; letter-spacing: 2px; }
  </style>
</head>
<body>
<div class="wrap">
  <div class="hdr">
    <h1>⚡ SHON FLASH</h1>
    <p>New Booking Inquiry</p>
  </div>
  <div class="body">
    <table>
      <tr><td>Name</td>      <td>${name}</td></tr>
      <tr><td>Email</td>     <td><a href="mailto:${email}">${email}</a></td></tr>
      ${phone    ? `<tr><td>Phone</td><td>${phone}</td></tr>` : ''}
      ${date     ? `<tr><td>Event Date</td><td>${date}</td></tr>` : ''}
      ${eventType? `<tr><td>Event Type</td><td>${eventType}</td></tr>` : ''}
      ${location ? `<tr><td>Location</td><td>${location}</td></tr>` : ''}
      ${guests   ? `<tr><td>Guest Count</td><td>${guests}</td></tr>` : ''}
      ${pkg      ? `<tr><td>Package</td><td>${pkg}</td></tr>` : ''}
    </table>
    ${message ? `<div class="msg"><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</div>` : ''}
  </div>
  <div class="ftr">SHON FLASH · Premium DJ Experiences · New York</div>
</div>
</body>
</html>
  `.trim();

  try {
    await transporter.sendMail({
      from:    `"SHON FLASH Website" <${process.env.GMAIL_USER}>`,
      to:      process.env.GMAIL_USER,
      replyTo: email,
      subject: `📩 New Inquiry: ${eventType ?? 'Event'} — ${name}${date ? ` · ${date}` : ''}`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[contact] Gmail send error:', err);
    return NextResponse.json({ error: 'Failed to send email. Check server logs.' }, { status: 500 });
  }
}
