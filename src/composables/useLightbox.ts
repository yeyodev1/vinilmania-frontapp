import { computed, ref } from 'vue'
import type { Work } from '@/types'

const list = ref<Work[]>([])
const index = ref(-1)

export function useLightbox() {
  const current = computed(() => list.value[index.value] ?? null)
  const isOpen = computed(() => index.value >= 0)

  function show(items: Work[], at: number) {
    list.value = items
    index.value = at
  }

  const close = () => (index.value = -1)
  const next = () => (index.value = (index.value + 1) % list.value.length)
  const prev = () => (index.value = (index.value - 1 + list.value.length) % list.value.length)

  return { list, index, current, isOpen, show, close, next, prev }
}
