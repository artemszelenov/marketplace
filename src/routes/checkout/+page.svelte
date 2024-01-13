<script lang="ts">
  import type { Order } from "$lib/schema";
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import Button from "$lib/components/UI/Button.svelte";
  import Select from "$lib/components/UI/Select.svelte";
  import { currentCity } from "$lib/stores/currentCity";

  export let data;

  let closest_cities: CdekCity[] = [];
  let selected_office = null;
  let delivery_type: 'courier' | 'pickup' | undefined;
  let map: any;

  $: if (delivery_type === 'pickup') {
    DG.then(() => {
        map = DG.map('map', {
            center: JSON.parse($currentCity.latlng),
            zoom: 13
        });

        drawDeliveryPoints();
    });
  }

  function getCurrentPosition() {
    window.navigator.geolocation.getCurrentPosition(({ coords }) => {
      for (const city of data.cdek_cities) {
        const lat = Math.abs(city.latitude - coords.latitude);
        const lng = Math.abs(city.longitude - coords.longitude);

        if (lat < 0.2 && lng < 0.2) {
          closest_cities = [...closest_cities, city];
        }
      }

      if (closest_cities.length > 0) {
        currentCity.set({
          cdek_city_code: closest_cities[0].code.toString(),
          latlng: JSON.stringify([closest_cities[0].latitude, closest_cities[0].longitude])
        });
      }
    });
  }

  function onCityChange(event: Event) {
    const city_code = Number((event.target as HTMLSelectElement).value);
    const city = data.cdek_cities.find(({ code }) => code === city_code);

    if (city) {
      currentCity.set({
        cdek_city_code: city_code.toString(),
        latlng: JSON.stringify([city.latitude, city.longitude])
      });

      if (map) {
        map.setView([city.latitude, city.longitude], 13);
        drawDeliveryPoints();
      }
    }
  }

  async function drawDeliveryPoints() {
    fetch(`/api/cdek/deliverypoints/${$currentCity.cdek_city_code}`)
      .then(res => res.json())
      .then(data => {
        const icon = DG.divIcon({
          className: 'map-cdek-marker',
          iconSize: [35, 35],
        });

        for (const deliverypoint of data) {
          const marker = DG.marker([deliverypoint.location.latitude, deliverypoint.location.longitude], {
            icon,
            title: deliverypoint.name,
            alt: deliverypoint.name,
            riseOnHover: true,
            payload: deliverypoint
          });

          marker.addTo(map);

          marker.on('click', (data: any) => {
            selected_office = data.target.options.payload;
          })
        }
      });
  }

  function setCourierDeliveryTypeActive() {
    delivery_type = 'courier'
  }

  function setPickupDeliveryTypeActive() {
    delivery_type = 'pickup'
  }
</script>

<div class="grid grid-cols-[1fr_26rem] gap-20 mt-5">
  <div>
    <section>
      <header class="relative flex items-center justify-between">
        <h2 class="text-2xl font-bold">Доставка</h2>

        <Button
          size="xs"
          title="ШАГ 1 ИЗ 3"
          activeAreaByParent
        >
          <span slot="text">ШАГ 1 ИЗ 3</span>
          <svg slot="icon" width="17" height="10" viewBox="0 0 17 10" fill="none">
            <path d="M15.0625 1.76562L8.5 8.32812L1.9375 1.76562" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </Button>
      </header>

      <div class="mt-10">
        <form method="post" class="grid grid-cols-[0.5fr_1fr] gap-7 mt-10">
          <label for="city" class="text-lg font-medium mt-2">Город</label>

          <div>
            <Select name="city" value={$currentCity.cdek_city_code} onChange={onCityChange}>
              <optgroup label="Города рядом с вами">
                {#each closest_cities as { city, code }}
                  <option value={code.toString()}>{city}</option>
                {/each}
              </optgroup>
              <optgroup label="Все города">
                {#each data.cdek_cities as { city, code }}
                  <option value={code.toString()}>{city}</option>
                {/each}
              </optgroup>
            </Select>

            <button
              type="button"
              class="flex ml-4 mt-2 underline text-sm"
              on:click={getCurrentPosition}
            >
              <span>Определить город по моей локации</span>
              <svg viewBox="0 0 512 512" class="ml-1 w-[1lh] h-[1lh]" width="12" height="12">
                <path d="M448 64L64 240.14h200a8 8 0 018 8V448z" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" />
              </svg>
            </button>
          </div>

          <label for="tk" class="text-lg font-medium mt-2">Транспортная компания</label>

          <Select name="tk" value="cdek" disabled>
            <option value="cdek">CDEK</option>
          </Select>

          <p class="text-lg font-medium">Способ доставки</p>

          <div>
            <fieldset>
              <legend class="visually-hidden">Способ доставки</legend>
              <label class="flex items-center">
                <input disabled type="radio" name="delivery_type" value="courier" on:change={setCourierDeliveryTypeActive}>
                <span class="ml-2">Курьером до двери</span>
              </label>
              <label class="flex items-center">
                <input type="radio" name="delivery_type" value="pickup" on:change={setPickupDeliveryTypeActive}>
                <span class="ml-2">Самовывоз ПВЗ</span>
              </label>
            </fieldset>
          </div>

          {#if delivery_type === 'pickup'}
            <div id="map" class="aspect-video col-span-2" />

            <div class="col-span-2 grid grid-cols-[0.5fr_1fr] gap-y-4 gap-x-7">
              <p class="text-lg font-medium">ПВЗ</p>

              {#if selected_office}
                <p class="ml-4 text-lg">{selected_office.owner_code}</p>
                <p class="text-base font-medium">Улица</p>
                <p class="ml-4">{selected_office.location.address}</p>
                <p class="text-base font-medium">Остановка</p>
                <p class="ml-4">{selected_office.nearest_station}</p>
                <p class="text-base font-medium">График работы</p>
                <p class="ml-4">{selected_office.work_time}</p>
                <p class="text-base font-medium">Контакты</p>
                <p class="ml-4">
                  {#each selected_office.phones as { number }}
                    <a href="tel:{number}" class="block">{number}</a>
                  {/each}
                </p>
                {#if selected_office.address_comment}
                  <p class="text-base font-medium">Как добраться</p>
                  <p class="ml-4">{selected_office.address_comment}</p>
                {/if}
              {:else}
                <p class="ml-4">Выберите ПВЗ на карте</p>
              {/if}
            </div>
          {/if}
        </form>
      </div>
    </section>

    <section class="mt-10">
      <header class="relative flex items-center justify-between">
        <h2 class="text-2xl font-bold">Получатель</h2>

        <Button
          size="xs"
          title="ШАГ 1 ИЗ 3"
          activeAreaByParent
        >
          <span slot="text">ШАГ 2 ИЗ 3</span>
          <svg slot="icon" width="17" height="10" viewBox="0 0 17 10" fill="none">
            <path d="M15.0625 1.76562L8.5 8.32812L1.9375 1.76562" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </Button>
      </header>

      <div class="mt-10">
        <form method="post" class="grid grid-cols-[0.5fr_1fr] gap-7" autocomplete="on">
          <label for="full_name" class="text-lg font-medium mt-2">ФИО</label>
          <div>
            <input
              type="text"
              id="full_name"
              name="fullname"
              placeholder="Иванов Иван Иванович"
              autocomplete="name"
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
              autocomplete="tel"
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

          <div />

          <div>
            <label>
              <input type="checkbox" name="agree" value="yes">
              <span>Соглашаюсь с <a href="/">политикой обработки персональных данных</a></span>
            </label>
          </div>
        </form>
      </div>
    </section>

    <section class="mt-10">
      <header class="relative flex items-center justify-between">
        <h2 class="text-2xl font-bold">Оплата</h2>
  
        <Button
          size="xs"
          title="ШАГ 3 ИЗ 3"
          activeAreaByParent
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
      <span class="font-semibold">500 ₽</span>
    </p>

    <p class="mt-4 text-xl font-semibold">
      <span>Итого</span>
    </p>
  </div>
</div>

<style>
  :global(.map-cdek-marker) {
    border-radius: 9999px;
    background-image: url('/cdek-logo.svg');
    background-color: var(--accent-color);
    background-repeat: no-repeat;
    background-position: center;
    background-size: 70%;
  }
</style>
