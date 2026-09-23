<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { hero } from '@/config/site'

const current = ref(0)
let timer: number | undefined

function restart() {
  window.clearInterval(timer)
  timer = window.setInterval(() => (current.value = (current.value + 1) % hero.slides.length), 4800)
}

// Al elegir una foto a mano se reinicia el contador para que no salte enseguida.
function pick(i: number) {
  current.value = i
  restart()
}

onMounted(restart)
onBeforeUnmount(() => window.clearInterval(timer))
</script>

<template>
  <div class="hero-media__frame">
    <img
      v-for="(slide, i) in hero.slides"
      :key="slide.src"
      :src="slide.src"
      :alt="slide.alt"
      class="hero-media__img"
      :class="{ 'is-active': current === i }"
      :loading="i === 0 ? 'eager' : 'lazy'"
      :fetchpriority="i === 0 ? 'high' : 'auto'"
      width="1200"
      height="1600"
    />
    <div class="hero-media__dots" role="tablist" aria-label="Fotos destacadas">
      <button
        v-for="(slide, i) in hero.slides"
        :key="slide.src"
        role="tab"
        :aria-selected="current === i"
        :aria-label="`Foto ${i + 1} de ${hero.slides.length}`"
        :class="{ 'is-active': current === i }"
        @click="pick(i)"
      ></button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.hero-media {
  &__frame {
    position: relative;
    aspect-ratio: 4 / 5;
    max-height: 72svh;
    margin-inline: auto;
    clip-path: polygon(12% 0, 100% 0, 88% 100%, 0 100%);
    background: $coal-2;
  }

  &__img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transform: scale(1.1);
    transition:
      opacity 1.1s ease,
      transform 6s linear;

    &.is-active {
      opacity: 1;
      transform: scale(1);
    }
  }

  &__dots {
    position: absolute;
    right: 16%;
    bottom: 1.2rem;
    @include flex(row, center, flex-end, 0.2rem);

    button {
      width: 28px;
      height: 28px;
      @include flex(row, center, center);

      &::before {
        content: '';
        width: 8px;
        height: 8px;
        border-radius: $radius-pill;
        background: rgba($bone, 0.55);
        transition:
          width 0.4s $ease,
          background-color 0.3s ease;
      }

      &.is-active::before {
        width: 22px;
        background: $accent;
      }
    }
  }
}
</style>
