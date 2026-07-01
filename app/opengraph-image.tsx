import { ImageResponse } from 'next/og';

export const alt = 'Eric Ewle | IT Personalberatung';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const BEIGE = '#F5F0E8';
const NAVY  = '#1A2744';
const TEAL  = '#1a2c4e';
const DARK  = '#0f1923';
const MUTED = '#6b7280';

const PHOTO_URL = 'https://cms.onovo.at/assets/8448c2a3-41e0-4b25-9e54-2d28bcd9a79d';

export default async function Image() {
  return new ImageResponse(
    (
      <div style={{ display: 'flex', width: 1200, height: 630, fontFamily: 'sans-serif' }}>

        {/* LEFT COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', width: 720, height: 630, backgroundColor: BEIGE, padding: '56px 60px 48px 68px', position: 'relative' }}>

          <div style={{ position: 'absolute', left: 0, top: 0, width: 5, height: 630, backgroundColor: TEAL, display: 'flex' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 44 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, borderRadius: 8, backgroundColor: TEAL, color: '#fdf8f0', fontSize: 15, fontWeight: 700 }}>
              EE
            </div>
            <div style={{ display: 'flex', fontSize: 12, fontWeight: 600, color: TEAL, letterSpacing: '0.12em' }}>
              IT Personalberatung
            </div>
          </div>

          <div style={{ display: 'flex', fontSize: 72, fontWeight: 700, color: DARK, lineHeight: 1.05, marginBottom: 8 }}>
            Eric Ewle
          </div>

          <div style={{ display: 'flex', fontSize: 20, fontWeight: 400, color: TEAL, marginBottom: 28, letterSpacing: '0.02em' }}>
            Recruiting · Wien &amp; Oberösterreich
          </div>

          <div style={{ display: 'flex', width: 56, height: 2, backgroundColor: TEAL, marginBottom: 32 }} />

          <div style={{ display: 'flex', flexDirection: 'column', fontSize: 30, fontWeight: 400, color: '#2d3748', lineHeight: 1.45, flex: 1 }}>
            <div style={{ display: 'flex' }}>Menschen verbinden.</div>
            <div style={{ display: 'flex' }}>Erfolg gestalten.</div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 20, borderTop: '1px solid rgba(26,44,78,0.18)' }}>
            <div style={{ display: 'flex', fontSize: 14, color: MUTED, fontWeight: 400 }}>eric-ewle.onovo.at</div>
            <div style={{ display: 'flex', fontSize: 12, color: '#9ca3af' }}>by onovo.at</div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div style={{ display: 'flex', width: 480, height: 630, backgroundColor: NAVY, alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <div style={{ display: 'flex', position: 'absolute', right: 0, top: 0, width: 480, height: 630, opacity: 0.05, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
          <div style={{ display: 'flex', width: 300, height: 300, borderRadius: 150, overflow: 'hidden', border: '3px solid rgba(253,248,240,0.18)' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={PHOTO_URL} width={300} height={300} alt="Eric Ewle" style={{ objectFit: 'cover', objectPosition: 'center top' }} />
          </div>
        </div>

      </div>
    ),
    size
  );
}
