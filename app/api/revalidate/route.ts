import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

// Sanity sends a POST to this URL when content changes.
// We revalidate the homepage so it rebuilds with new content.
export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')

  if (!process.env.SANITY_REVALIDATE_SECRET || secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  revalidatePath('/')

  return NextResponse.json({ revalidated: true })
}
