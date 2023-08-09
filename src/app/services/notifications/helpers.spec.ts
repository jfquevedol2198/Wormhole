import {
    getSeverityChips,
    getNotificationAction,
    getWorkerType,
} from './helpers';

describe('Get Severity Chips', () => {
    it('should get severity chips', () => {
        expect(getSeverityChips('Warning')).toEqual({
            type: 'warning',
            text: 'Warning',
        });

        expect(getSeverityChips('Error')).toEqual({
            type: 'error',
            text: 'Error',
        });
        expect(getSeverityChips('Success')).toEqual({
            type: 'success',
            text: 'Success',
        });

        expect(getSeverityChips('')).toEqual({
            type: 'error',
            text: 'Error',
        });
        expect(getSeverityChips(null)).toEqual({
            type: 'error',
            text: 'Error',
        });
        expect(getSeverityChips(undefined)).toEqual({
            type: 'error',
            text: 'Error',
        });
    });
});

describe('Get Notification Action', () => {
    it('should get proper action based on notification type', () => {
        expect(
            getNotificationAction({
                type: 'WorkerTasks',
                details: { WorkerName: 'Notification' },
            }),
        ).toEqual('Redirect to... (WIP)');
        expect(
            getNotificationAction({
                type: 'WorkerTasks',
                details: { WorkerName: 'ProfitAndLoss' },
            }),
        ).toEqual('Redirect to PnL Jobs Page');
        expect(
            getNotificationAction({
                type: 'MissingAddressLabel',
                details: { WorkerName: '' },
            }),
        ).toEqual('Add new address label');
        expect(
            getNotificationAction({
                type: 'MissingMethodDefinition',
                details: { WorkerName: '' },
            }),
        ).toEqual('Add new method definition');
        expect(
            getNotificationAction({
                type: 'MissingExchangeRatePair',
                details: { WorkerName: '' },
            }),
        ).toEqual('Add new exchange rate pair');
        expect(
            getNotificationAction({
                type: '',
                details: { WorkerName: '' },
            }),
        ).toEqual('Action');
    });
});
