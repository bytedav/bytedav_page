import { useEffect } from 'react';
import { PageId } from '../types';
import { SEO_CONFIG, RouteSEO, getBlogPostSEO } from '../seo/seoConfig';

const ensureMetaTag = (attributeName: 'name' | 'property', attributeValue: string): HTMLMetaElement => {
  const selector = `meta[${attributeName}="${attributeValue}"]`;
  let element = document.querySelector(selector) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }
  return element;
};

const setMetaContent = (attributeName: 'name' | 'property', attributeValue: string, content: string | undefined) => {
  if (content === undefined) return;
  const element = ensureMetaTag(attributeName, attributeValue);
  element.setAttribute('content', content);
};

const ensureCanonicalLink = (href: string) => {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
};

export function useSEO(currentPage: PageId, currentSlug?: string) {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    let seo: RouteSEO;
    if (currentPage === 'blog' && currentSlug) {
      const blogPostSeo = getBlogPostSEO(currentSlug);
      seo = blogPostSeo || SEO_CONFIG.blog;
    } else {
      seo = SEO_CONFIG[currentPage] || SEO_CONFIG['404'];
    }

    // 1. Document Title
    document.title = seo.title;

    // 2. Standard Meta Tags & AI Directives
    setMetaContent('name', 'description', seo.description);
    setMetaContent('name', 'robots', seo.robots);
    setMetaContent('name', 'keywords', seo.keywords);
    setMetaContent('name', 'author', seo.author);

    // AI & Search Engine Specific Directives
    if (seo.pageId !== '404') {
      setMetaContent('name', 'googlebot', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
      setMetaContent('name', 'bingbot', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    } else {
      setMetaContent('name', 'googlebot', 'noindex, follow');
      setMetaContent('name', 'bingbot', 'noindex, follow');
    }

    // 3. OpenGraph Tags
    setMetaContent('property', 'og:title', seo.title);
    setMetaContent('property', 'og:description', seo.description);
    setMetaContent('property', 'og:url', seo.canonicalUrl);
    setMetaContent('property', 'og:image', seo.ogImage);
    setMetaContent('property', 'og:type', seo.ogType);
    setMetaContent('property', 'og:site_name', seo.siteName);
    setMetaContent('property', 'og:locale', seo.ogLocale);
    if (seo.ogImageWidth) {
      setMetaContent('property', 'og:image:width', seo.ogImageWidth.toString());
    }
    if (seo.ogImageHeight) {
      setMetaContent('property', 'og:image:height', seo.ogImageHeight.toString());
    }
    if (seo.ogImageType) {
      setMetaContent('property', 'og:image:type', seo.ogImageType);
    }

    // Article Specific OpenGraph Tags
    if (seo.ogType === 'article') {
      setMetaContent('property', 'article:published_time', seo.lastmod);
      setMetaContent('property', 'article:author', seo.author);
      setMetaContent('property', 'article:section', 'Tecnología y Negocios');
    }

    // 4. Twitter Card Tags
    setMetaContent('name', 'twitter:card', seo.twitterCard);
    setMetaContent('name', 'twitter:title', seo.title);
    setMetaContent('name', 'twitter:description', seo.description);
    setMetaContent('name', 'twitter:image', seo.ogImage);

    // 5. Canonical Link
    ensureCanonicalLink(seo.canonicalUrl);

    // 6. Schema.org Structured Data (JSON-LD)
    const JSON_LD_ID = 'seo-jsonld';
    let scriptElement = document.getElementById(JSON_LD_ID) as HTMLScriptElement | null;

    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.id = JSON_LD_ID;
      scriptElement.type = 'application/ld+json';
      document.head.appendChild(scriptElement);
    }

    if (seo.jsonLd && seo.jsonLd.length > 0) {
      const payload =
        seo.jsonLd.length === 1
          ? seo.jsonLd[0]
          : {
              '@context': 'https://schema.org',
              '@graph': seo.jsonLd.map((item) => {
                const copy = { ...item };
                delete copy['@context'];
                return copy;
              }),
            };
      scriptElement.textContent = JSON.stringify(payload);
    } else {
      scriptElement.textContent = '';
    }
  }, [currentPage, currentSlug]);
}
