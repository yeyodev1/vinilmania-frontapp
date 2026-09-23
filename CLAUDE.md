# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Qué es esto

Landing de una sola página de Vinil Manía (vinilmania.ec). Vue 3 + Vite + TypeScript, SCSS
propio, vue-router y GSAP. Desplegada en Vercel. **No tiene backend**: el contacto es por
WhatsApp y todo el contenido vive en `src/config/`.

## Comandos

```sh
pnpm install
pnpm dev          # :5173
pnpm build        # vue-tsc -b && vite build (el type-check corre acá)
pnpm typecheck
pnpm format
```

No hay suite de tests. La verificación es `pnpm build` + revisión en navegador.
Si vite sirve código viejo tras un cambio grande: `rm -rf node_modules/.vite && pnpm dev --force`.

## Reglas duras

- **Ningún `.vue` pasa de 300 líneas** (SFC entero). La salida no es partirlo en dos de 290:
  es sacar la lógica a un composable y dejar un componente que solo compone.
- **Layout con flexbox.** Para "grillas" usar el mixin `flex-cards($basis, $gap)`.
- **Nada de librerías UI ni Tailwind.** SCSS propio con los tokens de `src/styles/`.
- **Iconos con Font Awesome por CDN** (`<i class="fa-solid fa-…">`). Sin emojis en la UI.
- **El copy vive en `src/config/site.ts`**, no dentro de los componentes.
- Todo `VITE_*` queda expuesto en el navegador: nunca un secreto con ese prefijo.

## Estilos: la trampa de `additionalData`

`vite.config.ts` antepone `@/styles/index.scss` a **cada** bloque `<style lang="scss">`.
Por eso `index.scss` solo puede contener cosas que **no emiten CSS**: variables, `@forward`,
funciones y mixins. Un solo selector ahí se duplica en el CSS de todos los componentes.

Todo lo que emite CSS (reset, `html`/`body`, custom properties, `.btn`, transiciones) va en
`global.scss`, importado una única vez desde `main.ts`. Las fuentes se cargan con `<link>`
en `index.html`.

En componentes: `$ink`, `$accent`, `@include from('md')`, `@include container` — sin `@use`.

## Arquitectura

- **Contenido** — `src/config/site.ts` (copy, líneas, servicios, clientes, FAQ, WhatsApp) y
  `src/config/gallery.ts` (fotos del portafolio con su proporción).
- **Fotos** — `public/img/trabajos/<slug>-sm.webp` (640px) y `-lg.webp` (1600px). Para sumar
  una foto: generar las dos versiones y agregar la entrada en `gallery.ts` con su `ratio`.
- **Secciones** — `src/components/sections/`, una por bloque de la home, en el orden de `HomeView`.
- **Menú a pantalla completa** — `TheMenu.vue` + `useMenuAnimation.ts` (timeline GSAP) +
  `useMenu.ts` (estado compartido con el botón del header).
- **Animación** — `useMotion.ts`: `useReveal(root)` anima los `[data-reveal]` al entrar en
  pantalla; `data-reveal="stagger"` anima a los hijos en cascada. Respeta reduced motion.
- **Pendientes del cliente** — `site.whatsapp` vacío deja los botones apuntando a `#contacto`
  y el formulario deshabilitado; `testimonials` vacío oculta esa sección.

## Convenciones

- `<script setup lang="ts">` siempre; orden script → template → style; `<style scoped lang="scss">`.
- Sin punto y coma, comillas simples, 2 espacios (Prettier).
- Componentes PascalCase; singletons de layout con prefijo `The`; vistas con sufijo `View`.
- BEM en clases: `.header__nav`, `.btn--primary`.
- Comentarios y copy en español; explican el porqué, no el qué.
