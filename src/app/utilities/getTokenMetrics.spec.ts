import { getTokenMetrics } from './getTokenMetrics';

const PNLPRICEMOVEMENT = require('../../mocks/pnlPriceMovements.json');
const TOKENMETRICS = require('../../mocks/tokenMetrics.json');

describe('Get Token Metrics', () => {

    it('should get token metrics', () => {
        expect(getTokenMetrics(PNLPRICEMOVEMENT.records[0])).toEqual(TOKENMETRICS);
    });
});
