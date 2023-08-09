import { IOverlay } from '../../../../../../../interfaces/operation.interface';

export const overlayColumns = [
    {
        columnDef: 'parent-link',
        header: '',
        columnType: 'parent-link',
    },
    {
        columnDef: 'value',
        header: 'Value',
        columnType: '',
        cell: (overlay: IOverlay) => overlay.name,
    },
    {
        columnDef: 'originalValue',
        header: 'Original',
        columnType: '',
        cell: (overlay: IOverlay) => overlay.originalValue,
    },
    {
        columnDef: 'overlayValue',
        header: 'Overlay',
        columnType: 'colored',
        cell: (overlay: IOverlay) => overlay.overlayValue,
        textColor: (overlay: IOverlay) =>
            overlay.overlayValue !== overlay.originalValue &&
            overlay.overlayValue !== '-'
                ? 'app-success'
                : '',
    },
    {
        columnDef: 'blockchainValue',
        header: 'Blockchain',
        columnType: 'colored',
        cell: (overlay: IOverlay) => overlay.blockchainValue,
        textColor: (overlay: IOverlay) =>
            overlay.blockchainValue !== overlay.originalValue &&
            overlay.blockchainValue !== '-'
                ? 'app-success'
                : '',
    },
];
