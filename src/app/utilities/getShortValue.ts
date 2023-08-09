export const getShortValue = (value: number, precision = 2): string => {
    const absoluteValue = Math.abs(value);
    return absoluteValue >= 1.0e+9
        ? (absoluteValue / 1.0e+9).toFixed(precision) + 'B'
        : absoluteValue >= 1.0e+6
            ? (absoluteValue / 1.0e+6).toFixed(precision) + 'M'
            : absoluteValue >= 1.0e+3
                ? (absoluteValue / 1.0e+3).toFixed(precision) + 'K'
                : `${absoluteValue}`;
};
