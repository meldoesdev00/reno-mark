import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Reno Mark — Kinnisvaramaakler'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#161616',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* left */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', flex: 1 }}>
          <div
            style={{
              background: '#B8775A',
              color: 'white',
              fontSize: '14px',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              padding: '8px 20px',
              borderRadius: '999px',
              width: 'fit-content',
            }}
          >
            Kinnisvaramaakler · Tallinn
          </div>
          <div style={{ fontSize: '72px', fontWeight: 900, color: 'white', lineHeight: 1.05 }}>
            Reno Mark
          </div>
          <div style={{ fontSize: '24px', color: '#B8775A', fontWeight: 700 }}>
            KV.EE Tippmaakler 2025
          </div>
          <div style={{ fontSize: '18px', color: '#999', lineHeight: 1.5, maxWidth: '480px' }}>
            Läbipaistev, aus ja detailidele orienteeritud maakler, kes paneb sinu eesmärgid alati esikohale.
          </div>
          <div style={{ display: 'flex', gap: '32px', marginTop: '8px' }}>
            {[['100+', 'Klienti aidatud'], ['~65p', 'Tehinguaeg'], ['TOP 1', 'Kodumaa 2025']].map(([val, label]) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '28px', fontWeight: 900, color: 'white' }}>{val}</span>
                <span style={{ fontSize: '13px', color: '#666' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* right — decorative block */}
        <div
          style={{
            width: '260px',
            height: '380px',
            borderRadius: '32px',
            background: 'linear-gradient(135deg, #B8775A 0%, #8B5A3C 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '80px',
            flexShrink: 0,
          }}
        >
          🏠
        </div>
      </div>
    ),
    { ...size }
  )
}
