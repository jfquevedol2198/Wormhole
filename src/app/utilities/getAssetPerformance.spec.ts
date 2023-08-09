import { IPNLPositionDetails } from '../interfaces/pnlPosition.interface';
import { IAssetPerformance } from '../interfaces/asset.interface';
import { getAssetPerformances } from './getAssetPerformances';

describe('Get Asset Performances', () => {
    const pnlPositionsDetails: IPNLPositionDetails[] = require('../../mocks/pnlPositionsDetails.json');
    const assetPerformance: IAssetPerformance[] = require('../../mocks/assetPerformances.json');
    it('should get asset performances', () => {
        expect(getAssetPerformances(pnlPositionsDetails)).toEqual([assetPerformance[0]]);
    });
});
