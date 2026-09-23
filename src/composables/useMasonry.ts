import { computed, onBeforeUnmount, onMounted, ref, type Ref } from 'vue'
import type { Work } from '@/types'

/**
 * Reparte las fotos en columnas flex equilibrando la altura: cada foto va a
 * la columna más corta. Sustituye a CSS Grid/masonry, que no usamos.
 */
export function useMasonry(items: Ref<Work[]>) {
  const width = ref(typeof window === 'undefined' ? 1280 : window.innerWidth)
  const onResize = () => (width.value = window.innerWidth)

  onMounted(() => window.addEventListener('resize', onResize, { passive: true }))
  onBeforeUnmount(() => window.removeEventListener('resize', onResize))

  const count = computed(() => (width.value >= 1280 ? 4 : width.value >= 768 ? 3 : 2))

  const columns = computed(() => {
    const cols = Array.from({ length: count.value }, () => ({
      height: 0,
      items: [] as { work: Work; index: number }[],
    }))
    items.value.forEach((work, index) => {
      const shortest = cols.reduce((min, col) => (col.height < min.height ? col : min), cols[0]!)
      shortest.items.push({ work, index })
      shortest.height += 1 / work.ratio
    })
    return cols.map((col) => col.items)
  })

  return { columns }
}
