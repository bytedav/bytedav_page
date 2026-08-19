import { KeyStat, PortfolioBrand, Milestone, Leader, HoldingPillar } from '../types';

export const HOLDING_CONFIG = {
  name: 'Bytedav',
  legalName: 'Bytedav Corporation S.L.',
  taxId: 'B-88492019',
  mercantileRegistry: 'Reg. Mercantil de Madrid, Tomo 41.209, Folio 115, Hoja M-730192',
  tagline: 'Operando el futuro de los mercados de movilidad y servicios digitales',
  foundationYear: 2021,
  hqCity: 'Madrid & Ciudad de México',
  totalBrands: 4,
  totalCountries: 4,
  teamMembers: '+65',
  transactionsCount: '+18,500',
  cagrGrowth: '42%',
  contactEmail: 'corporativo@bytedav.com',
  investorEmail: 'inversores@bytedav.com',
  pressEmail: 'prensa@bytedav.com',
  supportEmail: 'kaelosmoto@gmail.com',
  phoneMadrid: '+34 910 884 920',
  phoneCdmx: '+52 55 8432 9100',
  addressMadrid: 'Paseo de la Castellana 95, Planta 14, 28046 Madrid, España',
  addressCdmx: 'Av. Insurgentes Sur 1602, Piso 9, 03940 Ciudad de México, México',
};

export const KEY_STATS: KeyStat[] = [
  {
    value: '2021',
    label: 'AÑO DE FUNDACIÓN',
    sublabel: 'Consolidación del holding',
    highlight: false,
  },
  {
    value: '4',
    label: 'MARCAS EN PORTAFOLIO',
    sublabel: 'Empresas activas en movilidad y tech',
    highlight: true,
  },
  {
    value: '+18,500',
    label: 'OPERACIONES FACILITADAS',
    sublabel: 'Transacciones y servicios gestionados',
    highlight: false,
  },
  {
    value: '42%',
    label: 'CRECIMIENTO ANUAL (CAGR)',
    sublabel: 'Rendimiento financiero agregado',
    highlight: false,
  },
];

export const PORTFOLIO_BRANDS: PortfolioBrand[] = [
  {
    id: 'kaelos',
    name: 'Kaelos',
    tagline: 'Marketplace digital especializado en motocicletas y dos ruedas',
    category: 'Movilidad & Marketplace',
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
    year: '2021',
    quarter: 'Q2',
    category: 'Fundación Corporativa',
    title: 'Constitución de Bytedav Holding',
    description: 'Nace Bytedav como entidad matriz con el objetivo de estructurar, financiar y escalar empresas de base tecnológica en el sector de la movilidad y la economía digital.',
    highlight: true,
    metricsBadge: 'Capital Semilla Cerrado',
  },
  {
    year: '2022',
    quarter: 'Q3',
    category: 'Lanzamiento de Marca',
    title: 'Incubación y Salida al Mercado de Kaelos',
    description: 'Lanzamiento oficial de Kaelos, el marketplace especializado en compra y venta de motocicletas con peritaje mecánico digital y red inicial de 30 concesionarios asociados.',
    highlight: true,
    metricsBadge: 'Primera Marca Operativa',
  },
  {
    year: '2023',
    quarter: 'Q1',
    category: 'Crecimiento de Operaciones',
    title: 'Superación del Hito de 5,000 Operaciones en Kaelos',
    description: 'Consolidación del marketplace en las principales urbes, duplicando la plantilla técnica e iniciando la estructuración de servicios financieros complementarios.',
    highlight: false,
    metricsBadge: '+5,000 Transacciones',
  },
  {
    year: '2024',
    quarter: 'Q1',
    category: 'Diversificación del Portafolio',
    title: 'Lanzamiento de MotoFin Tech y Veloce Logistics',
    description: 'Bytedav diversifica su cadena de valor lanzando la financiera digital MotoFin Tech y la empresa de transporte especializado Veloce Logistics para cerrar el círculo del comprador.',
    highlight: true,
    metricsBadge: '3 Marcas Activas',
  },
  {
    year: '2025',
    quarter: 'Q2',
    category: 'Consolidación Tecnológica',
    title: 'Creación de Bytelab Studio y Expansión Regional',
    description: 'Centralización de todo el desarrollo tecnológico, analítica y diseño de producto en Bytelab Studio, sentando las bases para la expansión internacional del grupo.',
    highlight: false,
    metricsBadge: 'Infraestructura Unificada',
  },
  {
    year: '2026',
    quarter: 'Actualidad',
    category: 'Escala y Nuevos Mercados',
    title: 'Madurez del Ecosistema Integrado',
    description: 'Bytedav opera hoy 4 marcas complementarias con un modelo de gobernanza ágil, generando sinergias operativas y preparando la apertura de nuevos corredores de movilidad.',
    highlight: true,
    metricsBadge: '4 Marcas | +18.5k Operaciones',
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
    description: 'Las marcas de Bytedav no compiten: se retroalimentan. Kaelos genera demanda que beneficia a MotoFin en financiamiento y a Veloce en logística de transporte.',
    iconName: 'Layers',
    statsText: '4 marcas interconectadas',
  },
  {
    title: 'Infraestructura Tecnológica Compartida',
    description: 'A través de Bytelab, reducimos el tiempo de salida al mercado (time-to-market) y los costos de desarrollo compartiendo microservicios probados.',
    iconName: 'Cpu',
    statsText: '35+ microservicios activos',
  },
  {
    title: 'Gobernanza y Disciplina de Capital',
    description: 'Invertimos con una estricta tesis de rentabilidad unitaria positiva, reinversión prudente de flujos y gobierno corporativo de altos estándares éticos.',
    iconName: 'TrendingUp',
    statsText: '42% CAGR de crecimiento',
  },
];
