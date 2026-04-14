import { defineField, defineType } from 'sanity'

export const reel = defineType({
  name: 'reel',
  title: 'Video (Reel)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Pealkiri / märkus',
      type: 'string',
      description: 'Ainult stuudio jaoks — lehel ei kuvata',
    }),
    defineField({
      name: 'video',
      title: 'Video fail',
      type: 'file',
      options: { accept: 'video/*' },
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
    select: { title: 'title' },
    prepare({ title }) {
      return { title: title || 'Video' }
    },
  },
})
