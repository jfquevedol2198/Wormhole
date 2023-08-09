import { IOperationResponse } from '../interfaces/operation.interface';
import { getOperationStatusWithIcon } from './getOperationStatusWithIcon';

describe('Get Operation Status', () => {
    const operationsResponse: IOperationResponse = require('../../mocks/operationsResponse.json');
    const operations = operationsResponse.records;
    it('should get operation status', () => {
        expect(getOperationStatusWithIcon(operations[0])).toEqual({
            status: 'Overlay',
            icon: 'auto_fix_high',
        });
        expect(getOperationStatusWithIcon(operations[1])).toEqual({
            status: 'Original',
            icon: 'source',
        });
        expect(getOperationStatusWithIcon(operations[2])).toEqual({
            status: 'Overlay',
            icon: 'auto_fix_high',
        });
        expect(getOperationStatusWithIcon(operations[3])).toEqual({
            status: 'Manual',
            icon: 'back_hand',
        });
    });
});
