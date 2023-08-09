import { IAssetPerformance } from '../interfaces/asset.interface';
import { IPercentageData } from '../interfaces/percentage.interface';
import { IPlatformPerformance } from '../interfaces/platform.interface';
import { reduceAssetsOrPlatforms } from './reduceAssetsOrPlatforms';

export const getPercentagesForInventoryPerformance = (
    inventoryPerformance: IAssetPerformance | IPlatformPerformance,
    isSort: boolean = true,
): IPercentageData => {
    const floatingFunding = reduceAssetsOrPlatforms(
        inventoryPerformance.records,
        'floatingFundingUsd',
    );
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
    const sumOfAbsolutBalances =
        Math.abs(floatingFunding) +
        Math.abs(supply) +
        Math.abs(borrow) +
        Math.abs(wallet) +
        Math.abs(collateral) +
        Math.abs(stake);

    const percentages = [
        {
            name: 'Funding Received',
            columnName: 'floatingFunding',
            value: floatingFunding,
            percentage:
                (Math.abs(floatingFunding) * 100) / sumOfAbsolutBalances,
        },
        {
            name: 'In Wallet',
            columnName: 'wallet',
            value: wallet,
            percentage: (Math.abs(wallet) * 100) / sumOfAbsolutBalances,
        },
        {
            name: 'Supply Balance',
            columnName: 'supply',
            value: supply,
            percentage: (Math.abs(supply) * 100) / sumOfAbsolutBalances,
        },
        {
            name: 'Stake Balance',
            columnName: 'stake',
            value: stake,
            percentage: (Math.abs(stake) * 100) / sumOfAbsolutBalances,
        },
        {
            name: 'Collateral Balance',
            columnName: 'collateral',
            value: collateral,
            percentage: (Math.abs(collateral) * 100) / sumOfAbsolutBalances,
        },
        {
            name: 'Borrow Balance',
            columnName: 'borrow',
            value: borrow,
            percentage: (Math.abs(borrow) * 100) / sumOfAbsolutBalances,
        },
    ].filter((property) => property.percentage > 1);

    if (isSort) {
        percentages.sort((a, b) => b.value - a.value);
    }

    return { percentages, totalBalance };
};
