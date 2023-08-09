import { convertSortColumnNameForInventory } from './convertSortColumnNameForInventory';

describe('Convert Sort Column Name For Inventory', () => {
    it('should convert sort column name for inventory', () => {
        expect(convertSortColumnNameForInventory('name')).toEqual('assetName');
        expect(convertSortColumnNameForInventory('stake')).toEqual('stakeUsd');
    });
});
