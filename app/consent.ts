// Küpsiste nõusolek (Google Analytics + Meta Pixel). Valik jääb brauserisse.
// Meta Pixel laeb alati, aga on 'revoke' olekus, kuni külastaja nõustub (vt app/layout.tsx);
// Google Analytics laetakse alles pärast nõusolekut (ConsentAnalytics).

declare global {
  interface Window { fbq?: (...args: unknown[]) => void }
}

export type Consent = 'granted' | 'denied'
export const CONSENT_KEY = 'cookie-consent'
const CONSENT_EVENT = 'cookie-consent-change'

export function getConsent(): Consent | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY)
    return v === 'granted' || v === 'denied' ? v : null
  } catch {
    return null
  }
}

export function setConsent(value: Consent) {
  try { localStorage.setItem(CONSENT_KEY, value) } catch {}
  window.fbq?.('consent', value === 'granted' ? 'grant' : 'revoke')
  window.dispatchEvent(new Event(CONSENT_EVENT))
}

/** Kustutab valiku → bänner ilmub uuesti (privaatsuslehe „Muuda küpsiste valikut“) */
export function resetConsent() {
  try { localStorage.removeItem(CONSENT_KEY) } catch {}
  window.dispatchEvent(new Event(CONSENT_EVENT))
}

export function subscribeConsent(cb: () => void) {
  window.addEventListener(CONSENT_EVENT, cb)
  window.addEventListener('storage', cb)
  return () => {
    window.removeEventListener(CONSENT_EVENT, cb)
    window.removeEventListener('storage', cb)
  }
}
