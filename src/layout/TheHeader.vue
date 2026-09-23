<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { whatsappLink } from '@/config/site'
import { useMenu } from '@/composables/useMenu'

const { isOpen, toggle, close } = useMenu()
const scrolled = ref(false)
const hidden = ref(false)
let lastY = 0

// Sólido al salir del hero; se esconde al bajar y reaparece al subir.
function onScroll() {
  const y = window.scrollY
  scrolled.value = y > 40
  hidden.value = y > 480 && y > lastY && !isOpen.value
  lastY = y
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header
    class="header"
    :class="{
      'header--solid': scrolled && !isOpen,
      'header--hidden': hidden,
      'header--menu': isOpen,
    }"
  >
    <div class="header__inner">
      <a href="#inicio" class="header__logo" aria-label="Vinil Manía, ir al inicio" @click="close">
        <img src="/img/marcas/vinilmania-claro.webp" alt="Vinil Manía" width="190" height="28" />
      </a>

      <div class="header__actions">
        <a :href="whatsappLink()" class="header__quote" target="_blank" rel="noopener">
          <i class="fa-brands fa-whatsapp"></i>
          <span>Cotizar</span>
        </a>

        <button
          id="menu-toggle"
          class="header__toggle"
          :aria-expanded="isOpen"
          aria-controls="menu"
          :aria-label="isOpen ? 'Cerrar menú' : 'Abrir menú'"
          @click="toggle"
        >
          <span class="header__toggle-label">
            <span :class="{ 'is-out': isOpen }">Menú</span>
            <span :class="{ 'is-in': isOpen }">Cerrar</span>
          </span>
          <span class="header__burger" :class="{ 'header__burger--open': isOpen }">
            <span></span>
            <span></span>
          </span>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  position: fixed;
  inset: 0 0 auto;
  z-index: 120;
  height: var(--header-h);
  transition:
    transform 0.5s $ease,
    background-color 0.4s ease,
    border-color 0.4s ease;
  border-bottom: 1px solid transparent;

  &--solid {
    background: rgba($coal, 0.82);
    backdrop-filter: blur(14px) saturate(1.3);
    border-color: $coal-line;
  }

  &--hidden {
    transform: translateY(-100%);
  }

  &__inner {
    @include container(1320px);
    @include flex(row, center, space-between, 1rem);
    height: 100%;
  }

  &__logo img {
    width: auto;
    height: 22px;

    @include from('md') {
      height: 28px;
    }
  }

  &__actions {
    @include flex(row, center, flex-end, 0.6rem);
  }

  &__quote {
    @include flex(row, center, center, 0.5rem);
    height: 44px;
    padding-inline: 0.9rem;
    border-radius: $radius-pill;
    border: 1px solid $coal-line;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    transition:
      border-color 0.3s ease,
      color 0.3s ease,
      opacity 0.3s ease;

    i {
      font-size: 1.15rem;
      color: $success;
    }

    span {
      display: none;

      @include from('sm') {
        display: inline;
      }
    }

    &:hover {
      border-color: $success;
    }
  }

  &--menu &__quote {
    opacity: 0;
    pointer-events: none;
  }

  &__toggle {
    @include flex(row, center, center, 0.75rem);
    height: 44px;
    padding: 0 0.5rem 0 1.1rem;
    border-radius: $radius-pill;
    background: $accent;
    color: $coal;
    transition:
      background-color 0.3s ease,
      transform 0.3s $ease;

    &:hover {
      background: $accent-hot;
    }

    &:active {
      transform: scale(0.96);
    }
  }

  &__toggle-label {
    position: relative;
    display: block;
    min-width: 6.4em;
    white-space: nowrap;
    text-align: left;
    height: 1.2em;
    overflow: hidden;
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    line-height: 1.2;

    span {
      display: block;
      transition: transform 0.5s $ease;
    }

    span:last-child {
      position: absolute;
      top: 0;
      left: 0;
      transform: translateY(110%);
    }

    .is-out {
      transform: translateY(-110%);
    }

    span.is-in {
      transform: translateY(0);
    }
  }

  &__burger {
    position: relative;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: $coal;

    span {
      position: absolute;
      left: 9px;
      width: 14px;
      height: 2px;
      background: $bone;
      border-radius: 2px;
      transition:
        transform 0.5s $ease,
        top 0.5s $ease;
    }

    span:first-child {
      top: 12px;
    }

    span:last-child {
      top: 18px;
    }

    &--open span:first-child {
      top: 15px;
      transform: rotate(45deg);
    }

    &--open span:last-child {
      top: 15px;
      transform: rotate(-45deg);
    }
  }
}
</style>
