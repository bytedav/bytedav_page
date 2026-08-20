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
    yearFounded: 2026,
    description: 'La mayor plataforma de venta de motos nuevas y ocasión.',
    websiteUrl: 'https://kaelos.com',
    image: 'https://raw.githubusercontent.com/bytedav/bytedav_page/refs/heads/main/public/kaelos.png',
  },
];

export const MILESTONES: Milestone[] = [
  {
    year: '2023',
    quarter: 'Fundación',
    title: 'Constitución de Bytedav',
    description: 'Nacimiento de Bytedav como empresa para controlar todos nuestras marcas.',
    highlight: true,
    metricsBadge: 'Bytedav',
  },
  {
    year: '2026',
    quarter: 'Incubación',
    title: 'Kaelos',
    description: '1ra Incubación en el sector de motocicletas',
    highlight: true,
    metricsBadge: 'Kaelos',
  },
];

export const LEADERS: Leader[] = [
  {
    id: 'david-bermudez',
    name: 'David Bermudez A.',
    area: 'Fundador y CEO',
    bio: 'Estratega de negocios y emprendedor impulsando plataformas tecnológicas en el sector',
    image: 'https://raw.githubusercontent.com/bytedav/bytedav_page/refs/heads/main/public/david%20bermudez.png',
    linkedin: 'https://linkedin.com',
    email: 'bytedav@gmail.com',
    specialties: ['Lider', 'Marketing Digital', 'Sistemas', 'Negocios'],
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
