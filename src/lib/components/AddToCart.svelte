<script lang="ts">
  import type { StockItem } from "$lib/schema";

  import { cartItems, addOne, removeOne } from "$lib/stores/cart";

  import Button from "./UI/Button.svelte";
  import Icon from "./UI/Icon.svelte";

  export let stockItem: StockItem;
  export let variant: "full" | "compact" = "full";
  export let cartButtonStyle: "primary" | "link" = "link";

  $: currentCartItem = $cartItems.find(item => item.id === stockItem.id);
</script>

{#if stockItem.count > 0}
  <div class="-mt-1.5 -mr-2">
    {#if currentCartItem}
      <div class="flex items-center" class:justify-between={variant === "full"}>
        <p class="text-sm font-semibold mr-4">
          {currentCartItem.count + " шт."}
        </p>

        <div class="flex items-center">
          {#if currentCartItem.count === 1}
            <Button
              title="Удалить"
              variant="iconLink"
              extraClasses="text-red"
              onClick={() => removeOne(stockItem)}
            >
              <Icon name="delete" class="w-7" />
            </Button>
          {:else}
            <Button
              title="Убрать"
              variant="iconLink"
              onClick={() => removeOne(stockItem)}
            >
              <Icon name="minus" class="w-7" />
            </Button>
          {/if}

          {#if currentCartItem.count === stockItem.count}
            <Button title="Больше нет в наличии" variant="iconLink" disabled>
              <Icon name="info" class="w-7" />
            </Button>
          {:else}
            <Button
              title="Добавить еще"
              variant="iconLink"
              onClick={() => addOne(stockItem)}
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
            onClick={() => addOne(stockItem)}
          >
            <Icon name="cart" class="w-7" />
          </Button>
        {:else if cartButtonStyle === "primary"}
          <Button
            title="Добавить в корзину"
            variant="iconPrimary"
            extraClasses="w-full"
            onClick={() => addOne(stockItem)}
          >
            <!-- <Icon name="cart" class="w-7" /> -->
            <span class="text-base font-medium">В корзину</span>
          </Button>
        {/if}
      </div>
    {/if}
  </div>
{:else}
  <p class="mt-1 text-sm text-grey">Товар закончился</p>
{/if}
