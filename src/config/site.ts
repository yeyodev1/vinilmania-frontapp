/**
 * El copy es configuración: todos los textos y datos de la marca viven acá.
 * Los componentes solo consumen y pintan. Fuente: catálogo corporativo 2026,
 * la reunión del 11 sept 2026 y los productos que Gustavo detalló por WhatsApp.
 */
import type { Unit, Service, NavItem, Client, Step, Faq, Testimonial, Machine } from '@/types'

const img = (slug: string, size: 'sm' | 'lg' = 'lg') => `/img/trabajos/${slug}-${size}.webp`

export const site = {
  name: 'Vinil Manía',
  legalName: 'Vinil Manía',
  description:
    'Películas antisolares para autos, casas y oficinas, wrapping, branding vehicular, señalética, letreros corpóreos y stickers premium en Guayaquil, con cobertura en todo Ecuador.',
  url: 'https://vinilmania.ec',
  city: 'Guayaquil',
  country: 'Ecuador',
  // Pendiente: Gustavo elige cuál de los dos WhatsApp va en la web.
  // Solo dígitos con código de país, ej: 593991234567
  whatsapp: '',
  social: {
    instagram: '',
    facebook: '',
    tiktok: '',
  },
} as const

export const nav: NavItem[] = [
  {
    id: 'inicio',
    label: 'Inicio',
    hint: 'Vinil Manía',
    image: img('vehicular-dulce-antojo', 'sm'),
  },
  {
    id: 'lineas',
    label: 'Nuestras líneas',
    hint: 'Tres unidades especializadas',
    image: img('solar-ventanal', 'sm'),
  },
  {
    id: 'servicios',
    label: 'Servicios',
    hint: 'Todo lo que hacemos',
    image: img('vehicular-cargolan', 'sm'),
  },
  {
    id: 'trabajos',
    label: 'Trabajos',
    hint: 'Proyectos reales',
    image: img('stickers-furia', 'sm'),
  },
  {
    id: 'clientes',
    label: 'Clientes',
    hint: 'Marcas que confían',
    image: img('letreros-upper-led', 'sm'),
  },
  {
    id: 'proceso',
    label: 'Cómo trabajamos',
    hint: 'De la idea a la instalación',
    image: img('vehicular-instalador', 'sm'),
  },
  {
    id: 'contacto',
    label: 'Cotiza',
    hint: 'Escríbenos por WhatsApp',
    image: img('vehicular-van-rosa', 'sm'),
  },
]

export const hero = {
  eyebrow: 'Guayaquil · Cobertura nacional',
  lines: ['Vinil que', 'protege, viste', 'y vende'],
  lead: 'Películas antisolares, branding vehicular, wrapping, señalética y stickers premium. Más de 10 años haciendo que marcas, autos y espacios se vean mejor en todo Ecuador.',
  primary: 'Cotizar por WhatsApp',
  secondary: 'Ver trabajos',
  slides: [
    {
      src: img('vehicular-dulce-antojo'),
      alt: 'Furgoneta Dulce Antojo con branding vehicular completo',
    },
    { src: img('solar-ventanal'), alt: 'Ventanal residencial con película de control solar' },
    { src: img('stickers-furia'), alt: 'Exhibidor de stickers premium de alto relieve' },
    { src: img('vehicular-motorhome'), alt: 'Motorhome personalizado con vinil impreso' },
  ],
  stats: [
    { value: '+10', label: 'años de experiencia' },
    { value: '3', label: 'unidades especializadas' },
    { value: 'UV', label: 'impresión japonesa' },
  ],
}

export const ticker = [
  'Películas antisolares',
  'Wrapping',
  'Branding vehicular',
  'Señalética',
  'Letreros corpóreos LED',
  'Stickers premium',
  'Impresión UV',
  'Gigantografías',
  'Material POP',
]

export const about = {
  eyebrow: 'Quiénes somos',
  title: 'Una base, tres especialidades',
  text: 'Somos un equipo con más de 10 años de experiencia atendiendo clientes a nivel nacional desde Guayaquil. Ofrecemos soluciones integrales en gráfica, protección y personalización, respaldadas por tecnología, conocimiento y un enfoque profesional en cada proyecto.',
}

export const units: Unit[] = [
  {
    id: 'vinilmania',
    name: 'Vinil Manía',
    tag: 'Vinil, branding y personalización',
    logo: '/img/marcas/vinilmania-claro.webp',
    image: img('vehicular-cargolan'),
    text: 'Desarrollamos y materializamos ideas creativas con viniles adhesivos sobre todo tipo de superficies: trabajos corporativos, vehiculares y decorativos en paredes, PVC, vidrio y más, cuidando la calidad visual, la correcta instalación y la durabilidad.',
    points: [
      'Branding vehicular y de flotas',
      'Wrapping y personalización de autos y motos',
      'Brandeo de paredes y vitrinas',
      'Señalética y letreros corpóreos LED',
      'Viniles arenados, troquelados y microperforados',
      'Lonas, gigantografías, material POP y textiles',
    ],
    cta: 'Quiero cotizar branding o vinil',
  },
  {
    id: 'polarizados',
    name: 'Polarizados Ecuador',
    tag: 'Películas de control solar · by Vinil Manía',
    logo: '/img/marcas/polarizados-claro.webp',
    image: img('solar-casa-jardin'),
    text: 'Soluciones en películas de control solar para uso residencial, corporativo y vehicular. Nuestras láminas reducen la radiación UV, controlan el ingreso de calor y mejoran el confort térmico: protección, eficiencia y bienestar en cada espacio.',
    points: [
      'Películas antisolares para vehículos',
      'Películas arquitectónicas para casas',
      'Oficinas, locales y edificios',
      'Menos calor y radiación UV',
      'Más privacidad y confort térmico',
    ],
    cta: 'Quiero cotizar polarizado',
  },
  {
    id: 'luvart',
    name: 'LuvArt',
    tag: 'Impresión UV de alto relieve · by Vinil Manía',
    logo: '/img/marcas/luvart-claro.webp',
    image: img('stickers-codicia'),
    text: 'Desarrollamos ideas artísticas y corporativas con impresión UV de alta calidad y tecnología 100% japonesa. Alto relieve, fidelidad de color, texturas y larga durabilidad sobre una amplia variedad de sustratos.',
    points: [
      'Stickers temáticos premium para marcas',
      'Alto relieve y acabado con barniz',
      'Cuadros con textura realista',
      'Piezas decorativas y corporativas',
    ],
    cta: 'Quiero cotizar stickers o cuadros',
  },
]

export const services: Service[] = [
  {
    id: 'antisolar-vehicular',
    title: 'Películas antisolares vehiculares',
    unit: 'Polarizados Ecuador',
    text: 'Menos calor y radiación UV dentro del vehículo, más confort y privacidad al manejar.',
    items: ['Autos y camionetas', 'Vehículos de flota', 'Control de calor y UV'],
    image: img('vehicular-upper-frente', 'sm'),
  },
  {
    id: 'antisolar-arquitectonica',
    title: 'Películas antisolares arquitectónicas',
    unit: 'Polarizados Ecuador',
    text: 'Control solar para casas, oficinas y locales: espacios más frescos y protegidos sin perder luz.',
    items: ['Residencial', 'Oficinas y locales', 'Fachadas de vidrio'],
    image: img('solar-casa-jardin', 'sm'),
  },
  {
    id: 'branding',
    title: 'Branding corporativo para vehículos y espacios',
    unit: 'Vinil Manía',
    text: 'Convertimos tu flota en publicidad móvil y tus paredes y vitrinas en espacios que refuerzan tu marca.',
    items: [
      'Brandeo vehicular',
      'Brandeo de pared',
      'Viniles arenados',
      'Vinil microperforado',
      'Afiches en PVC',
    ],
    image: img('vehicular-cargolan', 'sm'),
  },
  {
    id: 'wrapping',
    title: 'Wrapping y personalización de autos y motos',
    unit: 'Vinil Manía',
    text: 'Cambio de color, calcas y personalización con vinil para que tu vehículo se vea único.',
    items: ['Cambio de color', 'Calcas para motos', 'Personalización a medida'],
    image: img('vehicular-instalador', 'sm'),
  },
  {
    id: 'impresion',
    title: 'Impresiones de alta calidad: stickers premium y cuadros',
    unit: 'LuvArt',
    text: 'Impresión UV con alto relieve, barniz y texturas. Stickers temáticos que las marcas quieren coleccionar.',
    items: ['Stickers premium', 'Alto relieve', 'Cuadros con textura'],
    image: img('stickers-codicia', 'sm'),
  },
  {
    id: 'senaletica',
    title: 'Señaléticas y letreros corpóreos',
    unit: 'Vinil Manía',
    text: 'Sistemas de orientación y letreros que destacan tu marca de día y de noche.',
    items: [
      'Señalética corporativa',
      'Letreros corpóreos LED',
      'Letreros con estructura',
      'Gigantografías',
    ],
    image: img('letreros-upper-led', 'sm'),
  },
  {
    id: 'pop',
    title: 'Material POP y textiles',
    unit: 'Vinil Manía',
    text: 'Todo para ferias, activaciones y eventos, y prendas que llevan tu marca puesta.',
    items: ['Roll ups y backings', 'Counters y stands', 'Camisetas, buzos y gorras'],
    image: img('pop-backing-dunkin', 'sm'),
  },
]

export const clients: Client[] = [
  { name: 'Upper', logo: 'upper' },
  { name: "Dunkin'", logo: 'dunkin' },
  { name: 'Lamicer', logo: 'lamicer' },
  { name: 'Rubasa', logo: 'rubasa' },
  { name: 'Flora Food Group', logo: 'flora' },
  { name: '400°', logo: '400-grados' },
  { name: 'Fasinarm', logo: 'fasinarm' },
  { name: 'Starcargo', logo: 'starcargo' },
  { name: 'Inproel', logo: 'inproel' },
  { name: 'Cargolan', logo: 'cargolan' },
  { name: 'Aseplas', logo: 'aseplas' },
  { name: 'Car Secure', logo: 'car-secure' },
  { name: 'Cartones & Papeles', logo: 'cartones-papeles' },
  { name: '1700 Custodia', logo: '1700-custodia' },
  { name: 'Cliente corporativo', logo: 'escudo-z' },
  { name: 'Multijairos', logo: 'multijairos' },
]

// Vacío hasta que Gustavo envíe testimonios reales: la sección no se pinta.
export const testimonials: Testimonial[] = []

export const steps: Step[] = [
  {
    icon: 'fa-brands fa-whatsapp',
    title: 'Nos escribes',
    text: 'Cuéntanos qué necesitas y, si puedes, envíanos fotos o medidas del vehículo o espacio.',
  },
  {
    icon: 'fa-solid fa-ruler-combined',
    title: 'Te asesoramos',
    text: 'Te recomendamos el material y el acabado adecuados y te enviamos la cotización.',
  },
  {
    icon: 'fa-solid fa-print',
    title: 'Producimos',
    text: 'Diseñamos e imprimimos en nuestro taller con equipos UV y ecosolvente de gran formato.',
  },
  {
    icon: 'fa-solid fa-screwdriver-wrench',
    title: 'Instalamos',
    text: 'Instalación profesional, cuidando cada borde para que el trabajo dure.',
  },
]

export const machines: Machine[] = [
  {
    name: 'Mimaki UJV100-160Plus',
    kind: 'Impresión UV',
    points: [
      'UV de alta precisión',
      'Colores vibrantes y alta definición',
      'Secado instantáneo',
      'Muy alta durabilidad exterior',
    ],
  },
  {
    name: 'Grand Eco Solvent i3200',
    kind: 'Eco solvente gran formato',
    points: [
      'Excelente color y cobertura',
      'Gigantografías, lonas y vallas',
      'Tintas ecosolventes',
      'Alta productividad',
    ],
  },
]

export const faqs: Faq[] = [
  {
    q: '¿Qué beneficios tiene una película de control solar?',
    a: 'Reduce la radiación UV, controla el ingreso de calor y mejora el confort térmico, tanto en vehículos como en casas y oficinas. Además aporta privacidad.',
  },
  {
    q: '¿Trabajan solo en Guayaquil?',
    a: 'Nuestra sede principal está en Guayaquil, pero atendemos proyectos a nivel nacional. Escríbenos y coordinamos.',
  },
  {
    q: '¿Qué es el wrapping de un vehículo?',
    a: 'Es cubrir el vehículo con vinil para cambiarle el color o personalizarlo sin pintarlo. Lo hacemos en autos, camionetas y motos.',
  },
  {
    q: '¿Hacen branding para flotas de empresa?',
    a: 'Sí. Brandeamos furgonetas, camiones y camionetas para convertir tu flota en publicidad móvil, con diseño e instalación incluidos.',
  },
  {
    q: '¿Qué tienen de especial los stickers de LuvArt?',
    a: 'Se imprimen con tecnología UV japonesa, con alto relieve, barniz y texturas. Son stickers temáticos que las marcas usan en empaques, activaciones y exhibidores.',
  },
  {
    q: '¿Cómo pido una cotización?',
    a: 'Por WhatsApp. Cuéntanos qué necesitas, las medidas aproximadas y, si tienes, una foto. Te respondemos con opciones y precio.',
  },
]

export const contact = {
  eyebrow: 'Cotiza sin compromiso',
  title: 'Cuéntanos tu proyecto',
  text: 'Arma tu mensaje en segundos y te llega directo a nuestro WhatsApp.',
  facts: [
    { icon: 'fa-solid fa-location-dot', text: 'Sede principal en Guayaquil' },
    { icon: 'fa-solid fa-truck-fast', text: 'Proyectos en todo Ecuador' },
    { icon: 'fa-brands fa-whatsapp', text: 'Respuesta directa por WhatsApp' },
  ],
  pending: 'El número de WhatsApp se activa muy pronto.',
  topics: [
    'Polarizado para vehículo',
    'Película de control solar para casa u oficina',
    'Branding de vehículo o flota',
    'Wrapping de auto o moto',
    'Stickers premium o cuadros',
    'Señalética o letrero',
    'Material POP o textiles',
    'Otro',
  ],
}

export function whatsappLink(message = 'Hola Vinil Manía, quiero más información'): string {
  // Sin número todavía: los botones llevan al formulario de contacto.
  if (!site.whatsapp) return '#contacto'
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`
}
