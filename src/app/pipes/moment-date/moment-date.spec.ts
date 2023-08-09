import { MomentDatePipe } from './moment-date.pipe';

describe('DatePipe Pipe', () => {
    let pipe: MomentDatePipe;

    beforeEach(() => {
        pipe = new MomentDatePipe();
    });

    it('should return a formatted date', () => {
        expect(pipe.transform(new Date(1500000000000))).toBe(
            '14-07-2017 02:40:00',
        );
        expect(pipe.transform('2021-07-05T07:25:41.82034+00:00')).toBe(
            '05-07-2021 07:25:41',
        );
    });
    it('should return a empty string', () => {
        expect(pipe.transform('')).toBe('');
        expect(pipe.transform(undefined)).toBe('');
        expect(pipe.transform(null)).toBe('');
    });
});
