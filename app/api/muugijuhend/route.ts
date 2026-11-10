import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { writeClient } from '@/sanity/lib/client'

const esc = (v: unknown) =>
  String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!))

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { propertyType, rooms, address, county, name, phone, email, utmSource, utmMedium, utmCampaign } = body

    try {
      await writeClient.create({
        _type: 'muugijuhendiParing',
        name,
        phone,
        email,
        propertyType,
        rooms: propertyType === 'Maatükk' ? undefined : rooms,
        address,
        county,
        utmSource,
        utmMedium,
        utmCampaign,
        submittedAt: new Date().toISOString(),
      })
    } catch (err) {
      console.error('[muugijuhend] Sanity write error:', err)
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    const rows: [string, unknown][] = [
      ['Vara tüüp', propertyType],
      ...(propertyType === 'Maatükk' ? [] : [['Tubade arv', rooms] as [string, unknown]]),
      ['Aadress', address],
      ['Maakond', county],
      ['Nimi', name],
      ['Telefon', phone],
      ['E-mail', email],
    ]
    const rowsHtml = rows
      .map(([k, v], i) => {
        const border = i < rows.length - 1 ? 'border-bottom:1px solid #f0f0f0;' : ''
        return `<tr>
          <td style="padding:10px 0;${border}color:#888;font-size:12px;text-transform:uppercase;letter-spacing:.06em;width:42%;">${k}</td>
          <td style="padding:10px 0;${border}color:#161616;font-size:14px;font-weight:500;">${esc(v)}</td>
        </tr>`
      })
      .join('')

    // 1) Notification to Reno
    await resend.emails.send({
      from: 'Reno Mark veebileht <hinnastamine@renomark.ee>',
      to: 'reno@kodumaakv.ee',
      subject: `Uus müügijuhendi soov – ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;background:#fff;">
          <h2 style="font-size:20px;font-weight:700;color:#161616;margin:0 0 24px;">Uus müügijuhendi soov</h2>
          <table style="width:100%;border-collapse:collapse;">${rowsHtml}</table>
        </div>
      `,
    })

    // 2) Confirmation to the person who filled the form
    await resend.emails.send({
      from: 'Reno Mark Kinnisvaramaakler <hinnastamine@renomark.ee>',
      to: email,
      subject: 'Täname Teie müügijuhendi taotluse eest',
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;background:#fff;color:#161616;">
          <p style="font-size:16px;font-weight:700;margin:0 0 16px;">Tänan Teid taotluse esitamise eest!</p>
          <p style="font-size:14px;line-height:1.6;color:#444;margin:0 0 14px;">
            Olen Teie andmed edukalt kätte saanud. Võtan Teiega ühendust hiljemalt 48 tunni jooksul, et müügijuhend Teie varale koostada.
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
    console.error('[muugijuhend] email error:', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
