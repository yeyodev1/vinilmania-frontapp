<script setup lang="ts">
import { nav, site, units, whatsappLink } from '@/config/site'

const year = new Date().getFullYear()
const socials = [
  { icon: 'fa-brands fa-instagram', url: site.social.instagram, label: 'Instagram' },
  { icon: 'fa-brands fa-facebook-f', url: site.social.facebook, label: 'Facebook' },
  { icon: 'fa-brands fa-tiktok', url: site.social.tiktok, label: 'TikTok' },
].filter((s) => s.url)
</script>

<template>
  <footer class="footer">
    <div class="footer__inner">
      <div class="footer__top">
        <p class="footer__claim">¿Listo para que tu marca se vea?</p>
        <a :href="whatsappLink()" class="btn btn--primary" target="_blank" rel="noopener">
          <i class="fa-brands fa-whatsapp"></i> Cotizar ahora
        </a>
      </div>

      <div class="footer__mid">
        <div class="footer__brand">
          <img
            src="/img/marcas/vinilmania-claro.webp"
            alt="Vinil Manía"
            width="200"
            height="30"
            loading="lazy"
          />
          <p>{{ site.description }}</p>
          <ul v-if="socials.length" class="footer__social">
            <li v-for="s in socials" :key="s.label">
              <a :href="s.url" target="_blank" rel="noopener" :aria-label="s.label"
                ><i :class="s.icon"></i
              ></a>
            </li>
          </ul>
        </div>

        <nav class="footer__nav" aria-label="Pie de página">
          <a v-for="item in nav" :key="item.id" :href="`#${item.id}`">{{ item.label }}</a>
        </nav>

        <ul class="footer__units">
          <li v-for="unit in units" :key="unit.id">
            <img :src="unit.logo" :alt="unit.name" loading="lazy" />
          </li>
        </ul>
      </div>

      <p class="footer__legal">
        © {{ year }} {{ site.legalName }} · {{ site.city }}, {{ site.country }}
      </p>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  background: #0c0d0d;
  border-top: 3px solid $accent;

  &__inner {
    @include container(1320px);
    @include flex(column, stretch, flex-start, 2.5rem);
    padding-block: $space-xl 2rem;
  }

  &__top {
    @include flex(column, flex-start, flex-start, 1.2rem);
    padding-bottom: 2.5rem;
    border-bottom: 1px solid $coal-line;

    @include from('md') {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
  }

  &__claim {
    @include display($display-md, 900);
    max-width: 16ch;
  }

  &__mid {
    @include flex(column, flex-start, flex-start, 2rem);

    @include from('lg') {
      flex-direction: row;
      justify-content: space-between;
    }
  }

  &__brand {
    @include flex(column, flex-start, flex-start, 1rem);
    max-width: 420px;

    img {
      height: 28px;
      width: auto;
    }

    p {
      font-size: $text-sm;
      color: $bone-muted;
    }
  }

  &__social {
    list-style: none;
    @include flex(row, center, flex-start, 0.5rem);

    a {
      @include flex(row, center, center);
      width: 44px;
      height: 44px;
      border-radius: 50%;
      border: 1px solid $coal-line;
      transition: all 0.3s ease;

      &:hover {
        background: $accent;
        color: $coal;
      }
    }
  }

  &__nav {
    @include flex(column, flex-start, flex-start, 0.6rem);

    a {
      font-size: $text-sm;
      color: $bone-soft;
      transition: color 0.3s ease;

      &:hover {
        color: $accent;
      }
    }
  }

  &__units {
    list-style: none;
    @include flex(row, center, flex-start, 1.5rem);
    flex-wrap: wrap;

    img {
      height: 34px;
      width: auto;
      opacity: 0.85;
    }

    li:nth-child(2) img {
      height: 64px;
    }
  }

  &__legal {
    font-size: $text-xs;
    color: $bone-muted;
  }
}
</style>
