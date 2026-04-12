'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

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

function Reveal({
  children,
  className = '',
  delay = 0,
  dir = 'up',
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  dir?: 'up' | 'left' | 'right'
}) {
  const { ref, visible } = useInView()
  const translate =
    dir === 'up' ? 'translateY(32px)' :
    dir === 'left' ? 'translateX(-32px)' :
    'translateX(32px)'
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : translate,
        transition: `opacity 0.65s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.65s cubic-bezier(.22,1,.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

/* ── tiny icon set ─────────────────────────────────────── */
const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6"/>
  </svg>
)
const ArrowRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
  </svg>
)
const CheckCircle = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/>
  </svg>
)
const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l.91-.9a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
)
const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="3"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
)
const TrophyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
    <path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
  </svg>
)

/* ══════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════ */
/* ── testimonials data ─────────────────────────────────── */
const testimonials = [
  {
    name: 'Ingrid B.',
    text: 'Professionaalne, meeldiv ja usaldusväärne. Protsess oli selgelt lahti seletatud ning iganädalane tagasiside andis kindlustunde. Lõpptulemus ületas ootusi.',
  },
  {
    name: 'Paul A.',
    text: 'Hoidis mind kogu protsessi vältel kursis — sain rahulikult kolimisele keskenduda. Tehinguni jõudsime prognoositust oluliselt varem. Jäin väga rahule.',
  },
  {
    name: 'Eike U.',
    text: 'Esimest korda täiesti vau elamus maakleriga. Kiire, täpne, suurepärane fotograaf ja pidev side. Notarisse tõi isegi kingituse! Täiesti teine tase.',
  },
  {
    name: 'Kata P.',
    text: 'Kogu protsess sujus stressivabalt algusest lõpuni. Tundsin, et minu huvid on alati esikohal.',
  },
  {
    name: 'Alla P.',
    text: 'Olin alguses skeptiline, kuid maakler ületas kõik ootused. Müük toimus kiiremini ja parema hinnaga kui ootasin.',
  },
  {
    name: 'Laura C.',
    text: 'Leidis kiiresti usaldusväärse üürniku ja korraldas kõik näitamised. Professionaalne taustakontroll säästis palju aega ja närve.',
  },
]

const REELS = [1,2,3,4,5,6,7,8,9]

function ReelSlideshow() {
  const [idx, setIdx] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIdx(i => (i + 1) % REELS.length)
        setVisible(true)
      }, 500)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="rounded-3xl overflow-hidden bg-stone-900 aspect-[9/16] w-full border border-stone-200">
      <video
        key={idx}
        src={`/reels/${REELS[idx]}.mp4`}
        autoPlay
        muted
        loop
        playsInline
        style={{ transition: 'opacity 0.5s', opacity: visible ? 1 : 0 }}
        className="w-full h-full object-cover"
      />
    </div>
  )
}

function TestimonialCard({ t, fullWidth }: { t: { name: string; text: string }; fullWidth?: boolean }) {
  return (
    <div className={`${fullWidth ? 'w-full' : 'shrink-0 w-96'} bg-stone-50 border border-stone-200 rounded-3xl px-6 py-5 flex flex-col gap-3`}>
      <p className="text-stone-600 text-sm leading-relaxed font-normal flex-1">{t.text}</p>
      <div className="font-bold text-[#161616] text-sm">{t.name}</div>
    </div>
  )
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <div className="bg-white text-[#161616] min-h-screen overflow-x-hidden font-sans">

      {/* ═══ NAV ═══════════════════════════════════════════ */}
      {/* desktop navbar */}
      <header
        className={`hidden md:block fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-end pb-5 justify-between relative">
          {/* left: name + Kodumaa logo */}
          <div className="flex items-center gap-3">
            <span className="text-[#161616] font-bold text-base tracking-tight">Reno Mark</span>
            <span className="w-px h-4 bg-stone-200" />
            <a href="https://kodumaakinnisvara.ee" target="_blank" rel="noopener noreferrer" className="opacity-50 hover:opacity-80 transition-opacity">
              <img src="/images/kodumaa-logo.svg" alt="Kodumaa Kinnisvara" className="h-7 w-auto" />
            </a>
          </div>

          {/* center: nav */}
          <nav className="flex items-center gap-7 text-sm font-medium text-stone-500 absolute left-1/2 -translate-x-1/2 bottom-5">
            <a href="#minust" className="hover:text-[#161616] transition-colors">Minust</a>
            <a href="#tunnustused" className="hover:text-[#161616] transition-colors">Tunnustused</a>
            <a href="#kontakt" className="hover:text-[#161616] transition-colors">Kontakt</a>
          </nav>

          {/* right: CTA */}
          <a
            href="https://wa.me/37253935292"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold px-5 py-2.5 rounded-full bg-[#161616] text-white hover:bg-[#B8775A] transition-all duration-300"
          >
            Võta ühendust <ChevronRight />
          </a>
        </div>
      </header>

      {/* mobile — fixed round button top-right */}
      <button
        className="md:hidden fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-[#161616] flex items-center justify-center shadow-lg hover:bg-[#B8775A] transition-colors"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menüü"
      >
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

      {/* mobile overlay — slides up from bottom */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${menuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        onClick={() => setMenuOpen(false)}
      >
        {/* backdrop */}
        <div className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0'}`} />

        {/* sheet */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-white rounded-tl-3xl rounded-tr-3xl px-6 pt-6 pb-10 transition-transform duration-400 ease-out ${menuOpen ? 'translate-y-0' : 'translate-y-full'}`}
          onClick={e => e.stopPropagation()}
        >
          {/* drag handle */}
          <div className="w-10 h-1 rounded-full bg-stone-200 mx-auto mb-8" />

          <nav className="flex flex-col gap-1">
            {[['#minust', 'Minust'], ['#tunnustused', 'Tunnustused'], ['#kontakt', 'Kontakt']].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="text-xl font-bold text-[#161616] py-3 border-b border-stone-100 hover:text-[#B8775A] transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
          </nav>

          <a
            href="https://wa.me/37253935292"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex items-center justify-center gap-2 py-4 rounded-full bg-[#161616] text-white font-semibold text-sm"
            onClick={() => setMenuOpen(false)}
          >
            Võta ühendust
          </a>
        </div>
      </div>

      {/* ═══ HERO ══════════════════════════════════════════ */}
      <section className="min-h-screen flex flex-col justify-center md:pt-16">
        <div className="max-w-7xl mx-auto px-6 w-full py-6 md:py-20">
          <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 lg:gap-16 lg:items-center">

            {/* left */}
            <div>

              <h1
                className="text-[clamp(2.5rem,6.5vw,5.5rem)] font-extrabold leading-[1.0] tracking-tight mb-4 md:mb-8 text-[#161616]"
                style={{ opacity: 0, animation: 'fadeUp .65s .2s ease forwards' }}
              >
                Sinu kinnisvara.<br />
                <span className="text-[#B8775A]">Minu</span> prioriteet.
              </h1>

              <p
                className="text-stone-500 text-base md:text-lg leading-relaxed max-w-lg mb-5 md:mb-10 font-normal"
                style={{ opacity: 0, animation: 'fadeUp .65s .35s ease forwards' }}
              >
                Läbipaistev, aus ja detailidele orienteeritud maakler, kes paneb sinu eesmärgid alati esikohale.
              </p>

              <div
                className="flex flex-wrap gap-4"
                style={{ opacity: 0, animation: 'fadeUp .65s .45s ease forwards' }}
              >
                <a
                  href="#kontakt"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#161616] text-white font-semibold text-sm hover:bg-[#B8775A] transition-all duration-300 hover:-translate-y-0.5 shadow-sm hover:shadow-md"
                >
                  Tasuta kinnisvara hinnastamine <ChevronRight />
                </a>
                <a
                  href="https://www.kv.ee/broker/renomark"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-stone-200 text-stone-600 font-semibold text-sm hover:border-stone-300 hover:text-[#161616] transition-all duration-200"
                >
                  Portfellis olevad objektid <ChevronRight />
                </a>
              </div>

            </div>

            {/* right — hero card */}
            <div
              className="relative"
              style={{ opacity: 0, animation: 'fadeUp .7s .3s ease forwards' }}
            >
              {/* main photo card — chips live inside so they never overflow the grid */}
              <div className="relative rounded-3xl overflow-visible bg-stone-100 aspect-[3/4] md:aspect-[4/5] max-w-md ml-auto">
                <div className="absolute inset-0 rounded-3xl overflow-hidden border border-stone-200">
                  <Image
                    src="/images/about.jpeg"
                    alt="Reno Mark"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-stone-100/60 to-transparent" />
                </div>

                {/* floating chip — top left */}
                <div className="absolute -left-5 top-10 bg-white rounded-2xl shadow-lg shadow-stone-200/80 px-4 py-3 border border-stone-100 z-10">
                  <div className="text-xl font-extrabold text-[#161616] leading-none">100+</div>
                  <div className="text-xs text-stone-500 font-medium mt-1">Klienti aidatud</div>
                </div>

                {/* floating chip — mid left */}
                <div className="absolute -left-5 top-[45%] bg-white rounded-2xl shadow-lg shadow-stone-200/80 px-4 py-3 border border-stone-100 z-10">
                  <div className="text-xl font-extrabold text-[#B8775A] leading-none">~65p</div>
                  <div className="text-xs text-stone-500 font-medium mt-1">Keskmine tehinguaeg</div>
                </div>

                {/* floating chip — top right */}
                <div className="absolute -right-5 top-20 bg-white rounded-2xl shadow-lg shadow-stone-200/80 px-4 py-3 border border-stone-100 z-10">
                  <div className="text-xl font-extrabold text-[#161616] leading-none">TOP 1</div>
                  <div className="text-xs text-stone-500 font-medium mt-1">Kodumaa käive 2025</div>
                </div>

                {/* floating chip — bottom right */}
                <div className="absolute -right-5 bottom-20 bg-white rounded-2xl shadow-lg shadow-stone-200/80 px-4 py-3 border border-stone-100 z-10">
                  <div className="text-xl font-extrabold text-[#B8775A] leading-none">5+</div>
                  <div className="text-xs text-stone-500 font-medium mt-1">Aastat müügikogemust</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ AWARDS BANNER ═════════════════════════════════ */}
      <section id="tunnustused" className="bg-[#161616]">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-center">
            <div className="flex flex-wrap justify-center gap-3">
              {['TOP TEHINGUD 2025 · Kodumaa Kinnisvara', 'TOP KÄIVE 2025 · Kodumaa Kinnisvara'].map((award) => (
                <div key={award} className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 text-white text-xs font-semibold tracking-wide hover:border-[#B8775A]/60 transition-colors cursor-default">
                  <TrophyIcon />
                  {award}
                </div>
              ))}
              <div className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 text-white text-xs font-semibold tracking-wide hover:border-[#B8775A]/60 transition-colors cursor-default">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://www.kv.ee/inc/sinuaasta/images/icon.svg"
                  alt="KV.EE"
                  width={18}
                  height={18}
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
                KV.EE TIPPMAAKLER 2025
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ═══ ABOUT ═════════════════════════════════════════ */}
      <section id="minust" className="max-w-7xl mx-auto px-6 py-14 md:py-28">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-start">

          {/* left */}
          <div className="lg:sticky lg:top-24">
            <Reveal dir="left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#B8775A] text-white text-xs font-semibold uppercase tracking-widest mb-6">
                Minust
              </div>
              <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-[1.1] tracking-tight text-[#161616] mb-6">
                Maakler, <br className="hidden lg:block" />kes räägib<br className="lg:hidden" /> <br className="hidden lg:block" />sulle alati tõtt.
              </h2>
              <p className="text-stone-500 leading-relaxed mb-10 text-[0.95rem]">
                Minu fookus ei ole minu enda edu — fookus on väärtusel, mida loon igale kliendile. Iga tehing on ainulaadne ning iga inimene vajab personaalset lähenemist.
              </p>
            </Reveal>

            {/* photo (desktop) / reel slideshow (mobile) */}
            <Reveal delay={0.1} dir="left">
              <div className="hidden lg:block relative rounded-3xl overflow-hidden bg-stone-100 aspect-[3/4] max-w-sm border border-stone-200">
                <Image
                  src="/images/team.jpeg"
                  alt="Reno Mark"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div className="lg:hidden">
                <ReelSlideshow />
              </div>
            </Reveal>

            {/* quote — mobile only, shown after photo */}
            <Reveal delay={0.2} dir="left">
              <div className="lg:hidden pt-8 border-t border-stone-200">
                <p className="text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-[1.1] tracking-tight text-[#161616]">
                  &ldquo;I&rsquo;m not important,<br />but what I do<br />and what I give is.&rdquo;
                </p>
              </div>
            </Reveal>
          </div>

          {/* right — bio cards */}
          <div className="space-y-5">
            {[
              {
                tag: 'Iseloom',
                text: 'Olen detailidele orienteeritud ja korrektsust väärtustav inimene. Mulle on oluline, et asjad oleksid läbimõeldud ja tehtud korralikult, mitte pealiskaudselt. Hindan kõrgelt ausust ja lojaalsust.',
              },
              {
                tag: 'Müügikogemus',
                text: 'Minu müügikogemus sai tugeva aluse Southwestern Advantage programmis — müüsin kahel suvel raamatuid ukselt uksele USA-s. See õpetas iseseisvust, järjepidevust ja inimeste usalduse kiiresti võitmist.',
              },
              {
                tag: 'Profisportlane',
                text: 'Taust professionaalse jalgpallurina on andnud distsipliini, järjepidevuse ja meeskonnatöö vundamendi. Aastatepikkune sportlaskarjäär õpetas töötama eesmärkide nimel ka siis, kui tingimused pole ideaalsed.',
              },
              {
                tag: 'Maaklerina',
                text: 'Kinnisvara ei ole pelgalt tehing — see on inimese jaoks üks elu suurimaid otsuseid. Olen õppinud mõistma, et iga klient on erinev ning minu roll on aidata tal teha otsus, mis vastab just tema vajadustele.',
              },
            ].map((card, i) => (
              <Reveal key={card.tag} delay={i * 0.07}>
                <div className="rounded-2xl p-7 border bg-white border-stone-200 hover:border-stone-300 hover:shadow-sm transition-all duration-300 hover:-translate-y-0.5">
                  <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-3 text-[#B8775A]">
                    {card.tag}
                  </span>
                  <p className="text-[0.9rem] leading-relaxed font-normal text-stone-600">
                    {card.text}
                  </p>
                </div>
              </Reveal>
            ))}

            {/* põhimõte — open quote, desktop only */}
            <Reveal delay={0.35}>
              <div className="hidden lg:block pt-4 border-t border-stone-200">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#B8775A] block mb-4"> </span>
                <p className="text-[2rem] font-bold leading-tight tracking-tight text-[#161616]">
                  &ldquo;I&rsquo;m not important,<br />but what I do and what I give is.&rdquo;
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ VALUES ════════════════════════════════════════ */}
      <section className="bg-stone-50 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-14 md:py-28">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">

            <div className="lg:w-72 lg:shrink-0">
              <Reveal>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#B8775A] text-white text-xs font-semibold uppercase tracking-widest mb-6">
                  Mida saad oodata
                </div>
                <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-tight text-[#161616]">
                  Minu töö<br />põhimõtted
                </h2>
              </Reveal>
            </div>

            <div className="flex-1 grid sm:grid-cols-2 gap-4">
              {[
                { icon: '01', title: 'Läbipaistev suhtlus', desc: 'Räägin alati ausalt — ka siis, kui see pole see, mida tahaksid kuulda.' },
                { icon: '02', title: 'Detailidele orienteeritud', desc: 'Iga etapp on läbimõeldud. Pealiskaudsust ei luba ma endale ega klientidele.' },
                { icon: '03', title: 'Sinu eesmärgid esikohal', desc: 'Mina ei ole oluline. Oluline on väärtus, mida loon sulle.' },
                { icon: '04', title: 'Tugev läbirääkimisoskus', desc: 'Aastaid müügis — saan aru, kuidas luua usaldust ja kaitsta sinu huve.' },
                { icon: '05', title: 'Sportlase mentaliteet', desc: 'Distsipliin, järjepidevus ja fookus ka keerulisemates olukordades.' },
                { icon: '06', title: 'Süsteemne lähenemine', desc: 'Süsteemne, kõrge kvaliteediga protsess igas tehingu etapis.' },
              ].map((v, i) => (
                <Reveal key={v.icon} delay={i * 0.06}>
                  <div className="bg-white rounded-2xl p-6 border border-stone-200 hover:border-stone-300 hover:shadow-sm transition-all duration-300 hover:-translate-y-0.5 h-full">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-xl bg-stone-100 flex items-center justify-center">
                        <CheckCircle />
                      </div>
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



      {/* ═══ MÜÜGIPROTSESS ═════════════════════════════════ */}
      <section className="bg-stone-50 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-14 md:py-28">
          <Reveal className="mb-8 md:mb-16">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-tight text-[#161616]">
              Müügiprotsess
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                step: '01',
                title: 'Esmane kohtumine',
                desc: 'Tutvume, kuulan sinu eesmärke ja olukorda. Selgitame välja, kas ja kuidas saan aidata. Esimene konsultatsioon on alati tasuta.',
              },
              {
                step: '02',
                title: 'Objekti hindamine',
                desc: 'Hindan kinnisvara turuväärtust, annan soovitused ettevalmistuseks ning lepime kokku müügistrateegia ja hinnapositsioneerimise.',
              },
              {
                step: '03',
                title: 'Ettevalmistus & turundus',
                desc: 'Professionaalne fotograaf, läbimõeldud kuulutus ja sihitud turundus — tagame, et su objekt jõuab õigete inimesteni.',
              },
              {
                step: '04',
                title: 'Näitamised',
                desc: 'Organiseerin kõik näitamised ja filtreerin tõsised huvilised välja. Annan pärast iga näitamist põhjaliku ülevaate.',
              },
              {
                step: '05',
                title: 'Läbirääkimised',
                desc: 'Esindame sinu huve pakkumiste läbirääkimistel ning tagame, et saad parima võimaliku hinna ja tingimused.',
              },
              {
                step: '06',
                title: 'Notar & üleandmine',
                desc: 'Korraldame kõik notariaalsed toimingud ning jälgin, et üleandmine toimuks sujuvalt ja mõlemat poolt rahuldavalt.',
              },
            ].map((s, i) => (
              <Reveal key={s.step} delay={i * 0.06}>
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

      {/* ═══ MÜÜDUD OBJEKTID ═══════════════════════════════ */}
      <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-14 md:py-28">
        <Reveal className="mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#B8775A] text-white text-xs font-semibold uppercase tracking-widest mb-6">
            Portfolio
          </div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-tight text-[#161616]">
            Müüdud objektid
          </h2>
        </Reveal>

        {/* mobile — single column scrolling vertically */}
        {(() => {
          const imgs = [1,2,3,4,5,6,8,9,10,11,12,13,14,15,16,17,18,19,20,21];
          const renderImg = (n: number, i: number) => (
            <div key={`${n}-${i}`} className="rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 relative mb-3">
              <Image
                src={`/myydud/${n}.png`}
                alt={`Müüdud objekt ${n}`}
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          );
          return (
            <div className="md:hidden relative h-[520px] overflow-hidden">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-16 z-10 bg-gradient-to-b from-white to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 z-10 bg-gradient-to-t from-white to-transparent" />
              <div className="scroll-up-col-slow">
                {[...imgs, ...imgs].map((n, i) => renderImg(n, i))}
              </div>
            </div>
          );
        })()}

        {/* desktop — masonry grid */}
        <div className="hidden md:block columns-3 lg:columns-4 gap-4 space-y-4">
          {[1,2,3,4,5,6,8,9,10,11,12,13,14,15,16,17,18,19,20,21].map((n) => (
            <Reveal key={n} delay={(n % 4) * 0.06}>
              <div className="break-inside-avoid rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 group relative">
                <Image
                  src={`/myydud/${n}.png`}
                  alt={`Müüdud objekt ${n}`}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors duration-500" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      </section>

      {/* ═══ REELS ═════════════════════════════════════════ */}
      <section className="hidden md:block bg-stone-50 border-y border-stone-200 py-20">
        <div className="max-w-7xl mx-auto px-6 overflow-hidden">
          <div className="flex gap-4 reels-marquee">
            {[...REELS, ...REELS].map((n, i) => (
              <div key={i} className="shrink-0 w-[200px] rounded-3xl overflow-hidden bg-stone-900" style={{ aspectRatio: '9/16' }}>
                <video src={`/reels/${n}.mp4`} autoPlay muted loop playsInline className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ══════════════════════════════════ */}
      <section className="bg-white border-y border-stone-200 py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-8 md:mb-14">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#B8775A] text-white text-xs font-semibold uppercase tracking-widest mb-6">
              Klientide tagasiside
            </div>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-tight text-[#161616]">
              Mida kliendid ütlevad
            </h2>
          </Reveal>
        </div>

        {/* mobile — vertical scroll */}
        <div className="md:hidden relative h-[480px] overflow-hidden px-6">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-16 z-10 bg-gradient-to-b from-white to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 z-10 bg-gradient-to-t from-white to-transparent" />
          <div className="scroll-up-col">
            {[...testimonials, ...testimonials].map((t, i) => (
              <div key={i} className="mb-4">
                <TestimonialCard t={t} fullWidth />
              </div>
            ))}
          </div>
        </div>

        {/* desktop — scrolling marquee */}
        <div className="hidden md:block">
          <div className="flex gap-5 mb-5 marquee-left">
            {[...testimonials, ...testimonials].map((t, i) => (
              <TestimonialCard key={i} t={t} />
            ))}
          </div>
          <div className="flex gap-5 marquee-right">
            {[...testimonials.slice().reverse(), ...testimonials.slice().reverse()].map((t, i) => (
              <TestimonialCard key={i} t={t} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CONTACT ═══════════════════════════════════════ */}
      <section id="kontakt" className="bg-stone-50 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-14 md:py-28">
          <div className="grid lg:grid-cols-2 gap-16 items-end">

            {/* left — heading + contact links */}
            <Reveal dir="left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#B8775A] text-white text-xs font-semibold uppercase tracking-widest mb-6">
                Kontakt
              </div>
              <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-extrabold leading-[1.1] tracking-tight text-[#161616] mb-6">
                Alusta oma<br />kinnisvara<br />teekonda.
              </h2>
              <p className="text-stone-500 leading-relaxed text-[0.95rem] max-w-md mb-10">
                Olenemata sellest, kas oled ostja või müüja — olen siin, et aidata sul teha parim otsus.
              </p>

              {/* mobile-only CTA content */}
              <div className="lg:hidden mb-10">
                <p className="text-stone-500 text-sm leading-relaxed mb-6 font-normal">
                  Esimene konsultatsioon on alati tasuta. Räägi mulle oma soovidest ja vaatame koos, kuidas saan aidata.
                </p>
                <div className="space-y-3 mb-6">
                  {['Tasuta esialgne konsultatsioon','Kiire vastus — maksimaalselt 24h','Personaalne lähenemine igale kliendile','Läbipaistev protsess algusest lõpuni'].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-stone-600 text-sm font-normal">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#B8775A] shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-3">
                  <a href="https://wa.me/37253935292" target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-[#B8775A] text-white font-semibold text-sm hover:bg-[#C88B6A] transition-all duration-300">
                    <PhoneIcon />Helista kohe
                  </a>
                  <a href="https://wa.me/37253935292?text=Tere%2C+sooviksin+rohkem+infot." target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl border border-stone-200 text-[#161616] font-semibold text-sm hover:border-stone-300 hover:bg-stone-50 transition-all duration-300">
                    <MailIcon />Kirjuta mulle
                  </a>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <a href="tel:+37253935292" className="group inline-flex items-center gap-4 p-5 rounded-2xl border border-stone-200 hover:border-stone-300 hover:shadow-sm transition-all duration-200">
                  <div className="w-10 h-10 rounded-xl bg-[#161616] text-white flex items-center justify-center shrink-0 group-hover:bg-[#B8775A] transition-colors duration-300"><PhoneIcon /></div>
                  <div>
                    <div className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-0.5">Telefon</div>
                    <div className="font-bold text-[#161616] text-sm">+372 5393 5292</div>
                  </div>
                  <ChevronRight />
                </a>
                <a href="mailto:reno@kodumaa.ee" className="group inline-flex items-center gap-4 p-5 rounded-2xl border border-stone-200 hover:border-stone-300 hover:shadow-sm transition-all duration-200">
                  <div className="w-10 h-10 rounded-xl bg-[#161616] text-white flex items-center justify-center shrink-0 group-hover:bg-[#B8775A] transition-colors duration-300"><MailIcon /></div>
                  <div>
                    <div className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-0.5">E-post</div>
                    <div className="font-bold text-[#161616] text-sm">reno@kodumaa.ee</div>
                  </div>
                  <ChevronRight />
                </a>
                <a href="https://www.kv.ee/broker/renomark" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-4 p-5 rounded-2xl border border-stone-200 hover:border-stone-300 hover:shadow-sm transition-all duration-200">
                  <div className="w-10 h-10 rounded-xl bg-[#161616] flex items-center justify-center shrink-0 group-hover:bg-[#B8775A] transition-colors duration-300">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://www.kv.ee/favicon.ico" alt="KV.EE" width={20} height={20} style={{ filter: 'brightness(0) invert(1)' }} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-0.5">KV.EE profiil</div>
                    <div className="font-bold text-[#161616] text-sm">kv.ee/broker/renomark</div>
                  </div>
                  <ChevronRight />
                </a>
              </div>
            </Reveal>

            {/* right — CTA card (desktop only) */}
            <Reveal dir="right" delay={0.1} className="hidden lg:block">
              <div className="rounded-3xl p-10 border border-stone-200">
                <h3 className="text-2xl font-extrabold tracking-tight text-[#161616] mb-3">Valmis alustama?</h3>
                <p className="text-stone-500 text-sm leading-relaxed mb-8 font-normal">
                  Esimene konsultatsioon on alati tasuta. Räägi mulle oma soovidest ja vaatame koos, kuidas saan aidata.
                </p>
                <div className="space-y-3 mb-8">
                  {['Tasuta esialgne konsultatsioon','Kiire vastus — maksimaalselt 24h','Personaalne lähenemine igale kliendile','Läbipaistev protsess algusest lõpuni'].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-stone-600 text-sm font-normal">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#B8775A] shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-3">
                  <a href="https://wa.me/37253935292" target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-[#B8775A] text-white font-semibold text-sm hover:bg-[#C88B6A] transition-all duration-300 hover:-translate-y-0.5">
                    <PhoneIcon />Helista kohe
                  </a>
                  <a href="https://wa.me/37253935292?text=Tere%2C+sooviksin+rohkem+infot." target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl border border-stone-200 text-[#161616] font-semibold text-sm hover:border-stone-300 hover:bg-stone-50 transition-all duration-300 hover:-translate-y-0.5">
                    <MailIcon />Kirjuta mulle
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>


      {/* keyframes */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes marqueeLeft {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        .marquee-left {
          animation: marqueeLeft 40s linear infinite;
        }
        .marquee-right {
          animation: marqueeRight 48s linear infinite;
        }
        @keyframes scrollUp {
          from { transform: translateY(0); }
          to   { transform: translateY(-50%); }
        }
        @keyframes scrollDown {
          from { transform: translateY(-50%); }
          to   { transform: translateY(0); }
        }
        .scroll-up-col      { animation: scrollUp  28s linear infinite; }
        .scroll-up-col-slow { animation: scrollUp  90s linear infinite; }
        .scroll-down-col    { animation: scrollDown 34s linear infinite; }
        .reels-marquee      { animation: marqueeLeft 60s linear infinite; }
      `}</style>
    </div>
  )
}
