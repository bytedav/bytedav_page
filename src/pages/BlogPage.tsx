import React, { useState } from 'react';
import { PageId } from '../types';
import { BLOG_POSTS } from '../data/holdingData';
import { ArrowRight, ArrowLeft, Clock, Calendar, User, BookOpen } from 'lucide-react';

interface BlogPageProps {
  onNavigate: (page: PageId) => void;
  activeSlug?: string;
  onSelectPost?: (slug?: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({
  onNavigate,
  activeSlug,
  onSelectPost,
}) => {
  const [internalSlug, setInternalSlug] = useState<string | null>(null);

  const currentSlug = activeSlug !== undefined ? activeSlug : internalSlug;
  const selectedPost = BLOG_POSTS.find((p) => (p.slug || p.id) === currentSlug);

  const handleSelectPost = (slug?: string) => {
    if (onSelectPost) {
      onSelectPost(slug);
    } else {
      setInternalSlug(slug || null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatDate = (isoDate?: string) => {
    if (!isoDate) return 'Reciente';
    try {
      const date = new Date(isoDate);
      if (isNaN(date.getTime())) return isoDate;
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return isoDate;
    }
  };

  // 1. Single Article Detail Reading View (/blog/:slug)
  if (selectedPost) {
    const hasDistinctContent =
      selectedPost.content && selectedPost.content.trim() !== selectedPost.description.trim();

    return (
      <div id="blog-article-view" className="w-full flex flex-col pb-16 sm:pb-24">
        {/* Back Link Header Bar */}
        <section className="w-full px-3.5 sm:px-8 max-w-4xl mx-auto pt-4 sm:pt-8">
          <button
            onClick={() => handleSelectPost(undefined)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl duo-btn-white text-xs sm:text-sm font-black uppercase tracking-wider cursor-pointer mb-6"
          >
            <ArrowLeft className="w-4 h-4 text-[#18181b]" />
            <span>Todos los artículos</span>
          </button>

          {/* Article Container */}
          <article className="bg-white border-2 border-b-6 border-[#e5e5e5] rounded-3xl sm:rounded-4xl p-6 sm:p-12 shadow-xs">
            {/* Unboxed Metadata (Zero-pill discipline) */}
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[#71717a] font-bold mb-4 font-mono">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#71717a]" />
                {formatDate(selectedPost.date)}
              </span>
              <span aria-hidden="true" className="text-[#d4d4d8]">·</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#71717a]" />
                {selectedPost.readTime}
              </span>
              <span aria-hidden="true" className="text-[#d4d4d8]">·</span>
              <span className="flex items-center gap-1.5 text-[#18181b]">
                <User className="w-3.5 h-3.5 text-[#71717a]" />
                {selectedPost.author}
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#18181b] font-display tracking-tight leading-[1.15] mb-6">
              {selectedPost.title}
            </h1>

            {/* Standfirst / Lead description */}
            <p className="text-base sm:text-xl text-[#3f3f46] font-semibold leading-relaxed border-l-4 border-[#18181b] pl-4 sm:pl-6 my-6 bg-[#f7f7f7] py-3.5 rounded-r-2xl">
              {selectedPost.description}
            </p>

            {/* Content Body (if distinct from description) */}
            {hasDistinctContent && selectedPost.content && (
              <div className="mt-8 pt-6 border-t-2 border-[#f0f0f0] space-y-5 text-base sm:text-lg text-[#3c3c3c] leading-relaxed font-normal">
                {selectedPost.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}

            {/* Bottom Navigation within article */}
            <div className="mt-12 pt-8 border-t-2 border-[#f0f0f0] flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={() => handleSelectPost(undefined)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl duo-btn-white text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 text-[#18181b]" />
                <span>Volver al Blog</span>
              </button>

              <button
                onClick={() => onNavigate('marcas')}
                className="w-full sm:w-auto px-6 py-3 rounded-xl duo-btn-green text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Conoce nuestras marcas</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </article>
        </section>
      </div>
    );
  }

  // 2. Minimalist Blog List View (/blog)
  return (
    <div id="blog-page" className="w-full flex flex-col pb-12 sm:pb-20">
      {/* 1. Header Banner */}
      <section className="w-full px-3.5 sm:px-8 max-w-7xl mx-auto pt-4 sm:pt-8">
        <div className="bg-[#18181b] border-b-6 border-[#09090b] rounded-3xl sm:rounded-4xl p-6 sm:p-12 text-white shadow-md">
          <div className="inline-block px-3 py-1 rounded-xl bg-white/10 text-white border border-white/20 text-xs font-black uppercase tracking-wider mb-3">
            Publicaciones
          </div>
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight font-display leading-[1.1]">
            Blog y Perspectivas
          </h1>
          <p className="mt-3 text-sm sm:text-lg text-zinc-300 font-medium max-w-2xl leading-relaxed">
            Ideas, análisis y reflexiones sobre tecnología, escalamiento y modelos de negocio en la economía real.
          </p>
        </div>
      </section>

      {/* 2. Minimalist Post List */}
      <section className="w-full px-3.5 sm:px-8 max-w-4xl mx-auto mt-8 sm:mt-12">
        <div className="flex flex-col gap-5 sm:gap-6">
          {BLOG_POSTS.map((post) => {
            const postSlug = post.slug || post.id;
            return (
              <article
                key={postSlug}
                onClick={() => handleSelectPost(postSlug)}
                className="group bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border-2 border-b-4 border-[#e5e5e5] hover:border-[#18181b] transition-all duration-150 cursor-pointer shadow-xs flex flex-col justify-between"
              >
                <div>
                  {/* Unboxed Metadata Header (Zero-pill discipline) */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#71717a] font-bold mb-3 font-mono">
                    <span>{formatDate(post.date)}</span>
                    <span aria-hidden="true" className="text-[#d4d4d8]">·</span>
                    <span>{post.readTime}</span>
                    <span aria-hidden="true" className="text-[#d4d4d8]">·</span>
                    <span className="text-[#18181b]">{post.author}</span>
                  </div>

                  {/* Minimalist Title */}
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#18181b] font-display tracking-tight leading-snug group-hover:text-black transition-colors mb-2.5">
                    {post.title}
                  </h2>

                  {/* Minimalist Description */}
                  <p className="text-sm sm:text-base text-[#52525b] font-medium leading-relaxed">
                    {post.description}
                  </p>
                </div>

                {/* Minimalist Action Footnote */}
                <div className="mt-5 pt-3.5 border-t border-[#f4f4f5] flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#18181b] group-hover:underline flex items-center gap-1.5">
                    <span>Leer artículo</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>

                  <BookOpen className="w-4 h-4 text-[#a1a1aa] group-hover:text-[#18181b] transition-colors" />
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
};
