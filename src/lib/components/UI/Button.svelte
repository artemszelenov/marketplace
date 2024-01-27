<script lang="ts">
  export let size: string;
  export let title: string | undefined = "";
  export let type: "submit" | "button" = "button";
  export let handler: () => void = () => {};
  export let disabled: boolean = false;
  export let as: "link" | "button" | "div" = "button";
  export let href: string | undefined = "/";
  export let form: string | undefined = undefined;
  export let appearance: 'action' | 'outlined' = 'action';
  export let noIcon = false;
  export let additional_class = "";

  const appearances = {
    action: "action-button bg-gray-900",
    outlined: "border-2 border-gray-900 text-gray-900"
  }
</script>

{#if as === "link"}
  <div
    class="relative flex items-center gap-[0.5em] w-fit text-white text-{size} font-bold uppercase no-underline {additional_class}"
  > 
    <a {href} class="absolute inset-0" aria-label={title} />

    <div class="flex items-center w-fit bg-gray-900 rounded-full px-[1.5em] h-[2.5em] tracking-wider">
      <slot name='text' />
    </div>

    <div class="flex items-center justify-center rounded-full bg-gray-900 w-[2.5em] h-[2.5em]">
      <slot name='icon'>
        <svg height="18" viewBox="0 0 512 512" class="rotate-45" aria-hidden="true">
          <path fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M112 244l144-144 144 144M256 120v292" />
        </svg>
      </slot>
    </div>
  </div>
{:else if as === 'div'}
  <div class="flex items-center gap-[0.5em] text-white text-{size} font-bold uppercase cursor-default {additional_class}">
    {#if $$slots.text}
      <div class="flex items-center rounded-full px-5 h-[2.5em] tracking-wider {appearances[appearance]}">
        <slot name='text' />
      </div>
    {/if}

    {#if !noIcon}
      <div class="flex items-center justify-center rounded-full w-[2.5em] h-[2.5em] {appearances[appearance]}">
        <slot name='icon'>
          <svg height="18" viewBox="0 0 512 512" class="rotate-45" aria-hidden="true">
            <path fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M112 244l144-144 144 144M256 120v292" />
          </svg>
        </slot>
      </div>
    {/if}
  </div>
{:else}
  <button
    class="flex items-center gap-[0.5em] text-white text-{size} font-bold uppercase {additional_class}"
    {type}
    {title}
    {disabled}
    {form}
    on:click={handler}
  >
    {#if $$slots.text}
      <div class="flex items-center rounded-full px-5 h-[2.5em] tracking-wider {appearances[appearance]}">
        <slot name='text' />
      </div>
    {/if}

    {#if !noIcon}
      <div class="flex items-center justify-center rounded-full w-[2.5em] h-[2.5em] {appearances[appearance]}">
        <slot name='icon'>
          <svg height="18" viewBox="0 0 512 512" class="rotate-45" aria-hidden="true">
            <path fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M112 244l144-144 144 144M256 120v292" />
          </svg>
        </slot>
      </div>
    {/if}
  </button>
{/if}
