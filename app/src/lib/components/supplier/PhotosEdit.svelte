<script lang="ts">
  import Button from "$lib/components/UI/Button.svelte"

  export let product: any

  let is_photos_edit = false

  function togglePhotosEdit() {
    is_photos_edit = !is_photos_edit
  }
</script>

<section>
  <div class="flex justify-between">
    <h3 class="font-bold mb-1">
        Photo
    </h3>
    <button type="button" on:click={togglePhotosEdit}>
      {is_photos_edit ? "Cancel" : "Edit"}
    </button>
  </div>

  <ul class="flex p-1 -mx-1 space-x-1 overflow-x-auto">
    {#each product.gallery as { photo_name, url }}
      <li class="shrink-0 w-[20%]">
        {#if is_photos_edit}
          <form action="?/deletePhoto" method="post">
            <input type="hidden" name="photo_name" value={photo_name}>
            <input type="hidden" name="product_id" value={product.id}>

            <button type="submit">
              <img
                class="w-full aspect-square rounded object-cover"
                src={url}
                alt=""
                width="100"
                height="100"
                decoding="async"
                loading="lazy"
              />
              <svg class="mt-2" height="20" viewBox="0 0 512 512" aria-hidden="true">
                <path d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M80 112h352"/><path d="M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40M256 176v224M184 176l8 224M328 176l-8 224" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" />
              </svg>
            </button>
          </form>
        {:else}
          <img
            class="w-full aspect-square rounded object-cover"
            src={url}
            alt=""
            width="100"
            height="100"
            decoding="async"
            loading="lazy"
          />
        {/if}
      </li>
    {/each}
  </ul>

  {#if is_photos_edit}
    <form action="?/uploadPhotos" method="post" enctype="multipart/form-data">
      <input type="hidden" name="product_id" value={product.id}>

      <input
        type="file"
        name="photos"
        accept="image/jpeg, image/png, image/avif, image/webp"
        class="max-w-max mt-3"
        multiple
      />

      <Button
        type="submit"
        additional_class="max-w-max mt-3"
        no_icon
      >
        <span slot="text">Add selected photos</span>
      </Button>
    </form>
  {/if}
</section>
