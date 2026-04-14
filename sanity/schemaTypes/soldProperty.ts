import { defineField, defineType } from 'sanity'

export const soldProperty = defineType({
  name: 'soldProperty',
  title: 'Müüdud objekt',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Pilt',
      type: 'image',
      options: { hotspot: true },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Pildi kirjeldus (alt tekst)',
      type: 'string',
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
    select: { title: 'alt', media: 'image' },
    prepare({ title, media }) {
      return { title: title || 'Müüdud objekt', media }
    },
  },
})
