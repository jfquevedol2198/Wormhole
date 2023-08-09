import { IOperation } from '../../../../../../interfaces/operation.interface';
import {
    getOperationAddressData,
    getOperationAssetName,
    getOperationDirection,
    getOperationUsdValue,
    getOperationValue,
} from './operation-helpers';

export const operationColumns = [
    {
        columnDef: 'parent-link',
        header: '',
        columnType: 'parent-link',
        cell: () => ``,
    },
    {
        columnDef: 'asset',
        header: 'Asset',
        columnType: 'logo',
        cell: (operation: IOperation) => operation.assetLogoUri,
        tooltip: (operation: IOperation) => getOperationAssetName(operation),
    },
    {
        columnDef: 'direction',
        header: 'Direction',
        columnType: '',
        cell: (operation: IOperation) => getOperationDirection(operation),
    },
    {
        columnDef: 'from',
        header: 'From',
        columnType: 'addressLabel',
        cell: (operation: IOperation) =>
            getOperationAddressData(operation, 'From'),
        subCell: (operation: IOperation) => operation.fromAddress,
    },
    {
        columnDef: 'to',
        header: 'To',
        columnType: 'addressLabel',
        cell: (operation: IOperation) =>
            getOperationAddressData(operation, 'To'),
        subCell: (operation: IOperation) => operation.toAddress,
    },
    {
        columnDef: 'methodProcessing',
        header: 'Treatment',
        columnType: 'treatment',
    },
    {
        columnDef: 'assetQuantity',
        header: 'Asset Quantity',
        columnType: '',
        cell: (operation: IOperation) => getOperationValue(operation),
    },
    {
        columnDef: 'assetValueUSD',
        header: 'Asset Value USD',
        columnType: '',
        cell: (operation: IOperation) => getOperationUsdValue(operation),
    },
];

export const operationColumnsForDataValidator = [
    {
        columnDef: 'parent-link',
        header: '',
        columnType: 'parent-link',
        cell: () => ``,
    },
    {
        columnDef: 'expand-overlay',
        header: '',
        columnType: 'expand-overlay',
        cell: (operation: IOperation) => operation.assetLogoUri,
    },
    {
        columnDef: 'asset',
        header: 'Asset',
        columnType: 'logo',
        cell: (operation: IOperation) => operation.assetLogoUri,
        tooltip: (operation: IOperation) => getOperationAssetName(operation),
    },
    {
        columnDef: 'direction',
        header: 'Direction',
        columnType: '',
        cell: (operation: IOperation) => getOperationDirection(operation),
    },
    {
        columnDef: 'from',
        header: 'From',
        columnType: 'addressLabel',
        cell: (operation: IOperation) =>
            getOperationAddressData(operation, 'From'),
        subCell: (operation: IOperation) => operation.fromAddress,
    },
    {
        columnDef: 'to',
        header: 'To',
        columnType: 'addressLabel',
        cell: (operation: IOperation) =>
            getOperationAddressData(operation, 'To'),
        subCell: (operation: IOperation) => operation.toAddress,
    },
    {
        columnDef: 'methodProcessing',
        header: 'Treatment',
        columnType: 'treatment',
    },
    {
        columnDef: 'assetQuantity',
        header: 'Asset Quantity',
        columnType: '',
        cell: (operation: IOperation) => getOperationValue(operation),
    },
    {
        columnDef: 'assetValueUSD',
        header: 'Asset Value USD',
        columnType: '',
        cell: (operation: IOperation) => getOperationUsdValue(operation),
    },
    {
        columnDef: 'status',
        header: 'Status',
        columnType: 'icon',
    },
];
