import { error } from '@sveltejs/kit'
import type { Product } from '$lib/schema'

const LIMIT = 12

export async function load({ locals, url }) {
  const next_page = Number(url.searchParams.get('page')) || 1

  const filters_map: { [key: string]: string[] } = {}
  for (const [param, value] of url.searchParams.entries()) {
    if (param === 'page') continue

    const filter_name = param

    if (Array.isArray(filters_map[filter_name])) {
      filters_map[filter_name].push(value)
    } else {
      filters_map[filter_name] = [value]
    }
  }

  const filters_query = []
  for (const [filter_name, values] of Object.entries(filters_map)) {
    const group = []
    for (const val of values) {
      group.push(`${filter_name}.id ?= "${val}"`)
    }
    filters_query.push(`(${group.join(' || ')})`)
  }

  const filter = filters_query.join(' && ')

  try {
    const { page, perPage, totalPages, items } = await locals.pb
      .collection<Product>('products')
      .getList(next_page, LIMIT, {
        filter,
        sort: '-created'
      })

    const colors_records = await locals.pb
      .collection('colors')
      .getFullList()

    const categories_records = await locals.pb
      .collection('categories')
      .getFullList()

    const filters: Record<string, {
      title: string,
      values: { value: string, title: string }[]
    }> = {
      color: {
        title: 'Color',
        values: colors_records.map(({ id, title }) => ({ value: id, title }))
      },
      categories: {
        title: 'Category',
        values: categories_records.map(({ id, title }) => ({ value: id, title }))
      }
    }

    return {
      teasers: items.map(product => {
        return {
          id: product.id,
          title: product.title,
          price: product.price,
          gallery: product.gallery.map(file_name => {
            return locals.pb_helpers.files.getFileUrlWithCorrectOrigin(product, file_name)
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
        title: 'Catalog'
      }
    }
  } catch (err) {
    console.log(`Server error`, err)
		throw error(500, {
			message: 'Server error'
		})
  }
}
