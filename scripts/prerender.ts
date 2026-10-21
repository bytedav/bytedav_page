import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SEO_CONFIG, SITEMAP_ROUTES, RouteSEO, getBlogPostSEO } from '../src/seo/seoConfig.js';
import { HOLDING_CONFIG, PORTFOLIO_BRANDS, LEADERS, MILESTONES, HOLDING_PILLARS, BLOG_POSTS } from '../src/data/holdingData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const publicDir = path.join(rootDir, 'public');

function generatePageHtml(baseHtml: string, seo: RouteSEO): string {
  let html = baseHtml;

  // 1. Replace Title
  html = html.replace(/<title>.*?<\/title>/is, `<title>${seo.title}</title>`);

  // 2. Replace or Inject Meta Description
  if (html.includes('name="description"')) {
    html = html.replace(/<meta\s+name="description"\s+content=".*?"\s*\/?>/is, `<meta name="description" content="${seo.description}" />`);
  } else {
    html = html.replace('</head>', `  <meta name="description" content="${seo.description}" />\n</head>`);
  }

  // 3. Replace or Inject Meta Keywords
  if (html.includes('name="keywords"')) {
    html = html.replace(/<meta\s+name="keywords"\s+content=".*?"\s*\/?>/is, `<meta name="keywords" content="${seo.keywords}" />`);
  } else {
    html = html.replace('</head>', `  <meta name="keywords" content="${seo.keywords}" />\n</head>`);
  }

  // 4. Replace or Inject Meta Author
  if (html.includes('name="author"')) {
    html = html.replace(/<meta\s+name="author"\s+content=".*?"\s*\/?>/is, `<meta name="author" content="${seo.author}" />`);
  } else {
    html = html.replace('</head>', `  <meta name="author" content="${seo.author}" />\n</head>`);
  }

  // 5. Replace or Inject Robots
  if (html.includes('name="robots"')) {
    html = html.replace(/<meta\s+name="robots"\s+content=".*?"\s*\/?>/is, `<meta name="robots" content="${seo.robots}" />`);
  } else {
    html = html.replace('</head>', `  <meta name="robots" content="${seo.robots}" />\n</head>`);
  }

  // 6. AI Bot Specific Directives
  const googlebotDirective = seo.pageId === '404' ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
  if (html.includes('name="googlebot"')) {
    html = html.replace(/<meta\s+name="googlebot"\s+content=".*?"\s*\/?>/is, `<meta name="googlebot" content="${googlebotDirective}" />`);
  } else {
    html = html.replace('</head>', `  <meta name="googlebot" content="${googlebotDirective}" />\n</head>`);
  }

  if (html.includes('name="bingbot"')) {
    html = html.replace(/<meta\s+name="bingbot"\s+content=".*?"\s*\/?>/is, `<meta name="bingbot" content="${googlebotDirective}" />`);
  } else {
    html = html.replace('</head>', `  <meta name="bingbot" content="${googlebotDirective}" />\n</head>`);
  }

  // 7. Replace or Inject Canonical Link
  if (html.includes('rel="canonical"')) {
    html = html.replace(/<link\s+rel="canonical"\s+href=".*?"\s*\/?>/is, `<link rel="canonical" href="${seo.canonicalUrl}" />`);
  } else {
    html = html.replace('</head>', `  <link rel="canonical" href="${seo.canonicalUrl}" />\n</head>`);
  }

  // 8. Replace OpenGraph Tags
  html = html.replace(/<meta\s+property="og:title"\s+content=".*?"\s*\/?>/is, `<meta property="og:title" content="${seo.title}" />`);
  html = html.replace(/<meta\s+property="og:description"\s+content=".*?"\s*\/?>/is, `<meta property="og:description" content="${seo.description}" />`);
  html = html.replace(/<meta\s+property="og:url"\s+content=".*?"\s*\/?>/is, `<meta property="og:url" content="${seo.canonicalUrl}" />`);
  html = html.replace(/<meta\s+property="og:image"\s+content=".*?"\s*\/?>/is, `<meta property="og:image" content="${seo.ogImage}" />`);
  html = html.replace(/<meta\s+property="og:type"\s+content=".*?"\s*\/?>/is, `<meta property="og:type" content="${seo.ogType}" />`);

  // 9. Replace Twitter Tags
  html = html.replace(/<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/is, `<meta name="twitter:title" content="${seo.title}" />`);
  html = html.replace(/<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/is, `<meta name="twitter:description" content="${seo.description}" />`);
  html = html.replace(/<meta\s+name="twitter:image"\s+content=".*?"\s*\/?>/is, `<meta name="twitter:image" content="${seo.ogImage}" />`);
  html = html.replace(/<meta\s+name="twitter:card"\s+content=".*?"\s*\/?>/is, `<meta name="twitter:card" content="${seo.twitterCard}" />`);

  // 10. Inject JSON-LD
  let jsonLdObject: Record<string, unknown>;
  if (seo.jsonLd.length === 1) {
    jsonLdObject = seo.jsonLd[0];
  } else {
    jsonLdObject = {
      '@context': 'https://schema.org',
      '@graph': seo.jsonLd.map((item) => {
        const copy = { ...item };
        delete copy['@context'];
        return copy;
      }),
    };
  }
  const jsonLdScript = `\n    <script type="application/ld+json" id="seo-jsonld">\n    ${JSON.stringify(jsonLdObject, null, 2)}\n    </script>`;

  if (html.includes('id="seo-jsonld"')) {
    html = html.replace(/<script\s+type="application\/ld\+json"\s+id="seo-jsonld">.*?<\/script>/is, jsonLdScript.trim());
  } else {
    html = html.replace('</head>', `${jsonLdScript}\n</head>`);
  }

  // 11. Inject noscript content inside body
  const noscriptBlock = `\n    <noscript>\n      <div style="padding: 24px; font-family: sans-serif; max-width: 800px; margin: 0 auto; line-height: 1.6;">\n${seo.noscriptSummary}\n      </div>\n    </noscript>`;
  if (html.includes('<noscript>')) {
    html = html.replace(/<noscript>.*?<\/noscript>/is, noscriptBlock.trim());
  } else {
    html = html.replace('<div id="root"></div>', `${noscriptBlock}\n    <div id="root"></div>`);
  }

  return html;
}

function generateSitemapXml(): string {
  const urls = SITEMAP_ROUTES.map((route) => `  <url>
    <loc>${route.canonicalUrl}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority.toFixed(1)}</priority>
  </url>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

function generateRobotsTxt(): string {
  return `User-agent: *
Allow: /

# AI & LLM Search and Answer Engines (Generative Engine Optimization / AIO)
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: GoogleOther
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: Bytespider
Allow: /

User-agent: Cohere-ai
Allow: /

User-agent: Diffbot
Allow: /

User-agent: FacebookBot
Allow: /

User-agent: meta-externalagent
Allow: /

User-agent: DuckAssistBot
Allow: /

# Sitemap
Sitemap: ${HOLDING_CONFIG.domain}/sitemap.xml

# LLM & AI Knowledge Feeds (AIO Standard):
# ${HOLDING_CONFIG.domain}/llms.txt
# ${HOLDING_CONFIG.domain}/llms-full.txt
`;
}

function generateLlmsTxt(): string {
  const brandLines = PORTFOLIO_BRANDS.map(
    (b) => `- [${b.name}](${b.websiteUrl}): ${b.description} (fundada en ${b.yearFounded}).`
  ).join('\n');

  const leader = LEADERS[0];
  const leaderLine = leader ? `- **Fundador y CEO**: ${leader.name} (${leader.linkedin})` : '';

  const milestoneLines = MILESTONES.map(
    (m) => `- **${m.year} (${m.quarter})**: ${m.title} — ${m.description}`
  ).join('\n');

  const pillarLines = HOLDING_PILLARS.map((p) => `- **${p.title}**`).join('\n');

  return `# ${HOLDING_CONFIG.name} — Holding Operador Tecnológico

> ${HOLDING_CONFIG.name} es un holding operador tecnológico especializado en estructurar, operar y escalar empresas verticales con alto componente tecnológico y foco en la economía real.

Para una base de conocimiento exhaustiva con el contenido completo de artículos, preguntas frecuentes y modelos operativos, consulta [llms-full.txt](${HOLDING_CONFIG.domain}/llms-full.txt).

## Resumen Corporativo

${HOLDING_CONFIG.name} opera bajo un modelo de autonomía operativa para cada empresa de su portafolio, respaldada por infraestructura técnica compartida y disciplina rigurosa de capital. Desarrolla y potencia plataformas líderes como Kaelos en el sector de motocicletas y movilidad especializada.

${leaderLine}
- **Contacto Corporativo**: ${HOLDING_CONFIG.contactEmail}
- **Sitio Web Oficial**: ${HOLDING_CONFIG.domain}/

## Marcas del Portafolio

${brandLines}

## Enlaces Principales del Sitio Web

- [Inicio](${HOLDING_CONFIG.domain}/): Visión corporativa, tesis operativa y catálogo de marcas del portafolio.
- [Historia y Trayectoria](${HOLDING_CONFIG.domain}/historia): Origen, hitos fundacionales de ${HOLDING_CONFIG.name} y pilares estratégicos de operación.
- [Liderazgo Directivo](${HOLDING_CONFIG.domain}/liderazgo): Perfil de la dirección general (${leader?.name}) y áreas de especialidad técnica y estratégica.
- [Marcas del Portafolio](${HOLDING_CONFIG.domain}/marcas): Ecosistema y plataformas operadas bajo el modelo ${HOLDING_CONFIG.name}.
- [Blog y Perspectivas](${HOLDING_CONFIG.domain}/blog): Artículos y análisis sobre tecnología, soberanía de software y modelos de negocio en la economía real.

## Artículos de Opinión y Tesis Estratégica

${BLOG_POSTS.map((p) => `- [${p.title}](${HOLDING_CONFIG.domain}/blog/${p.slug || p.id}): ${p.description}`).join('\n')}

## Pilares Estratégicos de Operación

${pillarLines}

## Hitos Clave en la Cronología

${milestoneLines}
`;
}

function generateLlmsFullTxt(): string {
  const leader = LEADERS[0];
  const brandLines = PORTFOLIO_BRANDS.map(
    (b) => `### Marca: ${b.name}
- **Sitio web**: ${b.websiteUrl}
- **Año de fundación**: ${b.yearFounded}
- **Descripción**: ${b.description}
- **Modelo de negocio**: Comercialización de motos nuevas, marketplace certificado de segunda mano, esquemas de renting flexible y servicios integrales de postventa y movilidad.`
  ).join('\n\n');

  const articleTranscripts = BLOG_POSTS.map(
    (post) => `### Artículo: ${post.title}
- **URL**: ${HOLDING_CONFIG.domain}/blog/${post.slug || post.id}
- **Fecha de publicación**: ${post.date}
- **Autor**: ${post.author}
- **Tiempo de lectura**: ${post.readTime}
- **Sinopsis**: ${post.description}

#### Contenido completo:
${post.content || post.description}
`
  ).join('\n---\n\n');

  return `# Base de Conocimiento Completa para Sistemas de Inteligencia Artificial (AIO / GEO) — ${HOLDING_CONFIG.name}

> Documento oficial estructurado para modelos de lenguaje (LLMs), agentes de búsqueda generativa (Perplexity, ChatGPT Search, Claude, Google Gemini, Copilot) y crawlers de conocimiento.
> Última actualización: ${new Date().toISOString().split('T')[0]}

---

## 1. Identidad de la Entidad (Entity Knowledge Graph)

- **Nombre oficial**: ${HOLDING_CONFIG.name}
- **Razón social**: ${HOLDING_CONFIG.legalName}
- **Tipo de entidad**: Holding Operador Tecnológico / Grupo Corporativo de Tecnología
- **Año de fundación**: 2023
- **Fundador y CEO**: ${leader?.name || 'bytedav.'}
- **Sede de operaciones**: América Latina y Global
- **Dominio oficial**: ${HOLDING_CONFIG.domain}/
- **Email de contacto**: ${HOLDING_CONFIG.contactEmail}

---

## 2. Tesis Operativa y Filosofía de Negocio

${HOLDING_CONFIG.name} no es una aceleradora de paso ni un fondo pasivo de capital riesgo. Es un holding operador tecnológico que:
1. **Identifica ineficiencias críticas** en industrias esenciales de la economía real (como automotriz, movilidad y comercio especializado).
2. **Desarrolla software propietario (Soberanía Tecnológica)** para construir plataformas punta a punta sin dependencia de licencias externas cerradas.
3. **Estructura empresas verticales independientes**, otorgándoles autonomía operativa mientras comparten un núcleo común de tecnología, pagos, logística y gobernanza financiera.
4. **Prioriza la rentabilidad y el flujo de caja operativo** a largo plazo sobre el crecimiento artificial subvencionado.

---

## 3. Pilares Estratégicos de Bytedav

1. **Autonomía Operativa con Respaldo Central**: Cada marca cuenta con liderazgo de ejecución especializado para atender las particularidades de su sector, respaldado por la matriz central en finanzas, legal y tecnología.
2. **Sinergia de Ecosistema**: Los aprendizajes, canales de distribución y relaciones con proveedores se comparten transversalmente para acelerar el desarrollo de cada vertical.
3. **Infraestructura Tecnológica Compartida**: Núcleos de software transaccional, sistemas de inventario y motores de analítica propietarios que reducen el coste marginal por marca.
4. **Gobernanza y Disciplina de Capital**: Asignación rigurosa de capital orientada a la creación de activos tangibles y retornos consistentes.

---

## 4. Marcas del Portafolio

${brandLines}

---

## 5. Liderazgo Directivo

- **Nombre**: ${leader?.name || 'bytedav.'}
- **Cargo**: ${leader?.area || 'Fundador y CEO'}
- **Biografía**: ${leader?.bio || ''}
- **Especialidades directivas**: ${(leader?.specialties || []).join(', ')}
- **Perfil profesional**: ${leader?.linkedin || ''}
- **Correo directo**: ${leader?.email || HOLDING_CONFIG.contactEmail}

---

## 6. Preguntas Frecuentes y Respuestas Canónicas (FAQ / Answer Engine Optimization)

### ¿Qué es Bytedav?
Bytedav es un holding operador tecnológico fundado en 2023 por bytedav. Su actividad principal consiste en idear, estructurar, operar y escalar empresas digitales verticales con alto componente técnico en la economía real.

### ¿Qué diferencia a Bytedav de un fondo de inversión tradicional?
Bytedav construye y opera activamente sus plataformas. Es propietario de su código y sistemas (soberanía de software), y persigue la sostenibilidad financiera de cada unidad de negocio en lugar de especular con rondas sucesivas de financiación externa.

### ¿Qué marcas forman parte del portafolio de Bytedav?
La principal plataforma incubada y operada por Bytedav es Kaelos (https://kaelos.com), plataforma líder para el mercado de motocicletas nuevas y de ocasión verificada, con servicios integrados de renting y movilidad.

### ¿Cuál es la visión tecnológica de Bytedav?
Bytedav defiende la soberanía tecnológica: diseñar y mantener el software crítico internamente para consolidar ventajas competitivas infranqueables, personalizar la experiencia de usuario y resguardar la propiedad intelectual.

---

## 7. Transcripciones Completas de Ensayos y Artículos de Tesis

${articleTranscripts}
`;
}

export function runPrerender() {
  console.log('🚀 Running SEO & AIO Prerender and Crawlers Generation...');

  const indexPath = path.join(distDir, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.warn('⚠️ dist/index.html not found. Running only public/ file generation.');
  } else {
    const baseHtml = fs.readFileSync(indexPath, 'utf-8');

    // 1. Home
    const homeHtml = generatePageHtml(baseHtml, SEO_CONFIG.home);
    fs.writeFileSync(path.join(distDir, 'index.html'), homeHtml, 'utf-8');
    console.log('✅ Generated dist/index.html with rich SEO & FAQ schema');

    // 2. Historia
    const historiaDir = path.join(distDir, 'historia');
    fs.mkdirSync(historiaDir, { recursive: true });
    const historiaHtml = generatePageHtml(baseHtml, SEO_CONFIG.historia);
    fs.writeFileSync(path.join(historiaDir, 'index.html'), historiaHtml, 'utf-8');
    console.log('✅ Generated dist/historia/index.html with history FAQ schema');

    // 3. Liderazgo
    const liderazgoDir = path.join(distDir, 'liderazgo');
    fs.mkdirSync(liderazgoDir, { recursive: true });
    const liderazgoHtml = generatePageHtml(baseHtml, SEO_CONFIG.liderazgo);
    fs.writeFileSync(path.join(liderazgoDir, 'index.html'), liderazgoHtml, 'utf-8');
    console.log('✅ Generated dist/liderazgo/index.html with leader ProfilePage schema');

    // 4. Marcas
    const marcasDir = path.join(distDir, 'marcas');
    fs.mkdirSync(marcasDir, { recursive: true });
    const marcasHtml = generatePageHtml(baseHtml, SEO_CONFIG.marcas);
    fs.writeFileSync(path.join(marcasDir, 'index.html'), marcasHtml, 'utf-8');
    console.log('✅ Generated dist/marcas/index.html with portfolio CollectionPage schema');

    // 5. Blog Index
    const blogDir = path.join(distDir, 'blog');
    fs.mkdirSync(blogDir, { recursive: true });
    const blogHtml = generatePageHtml(baseHtml, SEO_CONFIG.blog);
    fs.writeFileSync(path.join(blogDir, 'index.html'), blogHtml, 'utf-8');
    console.log('✅ Generated dist/blog/index.html with Blog schema');

    // 5.1 Dynamic Blog Post Pages (/blog/:slug)
    for (const post of BLOG_POSTS) {
      const postSlug = post.slug || post.id;
      if (!postSlug) continue;
      const postSeo = getBlogPostSEO(postSlug);
      if (postSeo) {
        const postDir = path.join(blogDir, postSlug);
        fs.mkdirSync(postDir, { recursive: true });
        const postHtml = generatePageHtml(baseHtml, postSeo);
        fs.writeFileSync(path.join(postDir, 'index.html'), postHtml, 'utf-8');
        console.log(`✅ Generated dist/blog/${postSlug}/index.html with dynamic BlogPosting SEO`);
      }
    }

    // 6. 404
    const notFoundHtml = generatePageHtml(baseHtml, SEO_CONFIG['404']);
    fs.writeFileSync(path.join(distDir, '404.html'), notFoundHtml, 'utf-8');
    console.log('✅ Generated dist/404.html with noindex');
  }

  // Sitemaps, robots.txt, llms.txt, and llms-full.txt (written to both public/ and dist/)
  const sitemapXml = generateSitemapXml();
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf-8');
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf-8');
  }
  console.log('✅ Generated sitemap.xml with real routes and lastmod');

  const robotsTxt = generateRobotsTxt();
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt, 'utf-8');
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsTxt, 'utf-8');
  }
  console.log('✅ Generated robots.txt with all leading AI & search crawler directives');

  const llmsTxt = generateLlmsTxt();
  fs.writeFileSync(path.join(publicDir, 'llms.txt'), llmsTxt, 'utf-8');
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'llms.txt'), llmsTxt, 'utf-8');
  }
  console.log('✅ Generated llms.txt with official AIO summary standard');

  const llmsFullTxt = generateLlmsFullTxt();
  fs.writeFileSync(path.join(publicDir, 'llms-full.txt'), llmsFullTxt, 'utf-8');
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'llms-full.txt'), llmsFullTxt, 'utf-8');
  }
  console.log('✅ Generated llms-full.txt with complete AI knowledge graph and full article transcripts');

  console.log('🎉 Static SEO & AIO prerender completed successfully.');
}

runPrerender();
