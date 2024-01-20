<script lang="ts">
  import { enhance } from "$app/forms";

  type Pagination = {
    current_page: number,
    limit: number,
    done: boolean
  }

  export let pagination: Pagination;
</script>

<form action="/catalog?/loadMore" method="POST" use:enhance>
  <input type="hidden" name="next-page" value={pagination.current_page + 1}>
  <input type="hidden" name="limit" value={pagination.limit}>
  <input type="submit" value="Показать еще {pagination.limit}">
</form>
