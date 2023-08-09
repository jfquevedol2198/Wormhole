import { IAssetPerformance } from '../interfaces/asset.interface';
import { getTotalInventoryPerformanceBalance } from './getTotalInventoryPerformanceBalance';
import { IPlatformPerformance } from '../interfaces/platform.interface';

describe('Get Total Inventory Performance Balance', () => {
    const assetPerformances: IAssetPerformance[] = require('../../mocks/assetPerformances.json');
    const platformPerformances: IPlatformPerformance[] = require('../../mocks/platformPerformances.json');

    it('should get total platform performance balance', () => {
        expect(
            getTotalInventoryPerformanceBalance(platformPerformances[0]),
        ).toEqual({
            totalBalance: -1,
            absoluteTotalBalance: 1,
        });
    });

    it('should get total asset performance balance', () => {
        expect(
            getTotalInventoryPerformanceBalance(assetPerformances[0]),
        ).toEqual({
            totalBalance: -1,
            absoluteTotalBalance: 1,
        });
    });
});
