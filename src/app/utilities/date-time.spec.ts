import { dateToString, formatDate, timeToString } from './date-time';

describe('Date & Time Utility', () => {
    it('should give readable date from Date', () => {
        expect(formatDate(new Date(1500000000000))).toBe('14th July 2017');
    });

    it('should give readable date from String', () => {
        expect(formatDate('7/14/2017 02:40:00')).toBe('14th July 2017');
    });

    it('should format date', () => {
        expect(dateToString(new Date(1500000000000))).toBe('2017-07-14');
    });

    it('should format time', () => {
        expect(timeToString(new Date(1500000000000))).toBe('02:40:00');
    });
});
