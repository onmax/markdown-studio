import '@unocss/reset/tailwind.css'
import 'uno.css'
import 'splitpanes/dist/splitpanes.css'
import './styles/overrides.css'
import './styles/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'

const app = createApp(App)

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: () => import('./App.vue'),
    },
  ],
})
app.use(router)
app.mount('#app')
