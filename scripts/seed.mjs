/**
 * Sanity seed script — populates all content from hardcoded data + local files
 * Run: node scripts/seed.mjs
 *
 * Requires SANITY_WRITE_TOKEN in .env.local
 */

import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// ── load .env.local manually ──────────────────────────────────────────────────
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const envPath = path.join(__dirname, '..', '.env.local')
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, 'utf8').replace(/\r/g, '').split('\n')
  for (const line of lines) {
    if (line.startsWith('#') || !line.includes('=')) continue
    const [key, ...rest] = line.split('=')
    if (key && rest.length) process.env[key.trim()] = rest.join('=').trim().replace(/^["']|["']$/g, '')
  }
}

const token = process.env.SANITY_WRITE_TOKEN
if (!token) {
  console.error('❌  SANITY_WRITE_TOKEN puudub .env.local failis!')
  console.error('   Lisa: SANITY_WRITE_TOKEN=sk...')
  process.exit(1)
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '4pu1ripv',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-04-14',
  token,
  useCdn: false,
})

// ── helpers ───────────────────────────────────────────────────────────────────
async function deleteExisting(type) {
  const ids = await client.fetch(`*[_type == $type]._id`, { type })
  if (!ids.length) return
  const tx = client.transaction()
  ids.forEach((id) => tx.delete(id))
  await tx.commit()
  console.log(`  🗑  kustutatud ${ids.length} x ${type}`)
}

async function uploadImage(filePath, filename) {
  const stream = fs.createReadStream(filePath)
  const asset = await client.assets.upload('image', stream, { filename })
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
}

async function uploadVideo(filePath, filename) {
  const stream = fs.createReadStream(filePath)
  const asset = await client.assets.upload('file', stream, { filename })
  return { _type: 'file', asset: { _type: 'reference', _ref: asset._id } }
}

// ── data ──────────────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  { name: 'Ingrid B.', text: 'Professionaalne, meeldiv ja usaldusväärne. Protsess oli selgelt lahti seletatud ning iganädalane tagasiside andis kindlustunde. Lõpptulemus ületas ootusi.' },
  { name: 'Paul A.', text: 'Hoidis mind kogu protsessi vältel kursis — sain rahulikult kolimisele keskenduda. Tehinguni jõudsime prognoositust oluliselt varem. Jäin väga rahule.' },
  { name: 'Eike U.', text: 'Esimest korda täiesti vau elamus maakleriga. Kiire, täpne, suurepärane fotograaf ja pidev side. Notarisse tõi isegi kingituse! Täiesti teine tase.' },
  { name: 'Kata P.', text: 'Kogu protsess sujus stressivabalt algusest lõpuni. Tundsin, et minu huvid on alati esikohal.' },
  { name: 'Alla P.', text: 'Olin alguses skeptiline, kuid maakler ületas kõik ootused. Müük toimus kiiremini ja parema hinnaga kui ootasin.' },
  { name: 'Laura C.', text: 'Leidis kiiresti usaldusväärse üürniku ja korraldas kõik näitamised. Professionaalne taustakontroll säästis palju aega ja närve.' },
]

const PROCESS_STEPS = [
  { step: '01', title: 'Esmane kohtumine', desc: 'Tutvume, kuulan sinu eesmärke ja olukorda. Selgitame välja, kas ja kuidas saan aidata. Esimene konsultatsioon on alati tasuta.' },
  { step: '02', title: 'Teie kinnisvara hinnastamine', desc: 'Hindan kinnisvara turuväärtust, annan soovitused ettevalmistuseks ning lepime kokku müügistrateegia ja hinnapositsioneerimise.' },
  { step: '03', title: 'Ettevalmistus & turundus', desc: 'Professionaalne fotograaf, läbimõeldud kuulutus ja sihitud turundus — tagame, et su objekt jõuab õigete inimesteni.' },
  { step: '04', title: 'Näitamised', desc: 'Organiseerin kõik näitamised ja filtreerin tõsised huvilised välja. Annan pärast iga näitamist põhjaliku ülevaate.' },
  { step: '05', title: 'Läbirääkimised', desc: 'Esindame sinu huve pakkumiste läbirääkimistel ning tagame, et saad parima võimaliku hinna ja tingimused.' },
  { step: '06', title: 'Notar & üleandmine', desc: 'Korraldame kõik notariaalsed toimingud ning jälgin, et üleandmine toimuks sujuvalt ja mõlemat poolt rahuldavalt.' },
]

const VALUE_CARDS = [
  { icon: '01', title: 'Läbipaistev suhtlus', desc: 'Räägin alati ausalt — ka siis, kui see pole see, mida tahaksid kuulda.' },
  { icon: '02', title: 'Detailidele orienteeritud', desc: 'Iga etapp on läbimõeldud. Pealiskaudsust ei luba ma endale ega klientidele.' },
  { icon: '03', title: 'Sinu eesmärgid esikohal', desc: 'Mina ei ole oluline. Oluline on väärtus, mida loon sulle.' },
  { icon: '04', title: 'Tugev läbirääkimisoskus', desc: 'Aastaid müügis — saan aru, kuidas luua usaldust ja kaitsta sinu huve.' },
  { icon: '05', title: 'Sportlase mentaliteet', desc: 'Distsipliin, järjepidevus ja fookus ka keerulisemates olukordades.' },
  { icon: '06', title: 'Süsteemne lähenemine', desc: 'Süsteemne, kõrge kvaliteediga protsess igas tehingu etapis.' },
]

const BIO_CARDS = [
  { tag: 'Iseloom', text: 'Olen detailidele orienteeritud ja korrektsust väärtustav inimene. Mulle on oluline, et asjad oleksid läbimõeldud ja tehtud korralikult, mitte pealiskaudselt. Hindan kõrgelt ausust ja lojaalsust.' },
  { tag: 'Müügikogemus', text: 'Minu müügikogemus sai tugeva aluse Southwestern Advantage programmis — müüsin kahel suvel raamatuid ukselt uksele USA-s. See õpetas iseseisvust, järjepidevust ja inimeste usalduse kiiresti võitmist.' },
  { tag: 'Profisportlane', text: 'Taust professionaalse jalgpallurina on andnud distsipliini, järjepidevuse ja meeskonnatöö vundamendi. Aastatepikkune sportlaskarjäär õpetas töötama eesmärkide nimel ka siis, kui tingimused pole ideaalsed.' },
  { tag: 'Maaklerina', text: 'Kinnisvara ei ole pelgalt tehing — see on inimese jaoks üks elu suurimaid otsuseid. Olen õppinud mõistma, et iga klient on erinev ning minu roll on aidata tal teha otsus, mis vastab just tema vajadustele.' },
]

// ── main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log('🌱  Alustan Sanity seeding-ut...\n')

  // 0. UPLOAD HERO + TEAM PHOTOS
  console.log('🖼   Hero ja team fotod...')
  const imagesDir = path.join(__dirname, '..', 'public', 'images')
  process.stdout.write('  ⏳  about.jpeg üleslaadimiseks...')
  const heroImage = await uploadImage(path.join(imagesDir, 'about.jpeg'), 'about.jpeg')
  process.stdout.write(' ✅\n')
  process.stdout.write('  ⏳  team.jpeg üleslaadimiseks...')
  const teamImage = await uploadImage(path.join(imagesDir, 'team.jpeg'), 'team.jpeg')
  process.stdout.write(' ✅\n\n')

  // 1. SITE SETTINGS (singleton)
  console.log('📝  Lehe seaded...')
  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    heroPhoto: heroImage,
    aboutPhoto: teamImage,
    heroHeadingLine1: 'Sinu kinnisvara.',
    heroHeadingLine2: 'Minu prioriteet.',
    heroSubtitle: 'Läbipaistev, aus ja detailidele orienteeritud maakler, kes paneb sinu eesmärgid alati esikohale.',
    heroPrimaryButton: 'Tasuta kinnisvara hinnastamine',
    heroSecondaryButton: 'Suundu minu portfelli',
    chip1Value: '100+',
    chip1Label: 'Klienti aidatud',
    chip2Value: '~65p',
    chip2Label: 'Keskmine tehinguaeg',
    chip3Value: 'TOP 1',
    chip3Label: 'Kodumaa käive 2025',
    chip4Value: '5+',
    chip4Label: 'Aastat müügikogemust',
    aboutHeading: 'Maakler, kes räägib Sulle alati tõtt.',
    aboutSubtitle: 'Minu fookus ei ole minu enda edu — fookus on väärtusel, mida loon igale kliendile. Iga tehing on ainulaadne ning iga inimene vajab personaalset lähenemist.',
    aboutQuote: '"I\'m not important, but what I do and what I give is."',
    contactHeadingLine1: 'Alusta oma',
    contactHeadingLine2: 'kinnisvara',
    contactHeadingLine3: 'teekonda.',
    contactSubtitle: 'Olenemata sellest, kas oled ostja või müüja — olen siin, et aidata sul teha parim otsus.',
    contactPhone: '+372 5393 5292',
    contactEmail: 'Reno@kodumaakv.ee',
    contactWhatsapp: 'https://wa.me/37253935292',
    contactKvUrl: 'https://www.kv.ee/broker/renomark',
    ctaCardTitle: 'Valmis alustama?',
    ctaCardSubtitle: 'Esimene konsultatsioon on alati tasuta. Räägi mulle oma soovidest ja vaatame koos, kuidas saan aidata.',
    ctaBullets: [
      'Tasuta esialgne konsultatsioon',
      'Kiire vastus — maksimaalselt 24h',
      'Personaalne lähenemine igale kliendile',
      'Läbipaistev protsess algusest lõpuni',
    ],
    ctaPrimaryButton: 'Helista kohe',
    ctaSecondaryButton: 'Kirjuta mulle',
  })
  console.log('  ✅  Lehe seaded loodud\n')

  // 2. TESTIMONIALS
  console.log('💬  Tagasisided...')
  await deleteExisting('testimonial')
  for (let i = 0; i < TESTIMONIALS.length; i++) {
    const t = TESTIMONIALS[i]
    await client.create({ _type: 'testimonial', ...t, order: i + 1 })
    process.stdout.write(`  ✅  ${t.name}\n`)
  }
  console.log()

  // 3. PROCESS STEPS
  console.log('🔢  Müügiprotsess sammud...')
  await deleteExisting('processStep')
  for (let i = 0; i < PROCESS_STEPS.length; i++) {
    const s = PROCESS_STEPS[i]
    await client.create({ _type: 'processStep', ...s, order: i + 1 })
    process.stdout.write(`  ✅  ${s.step} ${s.title}\n`)
  }
  console.log()

  // 4. VALUE CARDS
  console.log('⭐  Töö põhimõtted...')
  await deleteExisting('valueCard')
  for (let i = 0; i < VALUE_CARDS.length; i++) {
    const v = VALUE_CARDS[i]
    await client.create({ _type: 'valueCard', ...v, order: i + 1 })
    process.stdout.write(`  ✅  ${v.icon} ${v.title}\n`)
  }
  console.log()

  // 5. BIO CARDS
  console.log('👤  Bio kaardid...')
  await deleteExisting('bioCard')
  for (let i = 0; i < BIO_CARDS.length; i++) {
    const b = BIO_CARDS[i]
    await client.create({ _type: 'bioCard', ...b, order: i + 1 })
    process.stdout.write(`  ✅  ${b.tag}\n`)
  }
  console.log()

  // 6. SOLD PROPERTIES — upload images
  console.log('🏠  Müüdud objektid (pildid üleslaadimiseks)...')
  await deleteExisting('soldProperty')
  const myydudDir = path.join(__dirname, '..', 'public', 'myydud')
  const imgFiles = fs.readdirSync(myydudDir)
    .filter((f) => /\.(png|jpg|jpeg|webp)$/i.test(f))
    .sort((a, b) => {
      const na = parseInt(a), nb = parseInt(b)
      return na - nb
    })

  for (let i = 0; i < imgFiles.length; i++) {
    const filename = imgFiles[i]
    const filePath = path.join(myydudDir, filename)
    try {
      process.stdout.write(`  ⏳  ${filename} üleslaadimiseks...`)
      const imageRef = await uploadImage(filePath, filename)
      await client.create({
        _type: 'soldProperty',
        image: imageRef,
        alt: `Müüdud objekt ${filename.replace(/\.[^.]+$/, '')}`,
        order: i + 1,
      })
      process.stdout.write(` ✅\n`)
    } catch (err) {
      process.stdout.write(` ❌  ${err.message}\n`)
    }
  }
  console.log()

  // 7. REELS — upload videos
  console.log('🎬  Videod (üleslaadimiseks)...')
  await deleteExisting('reel')
  const reelsDir = path.join(__dirname, '..', 'public', 'reels')
  const videoFiles = fs.readdirSync(reelsDir)
    .filter((f) => /\.mp4$/i.test(f))
    .sort((a, b) => {
      const na = parseInt(a), nb = parseInt(b)
      return na - nb
    })

  for (let i = 0; i < videoFiles.length; i++) {
    const filename = videoFiles[i]
    const filePath = path.join(reelsDir, filename)
    try {
      process.stdout.write(`  ⏳  ${filename} üleslaadimiseks (võib võtta aega)...`)
      const videoRef = await uploadVideo(filePath, filename)
      await client.create({
        _type: 'reel',
        title: `Reel ${filename.replace('.mp4', '')}`,
        video: videoRef,
        order: i + 1,
      })
      process.stdout.write(` ✅\n`)
    } catch (err) {
      process.stdout.write(` ❌  ${err.message}\n`)
    }
  }
  console.log()

  console.log('🎉  Kõik valmis! Ava Sanity Studio ja kontrolli sisu.')
}

main().catch((err) => {
  console.error('❌  Viga:', err.message)
  process.exit(1)
})
