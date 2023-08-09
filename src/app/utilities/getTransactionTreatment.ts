import { ITreatmentWithIcon } from '../interfaces/transaction.interface';

export const getTransactionTreatment = (
    methodProcessing: string,
): ITreatmentWithIcon[] => {
    const treatmentWithIcons = [];
    if (methodProcessing) {
        const treatments = methodProcessing
            .split('|')
            .filter((element) => element.length);

        if (treatments.length > 0) {
            treatments.forEach((treatment) => {
                let icon: string;
                switch (treatment) {
                    case 'Events':
                        icon = 'inventory';
                        break;
                    case 'ClaimReward':
                        icon = 'payments';
                        break;
                    case 'Swap':
                        icon = 'swap_horizontal_circle';
                        break;
                    case 'Liquidation':
                        icon = 'money_off';
                        break;
                    case 'Funding':
                        icon = 'savings';
                        break;
                    case 'Deposit':
                        icon = 'save_alt';
                        break;
                    case 'Withdrawal':
                        icon = 'ios_share';
                        break;
                    case 'Stake':
                        icon = 'add_circle_outline';
                        break;
                    case 'Unstake':
                        icon = 'remove_circle_outline';
                        break;
                    case 'Borrow':
                        icon = 'logout';
                        break;
                    case 'Repay':
                        icon = 'login';
                        break;
                    default:
                        icon = 'error_outline';
                        break;
                }
                treatmentWithIcons.push({
                    name: treatment,
                    icon,
                });
            });
        }
    }
    return treatmentWithIcons;
};
