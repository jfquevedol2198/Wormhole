import { IAsset } from '../../../../interfaces/asset.interface';
import { IPlatform } from '../../../../interfaces/platform.interface';
import { formatValue } from '../../../../utilities/format-value';
import { getTooltipValue } from '../../../../utilities/getTooltipValue';
import { getTotalInventoryBalance } from '../../../../utilities/getTotalInventoryBalance';
import { hideNullableValue } from '../../../../utilities/hideNullableValues';

export const inventoryColumns = [
    {
        columnDef: 'name',
        header: 'Name',
        columnType: '',
        isSortable: true,
        cell: (inventory: IAsset | IPlatform) => `${inventory.name}`,
        subCell: (inventory: IAsset | IPlatform) =>
            `${formatValue(getTotalInventoryBalance(inventory).totalBalance)}`,
        tooltip: (inventory: IAsset | IPlatform) =>
            getTooltipValue(inventory.name, 18),
    },
    {
        columnDef: 'floatingFunding',
        header: 'Funding Received',
        columnType: '',
        isSortable: true,
        cell: (inventory: IAsset | IPlatform) =>
            `${hideNullableValue(inventory, 'floatingFundingUsd')}`,
        subCell: (inventory: IAsset | IPlatform) =>
            `${hideNullableValue(
                inventory,
                'fundingToken',
                true,
                'floatingFundingUsd',
            )}`,
    },
    {
        columnDef: 'wallet',
        header: 'In Wallet',
        columnType: '',
        isSortable: true,
        cell: (inventory: IAsset | IPlatform) =>
            `${hideNullableValue(inventory, 'walletUsd')}`,
        subCell: (inventory: IAsset | IPlatform) =>
            `${hideNullableValue(inventory, 'walletToken', true, 'walletUsd')}`,
    },
    {
        columnDef: 'supply',
        header: 'Supply Balance',
        columnType: '',
        isSortable: true,
        cell: (inventory: IAsset | IPlatform) =>
            `${hideNullableValue(inventory, 'supplyUsd')}`,
        subCell: (inventory: IAsset | IPlatform) =>
            `${hideNullableValue(inventory, 'supplyToken', true, 'supplyUsd')}`,
    },
    {
        columnDef: 'stake',
        header: 'Stake Balance',
        columnType: '',
        isSortable: true,
        cell: (inventory: IAsset | IPlatform) =>
            `${hideNullableValue(inventory, 'stakeUsd')}`,
        subCell: (inventory: IAsset | IPlatform) =>
            `${hideNullableValue(inventory, 'stakeToken', true, 'stakeUsd')}`,
    },
    {
        columnDef: 'collateral',
        header: 'Collateral Balance',
        columnType: '',
        isSortable: true,
        cell: (inventory: IAsset | IPlatform) =>
            `${hideNullableValue(inventory, 'collateralUsd')}`,
        subCell: (inventory: IAsset | IPlatform) =>
            `${hideNullableValue(
                inventory,
                'collateralToken',
                true,
                'collateralUsd',
            )}`,
    },
    {
        columnDef: 'borrow',
        header: 'Borrow Balance',
        columnType: '',
        isSortable: true,
        cell: (inventory: IAsset | IPlatform) =>
            `${hideNullableValue(inventory, 'borrowUsd')}`,
        subCell: (inventory: IAsset | IPlatform) =>
            `${hideNullableValue(inventory, 'borrowToken', true, 'borrowUsd')}`,
    },
];
