import { defineConfig } from 'vitepress'
import { MarkdownStudio } from 'markdown-studio'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Markdown Studio Docs',
  description: 'A simple markdown editor with live preview',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/onmax/markdow-studio' },
    ],
  },
  vite: {
    plugins: [
      MarkdownStudio(),
    ],
  },
})
