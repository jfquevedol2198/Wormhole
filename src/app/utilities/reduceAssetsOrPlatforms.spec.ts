import { IAsset } from '../interfaces/asset.interface';
import { IPlatform } from '../interfaces/platform.interface';
import { reduceAssetsOrPlatforms } from './reduceAssetsOrPlatforms';

describe('Reduce Assets', () => {
    const assets: IAsset[] = require('../../mocks/assets.json');
    const assetWithFewPositions: IAsset[] = require('../../mocks/assetWithFewPositions.json');
    const platforms: IPlatform[] = require('../../mocks/platforms.json');

    it('should reduce platforms', () => {
        expect(
            reduceAssetsOrPlatforms([platforms[0]], 'floatingFundingUsd'),
        ).toEqual(3);
    });

    it('should reduce assets', () => {
        expect(
            reduceAssetsOrPlatforms([assets[0]], 'floatingFundingUsd'),
        ).toEqual(3);
    });

    it('should reduce assets with few positions', () => {
        expect(
            reduceAssetsOrPlatforms(
                [assetWithFewPositions[0]],
                'floatingFundingUsd',
            ),
        ).toEqual(6);
    });
});
