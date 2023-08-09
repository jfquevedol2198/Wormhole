import { IOperationResponse } from '../interfaces/operation.interface';
import { getOperationTreatment } from './getOperationTreatment';

describe('Get Operation Treatment', () => {
    const operationsResponse: IOperationResponse = require('../../mocks/operationsResponse.json');
    it('should get transaction treatment', () => {
        expect(getOperationTreatment(operationsResponse.records[0])).toEqual([
            { name: 'Sent', icon: 'call_made' },
            { name: 'Received', icon: 'call_received' },
            { name: 'Collateral', icon: 'lock' },
            { name: 'Stake', icon: 'add_circle_outline' },
            { name: 'Supply', icon: 'login' },
            { name: 'Borrow', icon: 'logout' },
            { name: 'Liquidation', icon: 'money_off' },
            { name: 'Funding', icon: 'savings' },
            { name: 'Reward', icon: 'payments' },
            { name: 'Swap', icon: 'swap_horizontal_circle' },
            { name: 'Change', icon: 'swap_vertical_circle' },
            { name: 'Internal Transfer', icon: 'change_circle' },
            { name: 'Fee', icon: 'local_atm' },
        ]);
    });
});
