interface IImage {
  src: string;
  srcset: string;
  width: number;
  height: number;
  alt: string;
}

export function prepareImages(gallery: any[], except: string[] = []): IImage[] {
  return gallery.map(
    ({ image: { url, alt, width, height, sizes } }) => {
      const srcset = Object.keys(sizes).reduce((str, sizeName) => {
        if (except.includes(sizeName) || !sizes[sizeName].url) {
          return str;
        }

        if (str === "") {
          return `${sizes[sizeName].url} ${sizes[sizeName].width}w`;
        }

        return `${str}, ${sizes[sizeName].url} ${sizes[sizeName].width}w`;
      }, "");

      return {
        src: sizes.small.url ?? url,
        width: sizes.small.width ?? width,
        height: sizes.small.height ?? height,
        alt,
        srcset,
      };
    }
  );
}
