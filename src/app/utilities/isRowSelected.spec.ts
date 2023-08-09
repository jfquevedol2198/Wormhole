import { isRowSelected } from './isRowSelected';

describe('Check is row selected', () => {
    it('should check is row selected', () => {
        const selectedRow = {
            id: 1,
            value: 'value',
        };
        const unselectedRow = {
            id: 2,
            value: 'value2',
        };
        const selectedRowsWithData = [{ row: selectedRow, data: 'data' }];

        expect(isRowSelected(selectedRow, selectedRowsWithData)).toBe(true);

        expect(isRowSelected(unselectedRow, selectedRowsWithData)).toBe(false);
    });
});
