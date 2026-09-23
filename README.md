# Vinil Manía — vinilmania.ec

Landing de una sola página para Vinil Manía y sus unidades Polarizados Ecuador y LuvArt.
Vue 3 + Vite + TypeScript + SCSS + GSAP. Sin backend: el contacto es por WhatsApp.

```sh
pnpm install
pnpm dev      # http://localhost:5173
pnpm build    # type-check + build a dist/
```

Deploy: `vercel --prod` (SPA con rewrite en `vercel.json`).

El contenido se edita en `src/config/site.ts` y `src/config/gallery.ts`. Ver `CLAUDE.md`.
