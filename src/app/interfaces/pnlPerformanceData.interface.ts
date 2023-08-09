import { Moment } from 'moment';

export interface IPNLPerformanceData {
    date: Moment;
    pnl: number;
    fundingReceived?: number;
    netWorth?: number;
    currentBalance?: number;
    collateralBalance?: number;
    stakeBalance?: number;
    supplyBalance?: number;
}
