<script lang="ts">
  import type { StockItem } from "$lib/schema";
  import { enhance } from "$app/forms";
  export let stock_item: StockItem;
  export let referrer: string;
</script>

<form action="/cart?/add" method="POST" use:enhance>
  <input type="hidden" name="stock-item" value={stock_item.id}>
  <input type="hidden" name="quantity" value="1">
  <input type="hidden" name="referrer" value={referrer}>
  <button type="submit">Добавить в корзину</button>
</form>
