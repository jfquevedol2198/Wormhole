import { IOperationAudit } from '../../../interfaces/operationAudit.interface';

export const changeTableColumns = [
    {
        columnDef: 'entityState',
        header: '',
        columnType: 'icon',
        tooltip: (operationAudit: IOperationAudit) =>
            operationAudit.entityState,
        cell: (operationAudit: IOperationAudit) =>
            operationAudit.entityState === 'Added'
                ? 'check_circle_outlined'
                : operationAudit.entityState === 'Modified'
                ? 'error_outline'
                : 'highlight_off',
        textColor: (operationAudit: IOperationAudit) =>
            operationAudit.entityState === 'Added'
                ? 'app-success'
                : operationAudit.entityState === 'Modified'
                ? 'app-warning'
                : 'app-error',
    },
    {
        columnDef: 'timestamp',
        header: 'Date and Time',
        columnType: '',
        cell: (operationAudit: IOperationAudit) =>
            operationAudit.date.format('DD/MM/YYYY'),
        subCell: (operationAudit: IOperationAudit) =>
            operationAudit.date.format('hh:mm A'),
    },
    {
        columnDef: 'userAccountName',
        header: 'User',
        columnType: '',
        cell: (operationAudit: IOperationAudit) =>
            operationAudit.userAccountName,
    },
    {
        columnDef: 'message',
        header: 'Message',
        columnType: '',
        cell: (operationAudit: IOperationAudit) => {
            return operationAudit.message
                ? operationAudit.message.split(/[\[\]]+/)[0]
                : '-';
        },
    },
];
