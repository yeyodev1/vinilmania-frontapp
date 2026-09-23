import { onBeforeUnmount, onMounted, type Ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

export const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Revela con GSAP los [data-reveal] dentro de `root` al entrar en pantalla.
 * `data-reveal="stagger"` en un contenedor anima a sus hijos en cascada.
 * Con reduced motion no se toca nada: global.scss solo oculta los elementos
 * cuando <html> tiene .js-motion, y esa clase no se pone.
 */
export function useReveal(root: Ref<HTMLElement | null>) {
  let ctx: gsap.Context | undefined

  onMounted(() => {
    if (!root.value || reducedMotion()) return

    ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('[data-reveal]', root.value)
      items.forEach((el) => {
        const targets = el.dataset.reveal === 'stagger' ? Array.from(el.children) : el
        if (targets !== el) gsap.set(el, { opacity: 1, y: 0 })
        gsap.fromTo(
          targets,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.08,
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          },
        )
      })
    }, root.value)
  })

  onBeforeUnmount(() => ctx?.revert())
}
