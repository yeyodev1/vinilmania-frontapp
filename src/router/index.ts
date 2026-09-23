import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { site } from '@/config/site'

// Landing de una sola página: las secciones se navegan por hash.
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: site.name },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: 'Página no encontrada' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { left: 0, top: 0 }
  },
})

router.afterEach((to) => {
  // En la home se respeta el <title> de index.html, pensado para SEO.
  if (to.name === 'Home') return
  document.title = `${to.meta.title as string} — ${site.name}`
})

export default router
