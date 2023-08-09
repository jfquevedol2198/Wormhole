import { formatPropertyName } from './formatPropertyName';

describe('Format Property Name', () => {
    const names = ['In Wallet', 'Borrow Balance', 'Funding Received'];
    const convertedNames = [
        {
            shortName: 'Wallet',
            columnDef: 'wallet',
        },
        {
            shortName: 'Borrow',
            columnDef: 'borrow',
        },
        {
            shortName: 'Funding',
            columnDef: 'floatingFunding',
        },
    ];

    it('should format property name', () => {
        expect(formatPropertyName(names[0])).toEqual(convertedNames[0]);
        expect(formatPropertyName(names[1])).toEqual(convertedNames[1]);
        expect(formatPropertyName(names[2])).toEqual(convertedNames[2]);
    });
});
