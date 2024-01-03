<script lang="ts">
  export let size: string;
  export let title: string | undefined = "";
  export let type: "submit" | "button" = "button";
  export let handler: () => void = () => {};
  export let disabled: boolean = false;
  export let as: "link" | "button" = "button"
  export let href: string | undefined = "/";
</script>

{#if as === "link"}
  <a
    class="flex items-center gap-[0.5em] text-white text-{size} font-bold uppercase no-underline"
    {href}
  >
    <div class="flex items-center bg-gray-900 rounded-full px-[1.5em] h-[2.5em] tracking-wider">
      <slot name='text' />
    </div>

    <div class="flex items-center justify-center rounded-full bg-gray-900 w-[2.5em] h-[2.5em]">
      <slot name='icon'>
        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" class="w-[1em]">
          <path d="M14.1635 13.6685L14.1198 2.44264L2.89397 2.39897M13.3429 3.21953L2.00509 14.5574" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </slot>
    </div>
  </a>
{:else}
  <button
    class="flex items-center gap-[0.5em] text-white text-xs font-bold uppercase"
    {type}
    {title}
    {disabled}
    on:click={handler}
  >
    <div class="flex items-center bg-gray-900 rounded-full px-5 h-[2.5em] tracking-wider">
      <slot name='text' />
    </div>

    <div class="flex items-center justify-center rounded-full bg-gray-900 w-[2.5em] h-[2.5em]">
      <slot name='icon'>
        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" class="w-[1em]">
          <path d="M14.1635 13.6685L14.1198 2.44264L2.89397 2.39897M13.3429 3.21953L2.00509 14.5574" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </slot>
    </div>
  </button>
{/if}
