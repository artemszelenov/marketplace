import { error } from '@sveltejs/kit';
import type { ProductTeaser } from "$lib/schema"

export async function load({ locals }) {
  try {
    let teasers = await locals.pb
      .collection<ProductTeaser>('product_teasers')
      .getFullList();

    teasers = teasers.map(teaser => {
      return {
        id: teaser.id,
        title: teaser.title,
        price: teaser.price,
        gallery: teaser.gallery.map((file_name: string) => {
          return locals.pb.files.getUrl(teaser, file_name);
        })
      }
    });

    const colors_records = await locals.pb
      .collection('colors')
      .getFullList();

    const categories_records = await locals.pb
      .collection('categories')
      .getFullList();

    const filters: Record<string, {
      title: string,
      values: { value: string, title: string }[]
    }> = {
      color: {
        title: 'Цвет',
        values: colors_records.map(({ id, ru_title }) => ({ value: id, title: ru_title }))
      },
      categories: {
        title: 'Категории',
        values: categories_records.map(({ id, ru_title }) => ({ value: id, title: ru_title }))
      }
    }

    return {
      teasers,
      filters,
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

export const actions = {
  filter: async ({ request, locals }) => {
    const formData = await request.formData();
    const uniqueKeys = new Set(formData.keys());

    const query = [];
    for (const filter_group_key of uniqueKeys) {
      query.push(formData
        .getAll(filter_group_key)
        .map(value => `${filter_group_key}.id ?= "${value}"`)
        .join(" && ")
      );
    }

    const filtered_products = await locals.pb
      .collection("products")
      .getFullList({
        filter: query.join(" && ")
      });

    return {
      filtered_teasers: filtered_products
        .map<ProductTeaser>(product => {
          return {
            id: product.id,
            title: product.title,
            price: product.price,
            gallery: product.gallery.map((file_name: string) => {
              return locals.pb.files.getUrl(product, file_name);
            })
          }
        }),
      checked_filters: [...formData.values()]
    }
  }
}
