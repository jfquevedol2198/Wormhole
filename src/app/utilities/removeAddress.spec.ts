import { removeAddress } from './removeAddress';

describe('Remove Address Utility', () => {
    it('should remove address', () => {
        expect(
            removeAddress('ZRX (0xe41d2489571d322189246dafa5ebde1f4699f498)'),
        ).toBe('ZRX');
    });
});
