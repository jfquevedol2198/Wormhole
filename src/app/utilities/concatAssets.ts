import { IAsset } from '../interfaces/asset.interface';
import { getTotalInventoryBalance } from './getTotalInventoryBalance';

export const concatAssets = (assets: IAsset[]): IAsset => {
    let positions = [];

    assets.map((asset) => {
        positions = positions.concat(asset.positions);
    });

    const newAsset = {
        name: 'Others',
        positions,
    };

    return {
        ...newAsset,
        ...getTotalInventoryBalance(newAsset),
    };
};
