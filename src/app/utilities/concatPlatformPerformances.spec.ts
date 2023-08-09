import { IPlatformPerformance } from '../interfaces/platform.interface';
import { IAsset } from '../interfaces/asset.interface';
import { concatPlatformPerformances } from './concatPlatformPerformances';

describe('Concat Platform Performances', () => {
    const platformPerformances: IPlatformPerformance[] = require('../../mocks/platformPerformances.json');
    const assets: IAsset[] = require('../../mocks/concatenatedAssets.json');

    it('should concat platform performances', () => {
        expect(
            concatPlatformPerformances([
                platformPerformances[7],
                platformPerformances[8],
            ]),
        ).toEqual({
            name: 'Others',
            platformLogoUri: null,
            records: assets,
            totalBalance: 16,
            absoluteTotalBalance: 16,
        });
    });
});
