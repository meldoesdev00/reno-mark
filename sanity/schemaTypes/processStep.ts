import { defineField, defineType } from 'sanity'

export const processStep = defineType({
  name: 'processStep',
  title: 'Müügiprotsess — samm',
  type: 'document',
  fields: [
    defineField({
      name: 'step',
      title: 'Sammu number (nt "01")',
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
      rows: 3,
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
    select: { title: 'step', subtitle: 'title' },
    prepare({ title, subtitle }) {
      return { title: `${title} — ${subtitle}` }
    },
  },
})
