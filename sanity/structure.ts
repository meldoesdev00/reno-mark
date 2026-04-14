import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Sisu')
    .items([
      // Singleton: site settings
      S.listItem()
        .title('Lehe seaded (tekstid, nupud, kontakt)')
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),

      S.divider(),

      S.documentTypeListItem('testimonial').title('Tagasiside'),
      S.documentTypeListItem('processStep').title('Müügiprotsess — sammud'),
      S.documentTypeListItem('valueCard').title('Töö põhimõtted'),
      S.documentTypeListItem('bioCard').title('Minust — bio kaardid'),

      S.divider(),

      S.documentTypeListItem('soldProperty').title('Müüdud objektid (pildid)'),
      S.documentTypeListItem('reel').title('Videod (Reels)'),
    ])
