import { IOperationFormData } from '../interfaces/operation.interface';
import { getOperationDataFromForm } from './getOperationDataFromForm';

describe('Get Operation Data From Form', () => {
    const formData: IOperationFormData = {
        fromAddress: 'fromAddress',
        toAddress: 'toAddress',
        amount: 'amount',
        ledgerName: 'blockchainName',
        assetAddress: 'assetAddress',
        tokenId: 'tokenId',
        flags: ['sent', 'supply', 'stake'],
    };
    it('should get operation data from form', () => {
        expect(getOperationDataFromForm(formData)).toEqual({
            fromAddress: formData.fromAddress,
            toAddress: formData.toAddress,
            amount: formData.amount,
            ledgerName: formData.ledgerName,
            assetAddress: formData.assetAddress,
            tokenId: formData.tokenId,
            sent: true,
            supply: true,
            stake: true,
            collateral: false,
            borrow: false,
            liquidation: false,
            funding: false,
            reward: false,
            fee: false,
            change: false,
            swap: false,
        });
    });
});
