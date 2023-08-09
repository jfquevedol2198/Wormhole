import { getTopAssets } from './getTopAssets';
import { IPlatformPerformance } from '../interfaces/platform.interface';
import { IAsset } from '../interfaces/asset.interface';

describe('Get Top Assets', () => {
    const platformPerformances: IPlatformPerformance[] = require('../../mocks/platformPerformances.json');
    const topAssets: IAsset[] = require('../../mocks/topAssets.json');

    it('should get top assets', () => {
        const platformPerformance = platformPerformances[11];
        expect(getTopAssets(platformPerformance.records)).toEqual(topAssets);
    });
});
