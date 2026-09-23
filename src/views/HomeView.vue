<script setup lang="ts">
import HeroSection from '@/components/sections/HeroSection.vue'
import TickerBand from '@/components/sections/TickerBand.vue'
import UnitsSection from '@/components/sections/UnitsSection.vue'
import ServicesSection from '@/components/sections/ServicesSection.vue'
import WorkSection from '@/components/sections/WorkSection.vue'
import ClientsSection from '@/components/sections/ClientsSection.vue'
import TestimonialsSection from '@/components/sections/TestimonialsSection.vue'
import ProcessSection from '@/components/sections/ProcessSection.vue'
import FaqSection from '@/components/sections/FaqSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
import WorkLightbox from '@/components/ui/WorkLightbox.vue'
import { useActiveSection } from '@/composables/useActiveSection'

// La home es la única que observa secciones: el menú lee el resultado.
useActiveSection(true)
</script>

<template>
  <div class="home">
    <HeroSection />
    <TickerBand />
    <UnitsSection />
    <ServicesSection />
    <WorkSection />
    <ClientsSection />
    <TestimonialsSection />
    <ProcessSection />
    <FaqSection />
    <ContactSection />
    <WorkLightbox />
  </div>
</template>

<style scoped lang="scss">
// Las bandas giradas (ticker, franjas) no deben crear scroll horizontal.
.home {
  overflow-x: clip;
}
</style>
