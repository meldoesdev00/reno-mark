import type { Metadata } from 'next'
import Link from 'next/link'
import { ConsentSettingsButton } from '../CookieConsent'

export const metadata: Metadata = {
  title: 'Privaatsuspoliitika',
  description: 'Kuidas renomark.ee kogub ja kasutab isikuandmeid ning küpsiseid.',
  alternates: { canonical: '/privaatsus' },
}

const EMAIL = 'Reno@kodumaakv.ee'
const PHONE = '+372 5393 5292'
const UPDATED = '11.11.2026'
const a = 'font-semibold text-[#B8775A] hover:underline underline-offset-2'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-[20px] font-semibold tracking-[-0.02em] text-[#161616]">{title}</h2>
      <div className="mt-3 grid gap-3 text-[16px] leading-[1.7] text-black/65">{children}</div>
    </section>
  )
}

export default function PrivaatsusPage() {
  return (
    <main className="font-sans min-h-screen pb-24 bg-white text-[#161616]">
      <div className="mx-auto flex h-[72px] max-w-[760px] items-center px-5">
        <Link href="/" className="text-sm font-semibold tracking-tight text-[#161616]">Reno Mark</Link>
      </div>

      <article className="mx-auto max-w-[760px] px-5 pt-8 lg:pt-14">
        <h1 className="text-[clamp(32px,4.5vw,48px)] font-bold tracking-[-0.03em]">Privaatsuspoliitika</h1>
        <p className="mt-4 text-[15px] opacity-50">Viimati uuendatud {UPDATED}</p>

        <Section title="Kes andmeid töötleb">
          <p>
            Lehel renomark.ee kogutud isikuandmete vastutav töötleja on MARKINVEST OÜ, mille kaudu tegutseb kinnisvaramaakler
            {' '}Reno Mark (Kodumaa Kinnisvara). Küsimuste korral kirjutage <a className={a} href={`mailto:${EMAIL}`}>{EMAIL}</a> või
            helistage <a className={a} href={`tel:${PHONE.replace(/\s/g, '')}`}>{PHONE}</a>.
          </p>
        </Section>

        <Section title="Milliseid andmeid kogume ja miks">
          <p>
            <strong>Hinnastamise vorm.</strong> Nimi, telefon, e-post, kinnisvara andmed (tüüp, tubade arv, aadress) ja müügi ajastus.
            Kasutame neid ainult Teie päringule vastamiseks, kinnisvara hinnangu andmiseks ja müügi teemal suhtlemiseks. Õiguslik alus
            on Teie enda päring ehk lepingueelsed toimingud Teie soovil.
          </p>
          <p>
            <strong>Reklaamiallikas.</strong> Kui jõuate lehele reklaami või kampaanialingi kaudu, salvestame päringuga koos kampaania
            nime ja lingi parameetrid (nt utm_campaign). Nii teame, millised kampaaniad päriselt toimivad.
          </p>
        </Section>

        <Section title="Küpsised">
          <p>
            Leht kasutab Google Analyticsit külastatavuse mõõtmiseks ning Meta (Facebook, Instagram) pikslit reklaamide tulemuste
            mõõtmiseks, näiteks selleks, et teada saada, kas reklaami näinud inimene saatis hinnastamise päringu. Need lülituvad sisse
            ainult siis, kui olete küpsiste bänneris vajutanud „Nõustun“.
          </p>
          <p>
            Kui keeldute, ei laeta Google Analyticsit ega saadeta Metale midagi. Teie küpsiste valik hoitakse ainult Teie brauseris.
            Andmete töötlemise kohta lugege lähemalt{' '}
            <a className={a} href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google’i</a> ja{' '}
            <a className={a} href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer">Meta</a> privaatsuspoliitikast.
          </p>
          <p>
            <ConsentSettingsButton className={a} />
          </p>
        </Section>

        <Section title="Kellega andmeid jagame">
          <p>Andmeid ei müüda ega anta edasi turunduseks. Lehe toimimiseks kasutame usaldusväärseid teenusepakkujaid:</p>
          <ul className="grid list-disc gap-1.5 pl-5">
            <li>Vercel: lehe majutus</li>
            <li>Sanity: päringute turvaline hoidmine</li>
            <li>Resend: päringu teavituse e-kirjad</li>
            <li>Google: külastatavuse mõõtmine (ainult Teie nõusolekul)</li>
            <li>Meta Platforms Ireland: reklaamide mõõtmine (ainult Teie nõusolekul)</li>
          </ul>
        </Section>

        <Section title="Kui kaua andmeid hoiame">
          <p>
            Päringu andmeid hoiame seni, kuni see on vajalik Teiega suhtlemiseks, ja kõige kauem 24 kuud pärast viimast suhtlust. Kui
            sõlmime maakleriteenuse lepingu, hoitakse andmeid vastavalt lepingule ja seadusest tulenevatele nõuetele.
          </p>
        </Section>

        <Section title="Teie õigused">
          <p>
            Teil on õigus küsida, milliseid andmeid Teie kohta hoiame, neid parandada või kustutada ning nõusolek igal ajal tagasi
            võtta. Selleks kirjutage <a className={a} href={`mailto:${EMAIL}`}>{EMAIL}</a>. Kui leiate, et Teie andmeid on töödeldud
            valesti, võite pöörduda ka{' '}
            <a className={a} href="https://www.aki.ee" target="_blank" rel="noopener noreferrer">Andmekaitse Inspektsiooni</a> poole.
          </p>
        </Section>

        <p className="mt-14">
          <Link href="/" className="inline-flex rounded-full bg-[#161616] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#B8775A]">← Tagasi avalehele</Link>
        </p>
      </article>
    </main>
  )
}
