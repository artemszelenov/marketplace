<script lang="ts">
  import { enhance } from "$app/forms";
  import { page } from "$app/stores";

  export let stock_item_id: string;
</script>

<form action="/cart?/remove" method="POST" use:enhance>
  <input type="hidden" name="stock-item" value={stock_item_id}>
  <input type="hidden" name="from" value={$page.url.pathname + $page.url.search}>
  <button type="submit" title="Удалить">Удалить</button>
</form>
