import { getSubTitleForAddressCell, getTitleForAddressCell } from './getSubtitles';

describe('Get Subtitle for table cells', () => {
    it('should format value', () => {
        expect(getTitleForAddressCell('Title(subtitle)')).toBe('Title');
        expect(getSubTitleForAddressCell('Title(subtitle)')).toBe('subtitle');
        expect(getTitleForAddressCell('Title:subtitle')).toBe('Title');
        expect(getSubTitleForAddressCell('Title:subtitle')).toBe('subtitle');
    });
});
