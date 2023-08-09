import { getTooltipValue } from './getTooltipValue';

describe('Get Tooltip Value', () => {
    it('should get tooltip value', () => {
        expect(getTooltipValue('LengthOfTextIs16')).toEqual(null);
        expect(getTooltipValue('LengthOfTextIs17!')).toEqual(
            'LengthOfTextIs17!',
        );
        expect(getTooltipValue('LengthOfTextIs16', 15)).toEqual(
            'LengthOfTextIs16',
        );
        expect(getTooltipValue('')).toEqual(null);
        expect(getTooltipValue(null)).toEqual(null);
        expect(getTooltipValue(undefined)).toEqual(null);
    });
});
