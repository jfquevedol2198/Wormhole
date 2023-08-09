import { IPaginationParams } from './paginationParams.interface';
import { IPNLPriceMovement } from './pnlPriceMovement.interface';

export interface IDeFiImpactData {
    data: IPNLPriceMovement[];
    pageIndex: number;
    pageSize: number;
    total: number;
    sorting: string[];
}

export interface ICombinedDeFiImpactData {
    portfolioId: number;
    date: Date;
    paginationParams: IPaginationParams;
    sorting: string[];
    sortingBy: 'usd' | 'diffPercentage';
    data?: IPNLPriceMovement[];
    recordCount?: number;
}
