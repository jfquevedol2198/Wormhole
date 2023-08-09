import { formatValue } from './format-value';

describe('Format Value Utility', () => {
    it('should format value', () => {
        expect(formatValue(100000000000)).toBe('100,000,000,000.00');
        expect(formatValue(100000000000, '$')).toBe('$100,000,000,000.00');
        expect(formatValue(-1000000.2780123, '$')).toBe('-$1,000,000.28');
        expect(formatValue(-1.01, '$')).toBe('-$1.01');
        expect(formatValue(0.101, '$')).toBe('$0.10');
        expect(formatValue(-0.0101, '$')).toBe('-$0.01');
        expect(formatValue(0.00101, '$')).toBe('$0.0010');
        expect(formatValue(-0.000101, '$')).toBe('-$0.0001');
        expect(formatValue(0.0000101, '$')).toBe('$0.000010');
        expect(formatValue(-0.00000101, '$')).toBe('-$0.000001');
        expect(formatValue(0.000000101, '$')).toBe('$0.00');
        expect(formatValue(-0.0000000101, '$')).toBe('-$0.00');
    });
});
