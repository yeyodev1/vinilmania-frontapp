<script setup lang="ts">
import { ref } from 'vue'
import { faqs } from '@/config/site'
import { useReveal } from '@/composables/useMotion'

const root = ref<HTMLElement | null>(null)
useReveal(root)
</script>

<template>
  <section id="preguntas" ref="root" class="faq">
    <div class="faq__inner">
      <header class="faq__head" data-reveal>
        <p class="faq__eyebrow">Preguntas frecuentes</p>
        <h2 class="faq__title">Lo que más nos preguntan</h2>
      </header>

      <div class="faq__list" data-reveal="stagger">
        <details v-for="(faq, i) in faqs" :key="faq.q" class="faq__item" :open="i === 0">
          <summary>
            <span>{{ faq.q }}</span>
            <i class="fa-solid fa-plus" aria-hidden="true"></i>
          </summary>
          <p>{{ faq.a }}</p>
        </details>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.faq {
  @include section;
  background: $coal-2;

  &__inner {
    @include container(1240px);
    @include flex(column, stretch, flex-start, 2.5rem);

    @include from('lg') {
      flex-direction: row;
      gap: 4rem;
    }
  }

  &__head {
    flex: 1 1 35%;
    @include flex(column, flex-start, flex-start, 1rem);

    @include from('lg') {
      position: sticky;
      top: calc(var(--header-h) + 2rem);
      align-self: flex-start;
    }
  }

  &__eyebrow {
    @include eyebrow;
  }

  &__title {
    @include display($display-md, 900);
  }

  &__list {
    flex: 1 1 65%;
    border-top: 1px solid $coal-line;
  }

  &__item {
    border-bottom: 1px solid $coal-line;

    summary {
      @include flex(row, center, space-between, 1rem);
      padding-block: 1.3rem;
      cursor: pointer;
      list-style: none;
      font-size: $text-lg;
      font-weight: 600;
      transition: color 0.3s ease;

      &::-webkit-details-marker {
        display: none;
      }

      &:hover {
        color: $accent;
      }
    }

    i {
      flex-shrink: 0;
      color: $accent;
      transition: transform 0.4s $ease;
    }

    &[open] i {
      transform: rotate(45deg);
    }

    p {
      padding-bottom: 1.4rem;
      max-width: 62ch;
      color: $bone-soft;
    }
  }
}
</style>
