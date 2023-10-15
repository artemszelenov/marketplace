<script lang="ts">
  import type { z } from "zod";
  import type { ProductResult } from "$lib/schema";
  import AddToCart from "./AddToCart.svelte";

  export let product: z.infer<typeof ProductResult>;

  let activeImageID = 0;

  const { gallery, id, title, price } = product;
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
      <a href="/catalog/{id}" rel="prefetch-intent">
        {title}
      </a>
    </h1>

    <p class="text-sm">{price}</p>

    <div class="mt-auto">
      <AddToCart {product} variant="compact" />
    </div>
  </div>
</article>
