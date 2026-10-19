import holdingConfigData from './holding.json';
import brandsData from './brands.json';
import milestonesData from './milestones.json';
import leadersData from './leaders.json';
import pillarsData from './pillars.json';

import { PortfolioBrand, Milestone, Leader, HoldingPillar } from '../types';

export const HOLDING_CONFIG = holdingConfigData;
export const PORTFOLIO_BRANDS: PortfolioBrand[] = brandsData as PortfolioBrand[];
export const MILESTONES: Milestone[] = milestonesData as Milestone[];
export const LEADERS: Leader[] = leadersData as Leader[];
export const HOLDING_PILLARS: HoldingPillar[] = pillarsData as HoldingPillar[];
