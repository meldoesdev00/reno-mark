import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Reno Mark — Kinnisvaramaakler'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage() {
  const photoBuffer = await fetch(new URL('./og-photo.jpg', import.meta.url)).then(res =>
    res.arrayBuffer()
  )
  const photoBase64 = Buffer.from(photoBuffer).toString('base64')
  const photoSrc = `data:image/jpeg;base64,${photoBase64}`

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
          <div style={{ fontSize: '72px', fontWeight: 900, color: 'white', lineHeight: 1.05 }}>
            Reno Mark
          </div>
          <div style={{ fontSize: '24px', color: '#B8775A', fontWeight: 700 }}>
            KV.EE Tippmaakler 2025
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', fontSize: '18px', color: '#999', lineHeight: 1.5, maxWidth: '480px' }}>
            <span>Läbipaistev, aus ja detailidele orienteeritud maakler,</span>
            <span>kes paneb sinu eesmärgid alati esikohale!</span>
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

        {/* right — photo */}
        <div
          style={{
            width: '340px',
            height: '470px',
            borderRadius: '32px',
            background: 'linear-gradient(135deg, #B8775A 0%, #8B5A3C 100%)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            overflow: 'hidden',
            flexShrink: 0,
          }}
        >
          <img
            src={photoSrc}
            width={340}
            height={510}
            style={{ objectFit: 'cover', objectPosition: '50% 10%' }}
          />
        </div>
      </div>
    ),
    { ...size }
  )
}
