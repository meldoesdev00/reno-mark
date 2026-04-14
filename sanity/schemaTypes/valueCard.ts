import { defineField, defineType } from 'sanity'

export const valueCard = defineType({
  name: 'valueCard',
  title: 'Töö põhimõte',
  type: 'document',
  fields: [
    defineField({
      name: 'icon',
      title: 'Number (nt "01")',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'title',
      title: 'Pealkiri',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'desc',
      title: 'Kirjeldus',
      type: 'text',
      rows: 2,
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
    select: { title: 'icon', subtitle: 'title' },
    prepare({ title, subtitle }) {
      return { title: `${title} — ${subtitle}` }
    },
  },
})
