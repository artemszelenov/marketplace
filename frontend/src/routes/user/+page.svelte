<script>
  export let data;

  const { user } = data;
</script>

<div class="flex gap=5">
  <aside class="w-[250px] shrink-0">
    <h2 class="text-xl font-semibold">{user?.name ?? "Аноним"}</h2>

    <nav class="mt-5 -ml-2">
      <a class="block w-full px-2 py-2" href="/">Мои заказы</a>
    </nav>

    <form method="POST" action="?/logout" class="-ml-2">
      <button class="w-full px-2 py-2 text-left" type="submit">Выйти</button>
    </form>
  </aside>

  <div class="w-full px-8">
    <h1 class="text-2xl font-bold">Мои заказы</h1>
  </div>
</div>
