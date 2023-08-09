import { operationColumnsForDataValidator } from './operation-columns';

export const operationColumnsForEditMode = [
    ...operationColumnsForDataValidator,
    {
        columnDef: 'enabled',
        header: 'Disabled',
        columnType: 'toggle',
    },
    {
        columnDef: 'select',
        header: 'Select',
        columnType: 'checkbox',
    },
    {
        columnDef: 'edit',
        header: 'Edit',
        columnType: 'button',
    },
];
