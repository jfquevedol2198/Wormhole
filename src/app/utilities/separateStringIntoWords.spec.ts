import { separateStringIntoWords } from './separateStringIntoWords';

describe('Separate string into words', () => {
    it('should separate string into words', () => {
        expect(separateStringIntoWords('Test')).toEqual('Test');
        expect(separateStringIntoWords('TestTest')).toEqual('Test Test');
        expect(separateStringIntoWords('TestTestTest')).toEqual(
            'Test Test Test',
        );
        expect(separateStringIntoWords('testTest')).toEqual('test Test');
        expect(separateStringIntoWords('test12Test')).toEqual('test12 Test');
        expect(separateStringIntoWords('12')).toEqual('12');
        expect(separateStringIntoWords('')).toEqual('');
        expect(separateStringIntoWords(null)).toEqual('');
        expect(separateStringIntoWords(undefined)).toEqual('');
    });
});
