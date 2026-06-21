'use client'

import { useState } from 'react'

type Screen = 'form' | 'ty-yes' | 'ty-no'

interface FormData {
  propertyType: string
  rooms: string
  address: string
  planSoon: 'jah' | 'ei' | ''
  name: string
  phone: string
  email: string
}

interface Props {
  onClose: () => void
}

const inputClass =
  'w-full px-[14px] py-[10px] border border-black/[0.15] rounded-[10px] text-sm text-[#0a0a0a] bg-[#fafafa] outline-none appearance-none focus:border-[#B8775A] transition-colors font-sans'

const labelClass =
  'block text-[11px] font-medium text-black/40 uppercase tracking-[0.08em] mb-[5px]'

function ChevronDown() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="absolute right-[14px] top-1/2 -translate-y-1/2 pointer-events-none">
      <path d="M2 4l4 4 4-4" stroke="rgba(0,0,0,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SelectField({ label, value, onChange, options, placeholder }: {
  label: string
  value: string
  onChange: (v: string) => void
  options: string[]
  placeholder: string
}) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <div className="relative">
        <select
          required
          value={value}
          onChange={e => onChange(e.target.value)}
          className={`${inputClass} pr-9 cursor-pointer`}
        >
          <option value="" disabled>{placeholder}</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown />
      </div>
    </div>
  )
}

export default function ValuationModal({ onClose }: Props) {
  const [screen, setScreen] = useState<Screen>('form')
  const [form, setForm] = useState<FormData>({
    propertyType: '', rooms: '', address: '', planSoon: '', name: '', phone: '', email: '',
  })
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    try {
      const params = new URLSearchParams(window.location.search)
      await fetch('/api/hinnastamine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          utmSource: params.get('utm_source') ?? undefined,
          utmMedium: params.get('utm_medium') ?? undefined,
          utmCampaign: params.get('utm_campaign') ?? undefined,
        }),
      })
    } catch (_) {}
    setScreen(form.planSoon === 'jah' ? 'ty-yes' : 'ty-no')
    setSubmitting(false)
  }

  if (screen === 'ty-yes' || screen === 'ty-no') {
    const isYes = screen === 'ty-yes'
    return (
      <>
        <style>{`@keyframes modalIn{from{opacity:0;transform:scale(.96)}to{opacity:1;transform:scale(1)}}`}</style>
        <div
          className="font-sans fixed inset-0 flex items-center justify-center p-5"
          style={{ zIndex: 10000, background: 'rgba(10,10,10,0.55)', backdropFilter: 'blur(6px)' }}
        >
          <div
            className="bg-white rounded-[20px] w-full max-w-[460px] overflow-hidden shadow-2xl"
            style={{ animation: '0.3s ease modalIn both' }}
          >
            <div className="px-8 pt-10 pb-10 flex flex-col items-center text-center gap-5">
              <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center shrink-0">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B8775A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/>
                </svg>
              </div>
              {isYes ? (
                <div>
                  <p className="text-base font-bold text-[#161616] mb-3 leading-snug">Tänan Teid päringu esitamise eest!</p>
                  <p className="text-sm text-stone-500 leading-relaxed mb-2">
                    Olen Teie andmed edukalt kätte saanud. Võtan Teiega ühendust hiljemalt 48 tunni jooksul, kui olen esitatud informatsiooni üle vaadanud.
                  </p>
                  <p className="text-sm text-stone-500 leading-relaxed">
                    Seniks tänan Teid usalduse eest ja soovin Teile ilusat päeva!
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-base font-bold text-[#161616] mb-3 leading-snug">Täname Teid päringu esitamise eest!</p>
                  <p className="text-sm text-stone-500 leading-relaxed mb-2">
                    Hindame Teie huvi meie teenuse vastu. Suurenenud töökoormuse tõttu ei pruugi meil olla võimalik vastata kõikidele saabunud päringutele.
                  </p>
                  <p className="text-sm text-stone-500 leading-relaxed mb-2">
                    Teeme omalt poolt parima, et Teie taotlus esimesel võimalusel üle vaadata. Kui Te ei ole meilt mõistliku aja jooksul tagasisidet saanud või Teil on kiireloomulisi küsimusi, palume võtta ühendust telefoni teel.
                  </p>
                  <p className="text-sm text-stone-500 leading-relaxed mb-4">
                    Täname mõistva suhtumise eest ning soovime Teile ilusat päeva!
                  </p>
                  <p className="text-sm text-stone-500 leading-relaxed">
                    Lugupidamisega<br />Reno Mark Kinnisvaramaakler
                  </p>
                </div>
              )}
              {isYes ? (
                <button
                  onClick={onClose}
                  className="text-stone-400 hover:text-stone-600 transition-colors text-xl leading-none mt-1"
                  aria-label="Sulge"
                >
                  ×
                </button>
              ) : (
                <button
                  onClick={onClose}
                  aria-label="Sulge"
                  className="w-8 h-8 rounded-full border border-black/[0.12] flex items-center justify-center text-base text-black/50 hover:border-black/30 hover:text-black/70 transition-colors mt-1"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <style>{`@keyframes modalIn{from{opacity:0;transform:scale(.96)}to{opacity:1;transform:scale(1)}}`}</style>
      <div
        className="font-sans fixed inset-0 flex items-center justify-center p-5"
        style={{ zIndex: 10000, background: 'rgba(10,10,10,0.55)', backdropFilter: 'blur(6px)' }}
        onClick={onClose}
      >
        <div
          className="bg-white rounded-[20px] w-full max-w-[520px] max-h-[90vh] flex flex-col overflow-hidden shadow-2xl"
          style={{ animation: '0.3s ease modalIn both' }}
          onClick={e => e.stopPropagation()}
        >
          {/* header */}
          <div className="flex items-center justify-between px-7 pt-6 pb-5 border-b border-black/[0.07] shrink-0">
            <p style={{ fontSize: 17, fontWeight: 500, color: '#0a0a0a', letterSpacing: '-0.01em' }}>
              Tasuta kinnisvara hinnastamine
            </p>
            <button
              onClick={onClose}
              aria-label="Sulge"
              className="w-8 h-8 rounded-full border border-black/[0.12] bg-transparent cursor-pointer flex items-center justify-center text-base text-black/50 shrink-0 hover:border-black/30 hover:text-black/70 transition-colors"
            >
              ×
            </button>
          </div>

          {/* body */}
          <div className="overflow-y-auto px-7 pt-6 pb-8 flex-1">
            <form onSubmit={handleSubmit} className="flex flex-col gap-[14px]">

              <SelectField
                label="Mis tüüpi vara soovite hinnastada?"
                value={form.propertyType}
                onChange={v => setForm(f => ({ ...f, propertyType: v, rooms: v === 'Maatükk' ? '' : f.rooms }))}
                placeholder="Vali vara tüüp"
                options={['Korter', 'Maja', 'Ridaelamu', 'Suvila', 'Maatükk']}
              />

              {form.propertyType !== 'Maatükk' && (
                <SelectField
                  label="Mitme toaline antud vara on?"
                  value={form.rooms}
                  onChange={v => setForm(f => ({ ...f, rooms: v }))}
                  placeholder="Vali tubade arv"
                  options={['1', '2', '3', '4', '5', '6+']}
                />
              )}

              <div>
                <label className={labelClass}>Mis aadressil hinnastamist vajav vara asub?</label>
                <input
                  required
                  type="text"
                  placeholder="nt Tallinn, Mustamäe tee 12"
                  value={form.address}
                  onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={`${labelClass} mb-3`}>Kas plaanite antud vara järgneva kolme kuu jooksul müüki panna?</label>
                <div className="flex gap-3">
                  {(['jah', 'ei'] as const).map(val => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setForm(f => ({ ...f, planSoon: val }))}
                      className={`flex-1 py-[10px] rounded-[10px] text-sm font-medium border transition-all duration-150 ${
                        form.planSoon === val
                          ? 'bg-[#161616] text-white border-[#161616]'
                          : 'bg-[#fafafa] text-[#0a0a0a] border-black/[0.15] hover:border-black/30'
                      }`}
                    >
                      {val === 'jah' ? 'Jah' : 'Ei'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className={labelClass}>Teie nimi</label>
                <input
                  required
                  type="text"
                  placeholder="Eesnimi Perenimi"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-2 gap-[10px]">
                <div>
                  <label className={labelClass}>Telefon</label>
                  <input
                    required
                    type="tel"
                    placeholder="+372 ..."
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>E-mail</label>
                  <input
                    required
                    type="email"
                    placeholder="email@näide.ee"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* submit */}
              <button
                type="submit"
                disabled={submitting || !form.planSoon}
                className="mt-1 py-[14px] bg-[#0a0a0a] text-white rounded-[10px] text-[13px] font-medium cursor-pointer tracking-[0.01em] transition-colors hover:bg-[#B8775A] disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ border: 'none' }}
              >
                {submitting ? 'Saadame...' : 'Saada hinnastamistaotlus →'}
              </button>

              <p className="text-[11px] text-black/30 leading-[1.6] text-center">
                Andmeid kasutatakse üksnes hinnastamispäringule vastamiseks.
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
