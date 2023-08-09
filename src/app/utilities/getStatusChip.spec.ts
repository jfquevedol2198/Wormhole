import { getStatusChip } from './getStatusChip';

describe('Get Status Color', () => {
    it('should get status color', () => {
        expect(getStatusChip('')).toEqual({
            type: 'error',
            text: 'Missing status',
        });
        expect(getStatusChip(null)).toEqual({
            type: 'error',
            text: 'Missing status',
        });
        expect(getStatusChip(undefined)).toEqual({
            type: 'error',
            text: 'Missing status',
        });
        expect(getStatusChip('Completed')).toEqual({
            type: 'success',
            text: 'Completed',
        });
        expect(getStatusChip('Running')).toEqual({
            type: 'info',
            text: 'Running',
        });
        expect(getStatusChip('Scheduled')).toEqual({
            type: 'process',
            text: 'Scheduled',
        });
    });
});
