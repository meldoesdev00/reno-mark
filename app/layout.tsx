import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Reno Mark — Kinnisvaramaakler',
  description: 'Reno Mark — KV.EE Tippmaakler 2025. 100+ klienti aidatud, keskmine tehinguaeg 65 päeva.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="et">
      <body>{children}</body>
    </html>
  )
}
