import moment from 'moment';
import { INotification } from 'src/app/interfaces/notifications.interface';

export const notificationsColumns = [
    {
        columnDef: 'select',
        header: '',
        columnType: 'checkbox',
    },
    {
        columnDef: 'createdDate',
        header: 'Date and Time',
        columnType: '',
        isSortable: true,
        cell: (notification: INotification) =>
            moment.utc(notification.createdDate).format('DD/MM/YYYY'),
        subCell: (notification: INotification) =>
            moment.utc(notification.createdDate).format('hh:mm A'),
    },
    {
        columnDef: 'severity',
        header: 'Severity',
        columnType: 'chip',
        isSortable: true,
    },
    {
        columnDef: 'type',
        header: 'Type',
        columnType: '',
        isSortable: true,
        cell: (notification: INotification) => notification.type,
    },
    {
        columnDef: 'message',
        header: 'Message',
        columnType: 'message',
        isSortable: true,
    },
    {
        columnDef: 'redirect',
        header: 'Redirect',
        columnType: 'redirect-button',
    },
    {
        columnDef: 'dismissed',
        header: 'Unread',
        columnType: 'toggle',
        isSortable: true,
    },
    {
        columnDef: 'delete',
        header: '',
        columnType: 'icon',
    },
];
