<script>
  export let data;
</script>

<h1 class="text-2xl font-medium">{data.title}</h1>

<section class="mt-4">
  {@html data.body}
</section>

<style>
  section {
    width: min(45em, 100%);
  }
</style>
