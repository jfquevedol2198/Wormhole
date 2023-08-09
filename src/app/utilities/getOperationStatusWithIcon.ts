import {
    IOperationFromResponse,
    IOperationsStatusWithIcon,
} from '../interfaces/operation.interface';

export const getOperationStatusWithIcon = (
    operation: IOperationFromResponse,
): IOperationsStatusWithIcon => {
    if (operation.previousVersion) {
        return {
            status: 'Overlay',
            icon: 'auto_fix_high',
        };
    }
    return operation.manual
        ? {
              status: 'Manual',
              icon: 'back_hand',
          }
        : { status: 'Original', icon: 'source' };
};
