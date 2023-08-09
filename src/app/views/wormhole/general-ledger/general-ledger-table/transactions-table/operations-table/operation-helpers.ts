import {
    IOperation,
    IOperationFlag,
} from '../../../../../../interfaces/operation.interface';
import { assetSymbol } from '../../../../../../utilities/format-asset';
import { formatValue } from '../../../../../../utilities/format-value';
import { getTitleForAddressCell } from '../../../../../../utilities/getSubtitles';

export const flags: IOperationFlag[] = [
    { name: 'Sent', columnName: 'sent' },
    { name: 'Collateral', columnName: 'collateral' },
    { name: 'Stake', columnName: 'stake' },
    { name: 'Supply', columnName: 'supply' },
    { name: 'Borrow', columnName: 'borrow' },
    { name: 'Liquidation', columnName: 'liquidation' },
    { name: 'Funding', columnName: 'funding' },
    { name: 'Reward', columnName: 'reward' },
    { name: 'Swap', columnName: 'swap' },
    { name: 'Change', columnName: 'change' },
    { name: 'Fee', columnName: 'fee' },
];

// TODO:
// connect to API when it will be possible to get the names of blockchains

export const supportedLedges: string[] = [
    'None',
    'Fiat',
    'Ethereum',
    'EthereumBinance',
];

export const getOperationAddressData = (
    operation: IOperation,
    direction: 'From' | 'To',
) => {
    return direction === 'To'
        ? getTitleForAddressCell(
              operation.toAddressLabel
                  ? operation.toAddressLabel
                  : operation.toAddress,
          )
        : getTitleForAddressCell(
              operation.fromAddressLabel
                  ? operation.fromAddressLabel
                  : operation.fromAddress,
          );
};

export const getOperationAssetName = (operation: IOperation) => {
    return operation.assetName;
};

export const getOperationDirection = (operation: IOperation) => {
    return operation.usdValue > 0 ? 'Buy' : 'Sell';
};

export const getOperationTreatmentAsString = (operation: IOperation) => {
    return operation.treatmentWithIcons
        .map((treatmentWithIcon) => treatmentWithIcon.name)
        .join(', ');
};

export const getOperationUsdValue = (operation: IOperation) => {
    return formatValue(operation.usdValue, '$');
};

export const getOperationValue = (operation: IOperation) => {
    return `${formatValue(operation.value)} ${assetSymbol(
        operation.assetName,
    )}`;
};
