import { ITransaction } from '../../../../../interfaces/transaction.interface';
import { formatValue } from '../../../../../utilities/format-value';
import { getTitleForAddressCell } from '../../../../../utilities/getSubtitles';
import { getTooltipValue } from '../../../../../utilities/getTooltipValue';
import { separateStringIntoWords } from '../../../../../utilities/separateStringIntoWords';

export const transactionColumns = [
    {
        columnDef: ' ',
        header: ' ',
        columnType: 'is-selected-icon',
        isSortable: false,
    },
    {
        columnDef: 'timestamp',
        header: 'Date and Time',
        columnType: '',
        isSortable: true,
        cell: (transaction: ITransaction) =>
            transaction.date.format('DD/MM/YYYY'),
        subCell: (transaction: ITransaction) =>
            transaction.date.format('hh:mm A'),
    },
    {
        columnDef: 'transactionHash',
        header: 'Transaction Hash',
        columnType: 'transactionHash',
        isSortable: true,
        cell: (transaction: ITransaction) => transaction.transactionHash,
    },
    {
        columnDef: 'fromAddressLabel.name',
        header: 'From',
        columnType: 'addressLabel',
        isSortable: true,
        cell: (transaction: ITransaction) =>
            getTitleForAddressCell(
                transaction.fromAddressLabel
                    ? transaction.fromAddressLabel.name
                    : transaction.fromAddress,
            ),
        subCell: (transaction: ITransaction) => transaction.fromAddress,
    },
    {
        columnDef: 'toAddressLabel.name',
        header: 'To',
        columnType: 'addressLabel',
        isSortable: true,
        cell: (transaction: ITransaction) =>
            getTitleForAddressCell(
                transaction.toAddressLabel
                    ? transaction.toAddressLabel.name
                    : transaction.toAddress,
            ),

        subCell: (transaction: ITransaction) => transaction.toAddress,
    },
    {
        columnDef: 'platform',
        header: 'Platform',
        columnType: 'logo',
        isSortable: true,
        cell: (transaction: ITransaction) => transaction.platformLogoUri,
        tooltip: (transaction: ITransaction) => transaction.platform,
    },
    {
        columnDef: 'methodDescription',
        header: 'Method',
        columnType: '',
        isSortable: true,
        tooltip: (transaction: ITransaction) =>
            getTooltipValue(transaction.methodDescription),
        cell: (transaction: ITransaction) => transaction.methodDescription,
    },
    {
        columnDef: 'methodProcessing',
        header: 'Treatment',
        columnType: 'treatment',
        isSortable: true,
    },
    {
        columnDef: 'ethValue',
        header: 'ETH Value',
        columnType: '',
        isSortable: true,
        cell: (transaction: ITransaction) =>
            formatValue(transaction.ethValue) || '-',
    },
    {
        columnDef: 'usdValue',
        header: 'USD Value',
        columnType: '',
        isSortable: true,
        cell: (transaction: ITransaction) =>
            formatValue(transaction.usdValue) || '-',
    },
    {
        columnDef: 'transactionFee',
        header: 'Fee USD / Token',
        columnType: '',
        isSortable: true,
        cell: (transaction: ITransaction) =>
            formatValue(transaction.transactionFee),
    },
    {
        columnDef: 'processingStage',
        header: 'Processing Stage',
        columnType: '',
        isSortable: true,
        cell: (transaction: ITransaction) => transaction.processingStage,
    },
    {
        columnDef: 'isError',
        header: 'Status',
        columnType: 'icon',
        isSortable: true,
        tooltip: (transaction: ITransaction) =>
            transaction.isError ? 'Failed' : 'Successful',
        cell: (transaction: ITransaction) =>
            transaction.isError ? 'highlight_off' : 'check_circle_outlined',
        textColor: (transaction: ITransaction) =>
            transaction.isError ? 'app-error' : 'app-success',
    },
    {
        columnDef: 'source',
        header: 'Source',
        columnType: '',
        isSortable: true,
        tooltip: (transaction: ITransaction) =>
            transaction.source && transaction.source.length > 16
                ? separateStringIntoWords(transaction.source)
                : null,
        cell: (transaction: ITransaction) =>
            separateStringIntoWords(transaction.source),
    },
];

export const transactionColumnsForDataValidator = [
    ...transactionColumns,
    {
        columnDef: 'edited',
        header: 'Edited',
        columnType: 'is-edited',
        cell: (transaction: ITransaction) =>
            transaction.edited ? 'edit_outlined' : null,
        textColor: (transaction: ITransaction) => 'app-success',
    },
];

export const innerTransactionColumns = [
    {
        columnDef: 'operations',
        columnType: 'operations',
        cell: (transaction: ITransaction) => `${transaction.transactionId}`,
    },
];
