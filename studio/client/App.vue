<script setup lang="ts">
import { Pane, Splitpanes } from 'splitpanes'
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { Markdown } from 'tiptap-markdown'
import Document from '@tiptap/extension-document'
import Heading from '@tiptap/extension-heading'
import Paragraph from '@tiptap/extension-paragraph'

const editor = new Editor({
  content: '# I’m running Tiptap with Vue.js. 🎉',
  extensions: [
    StarterKit,
    Markdown.configure({ breaks: true }),
    Document,
    Paragraph,
    Text,
    Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
  ],
  editorProps: {
    attributes: {
      class: 'prose sm:prose mx-auto focus:outline-none',
    },
  },
})
console.log(useRoute())

const { getContent } = useSource()
getContent()
</script>

<template>
  <header />

  <main h-screen>
    <Splitpanes transition-none>
      <Pane min-size="20" size="35">
        <EditorContent h-full bg-white p-24 :editor="editor" />
      </Pane>
      <Pane p-24>
        {{ editor.storage.markdown.getMarkdown() }}
      </Pane>
    </Splitpanes>
  </main>
</template>
