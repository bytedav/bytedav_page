import { PortfolioBrand, Milestone, Leader, HoldingPillar } from '../types';

export const HOLDING_CONFIG = {
  name: 'Bytedav',
  contactEmail: 'bytedav@gmail.com',
  socialLinks: {
    facebook: 'https://facebook.com/bytedav',
    tiktok: 'https://tiktok.com/@bytedav',
    instagram: 'https://instagram.com/bytedav',
    youtube: 'https://youtube.com/@bytedav',
  },
};

export const PORTFOLIO_BRANDS: PortfolioBrand[] = [
  {
    id: 'kaelos',
    name: 'Kaelos',
    yearFounded: 2022,
    description: 'Plataforma líder en venta de motocicletas nuevas y ocasion, renting, Tambien brindamos servicios.',
    websiteUrl: 'https://kaelos.com',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80',
  },
];

export const MILESTONES: Milestone[] = [
  {
    year: '2023',
    quarter: 'Fundación',
    title: 'Constitución de Bytedav',
    description: 'Nacimiento de Bytedav como holding operador con la misión de concebir, estructurar y escalar plataformas tecnológicas verticales de alta tracción.',
    highlight: true,
    metricsBadge: 'Fundación',
  },
];

export const LEADERS: Leader[] = [
  {
    id: 'david-bermudez',
    name: 'David Bermudez A.',
    area: 'Fundador y CEO',
    bio: 'Estratega de negocios y emprendedor en serie con más de 14 años de trayectoria impulsando plataformas tecnológicas en el sector de movilidad e infraestructura de comercio digital.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    linkedin: 'https://linkedin.com',
    email: 'bytedav@gmail.com',
    specialties: ['Estrategia Corporativa', 'Marketing Digital', 'Ingeniero en Sistemas', 'Crecimiento de Negocios'],
  },
];

export const HOLDING_PILLARS: HoldingPillar[] = [
  {
    title: 'Autonomía Operativa con Respaldo Central',
  },
  {
    title: 'Sinergia de Ecosistema',
  },
  {
    title: 'Infraestructura Tecnológica Compartida',
  },
  {
    title: 'Gobernanza y Disciplina de Capital',
  },
];
