import { getProcessingProfitAndLossActions } from './getProcessingProfitAndLossButtonActions';

describe('Get Processing Profit And Loss Button Action', () => {
    it('should get processingProfitAndLoss button action', () => {
        expect(getProcessingProfitAndLossActions('')).toEqual('Run');
        expect(getProcessingProfitAndLossActions(null)).toEqual('Run');
        expect(getProcessingProfitAndLossActions(undefined)).toEqual('Run');
        expect(getProcessingProfitAndLossActions('completed')).toEqual(
            'Refresh',
        );
        expect(getProcessingProfitAndLossActions('running')).toEqual('Stop');
    });
});
