import { IPlatformPerformance } from '../interfaces/platform.interface';
import { getTopAssets } from './getTopAssets';

export const concatPlatformPerformances = (
    platformPerformances: IPlatformPerformance[],
    limit: number = 9,
): IPlatformPerformance => {
    const assetsForFewPlatforms = [];
    let totalBalanceForFewPlatforms = 0;

    platformPerformances.map((platformPerformance) => {
        platformPerformance.records.map((asset) => {
            assetsForFewPlatforms.push({
                ...asset,
                name: asset.name + '(' + platformPerformance.name + ')',
            });
        });
        totalBalanceForFewPlatforms += platformPerformance.totalBalance;
    });

    return {
        name: 'Others',
        platformLogoUri: null,
        records: getTopAssets(assetsForFewPlatforms, limit),
        totalBalance: totalBalanceForFewPlatforms,
        absoluteTotalBalance: Math.abs(totalBalanceForFewPlatforms),
    };
};
