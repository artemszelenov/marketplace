import { error } from '@sveltejs/kit';
import type { ProductTeaser } from "$lib/schema"

export async function load({ locals }) {
  try {
    let teasers = await locals.pb
      .collection<ProductTeaser>('product_teasers')
      .getFullList();

    teasers = teasers.map(teaser => {
      return {
      ...teaser,
        gallery: teaser.gallery.map((file_name: string) => {
          return locals.pb.files.getUrl(teaser, file_name);
        })
      }
    });

    return {
      teasers,
      seo: {
        title: "Каталог"
      }
    }
  } catch (err) {
    console.log(`Ошибка на сервере`);
		throw error(500, {
			message: 'Ошибка на сервере'
		});
  }
}
