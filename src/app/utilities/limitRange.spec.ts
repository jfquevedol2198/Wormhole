import { limitRange } from './limitRange';

describe('Limit Range Utility', () => {
    it('should limit top', () => {
        expect(limitRange(100, 0, 50)).toEqual(50);
    });

    it('should limit bottom', () => {
        expect(limitRange(10, 50, 100)).toEqual(50);
    });
});
