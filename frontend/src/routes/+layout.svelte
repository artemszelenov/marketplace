<script lang="ts">
  import "../app.css";

  import { MARKETPALCE_NAME } from "$lib/constants";
  import CartNavLink from "../lib/components/UI/CartNavLink.svelte";

  const title = "";
  const user = null;

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
  <title>{`${title} | ${MARKETPALCE_NAME}`}</title>
</svelte:head>

<div class="w-full bg-white border-b border-dashed text-xs">
  <div class="inline-flex w-full items-center justify-between mx-auto">
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
          <a
            class="px-2 py-2 text-sm text-black lg:px-6 md:px-3 hover:text-grey-600"
            href={url}
          >
            {text}
          </a>
        {/each}

        {#if user}
          <a
            class="px-2 py-2 text-sm text-black lg:px-6 md:px-3 hover:text-grey-600"
            href="/user"
          >
            Мой аккаунт
          </a>
        {/if}

        <CartNavLink />
      </nav>
    </div>
  </div>
</div>

<main>
  <slot />
</main>

<footer class="bg-grey-50 border-t border-dashed">
  <div class="px-8 py-12 mx-auto max-w-7xl md:px-12">
    <div class="xl:grid xl:grid-cols-3 xl:gap-8">
      <div class="text-white xl:col-span-1">
        <a
          href="/"
          class="lg:text-xl gap-2 inline-flex items-center text-black uppercase"
        >
          6:52
        </a>
      </div>
      <div class="grid grid-cols-2 gap-8 mt-12 xl:mt-0 xl:col-span-2" />
    </div>
  </div>
</footer>
