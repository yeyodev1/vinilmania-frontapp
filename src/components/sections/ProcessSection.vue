<script setup lang="ts">
import { ref } from 'vue'
import { steps, machines } from '@/config/site'
import { useReveal } from '@/composables/useMotion'

const root = ref<HTMLElement | null>(null)
useReveal(root)
</script>

<template>
  <section id="proceso" ref="root" class="process">
    <div class="process__inner">
      <header class="process__head" data-reveal>
        <p class="process__eyebrow">Cómo trabajamos</p>
        <h2 class="process__title">De tu idea a la instalación</h2>
      </header>

      <ol class="process__steps" data-reveal="stagger">
        <li v-for="(step, i) in steps" :key="step.title" class="process__step">
          <span class="process__index">0{{ i + 1 }}</span>
          <span class="process__icon"><i :class="step.icon"></i></span>
          <h3>{{ step.title }}</h3>
          <p>{{ step.text }}</p>
        </li>
      </ol>

      <div class="process__tech" data-reveal>
        <div class="process__tech-copy">
          <p class="process__eyebrow">Nuestros equipos</p>
          <h3 class="process__tech-title">Tecnología propia en el taller</h3>
          <p>Imprimimos en casa: controlamos el color, los tiempos y el acabado de cada pieza.</p>
        </div>
        <ul class="process__machines">
          <li v-for="machine in machines" :key="machine.name" class="process__machine">
            <span class="process__kind">{{ machine.kind }}</span>
            <strong>{{ machine.name }}</strong>
            <ul>
              <li v-for="point in machine.points" :key="point">{{ point }}</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.process {
  @include section;
  background: $coal;
  overflow: hidden;

  &::before {
    @include diagonal-band(rgba($accent, 0.07), -6deg);
    top: 38%;
  }

  &__inner {
    @include container(1240px);
    position: relative;
    @include flex(column, stretch, flex-start, 3rem);
  }

  &__head {
    @include flex(column, flex-start, flex-start, 1rem);
  }

  &__eyebrow {
    @include eyebrow;
  }

  &__title {
    @include display($display-lg, 900);
    max-width: 16ch;
  }

  &__steps {
    list-style: none;
    @include flex-cards(230px, 1rem);
  }

  &__step {
    position: relative;
    @include flex(column, flex-start, flex-start, 0.8rem);
    padding: 1.8rem 1.5rem;
    border-radius: $radius-md;
    background: $coal-2;
    border: 1px solid $coal-line;
    overflow: hidden;
    transition:
      border-color 0.35s ease,
      transform 0.45s $ease;

    &:hover {
      border-color: $accent;
      transform: translateY(-4px);
    }

    h3 {
      font-size: $text-xl;
      font-stretch: 115%;
      text-transform: uppercase;
    }

    p {
      font-size: $text-sm;
      color: $bone-soft;
    }
  }

  &__index {
    position: absolute;
    top: 0.4rem;
    right: 1rem;
    @include display(4.5rem, 900);
    color: rgba($bone, 0.05);
  }

  &__icon {
    @include flex(row, center, center);
    width: 52px;
    height: 52px;
    border-radius: 14px;
    background: $accent;
    color: $coal;
    font-size: 1.3rem;
  }

  &__tech {
    @include flex(column, stretch, flex-start, 2rem);
    padding: clamp(1.5rem, 4vw, 3rem);
    border-radius: $radius-lg;
    background: linear-gradient(135deg, $coal-3, $coal-2);
    border: 1px solid $coal-line;

    @include from('lg') {
      flex-direction: row;
      align-items: center;
    }
  }

  &__tech-copy {
    flex: 1 1 40%;
    @include flex(column, flex-start, flex-start, 0.9rem);

    p:last-child {
      color: $bone-soft;
    }
  }

  &__tech-title {
    @include display($display-sm, 900);
  }

  &__machines {
    flex: 1 1 60%;
    list-style: none;
    @include flex-cards(240px, 1rem);
  }

  &__machine {
    @include flex(column, flex-start, flex-start, 0.4rem);
    padding: 1.4rem;
    border-radius: $radius-md;
    background: rgba($coal, 0.6);
    border-left: 3px solid $accent;

    strong {
      font-size: $text-lg;
    }

    ul {
      list-style: none;
      margin-top: 0.4rem;
    }

    li {
      font-size: $text-sm;
      color: $bone-soft;

      &::before {
        content: '— ';
        color: $accent;
      }
    }
  }

  &__kind {
    font-size: $text-xs;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: $accent;
  }
}
</style>
