import { onBeforeUnmount, onMounted, type Ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

export const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/*
 * Revelado al hacer scroll. No usa ScrollTrigger a propósito: ScrollTrigger calcula
 * las posiciones al montar y, cuando las fotos cargan después y la página crece,
 * esas posiciones quedan viejas; con scroll rápido había secciones que no aparecían.
 * Acá cada frame de scroll mide la posición real, así que nada queda oculto.
 */
interface Pending {
  el: HTMLElement
  targets: Element[]
}

let pending: Pending[] = []
let ticking = false
let listening = false

function reveal(item: Pending, animate: boolean) {
  const { targets } = item
  if (!animate) {
    gsap.set(targets, { opacity: 1, y: 0 })
    return
  }
  gsap.to(targets, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: 'power3.out',
    stagger: 0.05,
    overwrite: true,
  })
}

function check() {
  ticking = false
  const vh = window.innerHeight
  pending = pending.filter((item) => {
    const rect = item.el.getBoundingClientRect()
    // Ya quedó arriba (salto con el menú o scroll muy rápido): se muestra sin animar.
    if (rect.bottom < 0) {
      reveal(item, false)
      return false
    }
    // Arranca un poco antes de entrar para que al llegar ya esté visible.
    if (rect.top < vh * 1.05) {
      reveal(item, true)
      return false
    }
    return true
  })
}

function schedule() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(check)
}

function listen() {
  if (listening) return
  listening = true
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule, { passive: true })
  // Las imágenes que cargan tarde cambian el alto de la página.
  window.addEventListener('load', schedule)
}

/**
 * Revela los [data-reveal] dentro de `root` al entrar en pantalla.
 * `data-reveal="stagger"` en un contenedor anima a sus hijos en cascada.
 * Con reduced motion no se toca nada: global.scss solo oculta los elementos
 * cuando <html> tiene .js-motion, y esa clase no se pone.
 */
export function useReveal(root: Ref<HTMLElement | null>) {
  let mine: Pending[] = []

  onMounted(() => {
    if (!root.value || reducedMotion()) return

    mine = gsap.utils.toArray<HTMLElement>('[data-reveal]', root.value).map((el) => {
      if (el.dataset.reveal !== 'stagger') return { el, targets: [el] }
      const children = Array.from(el.children)
      gsap.set(el, { opacity: 1, y: 0 })
      gsap.set(children, { opacity: 0, y: 24 })
      return { el, targets: children }
    })

    pending.push(...mine)
    listen()
    schedule()
  })

  onBeforeUnmount(() => {
    pending = pending.filter((item) => !mine.includes(item))
  })
}
