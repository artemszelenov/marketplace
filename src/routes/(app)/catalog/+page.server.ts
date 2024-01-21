import { error } from '@sveltejs/kit';
import type Pocktbase from "pocketbase";
import type { ProductTeaser, Product } from "$lib/schema";

const LIMIT = 5;

export async function load({ locals, url, parent }) {
  const search_page = Number(url.searchParams.get("page")) || 1;

  console.log(await parent());

  const filters_query = [];
  for (const [param, value] of url.searchParams.entries()) {
    if (param === 'page') continue;
    const filters_name = param;
    filters_query.push(`${filters_name}.id ?= "${value}"`);
  }

  try {
    const { page, perPage, totalPages, items } = await locals.pb
      .collection<Product>('products')
      .getList(search_page, LIMIT, {
        filter: filters_query.join(" && ")
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
      teasers: buildTeasers(items, locals.pb),
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
    console.log(`Ошибка на сервере`);
		throw error(500, {
			message: 'Ошибка на сервере'
		});
  }
}

function buildTeasers(products: Product[], pb: Pocktbase): ProductTeaser[] {
  return products.map(product => {
    return {
      id: product.id,
      title: product.title,
      price: product.price,
      gallery: product.gallery.map((file_name: string) => {
        return pb.files.getUrl(product, file_name);
      })
    }
  })
}
