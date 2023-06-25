import {createClient} from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'ty4u56ms',
  dataset: 'production',
  apiVersion: '2023-06-21',
  useCdn:true,
  token: 
  "skSUKNoQi6y4kvSf2wnHRM5WMPlDyuXOxOXXTDLDVMXtPDYZ61ndNF7hZgoqAuVDv0mfUSit3zpLcYBcYx7qMaDJJ5y6J8jwRK6jsftBQPgF6RXtpOaqiZg30OIg1QJNhXxu3Z9EFa3Cmw6wRQH0i7j4c6GXN1kv1kD9kuUuFTFMYHCLeAE6"
})

const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)