<script>
  export let data;
</script>

<article>
  <h1 class="text-2xl font-medium">{data.title}</h1>

  <section class="mt-4">
    {@html data.body}
  </section>
</article>

<style>
  article {
    width: min(45em, 100%);
  }
</style>
