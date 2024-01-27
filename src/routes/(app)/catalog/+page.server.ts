import { error } from '@sveltejs/kit';
import type { Product } from "$lib/schema";

const LIMIT = 4;

export async function load({ locals, url }) {
  const next_page = Number(url.searchParams.get("page")) || 1;

  const filters_query = [];
  for (const [param, value] of url.searchParams.entries()) {
    if (param === 'page') continue;
    const filters_name = param;
    filters_query.push(`${filters_name}.id ?= "${value}"`);
  }

  try {
    const { page, perPage, totalPages, items } = await locals.pb
      .collection<Product>('products')
      .getList(next_page, LIMIT, {
        filter: filters_query.join(" && "),
        sort: "-created"
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
      teasers: items.map(product => {
        return {
          id: product.id,
          title: product.title,
          price: product.price,
          gallery: product.gallery.map((file_name: string) => {
            return locals.pb.files.getUrl(product, file_name);
          })
        }
      }),
      filters,
      pagination: {
        current_page: page,
        limit: perPage,
        done: page === totalPages
      },
      seo: {
        title: "Каталог"
      }
    }
  } catch (err) {
    console.log(`Ошибка на сервере`, err);
		throw error(500, {
			message: 'Ошибка на сервере'
		});
  }
}
