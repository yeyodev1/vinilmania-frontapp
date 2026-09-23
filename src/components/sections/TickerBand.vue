<script setup lang="ts">
import { ticker } from '@/config/site'
</script>

<template>
  <div class="ticker" aria-hidden="true">
    <div class="ticker__track">
      <!-- Dos copias idénticas: al llegar a -50% el loop es invisible -->
      <ul v-for="copy in 2" :key="copy" class="ticker__list">
        <li v-for="word in ticker" :key="word">
          <span>{{ word }}</span>
          <i class="fa-solid fa-star-of-life"></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ticker {
  position: relative;
  z-index: 2;
  margin-block: -1.5rem;
  background: $accent;
  color: $coal;
  transform: rotate(-2deg);
  overflow: hidden;
  box-shadow: $shadow-md;

  &__track {
    display: flex;
    width: max-content;
    animation: ticker 38s linear infinite;
  }

  &:hover &__track {
    animation-play-state: paused;
  }

  &__list {
    list-style: none;
    display: flex;
    flex-shrink: 0;

    li {
      @include flex(row, center, center, 1.4rem);
      padding: 0.95rem 0 0.95rem 1.4rem;
      white-space: nowrap;
    }

    span {
      @include display($text-xl, 900);
    }

    i {
      font-size: 0.9rem;
    }
  }
}

@keyframes ticker {
  to {
    transform: translateX(-50%);
  }
}
</style>
