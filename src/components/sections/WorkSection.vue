<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { works, workCategories, workImage } from '@/config/gallery'
import type { WorkCategory } from '@/types'
import { useMasonry } from '@/composables/useMasonry'
import { useLightbox } from '@/composables/useLightbox'
import { ScrollTrigger, useReveal } from '@/composables/useMotion'

const PAGE = 12
const root = ref<HTMLElement | null>(null)
const filter = ref<WorkCategory | 'todos'>('todos')
const limit = ref(PAGE)

// En "Todos" se intercalan las categorías para que la primera página muestre de todo.
const mixed = (() => {
  const groups = workCategories.slice(1).map((c) => works.filter((w) => w.category === c.id))
  const longest = Math.max(...groups.map((g) => g.length))
  return Array.from({ length: longest }, (_, i) => groups.map((g) => g[i]))
    .flat()
    .filter((w) => !!w)
})()

const filtered = computed(() =>
  filter.value === 'todos' ? mixed : works.filter((w) => w.category === filter.value),
)
const visible = computed(() => filtered.value.slice(0, limit.value))
const countOf = (id: string) =>
  id === 'todos' ? works.length : works.filter((w) => w.category === id).length

const { columns } = useMasonry(visible)
const { show } = useLightbox()

useReveal(root)

watch(filter, () => (limit.value = PAGE))
// La altura de la sección cambia: los triggers de abajo deben recalcularse.
watch(visible, () => nextTick(() => ScrollTrigger.refresh()))
</script>

<template>
  <section id="trabajos" ref="root" class="work">
    <div class="work__inner">
      <header class="work__head" data-reveal>
        <div>
          <p class="work__eyebrow">Portafolio</p>
          <h2 class="work__title">Trabajos reales</h2>
        </div>
        <p class="work__text">
          Flotas, casas, oficinas, locales y marcas que ya llevan nuestro trabajo. Toca una foto
          para verla en grande.
        </p>
      </header>

      <div class="work__filters" role="group" aria-label="Filtrar trabajos" data-reveal>
        <button
          v-for="cat in workCategories"
          :key="cat.id"
          class="work__chip"
          :class="{ 'is-active': filter === cat.id }"
          :aria-pressed="filter === cat.id"
          @click="filter = cat.id"
        >
          {{ cat.label }} <sup>{{ countOf(cat.id) }}</sup>
        </button>
      </div>

      <div class="work__masonry">
        <div v-for="(col, c) in columns" :key="c" class="work__col">
          <TransitionGroup name="tile">
            <button
              v-for="{ work, index } in col"
              :key="work.slug"
              class="work__tile"
              :style="{ aspectRatio: String(work.ratio) }"
              :aria-label="`Ver en grande: ${work.title}`"
              @click="show(visible, index)"
            >
              <img :src="workImage(work.slug)" :alt="work.title" loading="lazy" decoding="async" />
              <span class="work__caption">
                <span>{{ work.title }}</span>
                <i class="fa-solid fa-up-right-and-down-left-from-center"></i>
              </span>
            </button>
          </TransitionGroup>
        </div>
      </div>

      <div v-if="filtered.length > limit" class="work__more">
        <button class="btn btn--ghost" @click="limit += PAGE">
          Ver más trabajos <span>({{ filtered.length - limit }})</span>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.work {
  @include section;
  background: $coal-2;

  &__inner {
    @include container(1320px);
    @include flex(column, stretch, flex-start, 2rem);
  }

  &__head {
    @include flex(column, flex-start, flex-start, 1rem);

    @include from('md') {
      flex-direction: row;
      align-items: flex-end;
      justify-content: space-between;
      gap: 3rem;
    }
  }

  &__eyebrow {
    @include eyebrow;
    margin-bottom: 1rem;
  }

  &__title {
    @include display($display-lg, 900);
  }

  &__text {
    max-width: 44ch;
    color: $bone-soft;
  }

  &__filters {
    @include flex(row, center, flex-start, 0.5rem);
    @include no-scrollbar;
    overflow-x: auto;
    margin-inline: -1.25rem;
    padding: 0.2rem 1.25rem;

    @include from('md') {
      flex-wrap: wrap;
      margin-inline: 0;
      padding-inline: 0;
    }
  }

  &__chip {
    flex-shrink: 0;
    min-height: 44px;
    padding: 0.6rem 1.1rem;
    border-radius: $radius-pill;
    border: 1px solid $coal-line;
    font-size: $text-sm;
    font-weight: 600;
    white-space: nowrap;
    transition:
      background-color 0.3s ease,
      border-color 0.3s ease,
      color 0.3s ease;

    sup {
      font-size: 0.65em;
      color: $accent;
      margin-left: 0.15rem;
    }

    &:hover {
      border-color: $accent;
    }

    &.is-active {
      background: $accent;
      border-color: $accent;
      color: $coal;

      sup {
        color: $coal;
      }
    }
  }

  &__masonry {
    @include flex(row, flex-start, flex-start, 0.75rem);

    @include from('md') {
      gap: 1rem;
    }
  }

  &__col {
    flex: 1 1 0;
    min-width: 0;
    @include flex(column, stretch, flex-start, 0.75rem);

    @include from('md') {
      gap: 1rem;
    }
  }

  &__tile {
    position: relative;
    display: block;
    width: 100%;
    border-radius: $radius-md;
    overflow: hidden;
    background: $coal-3;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.9s $ease;
    }

    &:hover img {
      transform: scale(1.06);
    }

    &:hover .work__caption,
    &:focus-visible .work__caption {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &__caption {
    position: absolute;
    inset: auto 0 0;
    @include flex(row, flex-end, space-between, 0.6rem);
    padding: 2.5rem 0.9rem 0.8rem;
    background: linear-gradient(transparent, rgba($coal, 0.92));
    font-size: $text-xs;
    font-weight: 600;
    text-align: left;
    opacity: 0;
    transform: translateY(10px);
    transition:
      opacity 0.35s ease,
      transform 0.45s $ease;

    i {
      color: $accent;
    }

    // En táctil no hay hover: el pie queda siempre visible.
    @media (hover: none) {
      opacity: 1;
      transform: none;
    }
  }

  &__more {
    @include flex(row, center, center);

    span {
      color: $accent;
    }
  }
}

.tile-enter-active {
  transition:
    opacity 0.5s ease,
    transform 0.6s $ease;
}

.tile-enter-from {
  opacity: 0;
  transform: translateY(24px) scale(0.97);
}
</style>
