<script setup lang="ts">
import { computed, ref } from 'vue'
import { about, units, whatsappLink } from '@/config/site'
import { useReveal } from '@/composables/useMotion'

const root = ref<HTMLElement | null>(null)
const activeId = ref(units[0]!.id)
const active = computed(() => units.find((u) => u.id === activeId.value) ?? units[0]!)

useReveal(root)

// Flechas izquierda/derecha entre pestañas, como pide el patrón ARIA de tabs.
function onKey(event: KeyboardEvent, index: number) {
  const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0
  if (!step) return
  const next = units[(index + step + units.length) % units.length]!
  activeId.value = next.id
  document.getElementById(`tab-${next.id}`)?.focus()
}
</script>

<template>
  <section id="lineas" ref="root" class="units">
    <div class="units__inner">
      <header class="units__head" data-reveal>
        <p class="units__eyebrow">{{ about.eyebrow }}</p>
        <h2 class="units__title">{{ about.title }}</h2>
        <p class="units__text">{{ about.text }}</p>
      </header>

      <div
        class="units__tabs"
        role="tablist"
        aria-label="Unidades de negocio"
        data-reveal="stagger"
      >
        <button
          v-for="(unit, i) in units"
          :id="`tab-${unit.id}`"
          :key="unit.id"
          role="tab"
          class="units__tab"
          :class="{ 'is-active': activeId === unit.id }"
          :aria-selected="activeId === unit.id"
          :aria-controls="`panel-${unit.id}`"
          :tabindex="activeId === unit.id ? 0 : -1"
          @click="activeId = unit.id"
          @keydown="onKey($event, i)"
        >
          <span class="units__tab-num">0{{ i + 1 }}</span>
          <img :src="unit.logo" :alt="unit.name" class="units__tab-logo" loading="lazy" />
          <span class="units__tab-tag">{{ unit.tag }}</span>
        </button>
      </div>

      <Transition name="swap" mode="out-in">
        <article
          :id="`panel-${active.id}`"
          :key="active.id"
          class="units__panel"
          role="tabpanel"
          :aria-labelledby="`tab-${active.id}`"
        >
          <div class="units__media">
            <img :src="active.image" :alt="`Trabajo de ${active.name}`" loading="lazy" />
          </div>
          <div class="units__body">
            <h3 class="units__name">{{ active.name }}</h3>
            <p class="units__desc">{{ active.text }}</p>
            <ul class="units__points">
              <li v-for="point in active.points" :key="point">
                <i class="fa-solid fa-check"></i> {{ point }}
              </li>
            </ul>
            <a
              :href="whatsappLink(`Hola, vengo de la web. ${active.cta}.`)"
              class="btn btn--primary"
              target="_blank"
              rel="noopener"
            >
              <i class="fa-brands fa-whatsapp"></i> {{ active.cta }}
            </a>
          </div>
        </article>
      </Transition>
    </div>
  </section>
</template>

<style scoped lang="scss">
.units {
  @include section;
  background: $coal-2;
  padding-top: calc($space-section + 2rem);

  &__inner {
    @include container(1240px);
    @include flex(column, stretch, flex-start, 2.2rem);
  }

  &__head {
    @include flex(column, flex-start, flex-start, 1rem);
    max-width: 760px;
  }

  &__eyebrow {
    @include eyebrow;
  }

  &__title {
    @include display($display-lg, 900);
  }

  &__text {
    color: $bone-soft;
    font-size: $text-lg;
  }

  &__tabs {
    @include flex(column, stretch, flex-start, 0.75rem);

    @include from('md') {
      flex-direction: row;
    }
  }

  &__tab {
    position: relative;
    // Base 0 solo en fila: en columna, con overflow hidden, colapsaría la altura.
    @include from('md') {
      flex: 1 1 0;
    }

    @include flex(column, flex-start, flex-start, 0.9rem);
    padding: 1.3rem 1.4rem;
    text-align: left;
    border-radius: $radius-md;
    border: 1px solid $coal-line;
    background: $coal-3;
    overflow: hidden;
    transition:
      border-color 0.3s ease,
      background-color 0.3s ease,
      transform 0.4s $ease;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      height: 3px;
      width: 100%;
      background: $accent;
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.6s $ease;
    }

    &:hover {
      border-color: rgba($accent, 0.5);
      transform: translateY(-3px);
    }

    &.is-active {
      background: rgba($accent, 0.1);
      border-color: $accent;

      &::after {
        transform: scaleX(1);
      }
    }
  }

  &__tab-num {
    font-size: $text-xs;
    font-weight: 800;
    color: $accent;
    letter-spacing: 0.14em;
  }

  &__tab-logo {
    height: 44px;
    width: auto;
    max-width: 100%;
    object-fit: contain;
  }

  // Isotipo casi cuadrado: más alto para que se lea igual que los otros
  &__tab:nth-child(2) &__tab-logo {
    height: 64px;
  }

  &__tab-tag {
    font-size: $text-sm;
    color: $bone-soft;
  }

  &__panel {
    @include flex(column, stretch, flex-start, 0);
    border-radius: $radius-lg;
    overflow: hidden;
    background: $coal;
    border: 1px solid $coal-line;

    @include from('md') {
      flex-direction: row;
    }
  }

  &__media {
    flex: 1 1 45%;
    min-height: 280px;

    img {
      width: 100%;
      height: 100%;
      max-height: 560px;
      object-fit: cover;
    }
  }

  &__body {
    flex: 1 1 55%;
    @include flex(column, flex-start, center, 1.2rem);
    padding: clamp(1.5rem, 4vw, 3rem);
  }

  &__name {
    @include display($display-md, 900);
  }

  &__desc {
    color: $bone-soft;
  }

  &__points {
    list-style: none;
    @include flex-cards(220px, 0.6rem 1.2rem);
    width: 100%;

    li {
      font-size: $text-sm;
      font-weight: 500;
    }

    i {
      color: $accent;
      margin-right: 0.4rem;
    }
  }
}

.swap-enter-active,
.swap-leave-active {
  transition:
    opacity 0.35s ease,
    transform 0.45s $ease;
}

.swap-enter-from {
  opacity: 0;
  transform: translateY(18px);
}

.swap-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>
