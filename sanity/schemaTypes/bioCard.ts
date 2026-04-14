import { defineField, defineType } from 'sanity'

export const bioCard = defineType({
  name: 'bioCard',
  title: 'Minust — bio kaart',
  type: 'document',
  fields: [
    defineField({
      name: 'tag',
      title: 'Silt (nt "Iseloom")',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'text',
      title: 'Tekst',
      type: 'text',
      rows: 4,
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'order',
      title: 'Järjekord',
      type: 'number',
    }),
  ],
  orderings: [
    {
      title: 'Järjekord',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'tag', subtitle: 'text' },
  },
})
