import { redirect } from "@sveltejs/kit";

export async function load({ locals }) {
  const products = await locals.pb
    .collection("products")
    .getFullList({
      filter: `supplier = "${locals.user?.id}"`,
    });

  const stock_items = await locals.pb
    .collection("stock_items")
    .getFullList({
      filter: products.map(({ id }) => `product = "${id}"`).join(" || "),
      sort: "count",
      expand: "size_group, product"
    });

  const all_size_groups = await locals.pb
    .collection("size_groups")
    .getFullList();

  const all_colors = await locals.pb
    .collection("colors")
    .getFullList();

  return {
    items: stock_items.map(item => {
      return {
        id: item.id,
        title: item.expand?.product.title,
        count: item.count,
        size: item.expand?.size_group.title,
        image: locals.pb_helpers.files.getFileUrlWithCorrectOrigin(item.expand?.product, item.expand?.product.gallery[0])
      }
    }),
    all_size_groups,
    all_colors
  }
}

export const actions = {
  createProduct: async ({ request, locals }) => {
    const formData = await request.formData()
    const title = formData.get("title")
    const color = formData.get("color_id")
    const size_group = formData.get("size_group_id")

    const { id: group } = await locals.pb
      .collection("product_groups")
      .create({
        title
      })

    const { id: product } = await locals.pb
      .collection("products")
      .create({
        title,
        color,
        group,
        supplier: locals.user!.id,
        visible: false
      })

    const { id: stock_item } = await locals.pb
      .collection("stock_items")
      .create({
        product,
        size_group,
        count: 0
      })

    return redirect(303, `/supplier/products/${stock_item}/edit`)
  }
}
