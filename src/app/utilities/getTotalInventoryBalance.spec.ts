import { IAsset } from '../interfaces/asset.interface';
import { IPlatform } from '../interfaces/platform.interface';
import { getTotalInventoryBalance } from './getTotalInventoryBalance';

describe('Get Total Asset Balance', () => {
    const assets: IAsset[] = require('../../mocks/assets.json');
    const platforms: IPlatform[] = require('../../mocks/platforms.json');

    it('should get total asset balance', () => {
        expect(getTotalInventoryBalance(assets[0])).toEqual({
            totalBalance: 1,
            absoluteTotalBalance: 1,
        });
    });

    it('should get total platform balance', () => {
        expect(getTotalInventoryBalance(platforms[0])).toEqual({
            totalBalance: 1,
            absoluteTotalBalance: 1,
        });
    });
});
