import { PageId } from '../types';
import { HOLDING_CONFIG, PORTFOLIO_BRANDS, LEADERS, MILESTONES, HOLDING_PILLARS } from '../data/holdingData';

export interface RouteSEO {
  pageId: PageId;
  path: string;
  title: string;
  description: string;
  canonicalUrl: string;
  ogImage: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
  ogImageType?: string;
  ogType: 'website' | 'article' | 'profile';
  ogLocale: string;
  siteName: string;
  twitterCard: 'summary_large_image' | 'summary';
  robots: string;
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority: number;
  lastmod: string;
  jsonLd: Record<string, unknown>[];
  noscriptSummary: string;
}

const DOMAIN = HOLDING_CONFIG.domain;
const DEFAULT_OG_IMAGE = `${DOMAIN}/bytedav.png`;
const DEFAULT_LOCALE = 'es_LA';
const LAST_MOD_DATE = new Date().toISOString().split('T')[0];

const socialUrls = [
  HOLDING_CONFIG.socialLinks.linkedin,
  HOLDING_CONFIG.socialLinks.facebook,
  HOLDING_CONFIG.socialLinks.instagram,
  HOLDING_CONFIG.socialLinks.tiktok,
  HOLDING_CONFIG.socialLinks.youtube,
].filter(Boolean);

// Base Corporation / Organization Schema
const corporationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Corporation',
  '@id': `${DOMAIN}/#corporation`,
  name: HOLDING_CONFIG.name,
  legalName: HOLDING_CONFIG.legalName,
  url: `${DOMAIN}/`,
  logo: {
    '@type': 'ImageObject',
    url: DEFAULT_OG_IMAGE,
    width: 1200,
    height: 630,
  },
  image: DEFAULT_OG_IMAGE,
  description: `${HOLDING_CONFIG.name} es un holding operador tecnológico que estructura, opera y escala marcas especializadas de alto impacto en la economía real.`,
  email: HOLDING_CONFIG.contactEmail,
  foundingDate: '2023',
  sameAs: socialUrls,
  founder: {
    '@type': 'Person',
    name: LEADERS[0]?.name || 'David Bermúdez A.',
    jobTitle: LEADERS[0]?.area || 'Fundador y CEO',
    url: `${DOMAIN}/liderazgo`,
    sameAs: [LEADERS[0]?.linkedin, LEADERS[0]?.email ? `mailto:${LEADERS[0].email}` : ''].filter(Boolean),
  },
  subOrganization: PORTFOLIO_BRANDS.map((brand) => ({
    '@type': 'Organization',
    name: brand.name,
    url: brand.websiteUrl,
    description: brand.description,
    foundingDate: brand.yearFounded.toString(),
  })),
};

// WebSite Schema with Potential Search Action
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${DOMAIN}/#website`,
  url: `${DOMAIN}/`,
  name: HOLDING_CONFIG.name,
  publisher: {
    '@id': `${DOMAIN}/#corporation`,
  },
  inLanguage: 'es',
};

const createBreadcrumbs = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const SEO_CONFIG: Record<PageId, RouteSEO> = {
  home: {
    pageId: 'home',
    path: '/',
    title: 'Bytedav | Holding Operador de Marcas Tecnológicas',
    description:
      'Bytedav es un holding tecnológico operador de plataformas líderes como Kaelos. Impulsamos la innovación y el comercio especializado con rigor de capital.',
    canonicalUrl: `${DOMAIN}/`,
    ogImage: DEFAULT_OG_IMAGE,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageType: 'image/png',
    ogType: 'website',
    ogLocale: DEFAULT_LOCALE,
    siteName: HOLDING_CONFIG.name,
    twitterCard: 'summary_large_image',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    changefreq: 'weekly',
    priority: 1.0,
    lastmod: LAST_MOD_DATE,
    jsonLd: [
      corporationSchema,
      websiteSchema,
      createBreadcrumbs([{ name: 'Inicio', url: `${DOMAIN}/` }]),
    ],
    noscriptSummary: `
      <h1>Bytedav — Holding Operador de Marcas Tecnológicas</h1>
      <p>Impulsando el futuro del comercio especializado y la economía real. Operamos con un modelo de autonomía operativa, infraestructura tecnológica compartida y disciplina de capital.</p>
      <h2>Marcas del Portafolio</h2>
      <ul>
        ${PORTFOLIO_BRANDS.map((b) => `<li><a href="${b.websiteUrl}"><strong>${b.name}</strong></a>: ${b.description} (${b.yearFounded})</li>`).join('')}
      </ul>
      <h2>Pilares Estratégicos</h2>
      <ul>
        ${HOLDING_PILLARS.map((p) => `<li>${p.title}</li>`).join('')}
      </ul>
      <nav>
        <a href="/historia">Nuestra Historia</a> |
        <a href="/liderazgo">Liderazgo y Equipo Directivo</a> |
        <a href="/marcas">Marcas del Portafolio</a>
      </nav>
    `,
  },
  historia: {
    pageId: 'historia',
    path: '/historia',
    title: 'Historia y Trayectoria Empresarial | Bytedav',
    description:
      'Conoce el origen, hitos y pilares estratégicos de Bytedav. Construimos empresas sostenibles con autonomía operativa y soberanía tecnológica desde 2023.',
    canonicalUrl: `${DOMAIN}/historia`,
    ogImage: DEFAULT_OG_IMAGE,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageType: 'image/png',
    ogType: 'website',
    ogLocale: DEFAULT_LOCALE,
    siteName: HOLDING_CONFIG.name,
    twitterCard: 'summary_large_image',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    changefreq: 'monthly',
    priority: 0.8,
    lastmod: LAST_MOD_DATE,
    jsonLd: [
      corporationSchema,
      {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        '@id': `${DOMAIN}/historia#about`,
        url: `${DOMAIN}/historia`,
        name: 'Historia y Trayectoria de Bytedav',
        description: 'Trayectoria, valores fundacionales e hitos clave del holding Bytedav.',
        mainEntity: {
          '@id': `${DOMAIN}/#corporation`,
        },
      },
      createBreadcrumbs([
        { name: 'Inicio', url: `${DOMAIN}/` },
        { name: 'Historia', url: `${DOMAIN}/historia` },
      ]),
    ],
    noscriptSummary: `
      <h1>Historia y Trayectoria de Bytedav</h1>
      <p>Construyendo las bases de un holding operador de nueva generación con disciplina y soberanía tecnológica.</p>
      <h2>Hitos Fundacionales</h2>
      <ul>
        ${MILESTONES.map((m) => `<li><strong>${m.year} (${m.quarter}):</strong> ${m.title} — ${m.description}</li>`).join('')}
      </ul>
      <h2>Principios Rectores</h2>
      <ul>
        <li>Foco en Economía Real y Utilidad</li>
        <li>Soberanía Tecnológica</li>
        <li>Disciplina de Capital</li>
      </ul>
    `,
  },
  liderazgo: {
    pageId: 'liderazgo',
    path: '/liderazgo',
    title: 'Liderazgo y Equipo Directivo | Bytedav',
    description:
      'Conoce al equipo directivo de Bytedav liderado por David Bermúdez A., combinando visión estratégica, innovación digital y rigor operativo en cada negocio.',
    canonicalUrl: `${DOMAIN}/liderazgo`,
    ogImage: DEFAULT_OG_IMAGE,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageType: 'image/png',
    ogType: 'profile',
    ogLocale: DEFAULT_LOCALE,
    siteName: HOLDING_CONFIG.name,
    twitterCard: 'summary_large_image',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    changefreq: 'monthly',
    priority: 0.8,
    lastmod: LAST_MOD_DATE,
    jsonLd: [
      corporationSchema,
      {
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        '@id': `${DOMAIN}/liderazgo#profile`,
        url: `${DOMAIN}/liderazgo`,
        name: 'Equipo y Liderazgo Directivo — Bytedav',
        mainEntity: {
          '@type': 'Person',
          '@id': `${DOMAIN}/liderazgo#david-bermudez`,
          name: LEADERS[0]?.name || 'David Bermúdez A.',
          jobTitle: LEADERS[0]?.area || 'Fundador y CEO',
          description: LEADERS[0]?.bio,
          image: `${DOMAIN}${LEADERS[0]?.image}`,
          email: LEADERS[0]?.email,
          sameAs: [LEADERS[0]?.linkedin].filter(Boolean),
          worksFor: {
            '@id': `${DOMAIN}/#corporation`,
          },
          knowsAbout: LEADERS[0]?.specialties || [],
        },
      },
      createBreadcrumbs([
        { name: 'Inicio', url: `${DOMAIN}/` },
        { name: 'Liderazgo', url: `${DOMAIN}/liderazgo` },
      ]),
    ],
    noscriptSummary: `
      <h1>Liderazgo Directivo — Bytedav</h1>
      <p>Quien firma cada decisión estratégica y lidera la visión de Bytedav.</p>
      <h2>${LEADERS[0]?.name} — ${LEADERS[0]?.area}</h2>
      <p>${LEADERS[0]?.bio}</p>
      <p>Especialidades: ${(LEADERS[0]?.specialties || []).join(', ')}</p>
      <p>Contacto: <a href="mailto:${LEADERS[0]?.email}">${LEADERS[0]?.email}</a></p>
    `,
  },
  marcas: {
    pageId: 'marcas',
    path: '/marcas',
    title: 'Marcas y Ecosistema de Empresas | Bytedav',
    description:
      'Explora el portafolio de marcas de Bytedav, incluyendo Kaelos: plataforma líder de venta y renting de motos nuevas y de ocasión con alcance integral.',
    canonicalUrl: `${DOMAIN}/marcas`,
    ogImage: DEFAULT_OG_IMAGE,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageType: 'image/png',
    ogType: 'website',
    ogLocale: DEFAULT_LOCALE,
    siteName: HOLDING_CONFIG.name,
    twitterCard: 'summary_large_image',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    changefreq: 'weekly',
    priority: 0.9,
    lastmod: LAST_MOD_DATE,
    jsonLd: [
      corporationSchema,
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': `${DOMAIN}/marcas#collection`,
        url: `${DOMAIN}/marcas`,
        name: 'Marcas y Plataformas del Portafolio Bytedav',
        description: 'Catálogo de empresas operadas e incubadas bajo el modelo Bytedav.',
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: PORTFOLIO_BRANDS.map((brand, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            item: {
              '@type': 'Brand',
              name: brand.name,
              url: brand.websiteUrl,
              description: brand.description,
              image: `${DOMAIN}${brand.image}`,
            },
          })),
        },
      },
      createBreadcrumbs([
        { name: 'Inicio', url: `${DOMAIN}/` },
        { name: 'Marcas', url: `${DOMAIN}/marcas` },
      ]),
    ],
    noscriptSummary: `
      <h1>Marcas y Empresas Operativas — Bytedav</h1>
      <p>Marcas especializadas con impacto de mercado en sectores estratégicos.</p>
      <ul>
        ${PORTFOLIO_BRANDS.map((b) => `
          <li>
            <h3>${b.name} (${b.yearFounded})</h3>
            <p>${b.description}</p>
            <p><a href="${b.websiteUrl}">Sitio Oficial de ${b.name}</a></p>
          </li>
        `).join('')}
      </ul>
      <p>¿Buscas inversión o alianza estratégica? Escríbenos a <a href="mailto:${HOLDING_CONFIG.contactEmail}">${HOLDING_CONFIG.contactEmail}</a>.</p>
    `,
  },
  '404': {
    pageId: '404',
    path: '/404',
    title: 'Página no encontrada (404) | Bytedav',
    description:
      'La página solicitada no existe o ha sido movida. Regresa al sitio corporativo de Bytedav para explorar nuestras marcas, historia y equipo directivo.',
    canonicalUrl: `${DOMAIN}/404`,
    ogImage: DEFAULT_OG_IMAGE,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageType: 'image/png',
    ogType: 'website',
    ogLocale: DEFAULT_LOCALE,
    siteName: HOLDING_CONFIG.name,
    twitterCard: 'summary',
    robots: 'noindex, follow',
    changefreq: 'yearly',
    priority: 0.1,
    lastmod: LAST_MOD_DATE,
    jsonLd: [],
    noscriptSummary: `
      <h1>404 — Página no encontrada</h1>
      <p>La ruta que buscas no existe o ha cambiado de dirección.</p>
      <p><a href="/">Volver a la página principal de Bytedav</a></p>
    `,
  },
};

export const SITEMAP_ROUTES = [
  SEO_CONFIG.home,
  SEO_CONFIG.historia,
  SEO_CONFIG.liderazgo,
  SEO_CONFIG.marcas,
];
