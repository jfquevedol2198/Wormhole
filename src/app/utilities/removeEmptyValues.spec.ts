import { removeEmptyValues } from './removeEmptyValues';

describe('Remove Empty Values', () => {
    it('should remove all of the empty values in the object', () => {
        expect(
            removeEmptyValues({
                a: 1,
                d: '33',
                e: undefined,
            }),
        ).toEqual({ a: 1, d: '33' });
    });
});
