<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useLightbox } from '@/composables/useLightbox'
import { useBodyScroll } from '@/composables/useBodyScroll'
import { workImage } from '@/config/gallery'
import { whatsappLink } from '@/config/site'

const { list, index, current, isOpen, close, next, prev } = useLightbox()
const closeBtn = ref<HTMLButtonElement | null>(null)
let startX = 0
let opener: HTMLElement | null = null

useBodyScroll(isOpen)

function onKey(event: KeyboardEvent) {
  if (!isOpen.value) return
  if (event.key === 'Escape') close()
  if (event.key === 'ArrowRight') next()
  if (event.key === 'ArrowLeft') prev()
}

// Deslizar con el dedo cambia de foto.
const onDown = (e: PointerEvent) => (startX = e.clientX)
function onUp(e: PointerEvent) {
  const dx = e.clientX - startX
  if (Math.abs(dx) > 50) (dx < 0 ? next : prev)()
}

// El foco entra al diálogo al abrir y vuelve a la foto que lo abrió al cerrar.
watch(isOpen, async (open) => {
  if (open) {
    opener = document.activeElement as HTMLElement | null
    await nextTick()
    closeBtn.value?.focus()
  } else {
    opener?.focus({ preventScroll: true })
  }
})

onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <Teleport to="body">
    <Transition name="lightbox">
      <div
        v-if="isOpen && current"
        class="lightbox"
        role="dialog"
        aria-modal="true"
        :aria-label="current.title"
        @click.self="close"
      >
        <button
          ref="closeBtn"
          class="lightbox__btn lightbox__close"
          aria-label="Cerrar"
          @click="close"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>

        <figure class="lightbox__figure" @pointerdown="onDown" @pointerup="onUp">
          <Transition name="lightbox-img" mode="out-in">
            <!-- La versión chica (ya en caché) hace de fondo mientras carga la grande -->
            <img
              :key="current.slug"
              :src="workImage(current.slug, 'lg')"
              :alt="current.title"
              :width="Math.round(1200 * current.ratio)"
              height="1200"
              :style="{ backgroundImage: `url(${workImage(current.slug)})` }"
            />
          </Transition>
          <figcaption class="lightbox__caption">
            <span class="lightbox__count">{{ index + 1 }} / {{ list.length }}</span>
            <span class="lightbox__title">{{ current.title }}</span>
            <a
              :href="
                whatsappLink(
                  `Hola, vi en la web el trabajo «${current.title}» y quiero algo similar.`,
                )
              "
              class="lightbox__cta"
              target="_blank"
              rel="noopener"
            >
              <i class="fa-brands fa-whatsapp"></i> Quiero algo así
            </a>
          </figcaption>
        </figure>

        <button
          class="lightbox__btn lightbox__nav lightbox__nav--prev"
          aria-label="Anterior"
          @click="prev"
        >
          <i class="fa-solid fa-arrow-left"></i>
        </button>
        <button
          class="lightbox__btn lightbox__nav lightbox__nav--next"
          aria-label="Siguiente"
          @click="next"
        >
          <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 200;
  @include flex(column, center, center);
  padding: 4.5rem 1rem 1.5rem;
  background: rgba(#080808, 0.94);
  backdrop-filter: blur(8px);

  &__figure {
    @include flex(column, center, center, 1rem);
    max-width: 100%;
    max-height: 100%;
    touch-action: pan-y;

    img {
      max-width: min(100%, 1200px);
      max-height: calc(100svh - 11rem);
      width: auto;
      height: auto;
      border-radius: $radius-md;
      background-size: cover;
      background-position: center;
      user-select: none;
      -webkit-user-drag: none;
    }
  }

  &__caption {
    @include flex(row, center, center, 0.5rem 1.2rem);
    flex-wrap: wrap;
    text-align: center;
  }

  &__count {
    font-size: $text-xs;
    font-weight: 800;
    letter-spacing: 0.14em;
    color: $accent;
  }

  &__title {
    font-weight: 600;
  }

  &__cta {
    font-size: $text-sm;
    font-weight: 700;
    color: $success;

    &:hover {
      text-decoration: underline;
    }
  }

  &__btn {
    position: absolute;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: rgba($bone, 0.08);
    border: 1px solid $coal-line;
    font-size: 1.1rem;
    transition:
      background-color 0.3s ease,
      color 0.3s ease;

    &:hover {
      background: $accent;
      color: $coal;
    }
  }

  &__close {
    top: 1rem;
    right: 1rem;
  }

  &__nav {
    bottom: 1rem;

    @include from('md') {
      top: 50%;
      bottom: auto;
      margin-top: -24px;
    }

    &--prev {
      left: calc(50% - 60px);

      @include from('md') {
        left: 1.5rem;
      }
    }

    &--next {
      right: calc(50% - 60px);

      @include from('md') {
        right: 1.5rem;
      }
    }
  }

  // En móvil las flechas van abajo: se reserva espacio para ellas.
  @include until('md') {
    padding-bottom: 5rem;
  }
}

.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.35s ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}

.lightbox-img-enter-active,
.lightbox-img-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.35s $ease;
}

.lightbox-img-enter-from {
  opacity: 0;
  transform: scale(0.97);
}

.lightbox-img-leave-to {
  opacity: 0;
}
</style>
