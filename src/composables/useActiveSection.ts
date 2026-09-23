import { onBeforeUnmount, onMounted, ref } from 'vue'
import { nav } from '@/config/site'

// Estado de módulo: header, menú y puntos de navegación leen la misma sección.
const activeId = ref(nav[0]?.id ?? '')

/** Observa las secciones del menú y marca la que ocupa el centro de la pantalla. */
export function useActiveSection(observe = false) {
  let observer: IntersectionObserver | undefined

  onMounted(() => {
    if (!observe) return
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) activeId.value = entry.target.id
        })
      },
      // Franja fina en el centro del viewport: solo una sección a la vez.
      { rootMargin: '-45% 0px -50% 0px' },
    )
    nav.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer?.observe(el)
    })
  })

  onBeforeUnmount(() => observer?.disconnect())

  return { activeId }
}
