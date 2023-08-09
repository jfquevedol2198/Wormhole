import { IOperationFromResponse } from '../interfaces/operation.interface';
import { ITreatmentWithIcon } from '../interfaces/transaction.interface';

export const getOperationTreatment = (operation: IOperationFromResponse) => {
    const treatmentWithIcons: ITreatmentWithIcon[] = [];

    if (operation.sent) {
        treatmentWithIcons.push({
            name: 'Sent',
            icon: 'call_made',
        });
    }

    if (operation.received) {
        treatmentWithIcons.push({
            name: 'Received',
            icon: 'call_received',
        });
    }

    if (operation.collateral) {
        treatmentWithIcons.push({
            name: 'Collateral',
            icon: 'lock',
        });
    }

    if (operation.stake) {
        treatmentWithIcons.push({
            name: 'Stake',
            icon: 'add_circle_outline',
        });
    }

    if (operation.supply) {
        treatmentWithIcons.push({
            name: 'Supply',
            icon: 'login',
        });
    }

    if (operation.borrow) {
        treatmentWithIcons.push({
            name: 'Borrow',
            icon: 'logout',
        });
    }

    if (operation.liquidation) {
        treatmentWithIcons.push({
            name: 'Liquidation',
            icon: 'money_off',
        });
    }

    if (operation.funding) {
        treatmentWithIcons.push({
            name: 'Funding',
            icon: 'savings',
        });
    }

    if (operation.reward) {
        treatmentWithIcons.push({
            name: 'Reward',
            icon: 'payments',
        });
    }

    if (operation.swap) {
        treatmentWithIcons.push({
            name: 'Swap',
            icon: 'swap_horizontal_circle',
        });
    }

    if (operation.change) {
        treatmentWithIcons.push({
            name: 'Change',
            icon: 'swap_vertical_circle',
        });
    }

    if (operation.internalTransfer) {
        treatmentWithIcons.push({
            name: 'Internal Transfer',
            icon: 'change_circle',
        });
    }

    if (operation.fee) {
        treatmentWithIcons.push({
            name: 'Fee',
            icon: 'local_atm',
        });
    }

    return treatmentWithIcons;
};
