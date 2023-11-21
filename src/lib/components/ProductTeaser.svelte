<script lang="ts">
  import type { Product } from "$lib/schema";

  export let product: Product;

  let activeImageID = 0;

  const { gallery, id, title, price } = product;
</script>

<article>
  <!-- <img
    class="aspect-square rounded object-cover"
    src={gallery[activeImageID].src}
    alt={gallery[activeImageID].alt}
    width={gallery[activeImageID].width}
    height={gallery[activeImageID].height}
    srcset={gallery[activeImageID].srcset}
    decoding="async"
    loading="eager"
  /> -->

  <!-- <ul class="flex p-1 -mx-1 space-x-1 overflow-x-auto">
    {#each gallery as { thumbnail }, index}
      <li class="w-8 shrink-0">
        <button
          type="button"
          class="block"
          on:click={() => (activeImageID = index)}
        >
          <img
            class="rounded cursor-pointer"
            src={thumbnail.src}
            alt={thumbnail.alt}
            width={thumbnail.width}
            height={thumbnail.height}
            decoding="async"
            loading="lazy"
          />
        </button>
      </li>
    {/each}
  </ul> -->

  <h1 class="mt-1 font-semibold">
    <a href="/catalog/{id}">
      {title}
    </a>
  </h1>

  <p class="text-sm">{price.toLocaleString("ru-RU") + " руб."}</p>
</article>
