<script setup lang="ts">
import { ref } from 'vue'
import { testimonials } from '@/config/site'
import { useReveal } from '@/composables/useMotion'

const root = ref<HTMLElement | null>(null)
useReveal(root)
</script>

<template>
  <!-- Solo se pinta cuando hay testimonios reales en site.ts -->
  <section v-if="testimonials.length" id="testimonios" ref="root" class="testimonials">
    <div class="testimonials__inner">
      <header class="testimonials__head" data-reveal>
        <p class="testimonials__eyebrow">Testimonios</p>
        <h2 class="testimonials__title">Lo que dicen nuestros clientes</h2>
      </header>
      <ul class="testimonials__list" data-reveal="stagger">
        <li v-for="item in testimonials" :key="item.author" class="testimonials__card">
          <i class="fa-solid fa-quote-left" aria-hidden="true"></i>
          <blockquote>{{ item.quote }}</blockquote>
          <p>
            <strong>{{ item.author }}</strong>
            <span>{{ item.company }}</span>
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped lang="scss">
.testimonials {
  @include section;
  background: $coal;

  &__inner {
    @include container(1240px);
    @include flex(column, stretch, flex-start, 2.5rem);
  }

  &__head {
    @include flex(column, flex-start, flex-start, 1rem);
  }

  &__eyebrow {
    @include eyebrow;
  }

  &__title {
    @include display($display-md, 900);
  }

  &__list {
    list-style: none;
    @include flex-cards(300px, 1rem);
  }

  &__card {
    @include flex(column, flex-start, flex-start, 1rem);
    padding: 1.8rem;
    border-radius: $radius-md;
    background: $coal-2;
    border: 1px solid $coal-line;

    i {
      font-size: 1.6rem;
      color: $accent;
    }

    blockquote {
      font-size: $text-lg;
    }

    p {
      @include flex(column, flex-start, flex-start);
      margin-top: auto;
    }

    span {
      font-size: $text-sm;
      color: $bone-muted;
    }
  }
}
</style>
