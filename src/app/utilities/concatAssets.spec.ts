import { IAsset } from '../interfaces/asset.interface';
import { concatAssets } from './concatAssets';

describe('Concat Assets For Few Platforms', () => {
    const assets: IAsset[] = require('../../mocks/assets.json');

    it('should concat assets', () => {
        expect(concatAssets(assets)).toEqual({
            name: 'Others',
            positions: assets[0].positions
                .concat(assets[1].positions)
                .concat(assets[2].positions),
            totalBalance: 0,
            absoluteTotalBalance: 0,
        });
    });
});
