export const convertNumberValueToShortString = (
    value: number,
    symbol: string = '',
) => {
    if (Math.abs(value) >= 1000000) {
        const millions = (value as number) / 1000000;

        return `${millions < 0 ? '-' : ''}${symbol}${
            Math.abs(millions) >= 5 || millions === 0
                ? Math.abs(millions).toFixed(1)
                : Math.abs(millions).toFixed(2)
        }M`;
    } else if (Math.abs(value) >= 1000) {
        const thousands = (value as number) / 1000;

        return `${thousands < 0 ? '-' : ''}${symbol}${
            Math.abs(thousands) >= 5 || thousands === 0
                ? Math.abs(thousands).toFixed(1)
                : Math.abs(thousands).toFixed(2)
        }K`;
    } else {
        return `${value < 0 ? '-' : ''}${symbol}${
            Math.abs(value) >= 5 || value === 0
                ? Math.abs(value).toFixed(1)
                : Math.abs(value).toFixed(2)
        }`;
    }
};
