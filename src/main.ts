import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { reducedMotion } from './composables/useMotion'
import '@/styles/global.scss'

// Solo con movimiento permitido se ocultan los [data-reveal] antes de animarlos.
if (!reducedMotion()) document.documentElement.classList.add('js-motion')

createApp(App).use(router).mount('#app')
