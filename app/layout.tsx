import type { Metadata } from 'next'
import './globals.css'
import AnimatedFavicon from './AnimatedFavicon'

const SITE_URL = 'https://renomark.ee'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Reno Mark — Kinnisvaramaakler Tallinnas | KV.EE Tippmaakler 2025',
    template: '%s | Reno Mark',
  },
  description:
    'Reno Mark – Sinu kinnisvara. Minu prioriteet. KV.EE Tippmaakler 2025. Tasuta kinnisvara hinnastamine. Helista: +372 5393 5292.',
  keywords: [
    // Isikubränd
    'Reno Mark',
    'Reno Mark kinnisvaramaakler',
    'Reno Mark kinnisvara',
    'Reno Mark maakler Eesti',
    'maakler Reno Mark',
    // Üldised kinnisvarateenused
    'kinnisvaramaakler Eesti',
    'kinnisvaramaakler Tallinn',
    'kinnisvara müük Tallinn',
    'korteri müük maakler',
    'maja müük maakler',
    'kinnisvara ost müük',
    'usaldusväärne kinnisvaramaakler',
    // Ostjale suunatud
    'korteri ost Tallinn',
    'maja ost Eesti',
    'kinnisvara otsimine maakleriga',
    'uus korter Tallinn',
    'kinnisvaranõustamine',
    'kinnisvara ostunõuanne',
    // Müüjale suunatud
    'kuidas müüa korterit Tallinnas',
    'korteri müük kiirelt',
    'kinnisvara hindamine Tallinn',
    'maakler korteri müügiks',
    'tasuta kinnisvara hindamine',
    'kui kaua korteri müük aega võtab',
    // Piirkondlikud
    'kinnisvaramaakler Harjumaa',
    'kinnisvaramaakler Põhja-Tallinn',
    'kinnisvaramaakler Mustamäe',
    'kinnisvaramaakler Kristiine',
    'kinnisvaramaakler Lasnamäe',
    'kinnisvaramaakler Tartu',
    'kinnisvaramaakler Pärnu',
    // Pikasabalised
    'parim kinnisvaramaakler Tallinnas 2025',
    'mitu protsenti võtab maakler',
    'kinnisvaramaakleri teenustasu',
    'kas tasub kasutada maaklerit',
    'maakler vs ise müüa',
    'kinnisvaramaakler ilma lepinguta',
    'erakliendile kinnisvaramaakler',
    // Tunnustused
    'KV.EE tippmaakler',
    'KV.EE tippmaakler 2025',
    'Kodumaa Kinnisvara',
    'TOP maakler Eesti',
  ],
  authors: [{ name: 'Reno Mark', url: SITE_URL }],
  creator: 'Reno Mark',
  publisher: 'Reno Mark',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'et_EE',
    url: SITE_URL,
    siteName: 'Reno Mark — Kinnisvaramaakler',
    title: 'Reno Mark — Kinnisvaramaakler | KV.EE Tippmaakler 2025',
    description:
      'Reno Mark on Tallinna juhtiv kinnisvaramaakler. KV.EE Tippmaakler 2025, TOP käive Kodumaa Kinnisvara 2025. Tasuta kinnisvara hinnastamine.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Reno Mark — Kinnisvaramaakler',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reno Mark — Kinnisvaramaakler | KV.EE Tippmaakler 2025',
    description:
      'Reno Mark on Tallinna juhtiv kinnisvaramaakler. KV.EE Tippmaakler 2025. Tasuta kinnisvara hinnastamine.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: SITE_URL,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="et">
      <head>
        <link rel="canonical" href={SITE_URL} />
      </head>
      <body>
        <AnimatedFavicon />
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Person',
                  '@id': `${SITE_URL}/#person`,
                  name: 'Reno Mark',
                  jobTitle: 'Kinnisvaramaakler',
                  url: SITE_URL,
                  telephone: '+37253935292',
                  email: 'Reno@kodumaakv.ee',
                  image: `${SITE_URL}/images/about.jpeg`,
                  sameAs: [
                    'https://www.kv.ee/broker/renomark',
                    'https://www.kodumaakv.ee/',
                  ],
                  worksFor: {
                    '@type': 'Organization',
                    name: 'Kodumaa Kinnisvara',
                    url: 'https://www.kodumaakv.ee/',
                  },
                  award: [
                    'KV.EE Tippmaakler 2025',
                    'TOP Tehingud 2025 — Kodumaa Kinnisvara',
                    'TOP Käive 2025 — Kodumaa Kinnisvara',
                  ],
                  description:
                    'Reno Mark on kogenud kinnisvaramaakler Tallinnas. KV.EE Tippmaakler 2025 ja Kodumaa Kinnisvara TOP maakler. Üle 100 kliendi aidatud, keskmine tehinguaeg 65 päeva.',
                },
                {
                  '@type': 'WebSite',
                  '@id': `${SITE_URL}/#website`,
                  url: SITE_URL,
                  name: 'Reno Mark — Kinnisvaramaakler',
                  description: 'Reno Mark kinnisvaramaakleri ametlik veebileht',
                  inLanguage: 'et',
                  publisher: { '@id': `${SITE_URL}/#person` },
                },
                {
                  '@type': 'LocalBusiness',
                  '@id': `${SITE_URL}/#business`,
                  name: 'Reno Mark — Kinnisvaramaakler',
                  url: SITE_URL,
                  telephone: '+37253935292',
                  email: 'Reno@kodumaakv.ee',
                  image: `${SITE_URL}/images/about.jpeg`,
                  priceRange: '$$',
                  address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'Tallinn',
                    addressCountry: 'EE',
                  },
                  areaServed: {
                    '@type': 'City',
                    name: 'Tallinn',
                  },
                  employee: { '@id': `${SITE_URL}/#person` },
                  parentOrganization: {
                    '@type': 'Organization',
                    name: 'Kodumaa Kinnisvara',
                    url: 'https://www.kodumaakv.ee/',
                  },
                },
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  )
}
