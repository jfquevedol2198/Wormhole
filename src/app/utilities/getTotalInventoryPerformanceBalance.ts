import { IAssetPerformance } from '../interfaces/asset.interface';
import { IPlatformPerformance } from '../interfaces/platform.interface';
import { reduceAssetsOrPlatforms } from './reduceAssetsOrPlatforms';

export const getTotalInventoryPerformanceBalance = (
    inventoryPerformance: IAssetPerformance | IPlatformPerformance,
) => {
    const wallet = reduceAssetsOrPlatforms(
        inventoryPerformance.records,
        'walletUsd',
    );
    const supply = reduceAssetsOrPlatforms(
        inventoryPerformance.records,
        'supplyUsd',
    );
    const stake = reduceAssetsOrPlatforms(
        inventoryPerformance.records,
        'stakeUsd',
    );
    const collateral = reduceAssetsOrPlatforms(
        inventoryPerformance.records,
        'collateralUsd',
    );
    const borrow = reduceAssetsOrPlatforms(
        inventoryPerformance.records,
        'borrowUsd',
    );
    const totalBalance = supply - borrow + wallet - collateral + stake;
    return {
        totalBalance,
        absoluteTotalBalance: Math.abs(totalBalance),
    };
};
