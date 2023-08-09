import { getTransactionTreatment } from './getTransactionTreatment';

describe('Get Transaction Treatment', () => {
    it('should get transaction treatment', () => {
        expect(getTransactionTreatment('')).toEqual([]);
        expect(getTransactionTreatment(null)).toEqual([]);
        expect(getTransactionTreatment(undefined)).toEqual([]);
        expect(getTransactionTreatment('Events')).toEqual([
            { name: 'Events', icon: 'inventory' },
        ]);
        expect(getTransactionTreatment('|Events|')).toEqual([
            { name: 'Events', icon: 'inventory' },
        ]);
        expect(getTransactionTreatment('|Events|Events|')).toEqual([
            { name: 'Events', icon: 'inventory' },
            { name: 'Events', icon: 'inventory' },
        ]);
    });
});
