<script setup lang="ts">
import { computed, ref } from 'vue'
import { clients } from '@/config/site'
import { useReveal } from '@/composables/useMotion'

const root = ref<HTMLElement | null>(null)
useReveal(root)

// Dos filas que corren en sentidos opuestos.
const half = Math.ceil(clients.length / 2)
const rows = computed(() => [clients.slice(0, half), clients.slice(half)])
</script>

<template>
  <section id="clientes" ref="root" class="clients">
    <div class="clients__inner">
      <header class="clients__head" data-reveal>
        <p class="clients__eyebrow">Clientes</p>
        <h2 class="clients__title">Marcas que ya confían en nosotros</h2>
      </header>
    </div>

    <div class="clients__rows" data-reveal>
      <div
        v-for="(row, r) in rows"
        :key="r"
        class="clients__row"
        :class="{ 'clients__row--reverse': r === 1 }"
      >
        <ul v-for="copy in 2" :key="copy" class="clients__list" :aria-hidden="copy === 2">
          <li v-for="client in row" :key="client.logo" class="clients__logo">
            <img
              :src="`/img/clientes/${client.logo}.webp`"
              :alt="copy === 1 ? client.name : ''"
              loading="lazy"
              height="80"
            />
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.clients {
  @include section;
  background: $paper;
  color: $ink;
  overflow: hidden;

  &__inner {
    @include container(1240px);
  }

  &__head {
    @include flex(column, center, center, 1rem);
    text-align: center;
    margin-bottom: 3rem;
  }

  &__eyebrow {
    @include eyebrow;
    color: $accent-deep;
  }

  &__title {
    @include display($display-md, 900);
    max-width: 18ch;
  }

  &__rows {
    @include flex(column, stretch, flex-start, 1.25rem);
    // Desvanece los bordes para que los logos entren y salgan suave
    mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
  }

  &__row {
    display: flex;
    width: max-content;
    animation: clients-marquee 40s linear infinite;

    &--reverse {
      animation-direction: reverse;
      animation-duration: 46s;
    }

    &:hover {
      animation-play-state: paused;
    }
  }

  &__list {
    list-style: none;
    display: flex;
    flex-shrink: 0;
  }

  &__logo {
    @include flex(row, center, center);
    width: clamp(150px, 20vw, 230px);
    height: clamp(88px, 10vw, 120px);
    margin-right: 1.25rem;
    padding: 1rem 1.5rem;
    background: $surface;
    border: 1px solid $line;
    border-radius: $radius-md;
    transition:
      transform 0.4s $ease,
      box-shadow 0.4s $ease;

    img {
      max-width: 100%;
      max-height: 100%;
      width: auto;
      height: auto;
      object-fit: contain;
    }

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 14px 30px rgba($ink, 0.1);
    }
  }
}

@keyframes clients-marquee {
  to {
    transform: translateX(-50%);
  }
}
</style>
