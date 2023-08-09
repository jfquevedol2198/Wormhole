import { INotificationActionDetails } from 'src/app/interfaces/notifications.interface';

import { IChip } from '../../interfaces/healthCheck.interface';

export const getSeverityChips = (severity: string): IChip => {
    if (severity === 'Warning') {
        return {
            type: 'warning',
            text: severity,
        };
    } else if (severity === 'Success') {
        return {
            type: 'success',
            text: severity,
        };
    } else {
        return {
            type: 'error',
            text: 'Error',
        };
    }
};
export const getWorkerType = (details: string) => {
    const workerName = JSON.parse(JSON.stringify(details)).WorkerName;
    let action;
    switch (workerName) {
        // add actions when more jobs tabs are ready
        case 'ProfitAndLoss':
            action = 'Redirect to PnL Jobs Page';
            break;
        default:
            action = 'Redirect to... (WIP)';
            break;
    }
    return action;
};

export const getNotificationAction = (
    notification: INotificationActionDetails,
) => {
    const { type, details } = notification;

    let actionName;
    switch (type) {
        case 'MissingAddressLabel':
            actionName = 'Add new address label';
            break;
        case 'MissingMethodDefinition':
            actionName = 'Add new method definition';
            break;
        case 'MissingExchangeRatePair':
            actionName = 'Add new exchange rate pair';
            break;
        case 'WorkerTasks':
            actionName = getWorkerType(details);
            break;
        default:
            actionName = 'Action';
            break;
    }
    return actionName;
};
