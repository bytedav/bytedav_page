export type PageId = 'home' | 'historia' | 'liderazgo' | 'marcas';

export interface PortfolioBrand {
  id: string;
  name: string;
  tagline: string;
  category: string;
  yearFounded: number;
  description: string;
  fullOverview: string;
  websiteUrl: string;
  image: string;
  logoText: string;
  metrics: { label: string; value: string }[];
  isFlagship?: boolean;
  status: 'Operativo' | 'En Expansión' | 'Incubación';
  features: string[];
}

export interface Milestone {
  year: string;
  quarter?: string;
  title: string;
  category: string;
  description: string;
  highlight?: boolean;
  metricsBadge?: string;
}

export interface Leader {
  id: string;
  name: string;
  role: string;
  area: string;
  bio: string;
  fullBio: string;
  image: string;
  experienceYears: number;
  linkedin?: string;
  email?: string;
  specialties: string[];
}

export interface HoldingPillar {
  title: string;
  description: string;
  iconName: string;
  statsText: string;
}
