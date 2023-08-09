import { IAsset } from '../interfaces/asset.interface';
import { hideNullableValue } from './hideNullableValues';

describe('Hide Nullable Value', () => {
    const assets: IAsset[] = require('../../mocks/assets.json');

    it('should get total balance', () => {
        expect(hideNullableValue(assets[2], 'floatingFundingUsd')).toEqual('-');
        expect(
            hideNullableValue(
                assets[2],
                'fundingToken',
                true,
                'floatingFundingUsd',
            ),
        ).toEqual('-');
        expect(hideNullableValue(assets[2], 'walletUsd')).toEqual('-');
        expect(
            hideNullableValue(assets[2], 'walletToken', true, 'walletUsd'),
        ).toEqual('-');
        expect(hideNullableValue(assets[2], 'supplyUsd')).toEqual('-$1.00');
        expect(
            hideNullableValue(assets[2], 'supplyToken', true, 'supplyUsd'),
        ).toEqual('-1.00 AST');
    });
});
