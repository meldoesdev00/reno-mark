import type { StructureResolver } from 'sanity/structure'
import { HinnastamiseStatistika } from './components/HinnastamiseStatistika'

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

      S.divider(),

      S.listItem().title('Hinnastamise päringud').id('hinnastamisParingud')
        .child(
          S.list()
            .title('Hinnastamise päringud')
            .items([
              S.listItem().title('📊 Statistika').id('hinnastamisStatistika')
                .child(
                  S.component(HinnastamiseStatistika)
                    .id('hinnastamiseStatistikaComponent')
                    .title('Statistika')
                ),
              S.listItem().title('Müügisoovijad (JAH)').id('hinnastamisJah')
                .child(
                  S.documentTypeList('hinnastamisParing')
                    .title('Müügisoovijad (JAH)')
                    .filter('_type == "hinnastamisParing" && planSoon == "jah"')
                    .defaultOrdering([{ field: 'submittedAt', direction: 'desc' }])
                ),
              S.listItem().title('Ei plaani praegu (EI)').id('hinnastamisEi')
                .child(
                  S.documentTypeList('hinnastamisParing')
                    .title('Ei plaani praegu (EI)')
                    .filter('_type == "hinnastamisParing" && planSoon == "ei"')
                    .defaultOrdering([{ field: 'submittedAt', direction: 'desc' }])
                ),
              S.listItem().title('Kõik päringud').id('hinnastamisKoik')
                .child(
                  S.documentTypeList('hinnastamisParing')
                    .title('Kõik päringud')
                    .defaultOrdering([{ field: 'submittedAt', direction: 'desc' }])
                ),
              S.listItem().title('Lingi külastused').id('hinnastamisKylastused')
                .child(
                  S.documentTypeList('hinnastamiseKylastus')
                    .title('Lingi külastused')
                    .defaultOrdering([{ field: 'visitedAt', direction: 'desc' }])
                ),
            ])
        ),
    ])
