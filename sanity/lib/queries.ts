import { groq } from 'next-sanity'

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  heroHeadingLine1,
  heroHeadingLine2,
  heroSubtitle,
  heroPrimaryButton,
  heroSecondaryButton,
  "heroPhotoUrl": heroPhoto.asset->url,
  chip1Value, chip1Label,
  chip2Value, chip2Label,
  chip3Value, chip3Label,
  chip4Value, chip4Label,
  aboutHeading,
  aboutSubtitle,
  "aboutPhotoUrl": aboutPhoto.asset->url,
  aboutQuote,
  contactHeadingLine1,
  contactHeadingLine2,
  contactHeadingLine3,
  contactSubtitle,
  contactPhone,
  contactEmail,
  contactWhatsapp,
  contactKvUrl,
  ctaCardTitle,
  ctaCardSubtitle,
  ctaBullets,
  ctaPrimaryButton,
  ctaSecondaryButton
}`

export const testimonialsQuery = groq`*[_type == "testimonial"] | order(order asc){
  _id, name, text
}`

export const processStepsQuery = groq`*[_type == "processStep"] | order(order asc){
  _id, step, title, desc
}`

export const valueCardsQuery = groq`*[_type == "valueCard"] | order(order asc){
  _id, icon, title, desc
}`

export const bioCardsQuery = groq`*[_type == "bioCard"] | order(order asc){
  _id, tag, text
}`

export const soldPropertiesQuery = groq`*[_type == "soldProperty"] | order(order asc){
  _id,
  "imageUrl": image.asset->url,
  alt
}`

export const reelsQuery = groq`*[_type == "reel"] | order(order asc){
  _id,
  title,
  "videoUrl": video.asset->url
}`
