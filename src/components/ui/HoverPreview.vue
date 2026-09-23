<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { gsap } from '@/composables/useMotion'

defineProps<{
  items: { id: string; image: string }[]
  activeId: string | null
}>()

const root = ref<HTMLElement | null>(null)

// Sigue al puntero solo con mouse; en táctil el CSS lo oculta y manda el acordeón.
function onMove(event: PointerEvent) {
  if (event.pointerType !== 'mouse' || !root.value) return
  gsap.to(root.value, { x: event.clientX, y: event.clientY, duration: 0.6, ease: 'power3.out' })
}

onMounted(() => window.addEventListener('pointermove', onMove, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('pointermove', onMove))
</script>

<template>
  <!-- El contenedor lo mueve GSAP; la tarjeta interna escala sin pelear por transform -->
  <div ref="root" class="hover-preview" aria-hidden="true">
    <div class="hover-preview__card" :class="{ 'is-visible': activeId }">
      <img
        v-for="item in items"
        :key="item.id"
        :src="item.image"
        alt=""
        loading="lazy"
        :class="{ 'is-shown': activeId === item.id }"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.hover-preview {
  display: none;

  @media (hover: hover) and (pointer: fine) and (min-width: 1024px) {
    display: block;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 5;
    pointer-events: none;
  }

  &__card {
    position: relative;
    width: 300px;
    aspect-ratio: 4 / 5;
    margin: -190px 0 0 40px;
    border-radius: $radius-md;
    overflow: hidden;
    opacity: 0;
    transform: scale(0.8) rotate(-4deg);
    transition:
      opacity 0.3s ease,
      transform 0.5s $ease;
    box-shadow: $shadow-lg;

    &.is-visible {
      opacity: 1;
      transform: scale(1) rotate(-4deg);
    }

    img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0;
      transition: opacity 0.35s ease;

      &.is-shown {
        opacity: 1;
      }
    }
  }
}
</style>
