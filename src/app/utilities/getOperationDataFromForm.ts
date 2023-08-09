import {
    IOperationFormData,
    IOperationRequestData,
} from '../interfaces/operation.interface';
import { flags } from '../views/wormhole/general-ledger/general-ledger-table/transactions-table/operations-table/operation-helpers';

export const getOperationDataFromForm = (
    formData: IOperationFormData,
): IOperationRequestData => {
    let operationData: IOperationRequestData = {
        fromAddress: formData.fromAddress,
        toAddress: formData.toAddress,
        amount: formData.amount,
        ledgerName: formData.ledgerName,
        assetAddress: formData.assetAddress,
        tokenId: formData.tokenId,
    };

    flags.forEach((flag) => {
        if (formData.flags.includes(flag.columnName)) {
            operationData = {
                ...operationData,
                [flag.columnName]: true,
            };
        } else {
            operationData = {
                ...operationData,
                [flag.columnName]: false,
            };
        }
    });

    return operationData;
};
