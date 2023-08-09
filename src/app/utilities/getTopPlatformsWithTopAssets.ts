import { IAsset } from '../interfaces/asset.interface';
import { IPlatformPerformance } from '../interfaces/platform.interface';
import { concatPlatformPerformances } from './concatPlatformPerformances';
import { getTopAssets } from './getTopAssets';
import { getTotalInventoryBalance } from './getTotalInventoryBalance';
import { getTotalInventoryPerformanceBalance } from './getTotalInventoryPerformanceBalance';

export const getTopPlatformsWithAssets = (
    platformPerformances: IPlatformPerformance[],
    limit: number = 9,
): IPlatformPerformance[] => {
    const platformPerformancesWithTotalBalances: IPlatformPerformance[] =
        platformPerformances.map((platformPerformance) => {
            const assetsWithTotalBalances: IAsset[] =
                platformPerformance.records.map((asset) => ({
                    ...asset,
                    ...getTotalInventoryBalance(asset),
                }));

            return {
                ...platformPerformance,
                records: assetsWithTotalBalances,
                ...getTotalInventoryPerformanceBalance(platformPerformance),
            };
        });

    const sortedPlatformPerformances =
        platformPerformancesWithTotalBalances.sort(
            (a, b) => b.absoluteTotalBalance - a.absoluteTotalBalance,
        );
    const topTenPlatformPerformances = sortedPlatformPerformances.slice(
        0,
        limit,
    );
    const topPlatformPerformancesWithTopAssets = topTenPlatformPerformances.map(
        (platformPerformance) => {
            return {
                ...platformPerformance,
                records: getTopAssets(platformPerformance.records, limit),
            };
        },
    );

    if (sortedPlatformPerformances.length > limit) {
        const otherPlatformPerformances = sortedPlatformPerformances.slice(
            limit,
            sortedPlatformPerformances.length,
        );
        topPlatformPerformancesWithTopAssets.push(
            concatPlatformPerformances(otherPlatformPerformances),
        );
    }

    return topPlatformPerformancesWithTopAssets.sort(
        (a, b) => b.absoluteTotalBalance - a.absoluteTotalBalance,
    );
};
