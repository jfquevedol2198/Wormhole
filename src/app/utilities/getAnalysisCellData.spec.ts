import {
    getDeFiImpactCellData,
    getDeFiImpactSubCellData,
} from './getDeFiImpactCellData';

describe('GetDeFiImpactCellData', () => {
    it('should get DeFi impact cell data', () => {
        expect(getDeFiImpactCellData(1)).toEqual('1.00');
        expect(getDeFiImpactCellData(0)).toEqual('0.00');
        expect(getDeFiImpactCellData(null)).toEqual(' - ');
        expect(getDeFiImpactCellData(undefined)).toEqual(' - ');
        expect(getDeFiImpactCellData(10.1)).toEqual('10.10');
        expect(getDeFiImpactCellData(101010.10101)).toEqual('101,010.10');
    });
});

describe('GetDeFiImpactSubCellData', () => {
    it('should get DeFi impact sub cell data', () => {
        expect(getDeFiImpactSubCellData(1)).toEqual('(1.00%)');
        expect(getDeFiImpactSubCellData(0)).toEqual('(0.00%)');
        expect(getDeFiImpactSubCellData(null)).toEqual('');
        expect(getDeFiImpactSubCellData(undefined)).toEqual('');
        expect(getDeFiImpactSubCellData(10.1)).toEqual('(10.10%)');
        expect(getDeFiImpactSubCellData(101010.10101)).toEqual('(101,010.10%)');
    });
});
