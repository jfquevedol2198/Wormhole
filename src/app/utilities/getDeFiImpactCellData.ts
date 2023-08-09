import { formatValue } from './format-value';

export const getDeFiImpactCellData = (value: number | null): string => {
    return value === null || value === undefined
        ? ' - '
        : `${formatValue(value)}`;
};

export const getDeFiImpactSubCellData = (value: number | null): string => {
    return value === null || value === undefined
        ? ''
        : `(${formatValue(value)}%)`;
};
