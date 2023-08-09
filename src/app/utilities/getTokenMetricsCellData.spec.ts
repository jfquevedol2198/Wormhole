import {
    getTokenMetricsCellData,
    getTokenMetricsCellUsdData,
} from './getTokenMetricsCellData';

describe('GetTokenMetricsCellData', () => {
    it('should get token metrics cell data', () => {
        expect(getTokenMetricsCellData(1)).toEqual('1.00');
        expect(getTokenMetricsCellData(0)).toEqual('0.00');
        expect(getTokenMetricsCellData(null)).toEqual(' - ');
        expect(getTokenMetricsCellData(undefined)).toEqual(' - ');
        expect(getTokenMetricsCellData(10.1)).toEqual('10.10');
        expect(getTokenMetricsCellData(101010.10101)).toEqual('101,010.10');
    });
});

describe('GetTokenMetricsCellUsdData', () => {
    it('should get token metrics cell data in usd', () => {
        expect(getTokenMetricsCellUsdData(1)).toEqual('$1.00');
        expect(getTokenMetricsCellUsdData(0)).toEqual('$0.00');
        expect(getTokenMetricsCellUsdData(null)).toEqual(' - ');
        expect(getTokenMetricsCellUsdData(undefined)).toEqual(' - ');
        expect(getTokenMetricsCellUsdData(10.1)).toEqual('$10.10');
        expect(getTokenMetricsCellUsdData(101010.10101)).toEqual('$101,010.10');
    });
});
