import { IColumn } from "src/app/interfaces/column.interface";
import { ISpeedUpSource } from "src/app/interfaces/processing-jobs.interface";

export const priorityTableData: ISpeedUpSource[] = [
    {
        fee: 'Free',
        processingTime: '72 hours',
        isChecked: false,
        priority: 0,
    },
    {
        fee: '0.001 ETH',
        processingTime: '24 hours',
        isChecked: false,
        priority: 1,
    },
    {
        fee: '0.05 ETH',
        processingTime: '12 hours',
        isChecked: false,
        priority: 2,
    },
    {
        fee: '0.1 ETH',
        processingTime: '1 hour',
        isChecked: false,
        priority: 3,
    },
];

export const priorityTableColumns: IColumn[] = [
    {
        columnDef: 'fee',
        header: 'Fee',
        columnType: '',
        cell: (priorityData: ISpeedUpSource) => priorityData.fee,
    },
    {
        columnDef: 'processingTime',
        header: 'Processing Time',
        columnType: '',
        cell: (priorityData: ISpeedUpSource) => priorityData.processingTime,
    },
    {
        columnDef: ' ',
        header: ' ',
        columnType: 'checkbox',
    },
];
