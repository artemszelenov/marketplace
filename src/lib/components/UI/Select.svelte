<script lang="ts">
  export let name: string
  export let value: string
  export let onChange = (event: Event) => {}
  export let disabled: boolean | undefined = false
  export let form: string | undefined;
</script>

<div class="grid">
  <select {name} {disabled} bind:value id={name} on:change={onChange} {form}>
    <slot />
  </select>

  <svg class="relative pointer-events-none row-start-1 col-start-1 w-5 h-5 right-4 justify-self-end self-center" viewBox="0 0 512 512">
    <path d="M136 208l120-104 120 104M136 304l120 104 120-104" fill="none" stroke="currentcolor" stroke-width="48" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
</div>
