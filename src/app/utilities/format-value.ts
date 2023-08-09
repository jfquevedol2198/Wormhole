export const formatValue = (
    value: number,
    symbol: string = '',
    precision?: number,
): string => {
    precision =
        Math.abs(value) < 0.000001
            ? 2
            : Math.abs(value) < 0.0001
            ? 6
            : Math.abs(value) < 0.01
            ? 4
            : 2;
    return `${value < 0 ? '-' : ''}${symbol}${Math.abs(value)
        .toFixed(precision)
        .toString()
        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}`;
};
