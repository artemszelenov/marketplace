<script lang="ts">
  export let name: keyof typeof icons;
  export let viewBox: string | undefined = "0 0 512 512";

  let icons = {
    delete: {
      svg: `
        <path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z" fill="currentColor" stroke="currentColor" stroke-miterlimit="10" stroke-width="32" fill-opacity="0.1" />
        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M320 320L192 192M192 320l128-128" />
      `,
    },
    minus: {
      svg: `
        <path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32" />
        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M336 256H176" />
      `,
    },
    plus: {
      svg: `
        <path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32" />
        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 176v160M336 256H176" />
      `,
    },
    info: {
      svg: `
        <path d="M248 64C146.39 64 64 146.39 64 248s82.39 184 184 184 184-82.39 184-184S349.61 64 248 64z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32" fill-opacity="0.1" />
        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M220 220h32v116" />
        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M208 340h88" />
        <path d="M248 130a26 26 0 1026 26 26 26 0 00-26-26z" />
      `,
    },
    cart: {
      svg: `
        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M320 264l-89.6 112-38.4-44.88" />
        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M80 176a16 16 0 00-16 16v216c0 30.24 25.76 56 56 56h272c30.24 0 56-24.51 56-54.75V192a16 16 0 00-16-16zM160 176v-32a96 96 0 0196-96h0a96 96 0 0196 96v32" />
      `,
    },
  } as const;

  let displayIcon = icons[name];
</script>

<svg class={$$props.class} {viewBox} aria-hidden="true">
  {@html displayIcon.svg}
</svg>
