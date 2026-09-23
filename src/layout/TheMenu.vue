<script setup lang="ts">
import { computed, ref } from 'vue'
import { nav, units, site, whatsappLink } from '@/config/site'
import { useMenu } from '@/composables/useMenu'
import { useMenuAnimation } from '@/composables/useMenuAnimation'
import { useActiveSection } from '@/composables/useActiveSection'
import { useBodyScroll } from '@/composables/useBodyScroll'
import MenuPreview from '@/layout/MenuPreview.vue'

const { isOpen, goTo } = useMenu()
const { activeId } = useActiveSection()
const root = ref<HTMLElement | null>(null)
// La vista previa sigue al enlace con hover/foco; si no hay, la sección actual.
const hovered = ref<string | null>(null)

useBodyScroll(isOpen)
useMenuAnimation(root, isOpen)

const preview = computed(() => hovered.value ?? activeId.value)
const pad = (n: number) => String(n + 1).padStart(2, '0')
</script>

<template>
  <div
    id="menu"
    ref="root"
    class="menu"
    role="dialog"
    aria-modal="true"
    aria-label="Menú principal"
  >
    <div class="menu__layer menu__layer--accent"></div>
    <div class="menu__layer menu__layer--mid"></div>
    <div class="menu__layer menu__layer--base"></div>

    <div class="menu__body">
      <nav class="menu__nav" aria-label="Secciones">
        <ol class="menu__list" @mouseleave="hovered = null">
          <li v-for="(item, i) in nav" :key="item.id" class="menu__item">
            <a
              :href="`#${item.id}`"
              class="menu__link"
              :class="{ 'menu__link--active': activeId === item.id }"
              :aria-current="activeId === item.id ? 'true' : undefined"
              @mouseenter="hovered = item.id"
              @focus="hovered = item.id"
              @click.prevent="goTo(item.id)"
            >
              <span class="menu__link-inner">
                <span class="menu__num">{{ pad(i) }}</span>
                <span class="menu__label">{{ item.label }}</span>
                <i class="menu__arrow fa-solid fa-arrow-right-long" aria-hidden="true"></i>
              </span>
            </a>
          </li>
        </ol>
      </nav>

      <MenuPreview :active-id="preview" />

      <footer class="menu__foot">
        <a
          :href="whatsappLink()"
          class="btn btn--whatsapp"
          target="_blank"
          rel="noopener"
          data-menu-fade
        >
          <i class="fa-brands fa-whatsapp"></i> Cotizar por WhatsApp
        </a>
        <p class="menu__place" data-menu-fade>
          <i class="fa-solid fa-location-dot"></i> {{ site.city }}, {{ site.country }} · Cobertura
          nacional
        </p>
        <ul class="menu__units" data-menu-fade>
          <li v-for="unit in units" :key="unit.id">
            <img :src="unit.logo" :alt="unit.name" loading="lazy" />
          </li>
        </ul>
      </footer>
    </div>
  </div>
</template>

<style scoped lang="scss">
.menu {
  position: fixed;
  inset: 0;
  z-index: 110;
  visibility: hidden;

  &__layer {
    position: absolute;
    inset: 0;

    &--accent {
      background: $accent;
    }

    &--mid {
      background: $coal-3;
    }

    &--base {
      background: $coal;
      @include halftone(rgba(#fff, 0.045), 16px);

      &::after {
        @include diagonal-band(rgba($accent, 0.1), -12deg);
        bottom: -6%;
        height: 16%;
      }
    }
  }

  &__body {
    @include container(1320px);
    position: relative;
    height: 100%;
    overflow-y: auto;
    @include flex(column, stretch, space-between, 1.5rem);
    padding-top: calc(var(--header-h) + 1rem);
    padding-bottom: 1.5rem;

    @include from('lg') {
      flex-flow: row wrap;
      align-content: space-between;
      column-gap: 4rem;
      padding-top: calc(var(--header-h) + 2.5rem);
    }
  }

  &__nav {
    @include from('lg') {
      flex: 1 1 55%;
    }
  }

  &__list {
    list-style: none;
    counter-reset: menu;
  }

  &__item {
    border-bottom: 1px solid $coal-line;
  }

  &__link {
    display: block;
    overflow: hidden;
    padding-block: clamp(0.3rem, 1.1vh, 0.7rem);
    outline-offset: -2px;
  }

  &__link-inner {
    @include flex(row, baseline, flex-start, 1rem);
    will-change: transform;
  }

  &__num {
    min-width: 2ch;
    font-size: $text-xs;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: $bone-muted;
    transition: color 0.3s ease;
  }

  &__label {
    @include display(clamp(1.55rem, 0.9rem + 2.4vw, 3rem));
    // Que los 7 enlaces quepan también en pantallas bajas
    font-size: min(clamp(1.55rem, 0.9rem + 2.4vw, 3rem), 5.6vh);
    line-height: 1.1;
    color: $bone;
    transition:
      transform 0.5s $ease,
      color 0.3s ease;
  }

  &__arrow {
    margin-left: auto;
    align-self: center;
    font-size: 1.3rem;
    color: $accent;
    opacity: 0;
    transform: translateX(-16px);
    transition:
      opacity 0.35s ease,
      transform 0.5s $ease;
  }

  &__link:hover,
  &__link:focus-visible {
    .menu__label {
      transform: translateX(0.6rem);
      color: $accent;
    }

    .menu__num {
      color: $accent;
    }

    .menu__arrow {
      opacity: 1;
      transform: translateX(0);
    }
  }

  &__link--active .menu__num {
    color: $accent;
  }

  &__link--active .menu__label::after {
    content: '';
    display: inline-block;
    width: 0.22em;
    height: 0.22em;
    margin-left: 0.3em;
    border-radius: 50%;
    background: $accent;
    vertical-align: middle;
  }

  &__foot {
    @include flex(column, flex-start, flex-start, 1rem);
    padding-top: 1rem;

    @include from('md') {
      flex-direction: row;
      align-items: center;
      flex-wrap: wrap;
      column-gap: 2rem;
    }

    @include from('lg') {
      flex: 1 1 100%;
      border-top: 1px solid $coal-line;
      padding-top: 1.4rem;
    }
  }

  &__place {
    font-size: $text-sm;
    color: $bone-soft;

    i {
      color: $accent;
      margin-right: 0.35rem;
    }
  }

  &__units {
    list-style: none;
    @include flex(row, center, flex-start, 1.4rem);

    @include from('md') {
      margin-left: auto;
    }

    img {
      height: 26px;
      width: auto;
      opacity: 0.8;
    }

    // El isotipo de Polarizados es casi cuadrado: necesita más alto para leerse
    li:nth-child(2) img {
      height: 44px;
    }
  }
}
</style>
