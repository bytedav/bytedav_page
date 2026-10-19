import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SEO_CONFIG, SITEMAP_ROUTES, RouteSEO } from '../src/seo/seoConfig.js';
import { HOLDING_CONFIG, PORTFOLIO_BRANDS, LEADERS, MILESTONES, HOLDING_PILLARS } from '../src/data/holdingData.js';

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

  // 3. Replace or Inject Robots
  if (html.includes('name="robots"')) {
    html = html.replace(/<meta\s+name="robots"\s+content=".*?"\s*\/?>/is, `<meta name="robots" content="${seo.robots}" />`);
  } else {
    html = html.replace('</head>', `  <meta name="robots" content="${seo.robots}" />\n</head>`);
  }

  // 4. Replace or Inject Canonical Link
  if (html.includes('rel="canonical"')) {
    html = html.replace(/<link\s+rel="canonical"\s+href=".*?"\s*\/?>/is, `<link rel="canonical" href="${seo.canonicalUrl}" />`);
  } else {
    html = html.replace('</head>', `  <link rel="canonical" href="${seo.canonicalUrl}" />\n</head>`);
  }

  // 5. Replace OpenGraph Tags
  html = html.replace(/<meta\s+property="og:title"\s+content=".*?"\s*\/?>/is, `<meta property="og:title" content="${seo.title}" />`);
  html = html.replace(/<meta\s+property="og:description"\s+content=".*?"\s*\/?>/is, `<meta property="og:description" content="${seo.description}" />`);
  html = html.replace(/<meta\s+property="og:url"\s+content=".*?"\s*\/?>/is, `<meta property="og:url" content="${seo.canonicalUrl}" />`);
  html = html.replace(/<meta\s+property="og:image"\s+content=".*?"\s*\/?>/is, `<meta property="og:image" content="${seo.ogImage}" />`);
  html = html.replace(/<meta\s+property="og:type"\s+content=".*?"\s*\/?>/is, `<meta property="og:type" content="${seo.ogType}" />`);

  // 6. Replace Twitter Tags
  html = html.replace(/<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/is, `<meta name="twitter:title" content="${seo.title}" />`);
  html = html.replace(/<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/is, `<meta name="twitter:description" content="${seo.description}" />`);
  html = html.replace(/<meta\s+name="twitter:image"\s+content=".*?"\s*\/?>/is, `<meta name="twitter:image" content="${seo.ogImage}" />`);
  html = html.replace(/<meta\s+name="twitter:card"\s+content=".*?"\s*\/?>/is, `<meta name="twitter:card" content="${seo.twitterCard}" />`);

  // 7. Inject JSON-LD
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

  // 8. Inject noscript content inside body
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

# AI & LLM Search Crawlers
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

User-agent: Applebot-Extended
Allow: /

User-agent: CCBot
Allow: /

# Sitemap
Sitemap: ${HOLDING_CONFIG.domain}/sitemap.xml
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

  const pillarLines = HOLDING_PILLARS.map((p) => `- ${p.title}`).join('\n');

  return `# ${HOLDING_CONFIG.name} — Holding Tecnológico

> ${HOLDING_CONFIG.name} es un holding operador tecnológico especializado en concebir, estructurar y escalar empresas verticales con alto componente tecnológico y enfoque en la economía real.

## Resumen Corporativo

${HOLDING_CONFIG.name} opera bajo un modelo de autonomía operativa, infraestructura técnica compartida y disciplina de capital. Desarrolla y potencia soluciones digitales líderes como Kaelos en el sector de motocicletas y movilidad.

${leaderLine}
- **Contacto Corporativo**: ${HOLDING_CONFIG.contactEmail}
- **Sitio Web Oficial**: ${HOLDING_CONFIG.domain}/

## Marcas del Portafolio

${brandLines}

## Enlaces del Sitio Web

- [Inicio](${HOLDING_CONFIG.domain}/): Visión general del holding, tesis operativa y catálogo de marcas del portafolio.
- [Historia y Trayectoria](${HOLDING_CONFIG.domain}/historia): Origen, hitos fundacionales de ${HOLDING_CONFIG.name} y pilares estratégicos de operación.
- [Liderazgo Directivo](${HOLDING_CONFIG.domain}/liderazgo): Perfil de la dirección general (${leader?.name}) y áreas de especialidad.
- [Marcas](${HOLDING_CONFIG.domain}/marcas): Ecosistema y plataformas operadas por el holding.

## Pilares Estratégicos

${pillarLines}

## Hitos Clave

${milestoneLines}
`;
}

export function runPrerender() {
  console.log('🚀 Running SEO Prerender and Crawlers Generation...');

  const indexPath = path.join(distDir, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.warn('⚠️ dist/index.html not found. Running only public/ file generation.');
  } else {
    const baseHtml = fs.readFileSync(indexPath, 'utf-8');

    // 1. Home
    const homeHtml = generatePageHtml(baseHtml, SEO_CONFIG.home);
    fs.writeFileSync(path.join(distDir, 'index.html'), homeHtml, 'utf-8');
    console.log('✅ Generated dist/index.html with home SEO');

    // 2. Historia
    const historiaDir = path.join(distDir, 'historia');
    fs.mkdirSync(historiaDir, { recursive: true });
    const historiaHtml = generatePageHtml(baseHtml, SEO_CONFIG.historia);
    fs.writeFileSync(path.join(historiaDir, 'index.html'), historiaHtml, 'utf-8');
    console.log('✅ Generated dist/historia/index.html');

    // 3. Liderazgo
    const liderazgoDir = path.join(distDir, 'liderazgo');
    fs.mkdirSync(liderazgoDir, { recursive: true });
    const liderazgoHtml = generatePageHtml(baseHtml, SEO_CONFIG.liderazgo);
    fs.writeFileSync(path.join(liderazgoDir, 'index.html'), liderazgoHtml, 'utf-8');
    console.log('✅ Generated dist/liderazgo/index.html');

    // 4. Marcas
    const marcasDir = path.join(distDir, 'marcas');
    fs.mkdirSync(marcasDir, { recursive: true });
    const marcasHtml = generatePageHtml(baseHtml, SEO_CONFIG.marcas);
    fs.writeFileSync(path.join(marcasDir, 'index.html'), marcasHtml, 'utf-8');
    console.log('✅ Generated dist/marcas/index.html');

    // 5. 404
    const notFoundHtml = generatePageHtml(baseHtml, SEO_CONFIG['404']);
    fs.writeFileSync(path.join(distDir, '404.html'), notFoundHtml, 'utf-8');
    console.log('✅ Generated dist/404.html with noindex');
  }

  // Sitemaps, robots.txt, and llms.txt (written to both public/ and dist/ if dist exists)
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
  console.log('✅ Generated robots.txt with AI crawlers and Sitemap directive');

  const llmsTxt = generateLlmsTxt();
  fs.writeFileSync(path.join(publicDir, 'llms.txt'), llmsTxt, 'utf-8');
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'llms.txt'), llmsTxt, 'utf-8');
  }
  console.log('✅ Generated llms.txt synced from holdingData.ts (Kaelos founded in 2026, leader David Bermúdez A.)');

  console.log('🎉 Static SEO prerender completed successfully.');
}

runPrerender();
