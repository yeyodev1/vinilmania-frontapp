<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { hero, whatsappLink } from '@/config/site'
import { gsap, reducedMotion } from '@/composables/useMotion'
import HeroMedia from '@/components/sections/HeroMedia.vue'

const root = ref<HTMLElement | null>(null)
let ctx: gsap.Context | undefined

onMounted(() => {
  if (!root.value || reducedMotion()) return

  ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' }, delay: 0.15 })
    tl.from('.hero__line-inner', { yPercent: 115, duration: 1.1, stagger: 0.1 })
      .from(
        '.hero-media__frame',
        {
          clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
          duration: 1.3,
          ease: 'power4.inOut',
        },
        0,
      )
      .from('[data-hero-fade]', { opacity: 0, y: 24, duration: 0.8, stagger: 0.08 }, '-=0.7')

    // Parallax suave: la foto sube más lento que el texto.
    gsap.to('.hero-media__frame', {
      yPercent: -12,
      ease: 'none',
      scrollTrigger: { trigger: root.value, start: 'top top', end: 'bottom top', scrub: true },
    })
  }, root.value)
})

onBeforeUnmount(() => {
  ctx?.revert()
})
</script>

<template>
  <section id="inicio" ref="root" class="hero">
    <div class="hero__band" aria-hidden="true"></div>

    <div class="hero__inner">
      <div class="hero__copy">
        <p class="hero__eyebrow" data-hero-fade>{{ hero.eyebrow }}</p>
        <h1 class="hero__title">
          <span v-for="line in hero.lines" :key="line" class="hero__line">
            <span class="hero__line-inner">{{ line }}</span>
          </span>
        </h1>
        <p class="hero__lead" data-hero-fade>{{ hero.lead }}</p>
        <div class="hero__actions" data-hero-fade>
          <a :href="whatsappLink()" class="btn btn--primary" target="_blank" rel="noopener">
            <i class="fa-brands fa-whatsapp"></i> {{ hero.primary }}
          </a>
          <a href="#trabajos" class="btn btn--ghost">{{ hero.secondary }}</a>
        </div>
        <ul class="hero__stats" data-hero-fade>
          <li v-for="stat in hero.stats" :key="stat.label">
            <strong>{{ stat.value }}</strong>
            <span>{{ stat.label }}</span>
          </li>
        </ul>
      </div>

      <div class="hero__media">
        <HeroMedia />
      </div>
    </div>

    <a href="#lineas" class="hero__scroll" aria-label="Bajar a nuestras líneas" data-hero-fade>
      <span></span>
    </a>
  </section>
</template>

<style scoped lang="scss">
.hero {
  position: relative;
  min-height: 100svh;
  overflow: hidden;
  @include halftone(rgba(#fff, 0.05), 18px);
  @include flex(column, stretch, center);
  padding-top: calc(var(--header-h) + 1.5rem);
  padding-bottom: 4.5rem;

  // La franja vive detrás de la foto (derecha/abajo), nunca detrás del texto.
  &__band {
    position: absolute;
    left: 30%;
    bottom: -2%;
    width: 110%;
    height: 30%;

    @include from('lg') {
      left: 52%;
      bottom: 8%;
      height: 42%;
    }

    background: linear-gradient(100deg, $accent-deep, $accent 45%, $accent-hot);
    transform: rotate(-9deg);
    opacity: 0.95;

    &::after {
      content: '';
      position: absolute;
      inset: auto 0 -26%;
      height: 26%;
      background: $coal-3;
    }
  }

  &__inner {
    @include container(1320px);
    position: relative;
    @include flex(column, stretch, center, 2.5rem);

    @include from('lg') {
      flex-direction: row;
      align-items: center;
      gap: 3rem;
    }
  }

  &__copy {
    flex: 1 1 58%;
    @include flex(column, flex-start, center, 1.3rem);
  }

  &__eyebrow {
    @include eyebrow;
  }

  &__title {
    @include display($display-xl, 900);
  }

  &__line {
    display: block;
    overflow: hidden;
    padding-bottom: 0.04em;

    &:nth-child(2) .hero__line-inner {
      color: $accent;
    }
  }

  &__line-inner {
    display: block;
  }

  &__lead {
    max-width: 50ch;
    font-size: $text-lg;
    color: $bone-soft;
  }

  &__actions {
    @include flex(row, center, flex-start, 0.75rem);
    flex-wrap: wrap;
  }

  &__stats {
    list-style: none;
    @include flex(row, flex-start, flex-start, 1.8rem);
    flex-wrap: wrap;
    margin-top: 0.6rem;

    li {
      @include flex(column, flex-start, flex-start);
      padding-left: 0.9rem;
      border-left: 2px solid $accent;
    }

    strong {
      @include display($display-sm, 900);
    }

    span {
      font-size: $text-xs;
      font-weight: 600;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: $bone-muted;
    }
  }

  &__media {
    flex: 1 1 42%;
    max-width: 520px;
    width: 100%;
    align-self: center;
  }

  &__scroll {
    position: absolute;
    left: 50%;
    bottom: 1.2rem;
    width: 26px;
    height: 42px;
    margin-left: -13px;
    border: 2px solid rgba($bone, 0.4);
    border-radius: $radius-pill;

    span {
      position: absolute;
      left: 50%;
      top: 8px;
      width: 4px;
      height: 8px;
      margin-left: -2px;
      border-radius: 2px;
      background: $accent;
      animation: scroll-cue 1.8s $ease infinite;
    }
  }
}

@keyframes scroll-cue {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  70% {
    transform: translateY(14px);
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
</style>
