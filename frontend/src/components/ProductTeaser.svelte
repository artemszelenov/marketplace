<script lang="ts">
  import AddToCart from "../components/AddToCart.svelte";
  import type { Product } from "@/types/product";

  export let product: Product

  let activeImageID = 0

  const { gallery, id, title, price } = product
</script>

<article class="actions-show-on-hover">
  <img
    class="aspect-square rounded object-cover"
    src={gallery[activeImageID].src}
    alt={gallery[activeImageID].alt}
    width={gallery[activeImageID].width}
    height={gallery[activeImageID].height}
    srcset={gallery[activeImageID].srcset}
    decoding="async"
    loading="eager"
  />

  <ul class="flex mt-1 space-x-1 overflow-x-auto">
    {#each gallery as { thumbnail }, index}
      <li class="w-8 shrink-0">
        <img
          class="rounded cursor-pointer"
          src={thumbnail.src}
          alt={thumbnail.alt}
          width={thumbnail.width}
          height={thumbnail.height}
          decoding="async"
          loading="lazy"
          on:click={() => activeImageID = index}
        />
      </li>
    {/each}
  </ul>

  <h1 class="mt-3 font-semibold">
    <a
      href={`/catalog/${id}`}
      rel="prefetch-intent"
    >
      {title}
    </a>
  </h1>

  <p class="text-sm">{price}</p>

  <AddToCart {product} />
</article>
