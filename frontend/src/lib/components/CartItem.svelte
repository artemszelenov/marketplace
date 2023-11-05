<script lang="ts">
  import type { z } from "zod";
  import type { ProductResult } from "$lib/schema";
  import type { Size } from "$lib/stores/cart";

  import { page } from "$app/stores";
  import AddToCart from "./AddToCart.svelte";

  export let product: z.infer<typeof ProductResult>;
  export let size: Size;

  let activeImageID = 0;

  const { gallery, id, title, price, type } = product;

  const sizeTitle =
    type === "shoes"
      ? size.value[$page.data.user?.shoeSizeMetric ?? "eu"]
      : size.value.title;
</script>

<article class="flex space-x-5 actions-show-on-hover">
  <img
    class="w-28 aspect-square rounded object-cover"
    src={gallery[activeImageID].src}
    alt={gallery[activeImageID].alt}
    width={gallery[activeImageID].width}
    height={gallery[activeImageID].height}
    srcset={gallery[activeImageID].srcset}
    decoding="async"
    loading="eager"
  />

  <div class="grow flex flex-col">
    <h1 class="font-semibold">
      <a href="/catalog/{id}">
        {title}
      </a>
    </h1>

    <p class="text-sm">Цена: {price.toLocaleString("ru-RU") + " руб."}</p>

    <p class="text-sm">
      Размер: {sizeTitle}
    </p>

    <div class="mt-auto">
      <AddToCart variant="compact" {size} {product} />
    </div>
  </div>
</article>
