<script lang="ts">
  import type { z } from "zod";
  import type { ProductResult } from "$lib/schema";
  import type { Size } from "$lib/stores/cart";
  type Product = z.infer<typeof ProductResult>;

  import { cartItems, addOne, removeOne, createID } from "$lib/stores/cart";

  import Button from "./UI/Button.svelte";
  import Icon from "./UI/Icon.svelte";

  export let product: Product;
  export let size: Size | undefined;
  export let variant: "full" | "compact" = "full";
  export let cartButtonStyle: "primary" | "link" = "link";

  console.log("size", size);

  $: currentCartItem =
    size && $cartItems.find((item) => item.id === createID(product.id, size!));
</script>

{#if product.sizes.some(({ inStockCount }) => inStockCount > 0)}
  <div class="-mt-1.5 -mr-2">
    {#if currentCartItem && size}
      <div class="flex items-center" class:justify-between={variant === "full"}>
        <p class="text-sm font-semibold mr-4">
          {currentCartItem.q + " шт."}
        </p>

        <div class="flex items-center">
          {#if currentCartItem.q === 1}
            <Button
              title="Удалить"
              variant="iconLink"
              extraClasses="text-red"
              onClick={() => removeOne({ productID: product.id, size })}
            >
              <Icon name="delete" class="w-7" />
            </Button>
          {:else}
            <Button
              title="Убрать"
              variant="iconLink"
              onClick={() => removeOne({ productID: product.id, size })}
            >
              <Icon name="minus" class="w-7" />
            </Button>
          {/if}

          {#if currentCartItem.q === size.inStockCount}
            <Button title="Больше нет в наличии" variant="iconLink" disabled>
              <Icon name="info" class="w-7" />
            </Button>
          {:else}
            <Button
              title="Добавить еще"
              variant="iconLink"
              onClick={() => addOne({ productID: product.id, size })}
            >
              <Icon name="plus" class="w-7" />
            </Button>
          {/if}
        </div>
      </div>
    {:else}
      <div class="flex justify-end">
        {#if cartButtonStyle === "link"}
          <Button
            title="Добавить в корзину"
            variant="iconLink"
            disabled={!size}
            onClick={() => addOne({ productID: product.id, size })}
          >
            <Icon name="cart" class="w-7" />
          </Button>
        {:else if cartButtonStyle === "primary"}
          <Button
            title="Добавить в корзину"
            variant="iconPrimary"
            extraClasses="w-full"
            disabled={!size}
            onClick={() => addOne({ productID: product.id, size })}
          >
            <Icon name="cart" class="w-7" />
            <span class="text-base font-medium">В корзину</span>
          </Button>
        {/if}
        {#if !size}
          <p>Сначала выберите размер</p>
        {/if}
      </div>
    {/if}
  </div>
{:else}
  <p class="mt-1 text-sm text-grey">Товар закончился</p>
{/if}
