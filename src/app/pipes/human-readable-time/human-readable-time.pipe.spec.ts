import { HumanReadableTimePipe } from './human-readable-time.pipe';

describe('HumanReadableTime Pipe', () => {
    let pipe: HumanReadableTimePipe;

    beforeEach(() => {
        pipe = new HumanReadableTimePipe();
    });

    it('should return a formatted value', () => {
        expect(pipe.transform(2 * 60 * 60 + 30 * 60 + 20)).toBe(
            '2 hours 30 minutes',
        );

        expect(pipe.transform(20 * 60 + 20)).toBe('20 minutes 20 seconds');
    });
});
