export interface Image {
  src: string
  srcset: string
  width: number
  height: number
  alt: string
  thumbnail: {
    src: string
    width: number
    height: number
    alt: string
  }
}
