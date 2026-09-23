import { onBeforeUnmount, onMounted, watch, type Ref } from 'vue'
import { gsap, reducedMotion } from '@/composables/useMotion'

/**
 * Timeline del menú a pantalla completa: tres capas diagonales (naranja,
 * carbón claro, carbón) barren la pantalla y luego suben los enlaces.
 *
 * Cerrar NO reproduce la apertura al revés: si se abría y cerraba rápido, el
 * reverse podía quedar a medias y dejar enlaces flotando sobre la página. En su
 * lugar, un tween aparte recoge el overlay entero hacia arriba desde el estado
 * en que esté, lo oculta y deja la apertura en cero. El overlay queda con
 * `visibility: hidden` mientras está cerrado para que no reciba foco.
 */
export function useMenuAnimation(root: Ref<HTMLElement | null>, isOpen: Ref<boolean>) {
  let tl: gsap.core.Timeline | undefined
  let closing: gsap.core.Tween | undefined

  function build(el: HTMLElement) {
    const q = gsap.utils.selector(el)
    tl = gsap.timeline({ paused: true, defaults: { ease: 'power4.inOut' } })

    tl.fromTo(
      q('.menu__layer'),
      { clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' },
      { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', duration: 0.9, stagger: 0.09 },
    )
      .fromTo(
        q('.menu__link-inner'),
        { yPercent: 110, rotate: 4 },
        { yPercent: 0, rotate: 0, duration: 0.9, stagger: 0.05, ease: 'power4.out' },
        '-=0.35',
      )
      .fromTo(
        q('[data-menu-fade]'),
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: 'power2.out' },
        '-=0.6',
      )
  }

  function onKey(event: KeyboardEvent) {
    if (!isOpen.value) return
    if (event.key === 'Escape') {
      isOpen.value = false
      return
    }
    if (event.key !== 'Tab' || !root.value) return

    // Trampa de foco: el menú más el botón que lo cierra.
    const toggle = document.getElementById('menu-toggle')
    const focusables = [
      toggle,
      ...root.value.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
    ].filter(Boolean) as HTMLElement[]
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last?.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first?.focus()
    }
  }

  onMounted(() => {
    if (!root.value) return
    gsap.set(root.value, { visibility: 'hidden' })
    if (!reducedMotion()) build(root.value)
    window.addEventListener('keydown', onKey)
  })

  watch(isOpen, (open) => {
    const el = root.value
    if (!el) return

    closing?.kill()

    if (!tl) {
      gsap.set(el, { visibility: open ? 'visible' : 'hidden' })
    } else if (open) {
      gsap.set(el, { visibility: 'visible', clipPath: 'none' })
      tl.restart()
    } else {
      tl.pause()
      closing = gsap.fromTo(
        el,
        { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' },
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
          duration: 0.6,
          ease: 'power4.inOut',
          onComplete: () => {
            gsap.set(el, { visibility: 'hidden', clipPath: 'none' })
            tl?.pause(0)
          },
        },
      )
    }

    if (open) {
      setTimeout(
        () => el.querySelector<HTMLElement>('.menu__link')?.focus({ preventScroll: true }),
        450,
      )
    } else {
      document.getElementById('menu-toggle')?.focus({ preventScroll: true })
    }
  })

  onBeforeUnmount(() => {
    tl?.kill()
    closing?.kill()
    window.removeEventListener('keydown', onKey)
  })
}
