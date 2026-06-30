import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

async function verifyTurnstile(token: string): Promise<boolean> {
  if (!token) return false;
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret: process.env.TURNSTILE_SECRET_KEY!,
      response: token,
    }),
  });
  const data = (await res.json()) as { success: boolean };
  return data.success;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const turnstileToken = formData.get('turnstileToken') as string;
    const valid = await verifyTurnstile(turnstileToken);
    if (!valid) {
      return NextResponse.json({ error: 'Sicherheitscheck fehlgeschlagen.' }, { status: 400 });
    }

    const firstname = formData.get('firstname') as string;
    const lastname = formData.get('lastname') as string;
    const company = formData.get('company') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const need = formData.get('need') as string;
    const message = formData.get('message') as string;

    if (!firstname || !lastname || !company || !email) {
      return NextResponse.json({ error: 'Pflichtfelder fehlen.' }, { status: 400 });
    }

    const attachments: Array<{ filename: string; content: Buffer }> = [];
    const attachmentFile = formData.get('attachment') as File | null;
    if (attachmentFile && attachmentFile.size > 0) {
      const bytes = await attachmentFile.arrayBuffer();
      attachments.push({
        filename: attachmentFile.name,
        content: Buffer.from(bytes),
      });
    }

    await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: process.env.CONTACT_EMAIL!,
      replyTo: email,
      subject: `Neue Kontaktanfrage: ${firstname} ${lastname} – ${company}`,
      html: `
        <h2 style="color:#0d4a52;font-family:sans-serif;">Neue Kontaktanfrage</h2>
        <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;width:100%">
          <tr><td style="padding:6px 0;color:#666;width:140px;">Name</td><td style="padding:6px 0;font-weight:600">${firstname} ${lastname}</td></tr>
          <tr><td style="padding:6px 0;color:#666">Unternehmen</td><td style="padding:6px 0;font-weight:600">${company}</td></tr>
          <tr><td style="padding:6px 0;color:#666">E-Mail</td><td style="padding:6px 0"><a href="mailto:${email}">${email}</a></td></tr>
          ${phone ? `<tr><td style="padding:6px 0;color:#666">Telefon</td><td style="padding:6px 0">${phone}</td></tr>` : ''}
          ${need ? `<tr><td style="padding:6px 0;color:#666">Personalbedarf</td><td style="padding:6px 0">${need}</td></tr>` : ''}
        </table>
        ${message ? `<hr style="margin:16px 0;border:none;border-top:1px solid #eee"><p style="font-family:sans-serif;font-size:14px;color:#333">${message.replace(/\n/g, '<br>')}</p>` : ''}
      `,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json({ error: 'Interner Fehler.' }, { status: 500 });
  }
}
