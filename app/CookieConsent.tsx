'use client'

import Link from 'next/link'
import { useSyncExternalStore } from 'react'
import { GoogleAnalytics } from '@next/third-parties/google'
import { getConsent, resetConsent, setConsent, subscribeConsent } from './consent'

// serveris 'ssr' → ei renderda midagi; brauseris null = valik tegemata
const useConsent = () => useSyncExternalStore(subscribeConsent, getConsent, () => 'ssr' as const)

// Küpsiste bänner: ilmub, kuni külastaja pole valikut teinud. On hinnastamise modaalist
// kõrgemal, sest kampaanialink (/hinnastamine) avab vormi kohe.
export default function CookieConsent() {
  if (useConsent() !== null) return null

  return (
    <div
      role="region"
      aria-label="Küpsiste nõusolek"
      className="font-sans fixed inset-x-3 bottom-3 z-[10001] mx-auto max-w-[540px] p-4 sm:bottom-5 sm:p-5 rounded-[20px] border border-stone-200 bg-white shadow-2xl"
    >
      <p className="text-[13px] leading-[1.6] text-black/60">
        Kasutame küpsiseid, et mõõta lehe külastatavust ja reklaami tulemusi (Google Analytics, Meta).{' '}
        <Link href="/privaatsus" target="_blank" className="font-semibold text-[#B8775A] hover:underline underline-offset-2">Loe lähemalt</Link>
      </p>
      <div className="mt-3.5 grid grid-cols-2 gap-2">
        <button type="button" onClick={() => setConsent('denied')} className="rounded-[10px] border border-stone-200 bg-white py-3 text-[13px] font-medium text-[#161616] transition-colors hover:border-[#161616]">
          Keeldun
        </button>
        <button type="button" onClick={() => setConsent('granted')} className="rounded-[10px] bg-[#161616] py-3 text-[13px] font-medium text-white transition-colors hover:bg-[#B8775A]">
          Nõustun
        </button>
      </div>
    </div>
  )
}

/** Google Analytics laetakse ainult nõusoleku korral */
export function ConsentAnalytics({ gaId }: { gaId: string }) {
  return useConsent() === 'granted' ? <GoogleAnalytics gaId={gaId} /> : null
}

/** Privaatsuslehel: kustutab valiku, et bänner ilmuks uuesti */
export function ConsentSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={resetConsent} className={className}>
      Muuda küpsiste valikut
    </button>
  )
}
