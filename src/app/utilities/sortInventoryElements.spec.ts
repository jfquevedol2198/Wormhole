import { sortInventoryElements } from './sortInventoryElements';

describe('Sort Inventory Elements', () => {
    it('should sort inventory elements by selected column', () => {
        const assets = require('../../mocks/assets.json');
        const platforms = require('../../mocks/platforms.json');
        expect(
            sortInventoryElements(assets[0], assets[1], [
                { direction: 'asc', columnDef: 'supply' },
            ]),
        ).toEqual(1);

        expect(
            sortInventoryElements(assets[0], assets[1], [
                { direction: 'asc', columnDef: 'funding' },
                { direction: 'asc', columnDef: 'supply' },
            ]),
        ).toEqual(1);

        expect(
            sortInventoryElements(platforms[0], platforms[1], [
                { direction: 'asc', columnDef: 'supply' },
            ]),
        ).toEqual(1);
        expect(
            sortInventoryElements(platforms[0], platforms[1], [
                { direction: 'asc', columnDef: 'funding' },
                { direction: 'asc', columnDef: 'supply' },
            ]),
        ).toEqual(1);
    });
});
