<script lang="ts">
  export let size: string;
  export let title: string | undefined = "";
  export let type: "submit" | "button" = "button";
  export let handler: () => void = () => {};
  export let disabled: boolean = false;
  export let as: "link" | "button" | "div" = "button";
  export let href: string | undefined = "/";
  export let form: string | undefined = undefined;
  export let appearance: 'default' | 'secondary' | 'green' | 'outlined' = 'default';
  export let activeAreaByParent = false;
  export let noIcon = false;

  const appearances = {
    default: "bg-gray-900",
    secondary: "border-2 border-yellow-400 text-yellow-400",
    green: "bg-emerald-700",
    outlined: "border-2 border-gray-900 text-gray-900"
  }

  const activeAreaByParentClasses = activeAreaByParent ? "before:absolute before:inset-0" : "";
</script>

{#if as === "link"}
  <div
    class="relative flex items-center gap-[0.5em] w-fit text-white text-{size} font-bold uppercase no-underline"
  > 
    <a {href} class="absolute inset-0" aria-label={title} />

    <div class="flex items-center w-fit bg-gray-900 rounded-full px-[1.5em] h-[2.5em] tracking-wider">
      <slot name='text' />
    </div>

    <div class="flex items-center justify-center rounded-full bg-gray-900 w-[2.5em] h-[2.5em]">
      <slot name='icon'>
        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" class="w-[1em]">
          <path d="M14.1635 13.6685L14.1198 2.44264L2.89397 2.39897M13.3429 3.21953L2.00509 14.5574" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </slot>
    </div>
  </div>
{:else if as === 'div'}
  <div class="flex items-center gap-[0.5em] text-white text-{size} font-bold uppercase {activeAreaByParentClasses}">
    {#if $$slots.text}
      <div class="flex items-center rounded-full px-5 h-[2.5em] tracking-wider {appearances[appearance]}">
        <slot name='text' />
      </div>
    {/if}

    {#if !noIcon}
      <div class="flex items-center justify-center rounded-full w-[2.5em] h-[2.5em] {appearances[appearance]}">
        <slot name='icon'>
          <svg width="16" height="17" viewBox="0 0 16 17" fill="none" class="w-[1em]">
            <path d="M14.1635 13.6685L14.1198 2.44264L2.89397 2.39897M13.3429 3.21953L2.00509 14.5574" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </slot>
      </div>
    {/if}
  </div>
{:else}
  <button
    class="flex items-center gap-[0.5em] text-white text-{size} font-bold uppercase {activeAreaByParentClasses}"
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
          <svg width="16" height="17" viewBox="0 0 16 17" fill="none" class="w-[1em]">
            <path d="M14.1635 13.6685L14.1198 2.44264L2.89397 2.39897M13.3429 3.21953L2.00509 14.5574" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </slot>
      </div>
    {/if}
  </button>
{/if}
