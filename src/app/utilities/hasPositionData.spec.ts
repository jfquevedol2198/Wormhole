import { hasPositionData } from './hasPositionData';

describe('Has Position Data', () => {
    const pnlPositionsDetails = require('../../mocks/pnlPositionsDetails.json');
    const emptyPnlPositionsDetails = require('../../mocks/emptyPnlPositionsDetails.json');
    it('should check if there is position data', () => {
        expect(hasPositionData(pnlPositionsDetails[0])).toEqual(true);
        expect(hasPositionData(emptyPnlPositionsDetails[0])).toEqual(false);
    });
});
