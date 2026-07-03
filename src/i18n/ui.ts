export const defaultLocale = 'es' as const;

export type Locale = string;

const strings = {
  // Site identity
  'site.title': 'mypipelines',
  'site.tagline': 'Los pipelines que usamos, para que no los armes de cero',
  'home.title': 'mypipelines',

  // Navigation
  'nav.pipelines': 'Pipelines',
  'nav.actions': 'Actions',
  'nav.gradle': 'Gradle',
  'nav.guides': 'Guías',
  'nav.reference': 'Referencia',
  'nav.search': 'Buscar',

  // Actions
  'actions.title': 'GitHub Actions',
  'actions.subtitle': 'Actions que mantenemos y usamos a diario',

  // Gradle
  'gradle.title': 'Gradle en la práctica',
  'gradle.subtitle': 'Cómo montamos Gradle Kotlin DSL en proyectos multi-módulo, sin magia',

  // Catalog
  'catalog.title': 'Catálogo de pipelines',
  'catalog.subtitle': 'Un workflow por stack, con sus templates',

  // Footer
  'footer.tagline': 'Los pipelines que usamos en Codehunters, listos para copiar.',
  'footer.guides': 'Guías',
  'footer.repo': 'Repositorio',
  'footer.builtWith': 'Hecho con Astro · contenido real, no de ejemplo',
  'footer.source': 'Contenido generado desde el repositorio ci-templates',

  // Breadcrumb
  'breadcrumb.home': 'Inicio',

  // Theme
  'theme.toggleLabel': 'Cambiar tema',

  // Accessibility
  'a11y.skipToContent': 'Saltar al contenido',
} as const;

export type UiKey = keyof typeof strings;

export function t(_lang: string, key: UiKey): string {
  return (strings as Record<string, string>)[key] ?? key;
}
