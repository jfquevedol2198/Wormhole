import { transactionColumns } from './transaction-columns';

export const transactionsColumnsForEditMode = [
    ...transactionColumns,
    {
        columnDef: 'enabled',
        header: 'Disabled',
        columnType: 'toggle',
    },
];
