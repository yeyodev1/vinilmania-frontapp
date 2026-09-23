import { ref } from 'vue'

// Estado de módulo: el botón del header y el overlay comparten este ref.
const isOpen = ref(false)

export function useMenu() {
  const open = () => (isOpen.value = true)
  const close = () => (isOpen.value = false)
  const toggle = () => (isOpen.value = !isOpen.value)

  /** Cierra el menú y baja a la sección cuando la animación de salida ya empezó. */
  function goTo(id: string) {
    close()
    const el = document.getElementById(id)
    if (!el) return
    // Espera a que se suelte el candado de scroll del body.
    requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth' }))
  }

  return { isOpen, open, close, toggle, goTo }
}
