import { IProcessingProfitAndLossStatus } from '../interfaces/processingProfitAndLoss.interface';

export const getProcessingProfitAndLossActions = (
    status: IProcessingProfitAndLossStatus | '',
) => {
    let actionButtonLabel;
    switch (status) {
        case 'completed':
            actionButtonLabel = 'Refresh';
            break;

        case 'running':
            actionButtonLabel = 'Stop';
            break;

        default:
            actionButtonLabel = 'Run';
            break;
    }
    return actionButtonLabel;
};
