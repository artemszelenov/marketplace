<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { Editor } from '@tiptap/core'
  import StarterKit from '@tiptap/starter-kit'
  import Bold from '@tiptap/extension-bold'

  export let content: string

  let element: HTMLElement
  let editor: Editor

  onMount(() => {
    editor = new Editor({
      element: element,
      extensions: [
        StarterKit,
        Bold
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
  <menu class="mb-2">
    <button
      on:click={() => editor.chain().focus().toggleBold().run()}
      class="inline-flex items-center text-sm rounded border border-gray-900 px-3 h-[2.5em] cursor-default font-medium"
      class:bg-gray-900={editor.isActive('bold')}
      class:text-white={editor.isActive('bold')}
    >
      Bold
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

<textarea name="description" value={editor?.getHTML()} class="sr-only" />

<style>
  :global(.prose p) {
    margin-bottom: var(--spacing-4);
  }
</style>
