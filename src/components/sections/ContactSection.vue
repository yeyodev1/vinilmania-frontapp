<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { contact, site, whatsappLink } from '@/config/site'
import { useReveal } from '@/composables/useMotion'

const root = ref<HTMLElement | null>(null)
useReveal(root)

const form = reactive({ name: '', topic: contact.topics[0] as string, city: '', details: '' })

// Sin backend: el formulario solo arma el texto y lo abre en WhatsApp.
const message = computed(() => {
  const lines = [
    `Hola Vinil Manía, soy ${form.name.trim() || '(tu nombre)'}.`,
    `Me interesa: ${form.topic}.`,
  ]
  if (form.city.trim()) lines.push(`Ciudad: ${form.city.trim()}.`)
  if (form.details.trim()) lines.push(form.details.trim())
  return lines.join('\n')
})

const ready = computed(() => form.name.trim().length > 1)

function send() {
  if (!ready.value || !site.whatsapp) return
  window.open(whatsappLink(message.value), '_blank', 'noopener')
}
</script>

<template>
  <section id="contacto" ref="root" class="contact">
    <div class="contact__inner">
      <div class="contact__copy" data-reveal>
        <p class="contact__eyebrow">{{ contact.eyebrow }}</p>
        <h2 class="contact__title">{{ contact.title }}</h2>
        <p class="contact__text">{{ contact.text }}</p>
        <ul class="contact__facts">
          <li v-for="fact in contact.facts" :key="fact.text">
            <i :class="fact.icon"></i> {{ fact.text }}
          </li>
        </ul>
      </div>

      <form class="contact__form" data-reveal @submit.prevent="send">
        <div class="contact__field">
          <label for="c-name">Tu nombre</label>
          <input
            id="c-name"
            v-model="form.name"
            type="text"
            autocomplete="name"
            placeholder="Nombre y apellido"
            required
          />
        </div>
        <div class="contact__field">
          <label for="c-topic">¿Qué necesitas?</label>
          <select id="c-topic" v-model="form.topic">
            <option v-for="topic in contact.topics" :key="topic" :value="topic">{{ topic }}</option>
          </select>
        </div>
        <div class="contact__field">
          <label for="c-city">Ciudad</label>
          <input
            id="c-city"
            v-model="form.city"
            type="text"
            autocomplete="address-level2"
            placeholder="Guayaquil"
          />
        </div>
        <div class="contact__field">
          <label for="c-details">Cuéntanos más (opcional)</label>
          <textarea
            id="c-details"
            v-model="form.details"
            rows="3"
            placeholder="Medidas, cantidad, tipo de vehículo…"
          ></textarea>
        </div>

        <div class="contact__preview" aria-live="polite">
          <span class="contact__preview-label">Vista previa del mensaje</span>
          <p>{{ message }}</p>
        </div>

        <button
          type="submit"
          class="btn btn--whatsapp contact__submit"
          :disabled="!ready || !site.whatsapp"
        >
          <i class="fa-brands fa-whatsapp"></i> Enviar por WhatsApp
        </button>
        <p v-if="!site.whatsapp" class="contact__note">{{ contact.pending }}</p>
      </form>
    </div>
  </section>
</template>

<style scoped lang="scss">
.contact {
  @include section;
  background: $coal;
  overflow: hidden;

  @include halftone(rgba(#fff, 0.04), 18px);

  &__inner {
    @include container(1240px);
    position: relative;
    @include flex(column, stretch, flex-start, 2.5rem);

    @include from('lg') {
      flex-direction: row;
      align-items: center;
      gap: 4rem;
    }
  }

  // Panel naranja con esquina diagonal, como las portadas del catálogo
  &__copy {
    flex: 1 1 45%;
    @include flex(column, flex-start, flex-start, 1.1rem);
    padding: clamp(1.6rem, 5vw, 3rem);
    border-radius: $radius-lg;
    background: linear-gradient(135deg, $accent-hot, $accent 55%, $accent-deep);
    clip-path: polygon(0 0, 100% 0, 100% calc(100% - 2.5rem), calc(100% - 2.5rem) 100%, 0 100%);
  }

  &__eyebrow {
    @include eyebrow;
    color: $coal;
  }

  &__title {
    @include display($display-lg, 900);
    color: $coal;
  }

  &__text {
    font-size: $text-lg;
    font-weight: 500;
    color: rgba($coal, 0.82);
  }

  &__facts {
    list-style: none;
    @include flex(column, flex-start, flex-start, 0.5rem);
    margin-top: 0.5rem;
    padding: 1.1rem 1.3rem;
    border-radius: $radius-md;
    background: $coal;

    li {
      font-size: $text-sm;
      font-weight: 500;
    }

    i {
      width: 1.4rem;
      color: $accent;
    }
  }

  &__form {
    flex: 1 1 55%;
    @include flex(column, stretch, flex-start, 1rem);
    padding: clamp(1.4rem, 4vw, 2.5rem);
    border-radius: $radius-lg;
    background: $coal-2;
    border: 1px solid $coal-line;
    box-shadow: $shadow-lg;
  }

  &__preview {
    padding: 1rem 1.1rem;
    border-radius: $radius-md;
    background: rgba($success, 0.08);
    border: 1px dashed rgba($success, 0.35);

    p {
      white-space: pre-line;
      font-size: $text-sm;
      color: $bone-soft;
    }
  }

  &__preview-label {
    display: block;
    margin-bottom: 0.3rem;
    font-size: $text-xs;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: $success;
  }

  &__submit {
    width: 100%;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }
  }

  &__note {
    text-align: center;
    font-size: $text-xs;
    color: $bone-muted;
  }
}
</style>
