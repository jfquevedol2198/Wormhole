import { assetSymbol } from './format-asset';

describe('Format Asset Utility', () => {
    it('should give asset symbol', () => {
        expect(assetSymbol('Etheremum (ETH)')).toEqual('ETH');
    });
});
