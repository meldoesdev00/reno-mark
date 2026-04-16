'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

/* ── types ──────────────────────────────────────────────── */
export interface SiteSettings {
  heroHeadingLine1?: string
  heroHeadingLine2?: string
  heroSubtitle?: string
  heroPrimaryButton?: string
  heroSecondaryButton?: string
  heroPhotoUrl?: string
  chip1Value?: string; chip1Label?: string
  chip2Value?: string; chip2Label?: string
  chip3Value?: string; chip3Label?: string
  chip4Value?: string; chip4Label?: string
  aboutHeading?: string
  aboutSubtitle?: string
  aboutPhotoUrl?: string
  aboutQuote?: string
  contactHeadingLine1?: string
  contactHeadingLine2?: string
  contactHeadingLine3?: string
  contactSubtitle?: string
  contactPhone?: string
  contactEmail?: string
  contactWhatsapp?: string
  contactKvUrl?: string
  ctaCardTitle?: string
  ctaCardSubtitle?: string
  ctaBullets?: string[]
  ctaPrimaryButton?: string
  ctaSecondaryButton?: string
}
export interface Testimonial { _id: string; name: string; text: string }
export interface ProcessStep  { _id: string; step: string; title: string; desc: string }
export interface ValueCard     { _id: string; icon: string; title: string; desc: string }
export interface BioCard       { _id: string; tag: string; text: string }
export interface SoldProperty  { _id: string; imageUrl: string; alt?: string }
export interface Reel          { _id: string; videoUrl: string; title?: string }

interface Props {
  settings: SiteSettings | null
  testimonials: Testimonial[]
  processSteps: ProcessStep[]
  valueCards: ValueCard[]
  bioCards: BioCard[]
  soldProperties: SoldProperty[]
  reels: Reel[]
}

/* ── helpers ────────────────────────────────────────────── */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

function Reveal({ children, className = '', delay = 0, dir = 'up' }: {
  children: React.ReactNode; className?: string; delay?: number; dir?: 'up' | 'left' | 'right'
}) {
  const { ref, visible } = useInView()
  const translate = dir === 'up' ? 'translateY(32px)' : dir === 'left' ? 'translateX(-32px)' : 'translateX(32px)'
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : translate,
      transition: `opacity 0.65s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.65s cubic-bezier(.22,1,.36,1) ${delay}s`,
    }}>
      {children}
    </div>
  )
}

/* ── icons ──────────────────────────────────────────────── */
const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
)
const ArrowRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
)
const CheckCircle = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
)
const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l.91-.9a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
)
const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="3"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
)
const TrophyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
)

function TestimonialCard({ t, fullWidth }: { t: Testimonial; fullWidth?: boolean }) {
  return (
    <div className={`${fullWidth ? 'w-full' : 'shrink-0 w-96'} bg-stone-50 border border-stone-200 rounded-3xl px-6 py-5 flex flex-col gap-3`}>
      <p className="text-stone-600 text-sm leading-relaxed font-normal flex-1">{t.text}</p>
      <div className="font-bold text-[#161616] text-sm">{t.name}</div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════
   HOME CLIENT
══════════════════════════════════════════════════════════ */
export default function HomeClient({ settings, testimonials, processSteps, valueCards, bioCards, soldProperties, reels }: Props) {
  const s = settings ?? {}
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedReel, setSelectedReel] = useState<string | null>(null)

  const whatsapp = s.contactWhatsapp ?? 'https://wa.me/37253935292'
  const kvUrl    = s.contactKvUrl    ?? 'https://www.kv.ee/broker/renomark'

  function scrollTo(id: string, block: ScrollLogicalPosition = 'start') {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block })
  }

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // hero h2 line: colour first word
  const line2 = s.heroHeadingLine2 ?? 'Minu prioriteet.'
  const [accentWord, ...restWords] = line2.split(' ')
  const line2rest = restWords.join(' ')

  const heroPhoto  = s.heroPhotoUrl  || '/images/about.jpeg'
  const aboutPhoto = s.aboutPhotoUrl || '/images/team.jpeg'

  return (
    <div className="bg-white text-[#161616] min-h-screen overflow-x-hidden font-sans">

      {/* ═══ NAV ═══════════════════════════════════════════ */}
      <header className={`hidden md:block fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-end pb-5 justify-between relative">
          <div className="flex items-center gap-3">
            <span className="text-[#161616] font-bold text-base tracking-tight">Reno Mark</span>
            <span className="w-px h-4 bg-stone-200" />
            <a href="https://www.kodumaakv.ee/" target="_blank" rel="noopener noreferrer" className="opacity-50 hover:opacity-80 transition-opacity">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/kodumaa-logo.svg" alt="Kodumaa Kinnisvara" className="h-7 w-auto" />
            </a>
          </div>
          <nav className="flex items-center gap-7 text-sm font-medium text-stone-500 absolute left-1/2 -translate-x-1/2 bottom-5">
            <button onClick={() => scrollTo('minust')} className="hover:text-[#161616] transition-colors">Minust</button>
            <button onClick={() => scrollTo('tunnustused', 'center')} className="hover:text-[#161616] transition-colors">Tagasiside</button>
            <button onClick={() => scrollTo('kontakt')} className="hover:text-[#161616] transition-colors">Kontakt</button>
          </nav>
          {/* desktop navbar CTA → mailto */}
          <a href={`mailto:${s.contactEmail ?? 'Reno@kodumaakv.ee'}`} className="inline-flex items-center gap-1.5 text-sm font-semibold px-5 py-2.5 rounded-full bg-[#161616] text-white hover:bg-[#B8775A] transition-all duration-300">
            Võta ühendust <ChevronRight />
          </a>
        </div>
      </header>

      {/* mobile menu button */}
      <button className="md:hidden fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-[#161616] flex items-center justify-center shadow-lg hover:bg-[#B8775A] transition-colors" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menüü">
        {menuOpen ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        ) : (
          <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
            <rect y="0" width="15" height="1.5" rx="1" fill="white"/>
            <rect y="4.75" width="15" height="1.5" rx="1" fill="white"/>
            <rect y="9.5" width="15" height="1.5" rx="1" fill="white"/>
          </svg>
        )}
      </button>

      {/* mobile overlay */}
      <div className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${menuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`} onClick={() => setMenuOpen(false)}>
        <div className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0'}`} />
        <div className={`absolute bottom-0 left-0 right-0 bg-white rounded-tl-3xl rounded-tr-3xl px-6 pt-6 pb-10 transition-transform duration-400 ease-out ${menuOpen ? 'translate-y-0' : 'translate-y-full'}`} onClick={e => e.stopPropagation()}>
          <div className="w-10 h-1 rounded-full bg-stone-200 mx-auto mb-8" />
          <nav className="flex flex-col gap-1">
            {[['minust', 'Minust', 'start'], ['tunnustused', 'Tagasiside', 'center'], ['kontakt', 'Kontakt', 'start']].map(([id, label, block]) => (
              <button key={id} className="text-xl font-bold text-[#161616] py-3 border-b border-stone-100 hover:text-[#B8775A] transition-colors text-left" onClick={() => { scrollTo(id, block as ScrollLogicalPosition); setMenuOpen(false) }}>
                {label}
              </button>
            ))}
          </nav>
          {/* mobile menu CTA → tel: */}
          <a href={`tel:${(s.contactPhone ?? '+37253935292').replace(/\s/g, '')}`} className="mt-6 flex items-center justify-center gap-2 py-4 rounded-full bg-[#161616] text-white font-semibold text-sm" onClick={() => setMenuOpen(false)}>
            Võta ühendust
          </a>
        </div>
      </div>

      {/* ═══ HERO ══════════════════════════════════════════ */}
      <section className="min-h-screen flex flex-col justify-center md:pt-16">
        <div className="max-w-7xl mx-auto px-6 w-full py-6 md:py-20">
          <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 lg:gap-16 lg:items-center">
            <div>
              <h1 className="text-[clamp(2.5rem,6.5vw,5.5rem)] font-extrabold leading-[1.0] tracking-tight mb-4 md:mb-8 text-[#161616]" style={{ opacity: 0, animation: 'fadeUp .65s .2s ease forwards' }}>
                {s.heroHeadingLine1 ?? 'Sinu kinnisvara.'}<br />
                <span className="text-[#B8775A]">{accentWord}</span>{line2rest ? ' ' + line2rest : ''}
              </h1>
              <p className="text-stone-500 text-base md:text-lg leading-relaxed max-w-lg mb-5 md:mb-10 font-normal" style={{ opacity: 0, animation: 'fadeUp .65s .35s ease forwards' }}>
                {s.heroSubtitle ?? 'Läbipaistev, aus ja detailidele orienteeritud maakler, kes paneb sinu eesmärgid alati esikohale.'}
              </p>
              <div className="flex flex-wrap gap-4" style={{ opacity: 0, animation: 'fadeUp .65s .45s ease forwards' }}>
                <button onClick={() => scrollTo('kontakt')} className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#161616] text-white font-semibold text-sm hover:bg-[#B8775A] transition-all duration-300 hover:-translate-y-0.5 shadow-sm hover:shadow-md">
                  {s.heroPrimaryButton ?? 'Tasuta kinnisvara hinnastamine'} <ChevronRight />
                </button>
                <a href={kvUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-stone-200 text-stone-600 font-semibold text-sm hover:border-stone-300 hover:text-[#161616] transition-all duration-200">
                  {s.heroSecondaryButton ?? 'Suundu minu portfelli'} <ChevronRight />
                </a>
              </div>
            </div>

            {/* hero card */}
            <div className="relative" style={{ opacity: 0, animation: 'fadeUp .7s .3s ease forwards' }}>
              <div className="relative rounded-3xl overflow-visible bg-stone-100 aspect-[3/4] md:aspect-[4/5] max-w-md ml-auto">
                <div className="absolute inset-0 rounded-3xl overflow-hidden border border-stone-200">
                  <Image src={heroPhoto} alt="Reno Mark" fill className="object-cover object-top" priority unoptimized={heroPhoto.startsWith('http')} />
                  <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-stone-100/60 to-transparent" />
                </div>
                <div className="absolute -left-5 top-10 bg-white rounded-2xl shadow-lg shadow-stone-200/80 px-4 py-3 border border-stone-100 z-10">
                  <div className="text-xl font-extrabold text-[#161616] leading-none">{s.chip1Value ?? '100+'}</div>
                  <div className="text-xs text-stone-500 font-medium mt-1">{s.chip1Label ?? 'Klienti aidatud'}</div>
                </div>
                <div className="absolute -left-5 top-[45%] bg-white rounded-2xl shadow-lg shadow-stone-200/80 px-4 py-3 border border-stone-100 z-10">
                  <div className="text-xl font-extrabold text-[#B8775A] leading-none">{s.chip2Value ?? '~65p'}</div>
                  <div className="text-xs text-stone-500 font-medium mt-1">{s.chip2Label ?? 'Keskmine tehinguaeg'}</div>
                </div>
                <div className="absolute -right-5 top-20 bg-white rounded-2xl shadow-lg shadow-stone-200/80 px-4 py-3 border border-stone-100 z-10">
                  <div className="text-xl font-extrabold text-[#161616] leading-none">{s.chip3Value ?? 'TOP 1'}</div>
                  <div className="text-xs text-stone-500 font-medium mt-1">{s.chip3Label ?? 'Kodumaa käive 2025'}</div>
                </div>
                <div className="absolute -right-5 bottom-20 bg-white rounded-2xl shadow-lg shadow-stone-200/80 px-4 py-3 border border-stone-100 z-10">
                  <div className="text-xl font-extrabold text-[#B8775A] leading-none">{s.chip4Value ?? '5+'}</div>
                  <div className="text-xs text-stone-500 font-medium mt-1">{s.chip4Label ?? 'Aastat müügikogemust'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ AWARDS BANNER ═════════════════════════════════ */}
      <section className="bg-[#161616]">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-center">
            <div className="flex flex-wrap justify-center gap-3">
              {['TOP TEHINGUD 2025 · Kodumaa Kinnisvara', 'TOP KÄIVE 2025 · Kodumaa Kinnisvara'].map((award) => (
                <div key={award} className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 text-white text-xs font-semibold tracking-wide hover:border-[#B8775A]/60 transition-colors cursor-default">
                  <TrophyIcon />{award}
                </div>
              ))}
              <div className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 text-white text-xs font-semibold tracking-wide hover:border-[#B8775A]/60 transition-colors cursor-default">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://www.kv.ee/inc/sinuaasta/images/icon.svg" alt="KV.EE" width={18} height={18} style={{ filter: 'brightness(0) invert(1)' }} />
                KV.EE TIPPMAAKLER 2025
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ REELS ═════════════════════════════════════════ */}
      {reels.length > 0 && (
        <section className="bg-stone-50 border-y border-stone-200 py-14 md:py-20 overflow-hidden">
          {/* desktop horizontal marquee */}
          <div className="hidden md:block">
            <div className="max-w-7xl mx-auto px-6 overflow-hidden">
              <div className="flex gap-4 reels-marquee">
                {[...reels, ...reels].map((r, i) => (
                  <div key={i} className="shrink-0 w-[200px] rounded-3xl overflow-hidden bg-stone-900 cursor-pointer" style={{ aspectRatio: '9/16' }} onClick={() => setSelectedReel(r.videoUrl)}>
                    <video src={r.videoUrl} autoPlay muted loop playsInline className="w-full h-full object-cover pointer-events-none" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* mobile 3x2 grid */}
          <div className="md:hidden grid grid-cols-3 gap-3 px-6">
            {reels.slice(0, 6).map((r) => (
              <div key={r._id} className="rounded-2xl overflow-hidden bg-stone-900 cursor-pointer" style={{ aspectRatio: '9/16' }} onClick={() => setSelectedReel(r.videoUrl)}>
                <video src={r.videoUrl} autoPlay muted loop playsInline className="w-full h-full object-cover pointer-events-none" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ═══ MÜÜGIPROTSESS ═════════════════════════════════ */}
      {processSteps.length > 0 && (
        <section className="bg-stone-50 border-y border-stone-200">
          <div className="max-w-7xl mx-auto px-6 py-14 md:py-28">
            <Reveal className="mb-8 md:mb-16">
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-tight text-[#161616]">Müügiprotsess</h2>
            </Reveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {processSteps.map((s, i) => (
                <Reveal key={s._id} delay={i * 0.06}>
                  <div className="bg-white rounded-2xl p-7 border border-stone-200 hover:border-stone-300 hover:shadow-sm transition-all duration-300 hover:-translate-y-0.5 h-full">
                    <span className="text-[2.5rem] font-extrabold leading-none text-stone-100">{s.step}</span>
                    <h3 className="font-bold text-[#161616] text-sm mt-3 mb-2">{s.title}</h3>
                    <p className="text-stone-500 text-xs leading-relaxed font-normal">{s.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ MÕNED TEHTUD TEHINGUD ══════════════════════════ */}
      {soldProperties.length > 0 && (
        <section className="bg-white border-y border-stone-200 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 pt-14 md:pt-20 pb-8">
            <Reveal className="mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#B8775A] text-white text-xs font-semibold uppercase tracking-widest mb-6">Portfolio</div>
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-tight text-[#161616]">Mõned tehtud tehingud</h2>
            </Reveal>
          </div>
          {/* mobile — vertical scroll */}
          <div className="md:hidden relative h-[520px] overflow-hidden px-6 mb-14">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-16 z-10 bg-gradient-to-b from-white to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 z-10 bg-gradient-to-t from-white to-transparent" />
            <div className="scroll-up-col-slow">
              {[...soldProperties, ...soldProperties].map((p, i) => (
                <div key={i} className="rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 relative mb-3">
                  <Image src={p.imageUrl} alt={p.alt ?? 'Müüdud objekt'} width={600} height={400} className="w-full h-auto object-cover" unoptimized />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
              ))}
            </div>
          </div>
          {/* desktop — horizontal marquee */}
          <div className="hidden md:block relative overflow-hidden pb-20">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-32 z-10 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-32 z-10 bg-gradient-to-l from-white to-transparent" />
            <div className="flex gap-4 images-marquee">
              {[...soldProperties, ...soldProperties].map((p, i) => (
                <div key={i} className="shrink-0 w-52 h-36 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 relative group">
                  <Image src={p.imageUrl} alt={p.alt ?? 'Müüdud objekt'} fill className="object-cover transition-transform duration-500 group-hover:scale-105" unoptimized />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors duration-500" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ VALUES ════════════════════════════════════════ */}
      {valueCards.length > 0 && (
        <section className="bg-stone-50 border-y border-stone-200">
          <div className="max-w-7xl mx-auto px-6 py-14 md:py-28">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
              <div className="lg:w-72 lg:shrink-0">
                <Reveal>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#B8775A] text-white text-xs font-semibold uppercase tracking-widest mb-6">Mida saad oodata</div>
                  <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-tight text-[#161616]">Minu töö<br />põhimõtted</h2>
                </Reveal>
              </div>
              <div className="flex-1 grid sm:grid-cols-2 gap-4">
                {valueCards.map((v, i) => (
                  <Reveal key={v._id} delay={i * 0.06}>
                    <div className="bg-white rounded-2xl p-6 border border-stone-200 hover:border-stone-300 hover:shadow-sm transition-all duration-300 hover:-translate-y-0.5 h-full">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-xl bg-stone-100 flex items-center justify-center"><CheckCircle /></div>
                        <span className="text-xs font-bold text-stone-300 uppercase tracking-widest">{v.icon}</span>
                      </div>
                      <h3 className="font-bold text-[#161616] text-sm mb-2">{v.title}</h3>
                      <p className="text-stone-500 text-xs leading-relaxed font-normal">{v.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══ TESTIMONIALS ══════════════════════════════════ */}
      {testimonials.length > 0 && (
        <section id="tunnustused" className="bg-white border-y border-stone-200 py-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 mb-14 md:mb-14">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#B8775A] text-white text-xs font-semibold uppercase tracking-widest mb-6">Klientide tagasiside</div>
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-tight text-[#161616]">Mida kliendid ütlevad</h2>
            </Reveal>
          </div>
          <div className="md:hidden relative h-[480px] overflow-hidden px-6">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-16 z-10 bg-gradient-to-b from-white to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 z-10 bg-gradient-to-t from-white to-transparent" />
            <div className="scroll-up-col">
              {[...testimonials, ...testimonials].map((t, i) => (
                <div key={i} className="mb-4"><TestimonialCard t={t} fullWidth /></div>
              ))}
            </div>
          </div>
          <div className="hidden md:block">
            <div className="flex gap-5 mb-5 marquee-left">
              {[...testimonials, ...testimonials].map((t, i) => <TestimonialCard key={i} t={t} />)}
            </div>
            <div className="flex gap-5 marquee-right">
              {[...testimonials.slice().reverse(), ...testimonials.slice().reverse()].map((t, i) => <TestimonialCard key={i} t={t} />)}
            </div>
          </div>
        </section>
      )}

      {/* ═══ ABOUT ═════════════════════════════════════════ */}
      <section id="minust" className="max-w-7xl mx-auto px-6 py-14 md:py-28">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-start">
          <div className="lg:sticky lg:top-24">
            <Reveal dir="left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#B8775A] text-white text-xs font-semibold uppercase tracking-widest mb-6">Minust</div>
              <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-[1.1] tracking-tight text-[#161616] mb-6">
                {s.aboutHeading ?? 'Maakler, kes räägib Sulle alati tõtt.'}
              </h2>
              <p className="text-stone-500 leading-relaxed mb-10 text-[0.95rem]">
                {s.aboutSubtitle ?? 'Minu fookus ei ole minu enda edu — fookus on väärtusel, mida loon igale kliendile.'}
              </p>
            </Reveal>
            <Reveal delay={0.1} dir="left">
              <div className="relative rounded-3xl overflow-hidden bg-stone-100 aspect-[3/4] max-w-sm border border-stone-200">
                <Image src={aboutPhoto} alt="Reno Mark" fill className="object-cover object-top" unoptimized={aboutPhoto.startsWith('http')} />
              </div>
            </Reveal>
            <Reveal delay={0.2} dir="left">
              <div className="lg:hidden pt-8 border-t border-stone-200">
                <p className="text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-[1.1] tracking-tight text-[#161616]">
                  {s.aboutQuote ?? '"I\'m not important, but what I do and what I give is."'}
                </p>
              </div>
            </Reveal>
          </div>

          <div className="space-y-5">
            {bioCards.map((card, i) => (
              <Reveal key={card._id} delay={i * 0.07}>
                <div className="rounded-2xl p-7 border bg-white border-stone-200 hover:border-stone-300 hover:shadow-sm transition-all duration-300 hover:-translate-y-0.5">
                  <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-3 text-[#B8775A]">{card.tag}</span>
                  <p className="text-[0.9rem] leading-relaxed font-normal text-stone-600">{card.text}</p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.35}>
              <div className="hidden lg:block pt-4 border-t border-stone-200">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#B8775A] block mb-4"> </span>
                <p className="text-[2rem] font-bold leading-tight tracking-tight text-[#161616]">
                  {s.aboutQuote ?? '"I\'m not important, but what I do and what I give is."'}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ CONTACT ═══════════════════════════════════════ */}
      <section id="kontakt" className="bg-stone-50 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-14 md:py-28">
          <div className="grid lg:grid-cols-2 gap-16 items-end">
            <Reveal dir="left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#B8775A] text-white text-xs font-semibold uppercase tracking-widest mb-6">Kontakt</div>
              <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-extrabold leading-[1.1] tracking-tight text-[#161616] mb-6">
                {s.contactHeadingLine1 ?? 'Alusta oma'}<br />
                {s.contactHeadingLine2 ?? 'kinnisvara'}<br />
                {s.contactHeadingLine3 ?? 'teekonda.'}
              </h2>
              <p className="text-stone-500 leading-relaxed text-[0.95rem] max-w-md mb-10">
                {s.contactSubtitle ?? 'Olenemata sellest, kas oled ostja või müüja — olen siin, et aidata sul teha parim otsus.'}
              </p>

              {/* mobile CTA content */}
              <div className="lg:hidden mb-10">
                <p className="text-stone-500 text-sm leading-relaxed mb-6 font-normal">{s.ctaCardSubtitle ?? 'Esimene konsultatsioon on alati tasuta.'}</p>
                <div className="space-y-3 mb-6">
                  {(s.ctaBullets ?? ['Tasuta esialgne konsultatsioon','Kiire vastus — maksimaalselt 24h','Personaalne lähenemine igale kliendile','Läbipaistev protsess algusest lõpuni']).map((item) => (
                    <div key={item} className="flex items-center gap-3 text-stone-600 text-sm font-normal">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#B8775A] shrink-0" />{item}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-3">
                  {/* mobile: tel: */}
                  <a href={`tel:${(s.contactPhone ?? '+37253935292').replace(/\s/g, '')}`} className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-[#B8775A] text-white font-semibold text-sm hover:bg-[#C88B6A] transition-all duration-300">
                    <PhoneIcon />{s.ctaPrimaryButton ?? 'Helista kohe'}
                  </a>
                  <a href={`mailto:${s.contactEmail ?? 'Reno@kodumaakv.ee'}`} className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl border border-stone-200 text-[#161616] font-semibold text-sm hover:border-stone-300 hover:bg-stone-50 transition-all duration-300">
                    <MailIcon />{s.ctaSecondaryButton ?? 'Kirjuta mulle'}
                  </a>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <a href={`tel:${(s.contactPhone ?? '+37253935292').replace(/\s/g, '')}`} className="group inline-flex items-center gap-4 p-5 rounded-2xl border border-stone-200 hover:border-stone-300 hover:shadow-sm transition-all duration-200">
                  <div className="w-10 h-10 rounded-xl bg-[#161616] text-white flex items-center justify-center shrink-0 group-hover:bg-[#B8775A] transition-colors duration-300"><PhoneIcon /></div>
                  <div>
                    <div className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-0.5">Telefon</div>
                    <div className="font-bold text-[#161616] text-sm">{s.contactPhone ?? '+372 5393 5292'}</div>
                  </div>
                  <ChevronRight />
                </a>
                <a href={`mailto:${s.contactEmail ?? 'Reno@kodumaakv.ee'}`} className="group inline-flex items-center gap-4 p-5 rounded-2xl border border-stone-200 hover:border-stone-300 hover:shadow-sm transition-all duration-200">
                  <div className="w-10 h-10 rounded-xl bg-[#161616] text-white flex items-center justify-center shrink-0 group-hover:bg-[#B8775A] transition-colors duration-300"><MailIcon /></div>
                  <div>
                    <div className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-0.5">E-post</div>
                    <div className="font-bold text-[#161616] text-sm">{s.contactEmail ?? 'Reno@kodumaakv.ee'}</div>
                  </div>
                  <ChevronRight />
                </a>
                <a href={kvUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-4 p-5 rounded-2xl border border-stone-200 hover:border-stone-300 hover:shadow-sm transition-all duration-200">
                  <div className="w-10 h-10 rounded-xl bg-[#161616] flex items-center justify-center shrink-0 group-hover:bg-[#B8775A] transition-colors duration-300">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://www.kv.ee/favicon.ico" alt="KV.EE" width={20} height={20} style={{ filter: 'brightness(0) invert(1)' }} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-0.5">KV.EE profiil</div>
                    <div className="font-bold text-[#161616] text-sm">{(kvUrl).replace('https://', '').replace('http://', '')}</div>
                  </div>
                  <ChevronRight />
                </a>
              </div>
            </Reveal>

            {/* CTA card — desktop only */}
            <Reveal dir="right" delay={0.1} className="hidden lg:block">
              <div className="rounded-3xl p-10 border border-stone-200">
                <h3 className="text-2xl font-extrabold tracking-tight text-[#161616] mb-3">{s.ctaCardTitle ?? 'Valmis alustama?'}</h3>
                <p className="text-stone-500 text-sm leading-relaxed mb-8 font-normal">{s.ctaCardSubtitle ?? 'Esimene konsultatsioon on alati tasuta.'}</p>
                <div className="space-y-3 mb-8">
                  {(s.ctaBullets ?? ['Tasuta esialgne konsultatsioon','Kiire vastus — maksimaalselt 24h','Personaalne lähenemine igale kliendile','Läbipaistev protsess algusest lõpuni']).map((item) => (
                    <div key={item} className="flex items-center gap-3 text-stone-600 text-sm font-normal">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#B8775A] shrink-0" />{item}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-3">
                  {/* desktop CTA card: only mailto */}
                  <a href={`mailto:${s.contactEmail ?? 'Reno@kodumaakv.ee'}`} className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-[#B8775A] text-white font-semibold text-sm hover:bg-[#C88B6A] transition-all duration-300 hover:-translate-y-0.5">
                    <MailIcon />{s.ctaSecondaryButton ?? 'Kirjuta mulle'}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* keyframes */}
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        @keyframes marqueeLeft { from { transform:translateX(0); } to { transform:translateX(-50%); } }
        @keyframes marqueeRight { from { transform:translateX(-50%); } to { transform:translateX(0); } }
        .marquee-left  { animation: marqueeLeft  40s linear infinite; }
        .marquee-right { animation: marqueeRight 48s linear infinite; }
        @keyframes scrollUp   { from { transform:translateY(0);    } to { transform:translateY(-50%); } }
        @keyframes scrollDown { from { transform:translateY(-50%); } to { transform:translateY(0);    } }
        .scroll-up-col      { animation: scrollUp   28s linear infinite; }
        .scroll-up-col-slow { animation: scrollUp   90s linear infinite; }
        .scroll-down-col    { animation: scrollDown 34s linear infinite; }
        .reels-marquee      { animation: marqueeLeft 60s linear infinite; will-change: transform; }
        .images-marquee     { animation: marqueeLeft 50s linear infinite; will-change: transform; }
      `}</style>

      {/* video modal */}
      {selectedReel !== null && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-6" onClick={() => setSelectedReel(null)}>
          <div className="relative w-full max-w-sm" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedReel(null)} className="absolute -top-10 right-0 text-white/70 hover:text-white text-sm font-semibold transition-colors">✕ Sulge</button>
            <video key={selectedReel} src={selectedReel} autoPlay controls playsInline className="w-full rounded-3xl" style={{ aspectRatio: '9/16' }} />
          </div>
        </div>
      )}
    </div>
  )
}
