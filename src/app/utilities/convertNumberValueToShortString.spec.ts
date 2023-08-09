import { convertNumberValueToShortString } from './convertNumberValueToShortString';

describe('Convert Number Value To Short String', () => {
    it('should convert number value to short string', () => {
        expect(convertNumberValueToShortString(10000000)).toEqual('10.0M');
        expect(convertNumberValueToShortString(-10000000)).toEqual('-10.0M');
        expect(convertNumberValueToShortString(10000000, '$')).toEqual(
            '$10.0M',
        );

        expect(convertNumberValueToShortString(10050000)).toEqual('10.1M');
        expect(convertNumberValueToShortString(-10050000)).toEqual('-10.1M');
        expect(convertNumberValueToShortString(10050000, '$')).toEqual(
            '$10.1M',
        );

        expect(convertNumberValueToShortString(1330000)).toEqual('1.33M');
        expect(convertNumberValueToShortString(-1330000)).toEqual('-1.33M');
        expect(convertNumberValueToShortString(1330000, '$')).toEqual('$1.33M');

        expect(convertNumberValueToShortString(100000)).toEqual('100.0K');
        expect(convertNumberValueToShortString(-100000)).toEqual('-100.0K');
        expect(convertNumberValueToShortString(100000, '$')).toEqual('$100.0K');

        expect(convertNumberValueToShortString(100)).toEqual('100.0');
        expect(convertNumberValueToShortString(-100)).toEqual('-100.0');
        expect(convertNumberValueToShortString(100, '$')).toEqual('$100.0');

        expect(convertNumberValueToShortString(0.5)).toEqual('0.50');
        expect(convertNumberValueToShortString(-0.5)).toEqual('-0.50');
        expect(convertNumberValueToShortString(0.5, '$')).toEqual('$0.50');

        expect(convertNumberValueToShortString(0.005)).toEqual('0.01');
        expect(convertNumberValueToShortString(-0.005)).toEqual('-0.01');
        expect(convertNumberValueToShortString(0.005, '$')).toEqual('$0.01');
    });
});
