<script lang="ts">
  export let variant: "primary" | "iconPrimary" | "link" | "iconLink";
  export let title: string;
  export let type: "submit" | "button" = "button";
  export let onClick: () => void = () => {};
  export let extraClasses: string = "";
  export let disabled: boolean = false;

  const classes: { [key in typeof variant]: string } = {
    primary:
      "inline-flex justify-center items-center px-9 py-1.5 text-sm select-none border rounded outline-offset-2",
    iconPrimary:
      "inline-flex justify-center items-center gap-2 px-9 py-1.5 text-sm select-none border-2 rounded outline-offset-2",
    link: "inline-flex justify-center items-center text-sm select-none rounded",
    iconLink:
      "inline-flex justify-center items-center gap-2 px-1 py-1 text-sm select-none rounded",
  };
</script>

<button
  class="{classes[variant]} {extraClasses}"
  {type}
  {disabled}
  {title}
  on:click={onClick}
>
  <slot />
</button>
