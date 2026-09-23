<script setup lang="ts">
import { ref } from 'vue'
import { services, whatsappLink } from '@/config/site'
import { useReveal } from '@/composables/useMotion'
import HoverPreview from '@/components/ui/HoverPreview.vue'

const root = ref<HTMLElement | null>(null)
const openId = ref<string | null>(services[0]!.id)
const hoverId = ref<string | null>(null)

useReveal(root)

const toggle = (id: string) => (openId.value = openId.value === id ? null : id)
</script>

<template>
  <section id="servicios" ref="root" class="services">
    <div class="services__inner">
      <header class="services__head" data-reveal>
        <p class="services__eyebrow">Servicios</p>
        <h2 class="services__title">Lo que hacemos</h2>
        <p class="services__text">
          Desde un sticker de alto relieve hasta la flota completa de tu empresa. Toca un servicio
          para ver el detalle.
        </p>
      </header>

      <ol class="services__list" data-reveal="stagger" @mouseleave="hoverId = null">
        <li
          v-for="(service, i) in services"
          :key="service.id"
          class="services__item"
          :class="{ 'is-open': openId === service.id }"
          @mouseenter="hoverId = service.id"
        >
          <h3>
            <button
              class="services__row"
              :aria-expanded="openId === service.id"
              :aria-controls="`srv-${service.id}`"
              @click="toggle(service.id)"
            >
              <span class="services__num">{{ String(i + 1).padStart(2, '0') }}</span>
              <span class="services__name">{{ service.title }}</span>
              <span class="services__unit">{{ service.unit }}</span>
              <span class="services__icon" aria-hidden="true"></span>
            </button>
          </h3>
          <div :id="`srv-${service.id}`" class="services__panel">
            <div class="services__panel-inner">
              <img
                :src="service.image"
                :alt="service.title"
                loading="lazy"
                class="services__thumb"
              />
              <div class="services__detail">
                <p>{{ service.text }}</p>
                <ul class="services__tags">
                  <li v-for="item in service.items" :key="item">{{ item }}</li>
                </ul>
                <a
                  :href="whatsappLink(`Hola, quiero cotizar: ${service.title}.`)"
                  class="services__cta"
                  target="_blank"
                  rel="noopener"
                >
                  Cotizar este servicio <i class="fa-solid fa-arrow-right-long"></i>
                </a>
              </div>
            </div>
          </div>
        </li>
      </ol>
    </div>

    <HoverPreview :items="services" :active-id="hoverId" />
  </section>
</template>

<style scoped lang="scss">
.services {
  @include section;
  background: $coal;

  &__inner {
    @include container(1240px);
    @include flex(column, stretch, flex-start, 2.5rem);
  }

  &__head {
    @include flex(column, flex-start, flex-start, 1rem);
    max-width: 720px;
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

  &__list {
    list-style: none;
    border-top: 1px solid $coal-line;
  }

  &__item {
    border-bottom: 1px solid $coal-line;
  }

  &__row {
    width: 100%;
    @include flex(row, center, flex-start, 1rem);
    padding-block: 1.4rem;
    text-align: left;
    flex-wrap: wrap;

    @include from('md') {
      flex-wrap: nowrap;
      gap: 2rem;
      padding-block: 1.8rem;
    }

    &:hover .services__name {
      color: $accent;
      transform: translateX(0.4rem);
    }
  }

  &__num {
    font-size: $text-xs;
    font-weight: 800;
    color: $accent;
    letter-spacing: 0.12em;
  }

  &__name {
    flex: 1 1 60%;
    font-family: $font-display;
    font-size: $text-xl;
    font-weight: 800;
    font-stretch: 112%;
    line-height: 1.2;
    transition:
      color 0.3s ease,
      transform 0.5s $ease;
  }

  &__unit {
    order: 5;
    flex-basis: 100%;
    padding-left: 2.2rem;
    font-size: $text-xs;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: $bone-muted;

    @include from('md') {
      order: 0;
      flex: 0 0 auto;
      padding-left: 0;
    }
  }

  &__icon {
    position: relative;
    flex: 0 0 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid $coal-line;
    transition:
      background-color 0.3s ease,
      transform 0.5s $ease;

    &::before,
    &::after {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      width: 14px;
      height: 2px;
      margin: -1px 0 0 -7px;
      background: $bone;
    }

    &::after {
      transform: rotate(90deg);
      transition: transform 0.5s $ease;
    }
  }

  &__item.is-open &__icon {
    background: $accent;
    border-color: $accent;

    &::before,
    &::after {
      background: $coal;
    }

    &::after {
      transform: rotate(0deg);
    }
  }

  // Sin grid: el acordeón anima max-height.
  &__panel {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.6s $ease;
  }

  &__item.is-open &__panel {
    max-height: 640px;
  }

  &__panel-inner {
    @include flex(column, flex-start, flex-start, 1.2rem);
    padding: 0 0 1.8rem;

    @include from('md') {
      flex-direction: row;
      padding-left: 3.4rem;
    }
  }

  &__thumb {
    width: 100%;
    max-width: 280px;
    aspect-ratio: 4 / 3;
    object-fit: cover;
    border-radius: $radius-md;

    @include from('lg') {
      display: none;
    }
  }

  &__detail {
    @include flex(column, flex-start, flex-start, 1rem);
    max-width: 620px;
    color: $bone-soft;
  }

  &__tags {
    list-style: none;
    @include flex(row, center, flex-start, 0.5rem);
    flex-wrap: wrap;

    li {
      padding: 0.35rem 0.85rem;
      border-radius: $radius-pill;
      border: 1px solid $coal-line;
      font-size: $text-xs;
      font-weight: 600;
      color: $bone;
    }
  }

  &__cta {
    font-size: $text-sm;
    font-weight: 700;
    color: $accent;
    letter-spacing: 0.04em;

    i {
      margin-left: 0.4rem;
      transition: transform 0.4s $ease;
    }

    &:hover i {
      transform: translateX(6px);
    }
  }
}
</style>
