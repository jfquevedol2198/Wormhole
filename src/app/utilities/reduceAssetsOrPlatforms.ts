import { IAsset } from '../interfaces/asset.interface';
import { IPlatform } from '../interfaces/platform.interface';

export const reduceAssetsOrPlatforms = (
    inventory: Array<IAsset | IPlatform>,
    column: string,
): number => inventory.reduce((a, c) => a + getInventoryValue(c, column), 0);

export const getInventoryValue = (
    inventory: IAsset | IPlatform,
    column: string,
): number => {
    let val = 0;
    inventory.positions.forEach((position, index) => {
        val += inventory.positions[index][column];
    });
    return val;
};
