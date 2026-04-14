import { client } from '@/sanity/lib/client'
import {
  siteSettingsQuery,
  testimonialsQuery,
  processStepsQuery,
  valueCardsQuery,
  bioCardsQuery,
  soldPropertiesQuery,
  reelsQuery,
} from '@/sanity/lib/queries'
import HomeClient from './HomeClient'

// Rebuild on-demand via /api/revalidate — no time-based expiry
export const revalidate = false

export default async function Home() {
  const [settings, testimonials, processSteps, valueCards, bioCards, soldProperties, reels] =
    await Promise.all([
      client.fetch(siteSettingsQuery,    {}, { next: { tags: ['siteSettings'] } }),
      client.fetch(testimonialsQuery,    {}, { next: { tags: ['testimonial'] } }),
      client.fetch(processStepsQuery,    {}, { next: { tags: ['processStep'] } }),
      client.fetch(valueCardsQuery,      {}, { next: { tags: ['valueCard'] } }),
      client.fetch(bioCardsQuery,        {}, { next: { tags: ['bioCard'] } }),
      client.fetch(soldPropertiesQuery,  {}, { next: { tags: ['soldProperty'] } }),
      client.fetch(reelsQuery,           {}, { next: { tags: ['reel'] } }),
    ])

  return (
    <HomeClient
      settings={settings}
      testimonials={testimonials ?? []}
      processSteps={processSteps ?? []}
      valueCards={valueCards ?? []}
      bioCards={bioCards ?? []}
      soldProperties={soldProperties ?? []}
      reels={reels ?? []}
    />
  )
}
