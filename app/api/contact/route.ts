import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

/* Das Formular laesst nur PDF zu (accept=".pdf" in components/Contact.tsx).
   Beide Grenzen sind dort gespiegelt, Aenderungen hier also auch dort nachziehen. */
const ANHANG_MAX_BYTES = 5 * 1024 * 1024;
const ANHANG_TYPEN = ['application/pdf'];

const PFLICHT_ENV = ['RESEND_API_KEY', 'TURNSTILE_SECRET_KEY', 'RESEND_FROM', 'CONTACT_EMAIL'] as const;

const EMAIL_MUSTER = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

/* Jeder Formularwert landet in der Mail an Eric. Ohne Escaping schreibt ein
   Absender dort eigenes Markup hinein, etwa einen Link, der aussieht als
   stamme er von der eigenen Website. */
function escapeHtml(wert: string): string {
  return wert
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function einzeilig(wert: string): string {
  return wert.replace(/[\r\n]+/g, ' ').trim();
}

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
  const data = (await res.json()) as { success: boolean; 'error-codes'?: string[] };
  /* Die Fehlercodes sind der einzige Weg, ein falsch gepaartes Widget von einem
     abgelaufenen Token zu unterscheiden. Ohne sie steht im Log nur "400". */
  if (!data.success) {
    console.warn('Turnstile abgelehnt:', (data['error-codes'] ?? []).join(', ') || 'ohne Code');
  }
  return data.success;
}

export async function POST(req: NextRequest) {
  const fehlendeEnv = PFLICHT_ENV.filter((name) => !process.env[name]);
  if (fehlendeEnv.length > 0) {
    console.error('Kontaktformular nicht konfiguriert, fehlt:', fehlendeEnv.join(', '));
    return NextResponse.json({ error: 'Formular ist nicht konfiguriert.' }, { status: 500 });
  }

  /* Vor dem Parsen pruefen: formData() zieht den Koerper vollstaendig in den
     RAM, die Pruefung am File-Objekt kaeme dafuer zu spaet. */
  const angekuendigt = Number(req.headers.get('content-length') ?? 0);
  if (angekuendigt > ANHANG_MAX_BYTES + 64 * 1024) {
    return NextResponse.json({ error: 'Der Anhang ist zu groß (maximal 5 MB).' }, { status: 413 });
  }

  try {
    const formData = await req.formData();

    const turnstileToken = formData.get('turnstileToken') as string;
    const valid = await verifyTurnstile(turnstileToken);
    if (!valid) {
      return NextResponse.json({ error: 'Sicherheitscheck fehlgeschlagen.' }, { status: 400 });
    }

    const feld = (name: string) => einzeilig(String(formData.get(name) ?? ''));
    const firstname = feld('firstname');
    const lastname = feld('lastname');
    const company = feld('company');
    const email = feld('email');
    const phone = feld('phone');
    const need = feld('need');
    const message = String(formData.get('message') ?? '').trim();

    /* company ist im Formular als optional ausgewiesen und traegt kein required.
       Bewerber ohne eigene Firma muessen absenden koennen. */
    if (!firstname || !lastname || !email) {
      return NextResponse.json({ error: 'Pflichtfelder fehlen.' }, { status: 400 });
    }
    if (!EMAIL_MUSTER.test(email)) {
      return NextResponse.json(
        { error: 'Bitte eine gültige E-Mail-Adresse angeben.' }, { status: 400 });
    }

    const attachments: Array<{ filename: string; content: Buffer }> = [];
    const attachmentFile = formData.get('attachment') as File | null;
    if (attachmentFile && attachmentFile.size > 0) {
      if (attachmentFile.size > ANHANG_MAX_BYTES) {
        return NextResponse.json({ error: 'Der Anhang ist zu groß (maximal 5 MB).' }, { status: 413 });
      }
      if (!ANHANG_TYPEN.includes(attachmentFile.type)) {
        return NextResponse.json({ error: 'Als Anhang ist nur ein PDF möglich.' }, { status: 415 });
      }
      const bytes = await attachmentFile.arrayBuffer();
      attachments.push({
        filename: einzeilig(attachmentFile.name).slice(0, 120) || 'anhang.pdf',
        content: Buffer.from(bytes),
      });
    }

    const e = escapeHtml;
    /* Resend wirft bei abgelehnten Mails nicht, sondern antwortet mit error.
       Ohne diese Pruefung liest der Besucher "Vielen Dank", waehrend die
       Anfrage nie ankommt. Genau so verhielt sich der Endpunkt bis 26.09.2026. */
    const { error: sendeFehler } = await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: process.env.CONTACT_EMAIL!,
      replyTo: email,
      subject: `Neue Kontaktanfrage: ${firstname} ${lastname}${company ? ` – ${company}` : ''}`,
      html: `
        <h2 style="color:#0d4a52;font-family:sans-serif;">Neue Kontaktanfrage</h2>
        <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;width:100%">
          <tr><td style="padding:6px 0;color:#666;width:140px;">Name</td><td style="padding:6px 0;font-weight:600">${e(firstname)} ${e(lastname)}</td></tr>
          ${company ? `<tr><td style="padding:6px 0;color:#666">Unternehmen</td><td style="padding:6px 0;font-weight:600">${e(company)}</td></tr>` : ''}
          <tr><td style="padding:6px 0;color:#666">E-Mail</td><td style="padding:6px 0"><a href="mailto:${e(email)}">${e(email)}</a></td></tr>
          ${phone ? `<tr><td style="padding:6px 0;color:#666">Telefon</td><td style="padding:6px 0">${e(phone)}</td></tr>` : ''}
          ${need ? `<tr><td style="padding:6px 0;color:#666">Personalbedarf</td><td style="padding:6px 0">${e(need)}</td></tr>` : ''}
        </table>
        ${message ? `<hr style="margin:16px 0;border:none;border-top:1px solid #eee"><p style="font-family:sans-serif;font-size:14px;color:#333">${e(message).replace(/\n/g, '<br>')}</p>` : ''}
      `,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    if (sendeFehler) {
      console.error('Resend hat die Mail abgelehnt:', sendeFehler.name, sendeFehler.message);
      return NextResponse.json({ error: 'Interner Fehler.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json({ error: 'Interner Fehler.' }, { status: 500 });
  }
}
