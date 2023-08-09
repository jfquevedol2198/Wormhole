import { IWormholeBaseResponse } from './response.interface';

export interface ITraderStamina extends ICount {
    date: string | Date;
}

export interface ICount {
    transactionCount: number;
    nftCount: number;
    depositCount: number;
    withdrawCount: number;
    stakeCount: number;
    unStakeCount: number;
    borrowCount: number;
    repayCount: number;
    liquidationCount: number;
    swapCount: number;
    rewardCount: number;
}

export interface ITraderStaminaResponse extends IWormholeBaseResponse {
    records: ITraderStamina[];
}
