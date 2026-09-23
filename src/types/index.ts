export interface NavItem {
  id: string
  label: string
  hint: string
  image: string
}

export interface Unit {
  id: string
  name: string
  tag: string
  logo: string
  image: string
  text: string
  points: string[]
  cta: string
}

export interface Service {
  id: string
  title: string
  unit: string
  text: string
  items: string[]
  image: string
}

export type WorkCategory = 'vehicular' | 'solar' | 'stickers' | 'espacios' | 'letreros' | 'textil'

export interface Work {
  slug: string
  category: WorkCategory
  title: string
  // Ancho / alto de la foto: reserva el espacio antes de que cargue
  ratio: number
}

export interface Client {
  name: string
  logo: string
}

export interface Testimonial {
  quote: string
  author: string
  company: string
}

export interface Step {
  icon: string
  title: string
  text: string
}

export interface Machine {
  name: string
  kind: string
  points: string[]
}

export interface Faq {
  q: string
  a: string
}
