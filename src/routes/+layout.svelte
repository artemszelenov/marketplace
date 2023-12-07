<script lang="ts">
  import "../app.css";

  export let data;

  const nav = [
    {
      text: "Главная",
      url: "/",
    },
    {
      text: "Каталог",
      url: "/catalog",
    },
  ];
</script>

<svelte:head>
  <title>{`${data.seo.title} | 6:52`}</title>
</svelte:head>

<header class="w-full bg-white border-b border-dashed text-xs">
  <div
    class="relative flex flex-col w-full mx-auto md:items-center md:justify-between md:flex-row md:px-12 px-8 py-4 max-w-7xl lg:px-12"
  >
    <div
      class="flex flex-row items-center justify-between lg:justify-start max-w-7xl"
    >
      <a
        class="gap-2 text-sm inline-flex items-center text-black uppercase"
        href="/"
      >
        6:52
      </a>
    </div>

    <nav
      class="flex-col items-center flex-grow hidden md:pb-0 md:flex md:justify-end md:flex-row"
    >
      {#each nav as { text, url }}
        <a class="px-2 py-2 text-sm text-black lg:px-6 md:px-3" href={url}>
          {text}
        </a>
      {/each}

      {#if data.user}
        <a class="px-2 py-2 text-sm text-black lg:px-6 md:px-3" href="/user">
          Мой аккаунт
        </a>
      {/if}

      <a
        href="/cart"
        class="px-2 py-2 text-sm text-black lg:px-6 md:px-3 hover:text-grey-600"
      >
        {`Корзина ${data.cart_items_count ? `(${data.cart_items_count})` : ""}`}
      </a>
    </nav>
  </div>
</header>

<main>
  <div class="px-8 py-12 mx-auto max-w-7xl md:px-12">
    <slot />
  </div>
</main>

<footer class="bg-grey-50 border-t border-dashed">
  <div class="px-8 py-12 mx-auto max-w-7xl md:px-12">
    <div class="xl:grid xl:grid-cols-3 xl:gap-8">
      <div class="text-white xl:col-span-1">
        <a
          href="/"
          class="text-sm gap-2 inline-flex items-center text-black uppercase"
        >
          6:52
        </a>
      </div>
      <div class="grid grid-cols-2 gap-8 mt-12 xl:mt-0 xl:col-span-2" />
    </div>
  </div>
</footer>
