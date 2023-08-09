import { getShortValue } from './getShortValue';

describe('Get Short Value', () => {
    it('should format value to short view', () => {
        expect(getShortValue(1, 0)).toBe('1');
        expect(getShortValue(100, 0)).toBe('100');
        expect(getShortValue(1000, 0)).toBe('1K');
        expect(getShortValue(1000000, 0)).toBe('1M');
        expect(getShortValue(1000000000, 0)).toBe('1B');
    });
});
