<script lang="ts">
  import type { Order } from "$lib/schema";
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import Button from "$lib/components/UI/Button.svelte";
  import { currentCity } from "$lib/stores/currentCity";

  export let data;

  $: closest_cities = [];

  let map: any;

  onMount(() => {
    DG.then(() => {
        map = DG.map('map', {
            center: JSON.parse($currentCity.latlng),
            zoom: 13,
            maximumAge: 24 * 3600
        });

        map.on('locationfound', loc => {
          map.setView(loc.latlng, 13);

          data.cities.forEach(city => {
            const lat = Math.abs(city.geo_lat - loc.latlng.lat);
            const lng = Math.abs(city.geo_lon - loc.latlng.lng);

            if (lat < 1 && lng < 1) {
              closest_cities = [...closest_cities, city];
            }
          });

          if (closest_cities.length > 0) {
            currentCity.set({
              postal_code: closest_cities[0].postal_code.toString(),
              latlng: JSON.stringify([closest_cities[0].geo_lat, closest_cities[0].geo_lon])
            });
          }
        });
    });
  });

  function getCurrentLocation() {
    map.locate();
  }
</script>

<div class="grid grid-cols-[1fr_26rem] gap-20 mt-5">
  <div>
    <section>
      <header class="flex items-center justify-between">
        <h2 class="text-2xl font-bold">Доставка</h2>

        <Button
          size="xs"
          title="ШАГ 1 ИЗ 3"
        >
          <span slot="text">ШАГ 1 ИЗ 3</span>
          <svg slot="icon" width="17" height="10" viewBox="0 0 17 10" fill="none">
            <path d="M15.0625 1.76562L8.5 8.32812L1.9375 1.76562" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </Button>
      </header>

      <div class="mt-10">
        <div id="map" style="aspect-ratio: 16 / 9;" />

        <form method="post" class="grid grid-cols-[0.5fr_1fr] gap-7 mt-10">
          <label for="city" class="text-lg font-medium mt-2">Город</label>

          <div>
            <select name="city" id="city" value={$currentCity.postal_code}>
              <optgroup label="Города рядом с вами">
                {#each closest_cities as { address, postal_code }}
                  <option value={postal_code.toString()}>{address}</option>
                {/each}
              </optgroup>
              <optgroup label="Все города">
                {#each data.cities as { address, postal_code }}
                  <option value={postal_code.toString()}>{address}</option>
                {/each}
              </optgroup>
            </select>

            <button
              type="button"
              class="flex mt-2 underline"
              on:click={getCurrentLocation}
            >
              <span>Определить город по моей локации</span>
              <svg viewBox="0 0 512 512" class="ml-1 w-[1lh] h-[1lh]" width="12" height="12">
                <path d="M448 64L64 240.14h200a8 8 0 018 8V448z" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" />
              </svg>
            </button>
          </div>

          <span class="text-lg font-medium mt-2">ПВЗ</span>
        </form>
      </div>
    </section>

    <section class="mt-10">
      <header class="flex items-center justify-between">
        <h2 class="text-2xl font-bold">Получатель</h2>

        <Button
          size="xs"
          title="ШАГ 1 ИЗ 3"
        >
          <span slot="text">ШАГ 2 ИЗ 3</span>
          <svg slot="icon" width="17" height="10" viewBox="0 0 17 10" fill="none">
            <path d="M15.0625 1.76562L8.5 8.32812L1.9375 1.76562" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </Button>
      </header>

      <div class="mt-10">
        <form method="post" class="grid grid-cols-[0.5fr_1fr] gap-7">
          <label for="full_name" class="text-lg font-medium mt-2">Имя и Фамилия</label>
          <div>
            <input
              type="text"
              id="full_name"
              name="fullname"
              placeholder="Иван Иванов"
              required
            />
          </div>

          <label for="phone" class="text-lg font-medium mt-2">Телефон</label>
          <div>
            <input
              type="tel"
              id="phone"
              name="phone"
              pattern={"7[0-9]{10}"}
              minlength="11"
              maxlength="11"
              required
            />
            <p class="text-xs mt-2 ml-4">Формат: 79998887766</p>
          </div>

          <label for="email" class="text-lg font-medium mt-2">E-mail</label>
          <div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@gmail.com"
              required
            />
            <p class="text-xs mt-2 ml-4">Необходим для отправки чека</p>
          </div>
        </form>
      </div>
    </section>

    <section class="mt-10">
      <header class="flex items-center justify-between">
        <h2 class="text-2xl font-bold">Оплата</h2>
  
        <Button
          size="xs"
          title="ШАГ 1 ИЗ 3"
        >
          <span slot="text">ШАГ 3 ИЗ 3</span>
          <svg slot="icon" width="17" height="10" viewBox="0 0 17 10" fill="none">
            <path d="M15.0625 1.76562L8.5 8.32812L1.9375 1.76562" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </Button>
      </header>
    </section>
  </div>

  <div>
    <p>
      <span class="font-semibold">Ваш заказ</span>
    </p>

    <p>
      <span class="font-semibold">Стоимость доставки</span>
    </p>

    <p class="mt-4 text-xl font-semibold">
      <span>Итого</span>
    </p>
  </div>
</div>
