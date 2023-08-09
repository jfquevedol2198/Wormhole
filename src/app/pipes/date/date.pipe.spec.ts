import { DatePipe } from './date.pipe';

describe('DatePipe Pipe', () => {
    let pipe: DatePipe;

    beforeEach(() => {
        pipe = new DatePipe();
    });

    it('should return a formatted date', () => {
        expect(pipe.transform(new Date(1500000000000))).toBe('14th July 2017');
    });

    it('should return a formatted date with time', () => {
        expect(pipe.transform(new Date(1500000000000), true)).toBe(
            '14th July 2017 02:40:00',
        );
    });
});
