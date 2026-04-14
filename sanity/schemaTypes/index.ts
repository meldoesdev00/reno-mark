import { type SchemaTypeDefinition } from 'sanity'
import { siteSettings } from './siteSettings'
import { testimonial } from './testimonial'
import { processStep } from './processStep'
import { valueCard } from './valueCard'
import { bioCard } from './bioCard'
import { soldProperty } from './soldProperty'
import { reel } from './reel'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    siteSettings,
    testimonial,
    processStep,
    valueCard,
    bioCard,
    soldProperty,
    reel,
  ],
}
