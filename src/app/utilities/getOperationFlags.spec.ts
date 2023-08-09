import { IOperation } from '../interfaces/operation.interface';
import { getOperationFlags } from './getOperationFlags';

describe('Get Operation Flags', () => {
    const operations: IOperation[] = require('../../mocks/operations.json');
    it('should get operation flags', () => {
        expect(getOperationFlags(operations[0])).toEqual([
            'sent',
            'collateral',
            'stake',
            'supply',
            'borrow',
            'liquidation',
            'funding',
            'reward',
            'swap',
            'change',
            'fee',
        ]);
    });
});
