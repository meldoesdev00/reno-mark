import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { writeClient } from '@/sanity/lib/client'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { propertyType, rooms, address, planSoon, name, phone, email, utmSource, utmMedium, utmCampaign } = body

    // Iga päring (nii jah kui ei) salvestatakse Sanity'sse, et kõiki leadse saaks
    // Studios vaadata. Kirjutuse ebaõnnestumine ei tohi vormi esitamist katki teha.
    try {
      await writeClient.create({
        _type: 'hinnastamisParing',
        name,
        phone,
        email,
        propertyType,
        rooms: propertyType === 'Maatükk' ? undefined : rooms,
        address,
        planSoon,
        utmSource,
        utmMedium,
        utmCampaign,
        submittedAt: new Date().toISOString(),
      })
    } catch (err) {
      console.error('[hinnastamine] Sanity write error:', err)
    }

    if (planSoon !== 'jah') {
      // Lead not planning to sell soon — no notification, just log for records.
      console.log('[hinnastamine] submission (ei):', body)
      return NextResponse.json({ ok: true })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    // 1) Notification to Reno
    await resend.emails.send({
      from: 'Reno Mark veebileht <hinnastamine@renomark.ee>',
      to: 'reno@kodumaakv.ee',
      subject: `Uus hinnastamissoov – ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;background:#fff;">
          <h2 style="font-size:20px;font-weight:700;color:#161616;margin:0 0 24px;">Uus hinnastamissoov</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:.06em;width:42%;">Vara tüüp</td>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#161616;font-size:14px;font-weight:500;">${propertyType}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:.06em;">Tubade arv</td>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#161616;font-size:14px;font-weight:500;">${rooms}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:.06em;">Aadress</td>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#161616;font-size:14px;font-weight:500;">${address}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:.06em;">Müük 3 kuu jooksul?</td>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#161616;font-size:14px;font-weight:500;">✅ Jah</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:.06em;">Nimi</td>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#161616;font-size:14px;font-weight:500;">${name}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:.06em;">Telefon</td>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#161616;font-size:14px;font-weight:500;">${phone}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:.06em;">E-mail</td>
              <td style="padding:10px 0;color:#161616;font-size:14px;font-weight:500;">${email}</td>
            </tr>
          </table>
        </div>
      `,
    })

    // 2) Confirmation to the person who filled the form
    await resend.emails.send({
      from: 'Reno Mark Kinnisvaramaakler <hinnastamine@renomark.ee>',
      to: email,
      subject: 'Täname Teie hinnastamistaotluse eest',
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;background:#fff;color:#161616;">
          <p style="font-size:16px;font-weight:700;margin:0 0 16px;">Tänan Teid päringu esitamise eest!</p>
          <p style="font-size:14px;line-height:1.6;color:#444;margin:0 0 14px;">
            Olen Teie andmed edukalt kätte saanud. Võtan Teiega ühendust hiljemalt 48 tunni jooksul, kui olen esitatud informatsiooni üle vaadanud.
          </p>
          <p style="font-size:14px;line-height:1.6;color:#444;margin:0 0 24px;">
            Seniks tänan Teid usalduse eest ja soovin Teile ilusat päeva!
          </p>
          <p style="font-size:13px;line-height:1.6;color:#888;margin:0;">
            Lugupidamisega<br/>Reno Mark Kinnisvaramaakler
          </p>
        </div>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[hinnastamine] email error:', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
