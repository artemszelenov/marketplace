<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { Editor } from '@tiptap/core'
  import StarterKit from '@tiptap/starter-kit'

  export let content: string

  let element: HTMLElement
  let editor: Editor

  onMount(() => {
    editor = new Editor({
      element: element,
      extensions: [
        StarterKit,
      ],
      content,
      onTransaction: () => {
        // force re-render so `editor.isActive` works as expected
        editor = editor
      },
    })
  })

  onDestroy(() => {
    if (editor) {
      editor.destroy()
    }
  })
</script>

{#if editor}
  <menu>
    <button
      on:click={() => editor.chain().focus().toggleHeading({ level: 1}).run()}
      class="inline-flex items-center text-sm rounded border border-gray-900 px-3 h-[2.5em] cursor-default font-medium"
      class:bg-gray-900={editor.isActive('heading', { level: 1 })}
      class:text-white={editor.isActive('heading', { level: 1 })}
    >
      H1
    </button>

    <button
      on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      class="inline-flex items-center text-sm rounded border border-gray-900 px-3 h-[2.5em] cursor-default font-medium"
      class:bg-gray-900={editor.isActive('heading', { level: 2 })}
      class:text-white={editor.isActive('heading', { level: 2 })}
    >
      H2
    </button>

    <button
      on:click={() => editor.chain().focus().setParagraph().run()}
      class="inline-flex items-center text-sm rounded border border-gray-900 px-3 h-[2.5em] cursor-default font-medium"
      class:bg-gray-900={editor.isActive('paragraph')}
      class:text-white={editor.isActive('paragraph')}
    >
      P
    </button>
  </menu>
{/if}

<div class="prose" bind:this={element} />

<style>
  :global(.prose p) {
    @apply mb-4;
  }
</style>
