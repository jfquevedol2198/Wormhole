import { formatValue } from './format-value';

export const getTokenMetricsCellUsdData = (value: number | null): string => {
    return value === null || value === undefined
        ? ' - '
        : `${formatValue(value, '$')}`;
};

export const getTokenMetricsCellData = (value?: number | null): string => {
    return value === null || value === undefined
        ? ' - '
        : `${formatValue(value)}`;
};
