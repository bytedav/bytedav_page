import React from 'react';
import { PageId } from '../types';
import { LEGAL_DOCS, LEGAL_LAST_UPDATED, LegalDocId } from '../data/legalContent';
import { HOLDING_CONFIG } from '../data/holdingData';
import { Shield, FileText, Mail } from 'lucide-react';

interface LegalPageProps {
  docId: LegalDocId;
  onNavigate: (page: PageId) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ docId, onNavigate }) => {
  const doc = LEGAL_DOCS[docId];
  const otherId: LegalDocId = docId === 'privacidad' ? 'terminos' : 'privacidad';
  const other = LEGAL_DOCS[otherId];
  const Icon = docId === 'privacidad' ? Shield : FileText;

  const scrollToSection = (id: string) => {
    document.getElementById(`${docId}-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div id={`${docId}-page`} className="w-full flex flex-col pb-10 sm:pb-16">
      {/* Banner */}
      <section className="w-full px-3.5 sm:px-8 max-w-4xl mx-auto pt-4 sm:pt-8">
        <div className="bg-[#18181b] border-b-6 border-[#09090b] rounded-3xl sm:rounded-4xl p-6 sm:p-12 text-white shadow-md">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#27272a] text-zinc-200 text-xs font-black uppercase tracking-wider mb-4">
            <Icon className="w-4 h-4" />
            <span>Legal</span>
          </div>
          <h1 className="text-3xl xs:text-4xl sm:text-5xl font-black text-white tracking-tight font-display leading-[1.1]">
            {doc.heading}
          </h1>
          <p className="mt-4 text-sm sm:text-base font-semibold text-zinc-300 leading-relaxed max-w-2xl">
            {doc.intro}
          </p>
          <p className="mt-4 text-xs font-black uppercase tracking-wider text-zinc-400">
            Última actualización: {LEGAL_LAST_UPDATED}
          </p>
        </div>
      </section>

      {/* Índice */}
      <section className="w-full px-3.5 sm:px-8 max-w-4xl mx-auto mt-6 sm:mt-8">
        <nav aria-label="Contenido del documento" className="duo-card p-5 sm:p-6">
          <span className="text-xs font-black uppercase tracking-wider text-[#71717a] block mb-3 font-display">
            Contenido
          </span>
          <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 list-none p-0 m-0">
            {doc.sections.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => scrollToSection(s.id)}
                  className="text-left text-sm font-bold text-[#3f3f46] hover:text-[#18181b] hover:underline cursor-pointer py-0.5"
                >
                  {s.title}
                </button>
              </li>
            ))}
          </ol>
        </nav>
      </section>

      {/* Secciones */}
      <article className="w-full px-3.5 sm:px-8 max-w-4xl mx-auto mt-6 sm:mt-8 flex flex-col gap-4 sm:gap-5">
        {doc.sections.map((s) => (
          <section
            key={s.id}
            id={`${docId}-${s.id}`}
            className="duo-card p-5 sm:p-8 scroll-mt-24"
          >
            <h2 className="text-xl sm:text-2xl font-black text-[#18181b] font-display tracking-tight mb-3">
              {s.title}
            </h2>
            <div className="flex flex-col gap-3">
              {s.body.map((block, i) =>
                Array.isArray(block) ? (
                  <ul
                    key={i}
                    className="list-disc pl-5 flex flex-col gap-1.5 text-sm sm:text-base font-semibold text-[#3f3f46] leading-relaxed marker:text-[#a1a1aa]"
                  >
                    {block.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p
                    key={i}
                    className="text-sm sm:text-base font-semibold text-[#3f3f46] leading-relaxed"
                  >
                    {block}
                  </p>
                )
              )}
            </div>
          </section>
        ))}

        {/* Cierre: contacto + enlace al otro documento */}
        <div className="duo-card p-5 sm:p-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <a
            href={`mailto:${HOLDING_CONFIG.contactEmail}`}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl duo-btn-green text-sm font-black uppercase tracking-wider"
          >
            <Mail className="w-4 h-4" />
            <span>Escribir a {HOLDING_CONFIG.contactEmail}</span>
          </a>
          <a
            href={other.path}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(otherId);
            }}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl duo-btn-white text-sm font-black uppercase tracking-wider"
          >
            <span>{other.title}</span>
          </a>
        </div>
      </article>
    </div>
  );
};
