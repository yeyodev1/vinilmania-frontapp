<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { whatsappLink } from '@/config/site'
import { useMenu } from '@/composables/useMenu'

const { isOpen } = useMenu()
const visible = ref(false)

// Aparece al salir del hero, donde ya hay un botón de WhatsApp a la vista.
const onScroll = () => (visible.value = window.scrollY > window.innerHeight * 0.8)

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <a
    :href="whatsappLink()"
    class="wa-float"
    :class="{ 'is-visible': visible && !isOpen }"
    target="_blank"
    rel="noopener"
    aria-label="Escríbenos por WhatsApp"
  >
    <i class="fa-brands fa-whatsapp"></i>
    <span class="wa-float__label">¿Cotizamos?</span>
  </a>
</template>

<style scoped lang="scss">
.wa-float {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  z-index: 90;
  @include flex(row, center, center, 0.6rem);
  height: 58px;
  min-width: 58px;
  padding-inline: 1.05rem;
  border-radius: $radius-pill;
  background: $success;
  color: #06270f;
  box-shadow: 0 12px 30px rgba($success, 0.35);
  opacity: 0;
  pointer-events: none;
  transform: translateY(20px) scale(0.9);
  transition:
    opacity 0.4s ease,
    transform 0.5s $ease;

  &.is-visible {
    opacity: 1;
    pointer-events: auto;
    transform: none;
  }

  i {
    font-size: 1.7rem;
  }

  &__label {
    display: none;
    font-size: 0.8rem;
    font-weight: 800;
    letter-spacing: 0.06em;
    text-transform: uppercase;

    @include from('md') {
      display: inline;
    }
  }

  // Onda que invita a tocar, sin tapar el contenido
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    border: 2px solid $success;
    animation: wa-pulse 2.4s ease-out infinite;
  }

  @include from('md') {
    right: 1.5rem;
    bottom: 1.5rem;
  }
}

@keyframes wa-pulse {
  from {
    opacity: 0.7;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(1.35);
  }
}
</style>
