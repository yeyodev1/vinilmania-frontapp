<script setup lang="ts">
import { nav } from '@/config/site'

defineProps<{ activeId: string }>()
</script>

<template>
  <!-- Decorativa: el texto ya está en los enlaces, por eso aria-hidden -->
  <aside class="menu-preview" aria-hidden="true">
    <div class="menu-preview__frame" data-menu-fade>
      <img
        v-for="item in nav"
        :key="item.id"
        :src="item.image"
        alt=""
        loading="lazy"
        class="menu-preview__img"
        :class="{ 'is-shown': activeId === item.id }"
      />
      <p class="menu-preview__caption">
        <span v-for="item in nav" :key="item.id" :class="{ 'is-shown': activeId === item.id }">
          {{ item.hint }}
        </span>
      </p>
    </div>
  </aside>
</template>

<style scoped lang="scss">
.menu-preview {
  display: none;

  @include from('lg') {
    display: block;
    flex: 1 1 30%;
    align-self: center;
  }

  &__frame {
    position: relative;
    aspect-ratio: 4 / 5;
    max-height: 58vh;
    margin-left: auto;
    clip-path: polygon(10% 0, 100% 0, 90% 100%, 0 100%);
    overflow: hidden;
    background: $coal-2;
  }

  &__img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transform: scale(1.12);
    transition:
      opacity 0.6s ease,
      transform 1.2s $ease;

    &.is-shown {
      opacity: 1;
      transform: scale(1);
    }
  }

  &__caption {
    position: absolute;
    left: 14%;
    right: 1.2rem;
    bottom: 1.1rem;
    height: 1.6em;
    overflow: hidden;
    font-size: $text-sm;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-shadow: 0 2px 12px rgba(#000, 0.6);

    span {
      position: absolute;
      inset: 0;
      opacity: 0;
      transform: translateY(100%);
      transition:
        opacity 0.4s ease,
        transform 0.5s $ease;

      &.is-shown {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
}
</style>
