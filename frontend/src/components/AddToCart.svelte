<script lang="ts">
  import Button from "./UI/Button.svelte";
  import Icon from "./UI/Icon.svelte";
  import { cartItemsStore, addOne, removeOne } from "../stores/cart";
  import type { Product } from "@/types/product";

  export let product: Product;
  export let variant: "full" | "compact" = "compact";

  $: productInCart =
    $cartItemsStore && $cartItemsStore.find((item) => item.id === product.id);
</script>

{#if product.inStockCount > 0}
  <div class="-mt-1.5 -mr-2">
    {#if productInCart}
      <div
        class="flex items-center"
        class:justify-between={variant === "compact"}
      >
        <p class="text-sm font-semibold mr-4">
          {productInCart.quantity + " шт."}
        </p>

        <div class="flex items-center">
          {#if productInCart.quantity === 1}
            <Button
              title="Удалить"
              variant="iconLink"
              extraClasses="text-red"
              clickHandler={() => removeOne(product)}
            >
              <Icon name="delete" class="w-7" />
            </Button>
          {:else}
            <Button
              title="Убрать"
              variant="iconLink"
              clickHandler={() => removeOne(product)}
            >
              <Icon name="minus" class="w-7" />
            </Button>
          {/if}

          {#if productInCart.quantity === product.inStockCount}
            <Button title="Больше нет в наличии" variant="iconLink" disabled>
              <Icon name="info" class="w-7" />
            </Button>
          {:else}
            <Button
              title="Добавить еще"
              variant="iconLink"
              clickHandler={() => addOne(product)}
            >
              <Icon name="plus" class="w-7" />
            </Button>
          {/if}
        </div>
      </div>
    {:else}
      <div class="flex justify-end">
        {#if variant === "compact"}
          <Button
            title="Добавить в корзину"
            variant="iconLink"
            clickHandler={() => addOne(product)}
          >
            <Icon name="cart" class="w-7" />
          </Button>
        {:else if variant === "full"}
          <Button
            title="Добавить в корзину"
            variant="iconPrimary"
            clickHandler={() => addOne(product)}
          >
            <Icon name="cart" class="w-7" />
            <span class="text-base font-medium">В корзину</span>
          </Button>
        {/if}
      </div>
    {/if}
  </div>
{:else}
  <p class="mt-1 text-sm text-grey">Товар закончился</p>
{/if}
