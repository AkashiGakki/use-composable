<script setup lang="ts">
import { computed } from 'vue'
import { EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

const editor: any = useEditor({
  content: '<p>Typing something you want……</p>',
  extensions: [StarterKit],
})

const useBold = () => editor.value.chain().focus().toggleBold().run()
const isBoldActive = computed(() => editor.value.isActive('bold'))
</script>

<template>
  <div>
    <div v-if="editor">
      <button :class="{ 'is-active': isBoldActive }" @click="useBold">
        <div title="粗体">
          Bold
        </div>
      </button>
    </div>

    <EditorContent :editor="editor as any" />
  </div>
</template>

<style lang="scss">
/* Basic editor styles */
.ProseMirror {
  >*+* {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0D0D0D;
    color: #FFF;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0D0D0D, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0D0D0D, 0.1);
    margin: 2rem 0;
  }
}
</style>
