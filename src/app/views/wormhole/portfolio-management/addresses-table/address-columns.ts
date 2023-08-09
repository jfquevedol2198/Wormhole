import moment from 'moment';

import { ILedgerAccount } from '../../../../interfaces/account.interface';

export const addressColumns = [
    {
        columnDef: 'type',
        header: '',
        columnType: 'icon',
    },
    {
        columnDef: 'status',
        header: 'Status',
        columnType: '',
        cell: (account: ILedgerAccount) => account.state,
    },
    {
        columnDef: 'accountAddress',
        header: 'Ledger Account',
        columnType: 'address',
    },
    {
        columnDef: 'synced',
        header: 'Synced',
        columnType: 'progress-bar',
        cell: (account: ILedgerAccount) =>
            moment.utc(account.syncedTimestamp).format('DD/MM/YYYY'),
        subCell: (account: ILedgerAccount) =>
            moment.utc(account.syncedTimestamp).format('hh:mm A'),
    },
    {
        columnDef: 'estimate',
        header: 'Estimate',
        columnType: 'estimation',
        cell: (account: ILedgerAccount) =>
            moment.utc(account.estimatedEndDate).format('DD/MM/YYYY'),
        subCell: (account: ILedgerAccount) =>
            moment.utc(account.estimatedEndDate).format('hh:mm A'),
    },

    {
        columnDef: 'advanced-actions',
        header: '',
        columnType: 'button',
    },
    {
        columnDef: 'basic-actions',
        header: 'Actions',
        columnType: 'actions',
    },
];
