<script lang="ts">
  import type { ProductTeaser } from "$lib/schema";

  export let product: ProductTeaser;

  let activeImageID = 0;

  const { gallery, id, title, price } = product;
</script>

<article>
  <a href="/catalog/{id}" class="block">
    <img
      class="block aspect-square rounded object-cover"
      src={gallery[activeImageID]}
      alt={title}
      width="300"
      height="300"
      decoding="async"
      loading="eager"
    />
  </a>

  <ul class="flex p-1 -mx-1 space-x-1 overflow-x-auto">
    {#each gallery as thumbnail, index}
      <li class="shrink-0 w-[20%]">
        <button
          type="button"
          class="block"
          on:click={() => (activeImageID = index)}
        >
          <img
            class="w-full aspect-square rounded"
            src={thumbnail}
            alt={title}
            width="100"
            height="100"
            decoding="async"
            loading="lazy"
          />
        </button>
      </li>
    {/each}
  </ul>

  <h1 class="mt-1 font-semibold">
    <a href="/catalog/{id}">
      {title}
    </a>
  </h1>

  <p class="text-sm">{price.toLocaleString("ru-RU") + " ₽"}</p>
</article>
