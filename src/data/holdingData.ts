import holdingConfigData from './holding.json';
import brandsData from './brands.json';
import milestonesData from './milestones.json';
import leadersData from './leaders.json';
import pillarsData from './pillars.json';
import postsData from './posts.json';

import { PortfolioBrand, Milestone, Leader, HoldingPillar, BlogPost } from '../types';
import { normalizeBlogPost, slugify } from '../utils/contentUtils';

export const HOLDING_CONFIG = {
  ...holdingConfigData,
  logoUrl: `${holdingConfigData.domain}/bytedav.png`,
};

export const PORTFOLIO_BRANDS: PortfolioBrand[] = (brandsData as PortfolioBrand[]).map((brand) => ({
  ...brand,
  id: brand.id || slugify(brand.name),
}));

export const MILESTONES: Milestone[] = milestonesData as Milestone[];

export const LEADERS: Leader[] = (leadersData as Leader[]).map((leader) => ({
  ...leader,
  id: leader.id || slugify(leader.name),
}));

export const HOLDING_PILLARS: HoldingPillar[] = pillarsData as HoldingPillar[];

// Posts are normalized dynamically (readTime computed from content, slug from title, default author/date)
export const BLOG_POSTS: BlogPost[] = (postsData as BlogPost[]).map((post) => normalizeBlogPost(post));
