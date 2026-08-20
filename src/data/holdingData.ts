import { PortfolioBrand, Milestone, Leader, HoldingPillar } from '../types';

export const HOLDING_CONFIG = {
  name: 'Bytedav',
  legalName: 'Bytedav Corporation S.L.',
  taxId: 'B-88492019',
  mercantileRegistry: 'Reg. Mercantil de Madrid, Tomo 41.209, Folio 115, Hoja M-730192',
  tagline: 'Operando el futuro de los mercados de movilidad y servicios digitales',
  foundationYear: 2024,
  hqCity: 'Madrid & Ciudad de México',
  totalBrands: 1,
  totalCountries: 2,
  teamMembers: 'En Crecimiento',
  transactionsCount: 'Fase Inicial',
  cagrGrowth: 'Fundacional',
  contactEmail: 'corporativo@bytedav.com',
  investorEmail: 'inversores@bytedav.com',
  pressEmail: 'prensa@bytedav.com',
  supportEmail: 'kaelosmoto@gmail.com',
  phoneMadrid: '+34 910 884 920',
  phoneCdmx: '+52 55 8432 9100',
  addressMadrid: 'Paseo de la Castellana 95, Planta 14, 28046 Madrid, España',
  addressCdmx: 'Av. Insurgentes Sur 1602, Piso 9, 03940 Ciudad de México, México',
};

export const PORTFOLIO_BRANDS: PortfolioBrand[] = [
  {
    id: 'kaelos',
    name: 'Kaelos',
    yearFounded: 2022,
    description: 'Plataforma líder que conecta compradores y concesionarios de motocicletas con verificación técnica certificada, cotización y gestión de trámites.',
    fullOverview: 'Kaelos es la marca insignia de Bytedav en el sector de movilidad sobre dos ruedas. Nació para transformar la experiencia de compra y venta de motocicletas, integrando catálogo verificado, evaluación mecánica transparente, opciones de financiamiento directo y entrega a domicilio.',
    websiteUrl: 'https://kaelos.com',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80',
    logoText: 'KAELOS',
    isFlagship: true,
    status: 'Operativo',
    metrics: [
      { label: 'Unidades Listadas', value: '+5,200' },
      { label: 'Concesionarios Aliados', value: '+140' },
      { label: 'Calificación de Confianza', value: '4.9/5' },
    ],
    features: [
      'Inspección mecánica y peritaje de 120 puntos de control',
      'Integración nativa con pasarelas de pago y crédito automotriz',
      'Panel B2B para concesionarios con analítica de demanda',
      'Garantía mecánica extendida y gestión de traspaso digital',
    ],
  },
];

export const MILESTONES: Milestone[] = [
  {
    year: '2026',
    quarter: 'Fundación',
    category: 'Etapa Fundacional',
    title: 'Constitución de Bytedav y Despliegue de Kaelos',
    description: 'Nacimiento de Bytedav como holding operador con la misión de concebir, estructurar y escalar plataformas tecnológicas verticales de alta tracción, iniciando con la incubación y puesta en marcha de Kaelos.',
    highlight: true,
    metricsBadge: 'En Fundación',
  },
];

export const LEADERS: Leader[] = [
  {
    id: 'david-mora',
    name: 'David Morales V.',
    role: 'Presidente Ejecutivo & Fundador',
    area: 'Dirección General',
    bio: 'Estratega de negocios y emprendedor en serie con más de 14 años de trayectoria impulsando plataformas tecnológicas en el sector de movilidad e infraestructura de comercio digital.',
    fullBio: 'David lidera la visión de largo plazo de Bytedav. Anteriormente cofundó dos scale-ups de tecnología y ocupó roles directivos en fondos de inversión de capital riesgo. Su enfoque está centrado en la asignación estratégica de capital y el desarrollo de ventajas competitivas sostenibles.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    experienceYears: 14,
    linkedin: 'https://linkedin.com',
    email: 'dmorales@bytedav.com',
    specialties: ['Estrategia Corporativa', 'M&A', 'Asignación de Capital', 'Crecimiento de Negocios'],
  },
];

export const HOLDING_PILLARS: HoldingPillar[] = [
  {
    title: 'Autonomía Operativa con Respaldo Central',
    description: 'Cada marca opera como una unidad ágil con liderazgo propio, apalancándose en la solidez financiera, legal y tecnológica central de Bytedav.',
    iconName: 'ShieldCheck',
    statsText: '100% de servicios core integrados',
  },
  {
    title: 'Sinergia de Ecosistema',
    description: 'Las marcas de Bytedav no compiten: se retroalimentan. Kaelos genera demanda y sienta las bases para futuros servicios de financiamiento y logística especializada.',
    iconName: 'Layers',
    statsText: 'Ecosistema en expansión',
  },
  {
    title: 'Infraestructura Tecnológica Compartida',
    description: 'Centralizamos el desarrollo técnico y la arquitectura de microservicios para reducir el tiempo de salida al mercado y maximizar la eficiencia.',
    iconName: 'Cpu',
    statsText: 'Arquitectura modular propia',
  },
  {
    title: 'Gobernanza y Disciplina de Capital',
    description: 'Invertimos con una estricta tesis de rentabilidad unitaria positiva, reinversión prudente de flujos y gobierno corporativo de altos estándares éticos.',
    iconName: 'TrendingUp',
    statsText: 'Foco en valor real a largo plazo',
  },
];
