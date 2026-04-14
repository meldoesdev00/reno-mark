import { defineField, defineType } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Tagasiside',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nimi',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'text',
      title: 'Tagasiside tekst',
      type: 'text',
      rows: 4,
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'order',
      title: 'Järjekord',
      type: 'number',
      description: 'Väiksem number = eespool',
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
    select: { title: 'name', subtitle: 'text' },
  },
})
