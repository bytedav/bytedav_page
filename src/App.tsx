import React, { useState, useEffect } from 'react';
import { PageId } from './types';
import { useSEO } from './hooks/useSEO';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { HistoriaPage } from './pages/HistoriaPage';
import { LiderazgoPage } from './pages/LiderazgoPage';
import { MarcasPage } from './pages/MarcasPage';
import { BlogPage } from './pages/BlogPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [currentSlug, setCurrentSlug] = useState<string | undefined>(undefined);

  // Dynamically update SEO metadata, social graph tags and canonical link
  useSEO(currentPage, currentSlug);

  // Parse path to PageId and dynamic slug (e.g. /blog/kaelos-digitalizacion)
  const getRouteInfoFromLocation = (): { page: PageId; slug?: string } => {
    if (window.location.hash) {
      const cleanHash = window.location.hash.replace('#/', '').replace('#', '').trim();
      let targetPage: PageId = 'home';
      let slug: string | undefined = undefined;

      if (cleanHash === 'blog') {
        targetPage = 'blog';
      } else if (cleanHash.startsWith('blog/')) {
        targetPage = 'blog';
        slug = cleanHash.replace(/^blog\//, '').trim();
      } else if (['home', 'historia', 'liderazgo', 'marcas'].includes(cleanHash)) {
        targetPage = cleanHash as PageId;
      } else if (cleanHash) {
        targetPage = '404';
      }

      const cleanPath =
        targetPage === 'home' ? '/' : slug ? `/blog/${slug}` : `/${targetPage}`;
      window.history.replaceState(null, '', cleanPath);
      return { page: targetPage, slug };
    }

    const rawPath = window.location.pathname.replace(/^\/+|\/+$/g, '').trim();
    if (!rawPath || rawPath === 'home') {
      return { page: 'home' };
    }

    if (rawPath === 'blog') {
      return { page: 'blog' };
    }

    if (rawPath.startsWith('blog/')) {
      const slug = rawPath.replace(/^blog\//, '').trim();
      return { page: 'blog', slug };
    }

    if (['historia', 'liderazgo', 'marcas'].includes(rawPath)) {
      return { page: rawPath as PageId };
    }

    return { page: '404' };
  };

  useEffect(() => {
    const syncRoute = () => {
      const route = getRouteInfoFromLocation();
      setCurrentPage(route.page);
      setCurrentSlug(route.slug);
    };

    window.addEventListener('popstate', syncRoute);
    syncRoute();

    return () => window.removeEventListener('popstate', syncRoute);
  }, []);

  const navigateTo = (page: PageId, slug?: string) => {
    setCurrentPage(page);
    setCurrentSlug(slug);

    const targetPath =
      page === 'home'
        ? '/'
        : page === 'blog' && slug
        ? `/blog/${slug}`
        : `/${page}`;

    if (window.location.pathname !== targetPath || window.location.hash) {
      window.history.pushState(null, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f7f7] text-[#18181b] font-sans antialiased selection:bg-[#18181b] selection:text-white">
      {/* Duolingo Sticky Top Header (Status Bar + Desktop Nav) */}
      <Header
        currentPage={currentPage}
        onNavigate={(page) => navigateTo(page)}
      />

      {/* Main Content Area - with mobile bottom padding for BottomNav */}
      <main className="flex-1 w-full pb-20 md:pb-0">
        {currentPage === 'home' && <HomePage onNavigate={(page) => navigateTo(page)} />}
        {currentPage === 'historia' && <HistoriaPage onNavigate={(page) => navigateTo(page)} />}
        {currentPage === 'liderazgo' && <LiderazgoPage />}
        {currentPage === 'marcas' && <MarcasPage />}
        {currentPage === 'blog' && (
          <BlogPage
            onNavigate={(page) => navigateTo(page)}
            activeSlug={currentSlug}
            onSelectPost={(slug) => navigateTo('blog', slug)}
          />
        )}
        {currentPage === '404' && <NotFoundPage onNavigate={(page) => navigateTo(page)} />}
      </main>

      {/* Corporate Duolingo Footer */}
      <Footer onNavigate={(page) => navigateTo(page)} />

      {/* Duolingo Mobile Bottom Navigation Dock (Fixed on Mobile, hidden on md+) */}
      <BottomNav currentPage={currentPage} onNavigate={(page) => navigateTo(page)} />
    </div>
  );
}
