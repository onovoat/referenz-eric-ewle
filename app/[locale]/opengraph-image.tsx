import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Eric Ewle – IT Personalberatung';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const BEIGE  = '#F5F0E8';
const NAVY   = '#1A2744';
const TEAL   = '#0d4a52';
const DARK   = '#0f1923';
const MUTED  = '#6b7280';

// Profilfoto aus Directus (foto_ueber_uns UUID)
const PHOTO_URL =
  'https://cms.onovo.at/assets/8448c2a3-41e0-4b25-9e54-2d28bcd9a79d';

export default async function Image() {
  // Load Inter from Bunny Fonts (privacy-friendly Google Fonts mirror)
  const [fontRegular, fontBold] = await Promise.all([
    fetch('https://fonts.bunny.net/inter/files/inter-latin-400-normal.woff2').then(r => r.arrayBuffer()),
    fetch('https://fonts.bunny.net/inter/files/inter-latin-700-normal.woff2').then(r => r.arrayBuffer()),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: 1200,
          height: 630,
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {/* ── LEFT COLUMN (60%) — Beige ── */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: 720,
            height: 630,
            backgroundColor: BEIGE,
            padding: '56px 60px 48px 68px',
            position: 'relative',
          }}
        >
          {/* Left accent stripe */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: 5,
              height: 630,
              backgroundColor: TEAL,
            }}
          />

          {/* "EE" badge + label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 44 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 44,
                height: 44,
                borderRadius: 8,
                backgroundColor: TEAL,
                color: '#fdf8f0',
                fontSize: 15,
                fontWeight: 700,
                letterSpacing: '-0.5px',
              }}
            >
              EE
            </div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: TEAL,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              IT Personalberatung
            </div>
          </div>

          {/* Name */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: DARK,
              lineHeight: 1.05,
              marginBottom: 8,
            }}
          >
            Eric Ewle
          </div>

          {/* Role */}
          <div
            style={{
              fontSize: 20,
              fontWeight: 400,
              color: TEAL,
              marginBottom: 28,
              letterSpacing: '0.02em',
            }}
          >
            Recruiting · Oberösterreich &amp; Wien
          </div>

          {/* Separator */}
          <div
            style={{
              width: 56,
              height: 2,
              backgroundColor: TEAL,
              marginBottom: 32,
            }}
          />

          {/* Slogan */}
          <div
            style={{
              fontSize: 30,
              fontWeight: 400,
              color: '#2d3748',
              lineHeight: 1.45,
              flex: 1,
            }}
          >
            Menschen verbinden.{'\n'}Erfolg gestalten.
          </div>

          {/* Bottom row */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: 20,
              borderTop: '1px solid rgba(13,74,82,0.18)',
            }}
          >
            <div style={{ fontSize: 14, color: MUTED, fontWeight: 400 }}>
              eric-ewle.onovo.at
            </div>
            <div style={{ fontSize: 12, color: '#9ca3af' }}>by onovo.at</div>
          </div>
        </div>

        {/* ── RIGHT COLUMN (40%) — Navy mit Foto ── */}
        <div
          style={{
            display: 'flex',
            width: 480,
            height: 630,
            backgroundColor: NAVY,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Subtle geometric dot pattern */}
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              width: 480,
              height: 630,
              opacity: 0.05,
              backgroundImage:
                'radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />

          {/* Profile photo — circle */}
          <div
            style={{
              display: 'flex',
              width: 300,
              height: 300,
              borderRadius: 150,
              overflow: 'hidden',
              border: '3px solid rgba(253,248,240,0.18)',
              position: 'relative',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PHOTO_URL}
              width={300}
              height={300}
              alt="Eric Ewle"
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
            />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Inter', data: fontRegular, weight: 400, style: 'normal' },
        { name: 'Inter', data: fontBold,    weight: 700, style: 'normal' },
      ],
    }
  );
}
