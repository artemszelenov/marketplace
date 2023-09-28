import type { Product, Media } from '@/types/payload'
import type { Image } from '@/types/image'

type ISizesTypes = keyof Media['sizes']

export function prepareImages(gallery: Product['gallery'], except: ISizesTypes[] = []): Image[] {
  if (!gallery || gallery.length === 0) return []

  return gallery.map(({ image }) => {
    const { url, alt, width, height, sizes = {} } = image as Media
    const sizesTypes = Object.keys(sizes) as ISizesTypes[]

    const srcset = sizesTypes.reduce((str, sizeName) => {
      if (!sizes[sizeName] || !sizes[sizeName].url || except.includes(sizeName)) {
        return str
      }

      if (str === '') {
        return `${sizes[sizeName].url} ${sizes[sizeName].width}w`
      }

      return `${str}, ${sizes[sizeName].url} ${sizes[sizeName].width}w`
    }, '')

    return {
      src: sizes.small?.url ?? url,
      width: sizes.small?.width ?? width,
      height: sizes.small?.height ?? height,
      alt,
      srcset,
      thumbnail: {
        src: sizes.thumbnail?.url ?? url,
        width: sizes.thumbnail?.width ?? width,
        height: sizes.thumbnail?.height ?? height,
        alt
      }
    }
  })
}
