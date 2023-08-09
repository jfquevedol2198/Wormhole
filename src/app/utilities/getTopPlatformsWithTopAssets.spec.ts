import { IPlatformPerformance } from '../interfaces/platform.interface';
import { getTopPlatformsWithAssets } from './getTopPlatformsWithTopAssets';

describe('Get Top Platforms With Top Assets', () => {

    const platforms: IPlatformPerformance[] = require('../../mocks/platformPerformances.json');
    const topPlatforms: IPlatformPerformance[] = require('../../mocks/topPlatforms.json');

    it('should get top platforms with top assets', () => {
        expect(getTopPlatformsWithAssets(platforms)).toEqual(topPlatforms);
    });
});
