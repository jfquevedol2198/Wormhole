import { IPlatformPerformance } from './platform.interface';

export interface IPieChartData {
    totalBalance: number;
    sumOfAbsoluteBalances: number;
    platforms: IPlatformPerformance[];
}
