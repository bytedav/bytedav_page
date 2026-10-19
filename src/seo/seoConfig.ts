import { PageId } from '../types';
import { HOLDING_CONFIG, PORTFOLIO_BRANDS, LEADERS, MILESTONES, HOLDING_PILLARS, BLOG_POSTS } from '../data/holdingData';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface RouteSEO {
  pageId: PageId;
  path: string;
  title: string;
  description: string;
  keywords: string;
  author: string;
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
  faqs?: FAQItem[];
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

// Base Corporation / Organization Schema for Knowledge Graphs
const corporationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Corporation',
  '@id': `${DOMAIN}/#corporation`,
  name: HOLDING_CONFIG.name,
  legalName: HOLDING_CONFIG.legalName,
  alternateName: ['Bytedav Holding', 'Grupo Bytedav', 'Bytedav Group', 'Bytedav Technologies'],
  url: `${DOMAIN}/`,
  logo: {
    '@type': 'ImageObject',
    url: DEFAULT_OG_IMAGE,
    width: 1200,
    height: 630,
  },
  image: DEFAULT_OG_IMAGE,
  slogan: 'Estructuramos, operamos y escalamos marcas tecnológicas en la economía real.',
  description: `${HOLDING_CONFIG.name} es un holding operador tecnológico que estructura, opera y escala marcas especializadas de alto impacto en la economía real con autonomía operativa y soberanía de software.`,
  email: HOLDING_CONFIG.contactEmail,
  foundingDate: '2023',
  sameAs: socialUrls,
  knowsAbout: [
    'Holding Tecnológico',
    'Venture Building',
    'Comercio Especializado',
    'Plataformas de Movilidad',
    'Renting de Vehículos',
    'Marketplace de Motocicletas',
    'Soberanía Tecnológica',
    'Economía Real',
    'Desarrollo de Software Propietario',
    'Gobernanza Corporativa',
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'corporate inquiries',
      email: HOLDING_CONFIG.contactEmail,
      url: `${DOMAIN}/`,
      availableLanguage: ['Spanish', 'English'],
    },
  ],
  founder: {
    '@type': 'Person',
    '@id': `${DOMAIN}/liderazgo#david-bermudez`,
    name: LEADERS[0]?.name || 'bytedav.',
    jobTitle: LEADERS[0]?.area || 'Fundador y CEO',
    url: `${DOMAIN}/liderazgo`,
    image: `${DOMAIN}${LEADERS[0]?.image || '/david bermudez.png'}`,
    email: LEADERS[0]?.email || HOLDING_CONFIG.contactEmail,
    sameAs: [LEADERS[0]?.linkedin, LEADERS[0]?.email ? `mailto:${LEADERS[0].email}` : ''].filter(Boolean),
    knowsAbout: [
      'Dirección Ejecutiva',
      'Arquitectura de Software',
      'Venture Building',
      'Estrategia de Capital',
      'Plataformas de Movilidad',
      'Economía Real',
    ],
  },
  subOrganization: PORTFOLIO_BRANDS.map((brand) => ({
    '@type': 'Organization',
    name: brand.name,
    url: brand.websiteUrl,
    description: brand.description,
    foundingDate: brand.yearFounded.toString(),
    parentOrganization: {
      '@id': `${DOMAIN}/#corporation`,
    },
  })),
};

// WebSite Schema with Search Engine / Assistant Navigation Action
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${DOMAIN}/#website`,
  url: `${DOMAIN}/`,
  name: HOLDING_CONFIG.name,
  alternateName: 'Bytedav Holding',
  description: 'Holding operador tecnológico de plataformas líderes en la economía real.',
  publisher: {
    '@id': `${DOMAIN}/#corporation`,
  },
  inLanguage: 'es',
};

export const createBreadcrumbs = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const createFaqSchema = (faqs: FAQItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

// High-impact FAQ definitions for AIO / Answer Engine Optimization (ChatGPT Search, Perplexity, Gemini, Google AI Overviews)
const HOME_FAQS: FAQItem[] = [
  {
    question: '¿Qué es Bytedav y cuál es su modelo operativo?',
    answer:
      'Bytedav es un holding operador tecnológico fundado en 2023 por bytedav. Estructura, opera y escala marcas tecnológicas enfocadas en la economía real, combinando autonomía operativa para cada unidad con infraestructura tecnológica compartida y disciplina de capital.',
  },
  {
    question: '¿Cuáles son las marcas y empresas del portafolio de Bytedav?',
    answer:
      'Actualmente, el holding opera Kaelos (https://kaelos.com), plataforma líder de compraventa de motos nuevas y de ocasión certificada, suscripciones de renting y servicios de movilidad para particulares y empresas.',
  },
  {
    question: '¿En qué se diferencia el modelo de Bytedav de un fondo de venture capital?',
    answer:
      'Bytedav no es un fondo de capital pasivo ni una aceleradora de paso: es un holding operador que construye, posee y gestiona directamente sus marcas con soberanía tecnológica completa, software propietario y foco en rentabilidad real y flujo de caja duradero.',
  },
  {
    question: '¿Quién fundó y lidera Bytedav?',
    answer:
      'Bytedav fue fundado por bytedav., quien lidera la dirección ejecutiva, la arquitectura técnica de las plataformas y el despliegue estratégico de capital del grupo.',
  },
];

const HISTORIA_FAQS: FAQItem[] = [
  {
    question: '¿Cuándo fue fundado el holding Bytedav?',
    answer:
      'Bytedav se fundó en 2023 con la visión de estructurar un holding operador capaz de crear soluciones digitales de alto impacto en sectores tangibles de la economía real.',
  },
  {
    question: '¿Cuáles son los cuatro pilares estratégicos de Bytedav?',
    answer:
      'Los cuatro pilares son: 1) Autonomía Operativa con Respaldo Central; 2) Sinergia de Ecosistema; 3) Infraestructura Tecnológica Compartida; y 4) Gobernanza y Disciplina de Capital.',
  },
  {
    question: '¿Qué significa la soberanía tecnológica para Bytedav?',
    answer:
      'Significa construir código y plataformas propietarias sin depender de software cerrado de terceros en áreas críticas, lo que otorga fosos defensivos duraderos, costos marginales controlados y alta velocidad de iteración.',
  },
];

const MARCAS_FAQS: FAQItem[] = [
  {
    question: '¿Qué es Kaelos?',
    answer:
      'Kaelos (fundada en 2026) es la plataforma de movilidad y motocicletas incubada por Bytedav. Ofrece comercialización digital de motos nuevas, catálogo de ocasión verificado mecánicamente, esquemas de renting flexible y servicios integrales de postventa.',
  },
  {
    question: '¿Cómo incuba y escala Bytedav a sus marcas verticales?',
    answer:
      'Bytedav proporciona el stack tecnológico compartido, sistemas de cobro y catálogo, soporte directivo y respaldo legal, permitiendo a los líderes de cada marca concentrarse en el servicio comercial y la satisfacción del usuario.',
  },
];

const LIDERAZGO_FAQS: FAQItem[] = [
  {
    question: '¿Quién es bytedav.?',
    answer:
      'bytedav. es el Fundador y CEO de Bytedav. Dirige la estrategia de producto, asignación de capital y arquitectura de software del holding y sus marcas asociadas.',
  },
  {
    question: '¿Cómo contactar al equipo directivo de Bytedav para alianzas?',
    answer:
      'Puede enviar consultas corporativas, propuestas de alianza o deal flow directamente al correo bytedav@gmail.com o a través del canal institucional de LinkedIn.',
  },
];

export const SEO_CONFIG: Record<PageId, RouteSEO> = {
  home: {
    pageId: 'home',
    path: '/',
    title: 'Bytedav | Holding Operador de Marcas Tecnológicas',
    description:
      'Bytedav es un holding tecnológico operador de plataformas líderes como Kaelos. Impulsamos la innovación y el comercio especializado con rigor de capital.',
    keywords:
      'Bytedav, holding tecnológico, Kaelos, David Bermúdez, operador de marcas, venture building, motos nuevas y ocasión, renting de motos, soberanía tecnológica, economía real',
    author: 'Bytedav',
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
    faqs: HOME_FAQS,
    jsonLd: [
      corporationSchema,
      websiteSchema,
      createBreadcrumbs([{ name: 'Inicio', url: `${DOMAIN}/` }]),
      createFaqSchema(HOME_FAQS),
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
      <h2>Preguntas Frecuentes sobre Bytedav</h2>
      <dl>
        ${HOME_FAQS.map((f) => `<dt><strong>${f.question}</strong></dt><dd>${f.answer}</dd>`).join('')}
      </dl>
      <nav>
        <a href="/historia">Nuestra Historia</a> |
        <a href="/liderazgo">Liderazgo y Equipo Directivo</a> |
        <a href="/marcas">Marcas del Portafolio</a> |
        <a href="/blog">Blog y Perspectivas</a>
      </nav>
    `,
  },
  historia: {
    pageId: 'historia',
    path: '/historia',
    title: 'Historia y Trayectoria Empresarial | Bytedav',
    description:
      'Conoce el origen, hitos y pilares estratégicos de Bytedav. Construimos empresas sostenibles con autonomía operativa y soberanía tecnológica desde 2023.',
    keywords:
      'historia de Bytedav, trayectoria Bytedav, hitos empresariales, pilares de holding, soberanía tecnológica, economía real, venture building',
    author: 'Bytedav',
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
    faqs: HISTORIA_FAQS,
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
      createFaqSchema(HISTORIA_FAQS),
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
      <h2>Preguntas Frecuentes sobre la Trayectoria</h2>
      <dl>
        ${HISTORIA_FAQS.map((f) => `<dt><strong>${f.question}</strong></dt><dd>${f.answer}</dd>`).join('')}
      </dl>
    `,
  },
  liderazgo: {
    pageId: 'liderazgo',
    path: '/liderazgo',
    title: 'Liderazgo y Equipo Directivo | Bytedav',
    description:
      'Conoce al equipo directivo de Bytedav liderado por bytedav., combinando visión estratégica, innovación digital y rigor operativo en cada negocio.',
    keywords:
      'David Bermúdez, CEO Bytedav, directivos Bytedav, liderazgo empresarial, equipo directivo, fundadores de holding',
    author: 'Bytedav',
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
    faqs: LIDERAZGO_FAQS,
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
          name: LEADERS[0]?.name || 'bytedav.',
          jobTitle: LEADERS[0]?.area || 'Fundador y CEO',
          description: LEADERS[0]?.bio,
          image: `${DOMAIN}${LEADERS[0]?.image || '/david bermudez.png'}`,
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
      createFaqSchema(LIDERAZGO_FAQS),
    ],
    noscriptSummary: `
      <h1>Liderazgo Directivo — Bytedav</h1>
      <p>Quien firma cada decisión estratégica y lidera la visión de Bytedav.</p>
      <h2>${LEADERS[0]?.name} — ${LEADERS[0]?.area}</h2>
      <p>${LEADERS[0]?.bio}</p>
      <p>Especialidades: ${(LEADERS[0]?.specialties || []).join(', ')}</p>
      <p>Contacto: <a href="mailto:${LEADERS[0]?.email}">${LEADERS[0]?.email}</a></p>
      <h2>Preguntas Frecuentes</h2>
      <dl>
        ${LIDERAZGO_FAQS.map((f) => `<dt><strong>${f.question}</strong></dt><dd>${f.answer}</dd>`).join('')}
      </dl>
    `,
  },
  marcas: {
    pageId: 'marcas',
    path: '/marcas',
    title: 'Marcas y Ecosistema de Empresas | Bytedav',
    description:
      'Explora el portafolio de marcas de Bytedav, incluyendo Kaelos: plataforma líder de venta y renting de motos nuevas y de ocasión con alcance integral.',
    keywords:
      'marcas Bytedav, portafolio de empresas, Kaelos, motos nuevas, ocasión certificada, renting de motos, plataformas de movilidad',
    author: 'Bytedav',
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
    faqs: MARCAS_FAQS,
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
      createFaqSchema(MARCAS_FAQS),
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
      <h2>Preguntas Frecuentes sobre el Portafolio</h2>
      <dl>
        ${MARCAS_FAQS.map((f) => `<dt><strong>${f.question}</strong></dt><dd>${f.answer}</dd>`).join('')}
      </dl>
      <p>¿Buscas inversión o alianza estratégica? Escríbenos a <a href="mailto:${HOLDING_CONFIG.contactEmail}">${HOLDING_CONFIG.contactEmail}</a>.</p>
    `,
  },
  blog: {
    pageId: 'blog',
    path: '/blog',
    title: 'Blog y Perspectivas | Bytedav',
    description:
      'Artículos, análisis y perspectivas sobre tecnología, modelos de holding y economía real compartidos por el equipo directivo de Bytedav.',
    keywords:
      'blog Bytedav, artículos tecnología, tesis de inversión, soberanía de software, modelo holding, economía real, Kaelos análisis',
    author: 'Bytedav',
    canonicalUrl: `${DOMAIN}/blog`,
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
    priority: 0.8,
    lastmod: LAST_MOD_DATE,
    jsonLd: [
      corporationSchema,
      {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        '@id': `${DOMAIN}/blog#blog`,
        url: `${DOMAIN}/blog`,
        name: 'Blog y Perspectivas — Bytedav',
        description: 'Ideas y análisis sobre tecnología y economía real del holding Bytedav.',
        inLanguage: 'es',
        publisher: {
          '@id': `${DOMAIN}/#corporation`,
        },
        blogPost: BLOG_POSTS.map((post) => ({
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          inLanguage: 'es',
          author: {
            '@type': 'Person',
            name: post.author,
          },
        })),
      },
      createBreadcrumbs([
        { name: 'Inicio', url: `${DOMAIN}/` },
        { name: 'Blog', url: `${DOMAIN}/blog` },
      ]),
    ],
    noscriptSummary: `
      <h1>Blog y Perspectivas — Bytedav</h1>
      <p>Ideas, análisis y reflexiones sobre tecnología, escalamiento y modelos de negocio en la economía real.</p>
      <h2>Artículos Recientes</h2>
      <ul>
        ${BLOG_POSTS.map((p) => `
          <li>
            <h3>${p.title}</h3>
            <p>${p.date} · ${p.readTime} · Por ${p.author}</p>
            <p>${p.description}</p>
          </li>
        `).join('')}
      </ul>
      <nav>
        <a href="/">Inicio</a> |
        <a href="/historia">Historia</a> |
        <a href="/liderazgo">Liderazgo</a> |
        <a href="/marcas">Marcas</a>
      </nav>
    `,
  },
  '404': {
    pageId: '404',
    path: '/404',
    title: 'Página no encontrada (404) | Bytedav',
    description:
      'La página solicitada no existe o ha sido movida. Regresa al sitio corporativo de Bytedav para explorar nuestras marcas, historia y equipo directivo.',
    keywords: '404, página no encontrada, Bytedav',
    author: 'Bytedav',
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

export function getBlogPostSEO(slug: string): RouteSEO | null {
  const post = BLOG_POSTS.find((p) => (p.slug || p.id) === slug);
  if (!post) return null;

  const postSlug = post.slug || post.id || '';
  const canonicalUrl = `${DOMAIN}/blog/${postSlug}`;
  const brandedTitle = `${post.title} | Bytedav`;
  const title = brandedTitle.length <= 60 ? brandedTitle : post.title.slice(0, 60);

  return {
    pageId: 'blog',
    path: `/blog/${postSlug}`,
    title,
    description: post.description,
    keywords: `Bytedav, ${post.title.toLowerCase()}, tesis holding, tecnología economía real, David Bermúdez`,
    author: post.author || 'bytedav.',
    canonicalUrl,
    ogImage: DEFAULT_OG_IMAGE,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageType: 'image/png',
    ogType: 'article',
    ogLocale: DEFAULT_LOCALE,
    siteName: HOLDING_CONFIG.name,
    twitterCard: 'summary_large_image',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    changefreq: 'monthly',
    priority: 0.7,
    lastmod: post.date || LAST_MOD_DATE,
    jsonLd: [
      corporationSchema,
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        '@id': `${canonicalUrl}#article`,
        mainEntityOfPage: canonicalUrl,
        headline: post.title,
        description: post.description,
        articleBody: post.content || post.description,
        datePublished: post.date,
        inLanguage: 'es',
        author: {
          '@type': 'Person',
          name: post.author || 'bytedav.',
        },
        publisher: {
          '@id': `${DOMAIN}/#corporation`,
        },
      },
      createBreadcrumbs([
        { name: 'Inicio', url: `${DOMAIN}/` },
        { name: 'Blog', url: `${DOMAIN}/blog` },
        { name: post.title, url: canonicalUrl },
      ]),
    ],
    noscriptSummary: `
      <article>
        <h1>${post.title}</h1>
        <p><strong>Fecha:</strong> ${post.date} · <strong>Lectura:</strong> ${post.readTime} · <strong>Autor:</strong> ${post.author}</p>
        <p><em>${post.description}</em></p>
        <div>
          ${(post.content || post.description)
            .split('\n\n')
            .map((p) => `<p>${p}</p>`)
            .join('')}
        </div>
        <p><a href="/blog">Volver al Blog de Bytedav</a></p>
      </article>
    `,
  };
}

export const SITEMAP_ROUTES = [
  SEO_CONFIG.home,
  SEO_CONFIG.historia,
  SEO_CONFIG.liderazgo,
  SEO_CONFIG.marcas,
  SEO_CONFIG.blog,
  ...BLOG_POSTS.map((post) => getBlogPostSEO(post.slug || post.id!)).filter(
    (item): item is RouteSEO => item !== null
  ),
];
