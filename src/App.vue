<script setup lang="ts">
import TheHeader from '@/layout/TheHeader.vue'
import TheMenu from '@/layout/TheMenu.vue'
import TheFooter from '@/layout/TheFooter.vue'
import WhatsAppFloat from '@/components/ui/WhatsAppFloat.vue'
</script>

<template>
  <a href="#main" class="skip-link">Saltar al contenido</a>
  <TheHeader />
  <TheMenu />
  <main id="main" class="app__main">
    <RouterView />
  </main>
  <TheFooter />
  <WhatsAppFloat />
</template>

<style scoped lang="scss">
.skip-link {
  position: fixed;
  top: 0.75rem;
  left: 0.75rem;
  z-index: 300;
  padding: 0.7rem 1rem;
  border-radius: $radius-sm;
  background: $accent;
  color: $coal;
  font-weight: 700;
  transform: translateY(-200%);
  transition: transform 0.3s $ease;

  &:focus {
    transform: none;
  }
}
</style>
