import React, { useState, useEffect } from 'react';
import { PageId } from './types';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { HistoriaPage } from './pages/HistoriaPage';
import { LiderazgoPage } from './pages/LiderazgoPage';
import { MarcasPage } from './pages/MarcasPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');

  // Parse path to PageId and clean any legacy hash in browser URL
  const getPageFromPath = (): PageId => {
    let targetPage: PageId = 'home';

    if (window.location.hash) {
      const cleanHash = window.location.hash.replace('#/', '').replace('#', '').trim();
      if (['home', 'historia', 'liderazgo', 'marcas'].includes(cleanHash)) {
        targetPage = cleanHash as PageId;
      }
      const cleanPath = targetPage === 'home' ? '/' : `/${targetPage}`;
      window.history.replaceState(null, '', cleanPath);
      return targetPage;
    }

    const path = window.location.pathname.replace('/', '').trim();
    if (['home', 'historia', 'liderazgo', 'marcas'].includes(path)) {
      return path as PageId;
    }
    return 'home';
  };

  useEffect(() => {
    const syncPage = () => {
      setCurrentPage(getPageFromPath());
    };

    window.addEventListener('popstate', syncPage);
    syncPage();

    return () => window.removeEventListener('popstate', syncPage);
  }, []);

  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    const targetPath = page === 'home' ? '/' : `/${page}`;
    if (window.location.pathname !== targetPath || window.location.hash) {
      window.history.pushState(null, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f7f7] text-[#3c3c3c] font-sans antialiased selection:bg-[#58cc02] selection:text-white">
      {/* Duolingo Sticky Top Header (Status Bar + Desktop Nav) */}
      <Header
        currentPage={currentPage}
        onNavigate={navigateTo}
        isHome={currentPage === 'home'}
      />

      {/* Main Content Area - with mobile bottom padding for BottomNav */}
      <main className="flex-1 w-full pb-20 md:pb-0">
        {currentPage === 'home' && <HomePage onNavigate={navigateTo} />}
        {currentPage === 'historia' && <HistoriaPage onNavigate={navigateTo} />}
        {currentPage === 'liderazgo' && <LiderazgoPage onNavigate={navigateTo} />}
        {currentPage === 'marcas' && <MarcasPage onNavigate={navigateTo} />}
      </main>

      {/* Corporate Duolingo Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Duolingo Mobile Bottom Navigation Dock (Fixed on Mobile, hidden on md+) */}
      <BottomNav currentPage={currentPage} onNavigate={navigateTo} />
    </div>
  );
}
