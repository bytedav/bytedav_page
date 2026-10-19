export type PageId = 'home' | 'historia' | 'liderazgo' | 'marcas' | 'blog' | '404';

export interface PortfolioBrand {
  id?: string;
  name: string;
  yearFounded: number;
  description: string;
  websiteUrl: string;
  image: string;
}

export interface Milestone {
  year: string;
  quarter?: string;
  title: string;
  description: string;
  highlight?: boolean;
  metricsBadge?: string;
}

export interface Leader {
  id?: string;
  name: string;
  area: string;
  bio: string;
  image: string;
  linkedin?: string;
  email?: string;
  specialties: string[];
}

export interface HoldingPillar {
  title: string;
}

export interface BlogPost {
  title: string;
  description: string;
  id?: string;
  slug?: string;
  date?: string;
  readTime?: string;
  author?: string;
  content?: string;
}
