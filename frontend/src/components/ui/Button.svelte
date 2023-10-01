<script lang="ts">
  export let variant: "primary" | "iconPrimary" | "link" | "iconLink";
  export let title: string;
  export let clickHandler: () => void = () => {};
  export let extraClasses: string = "";
  export let disabled: boolean = false;

  const classes: { [key in typeof variant]: string } = {
    primary:
      "inline-flex justify-center items-center px-9 py-1.5 w-full text-sm select-none border rounded",
    iconPrimary:
      "inline-flex justify-center items-center gap-2 px-9 py-1.5 w-full text-sm select-none border-2 rounded",
    link: "inline-flex justify-center items-center px-4 py-1.5 text-sm select-none rounded",
    iconLink:
      "inline-flex justify-center items-center gap-2 px-1 py-1 text-sm select-none rounded",
  };
</script>

<button
  class="{classes[variant]} {extraClasses}"
  type="button"
  {disabled}
  {title}
  on:click={clickHandler}
>
  <slot />
</button>
