import { IOperation } from '../interfaces/operation.interface';
import { flags } from '../views/wormhole/general-ledger/general-ledger-table/transactions-table/operations-table/operation-helpers';

export const getOperationFlags = (operation: IOperation): string[] => {
    return flags.map((flag) => {
        if (operation[flag.columnName]) {
            return flag.columnName;
        }
    });
};
