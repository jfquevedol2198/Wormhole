import { ITokenMetric } from '../../../../../../interfaces/tokenMetric.interface';
import { formatValue } from '../../../../../../utilities/format-value';
import {
    getTokenMetricsCellData,
    getTokenMetricsCellUsdData,
} from '../../../../../../utilities/getTokenMetricsCellData';

export const tokenMetricColumns = [
    {
        columnDef: 'parent-link',
        header: '',
        columnType: 'parent-link',
        cell: () => ``,
    },
    {
        columnDef: 'metric',
        header: 'Metric',
        columnType: '',
        cell: (tokenMetric: ITokenMetric) => `${tokenMetric.name}`,
    },
    {
        columnDef: 'change',
        header: 'Change',
        columnType: 'percentageChange',
        cell: (tokenMetric: ITokenMetric) =>
            `${formatValue(tokenMetric.change)}%`,
        textColor: (tokenMetric: ITokenMetric) =>
            tokenMetric.change < 0 ? 'app-error' : 'app-success',
    },
    {
        columnDef: 'tokenOpening',
        header: 'Token (opening)',
        columnType: '',
        cell: (tokenMetric: ITokenMetric) =>
            getTokenMetricsCellData(tokenMetric.tokenOpening),
    },
    {
        columnDef: 'tokenClosing',
        header: 'Token (closing)',
        columnType: '',
        cell: (tokenMetric: ITokenMetric) =>
            getTokenMetricsCellData(tokenMetric.tokenClosing),
    },
    {
        columnDef: 'tokenChange',
        header: 'Token (change)',
        columnType: '',
        cell: (tokenMetric: ITokenMetric) =>
            getTokenMetricsCellData(tokenMetric.tokenChange),
    },
    {
        columnDef: 'usdOpening',
        header: 'USD (opening)',
        columnType: '',
        cell: (tokenMetric: ITokenMetric) =>
            getTokenMetricsCellUsdData(tokenMetric.usdOpening),
    },
    {
        columnDef: 'usdClosing',
        header: 'USD (closing)',
        columnType: '',
        cell: (tokenMetric: ITokenMetric) =>
            getTokenMetricsCellUsdData(tokenMetric.usdClosing),
    },
    {
        columnDef: 'usdChange',
        header: 'USD (change)',
        columnType: '',
        cell: (tokenMetric: ITokenMetric) =>
            getTokenMetricsCellUsdData(tokenMetric.usdChange),
    },
];
