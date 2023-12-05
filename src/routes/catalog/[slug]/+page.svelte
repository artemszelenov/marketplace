<script lang="ts">
  import AddToCart from "$lib/components/AddToCart.svelte";
  import { page } from "$app/stores";
  import AddToCartForm from "$lib/components/AddToCartForm.svelte";
  import Icon from "$lib/components/UI/Icon.svelte";
  import { retrieveSizeTitle } from "$lib/helpers/retrieveSizeTitle";
  import { cartItems as store } from "$lib/stores/cart";

  export let data;

  $: current_stock_item = data.stock_items.find(
    stock_item => stock_item.id === data.current_stock_item_id
  );
</script>

<div
  class="lg:gap-x-8 lg:gap-y-10 lg:grid lg:grid-cols-7 lg:grid-rows-1 xl:gap-x-16"
>
  <div class="lg:col-span-4 lg:row-end-1">
    <ul class="grid gap-4">
      {#each data.product.gallery as src}
        <li>
          <img
            class="aspect-square rounded"
            {src}
            alt={data.product.title}
            decoding="async"
            loading="eager"
            sizes="100vw"
          />
        </li>
      {/each}
    </ul>
  </div>

  <div
    class="mx-auto lg:col-span-3 lg:max-w-none lg:mt-0 lg:row-end-2 lg:row-span-2 max-w-2xl mt-14 sm:mt-16"
  >
    <div class="sticky top-3">
      <h1 class="text-3xl font-semibold">{data.product.title}</h1>

      <p class="text-xl mt-2">{data.product.price.toLocaleString("ru-RU") + " руб."}</p>

      {#if current_stock_item}
        <div class="mt-5">
          <AddToCartForm
            stock_item={current_stock_item}
            referrer={$page.url.href}
          />
          <!-- <AddToCart
            stockItem={current_stock_item}
            cartButtonStyle="primary"
            variant="compact"
          /> -->
        </div>
      {:else}
        <p class="mt-1 text-sm text-grey">
          Выберите один из размеров ниже
        </p>
      {/if}

      <div class="mt-5">
        <h2 class="text-xl font-semibold">Размеры</h2>

        <nav class="grid grid-cols-4 gap-3 mt-3">
          {#each data.stock_items as stock_item (stock_item.id)}
            {#if stock_item.count > 0}
              <a
                href="/catalog/{stock_item.product_id}?stock_item={stock_item.id}"
                class="relative px-2 py-2 text-s text-center font-medium border border-grey-400 rounded outline-offset-2 cursor-pointer"
                class:border-black={current_stock_item?.id === stock_item.id}
                title="Выбрать размер"
              >
                {retrieveSizeTitle({ stock_item, product_type: data.product.type })}

                {#if $store.find(item => item.id === stock_item.id)}
                  <Icon name="cart" class="w-5 bg-white absolute -top-2 -right-2 rounded" viewBox="0 0 512 520" />
                {/if}
              </a>
            {:else}
              <div
                class="px-2 py-2 text-s text-center font-medium border border-grey-400 rounded outline-offset-2 cursor-not-allowed opacity-30"
                title="Нет в наличии"
              >
                {retrieveSizeTitle({ stock_item, product_type: data.product.type })}
              </div>
            {/if}
          {/each}
        </nav>
      </div>

      {#if data.product_variants.length > 0}
        <div class="mt-5">
          <h2 class="text-xl font-semibold">Другие варианты цветов</h2>

          <ul class="flex mt-3 -mx-2 px-2 space-x-2 overflow-x-auto">
            {#each data.product_variants as variant (variant.id)}
              <li>
                <a href="/catalog/{variant.id}">
                  <img
                    class="rounded"
                    width="80"
                    height="80"
                    src={variant.image}
                    alt={variant.title}
                    decoding="async"
                    loading="lazy"
                  />
                </a>
              </li>
            {/each}
          </ul>
        </div>
      {/if}

      <p class="mt-5">{@html data.product.description}</p>
    </div>
  </div>
</div>
