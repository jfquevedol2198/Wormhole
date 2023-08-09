import { IAsset } from '../interfaces/asset.interface';
import { concatAssets } from './concatAssets';

export const getTopAssets = (assets: IAsset[], limit: number = 9): IAsset[] => {
    let sortedAssets = assets.sort(
        (a, b) => b.absoluteTotalBalance - a.absoluteTotalBalance,
    );

    if (sortedAssets.length > limit) {
        const topTenAssets = sortedAssets.slice(0, limit);
        const otherAssets = sortedAssets.slice(limit, sortedAssets.length);
        topTenAssets.push(concatAssets(otherAssets));
        sortedAssets = topTenAssets;
    }

    return sortedAssets.sort(
        (a, b) => b.absoluteTotalBalance - a.absoluteTotalBalance,
    );
};
