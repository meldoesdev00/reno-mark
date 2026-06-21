import { NextRequest, NextResponse } from 'next/server'
import { writeClient } from '@/sanity/lib/client'

export async function POST(req: NextRequest) {
  const { utmSource, utmMedium, utmCampaign } = await req.json()

  try {
    await writeClient.create({
      _type: 'hinnastamiseKylastus',
      utmSource,
      utmMedium,
      utmCampaign,
      visitedAt: new Date().toISOString(),
    })
  } catch (err) {
    console.error('[hinnastamine/visit] Sanity write error:', err)
  }

  return NextResponse.json({ ok: true })
}
