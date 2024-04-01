import { redirect } from "@sveltejs/kit";

export async function load({ locals, params }) {
  const current_stock_item = await locals.pb
    .collection("stock_items")
    .getOne(params.stock_item_id, {
      expand: "product"
    });

  const current_color_id = current_stock_item.expand?.product.color;
  const current_stock_item_id = params.stock_item_id;
  const current_product_id = current_stock_item.expand?.product.id;

  const products = await locals.pb
    .collection("products")
    .getFullList({
      filter: `group = "${current_stock_item.expand?.product.group}"`,
      expand: "color"
    });

  for await (const product of products) {
    const all_stock_items = await locals.pb
      .collection("stock_items")
      .getFullList({
        filter: `product = "${product.id}"`,
        expand: "size_group"
      });

    product.stock_items = all_stock_items.map(item => {
      return {
        id: item.id,
        count: item.count,
        size_title: item.expand?.size_group.title,
        size_group_id: item.expand?.size_group.id
      }
    });
  }

  const all_size_groups = await locals.pb
    .collection("size_groups")
    .getFullList();

  const all_colors = await locals.pb
    .collection("colors")
    .getFullList();

  return {
    current_color_id,
    current_product_id,
    current_stock_item_id,
    products: products.map(product => {
      return {
        id: product.id,
        group_id: product.group,
        title: product.title,
        description: product.description,
        price: product.price,
        color: {
          id: product.color,
          title: product.expand?.color.ru_title
        },
        gallery: product.gallery.map((file_name: string) => {
          return {
            photo_name: file_name,
            url: locals.pb_helpers.files.getFileUrlWithCorrectOrigin(product, file_name)
          };
        }),
        stock_items: product.stock_items,
        allowed_size_groups: all_size_groups
          .filter(({ id }) => {
            const found = product.stock_items.find(({ size_group_id }: any) => size_group_id === id)

            if (found) {
              return false
            }

            return true
          })
          .map(size_group => {
            return {
              id: size_group.id,
              title: size_group.title
            }
          })
      }
    }),
    allowed_colors: all_colors
      .filter(({ id }) => {
        const found = products.find(({ color }: any) => color === id)

        if (found) {
          return false
        }

        return true
      }).map(color => {
        return {
          id: color.id,
          title: color.ru_title
        }
      }),
    all_size_groups
  }
}

export const actions = {
  deleteColor: async ({ request, locals }) => {
    const formData = await request.formData()
    const product_id = formData.get("product_id") as string

    await locals.pb
      .collection("products")
      .delete(product_id)

    return redirect(303, "/supplier/products")
  },

  createColor: async ({ request, locals }) => {
    const formData = await request.formData()
    const title = formData.get("title")
    const description = formData.get("description")
    const price = formData.get("price")
    const group = formData.get("group_id")
    const color = formData.get("color_id")
    const size_group = formData.get("size_group_id")

    const { id } = await locals.pb
      .collection("products")
      .create({
        title,
        description,
        price,
        group,
        color,
        supplier: locals.user!.id,
        visible: false
      })

    await locals.pb
      .collection("stock_items")
      .create({
        product: id,
        size_group,
        count: 0
      })

    return { success: true }
  },

  deletePhoto: async ({ request, locals }) => {
    const formData = await request.formData()
    const photo_name = formData.get("photo_name")
    const product_id = formData.get("product_id") as string

    await locals.pb
      .collection("products")
      .update(product_id, {
        "gallery-": [photo_name]
      })

    return { success: true }
  },

  uploadPhotos: async ({ request, locals }) => {
    const formData = await request.formData()
    const product_id = formData.get("product_id") as string

    await locals.pb
      .collection("products")
      .update(product_id, {
        "gallery": formData.getAll("photos")
      })

    return { success: true }
  },

  deleteStockItem: async ({ request, locals }) => {
    const formData = await request.formData()
    const stock_item_id = formData.get("stock_item_id") as string

    await locals.pb
      .collection("stock_items")
      .delete(stock_item_id)

    return redirect(303, "/supplier/products")
  },

  createStockItem: async ({ request, locals }) => {
    const formData = await request.formData()
    const size_group_id = formData.get("size_group_id")
    const product_id = formData.get("product_id")

    await locals.pb
      .collection("stock_items")
      .create({
         product: product_id,
         size_group: size_group_id,
         count: 0
       })

    return { success: true }
  }
}
