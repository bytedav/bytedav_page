import { useEffect } from 'react';
import { PageId } from '../types';

interface PageSEO {
  title: string;
  description: string;
  url: string;
}

const SEO_MAP: Record<PageId, PageSEO> = {
  home: {
    title: 'Bytedav',
    description: 'Conoce Bytedav, holding tecnológico operador de plataformas líderes. Innovación, estrategia y valor real.',
    url: 'https://bytedav.com/',
  },
  historia: {
    title: 'Nuestra Historia y Trayectoria | Bytedav',
    description: 'Descubre los orígenes, hitos fundacionales y pilares de Bytedav. Construimos soluciones de tecnología con soberanía técnica y disciplina de capital.',
    url: 'https://bytedav.com/historia',
  },
  liderazgo: {
    title: 'Equipo y Liderazgo Directivo | Bytedav',
    description: 'Conoce el equipo directivo de Bytedav encabezado por David Bermúdez A., impulsando plataformas digitales con enfoque en estrategia y tecnología.',
    url: 'https://bytedav.com/liderazgo',
  },
  marcas: {
    title: 'Nuestras Marcas y Ecosistema | Bytedav',
    description: 'Explora el portafolio de marcas de Bytedav, incluyendo Kaelos: plataforma líder en venta de motos nuevas y de ocasión, renting y servicios.',
    url: 'https://bytedav.com/marcas',
  },
};

export function useSEO(currentPage: PageId) {
  useEffect(() => {
    const seo = SEO_MAP[currentPage] || SEO_MAP.home;

    // Update document title
    document.title = seo.title;

    // Helper to update or create meta tags
    const updateMeta = (selector: string, attribute: 'name' | 'property', name: string, content: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Update standard meta description
    updateMeta('meta[name="description"]', 'name', 'description', seo.description);

    // Update Open Graph tags
    updateMeta('meta[property="og:title"]', 'property', 'og:title', seo.title);
    updateMeta('meta[property="og:description"]', 'property', 'og:description', seo.description);
    updateMeta('meta[property="og:url"]', 'property', 'og:url', seo.url);

    // Update Twitter tags
    updateMeta('meta[name="twitter:title"]', 'name', 'twitter:title', seo.title);
    updateMeta('meta[name="twitter:description"]', 'name', 'twitter:description', seo.description);

    // Update Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', seo.url);
  }, [currentPage]);
}
