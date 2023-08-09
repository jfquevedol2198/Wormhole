import moment from "moment";
import { IAccountDataSummary } from "src/app/interfaces/accountDataSummary.interface";
import { IProcessingProfitAndLoss } from "src/app/interfaces/processingProfitAndLoss.interface";

export const substractAccountingModel = (accountingModels: string) => {
    let accountingModelObj;
    if (accountingModels === 'None') {
        accountingModelObj = {
            cashBasedModel: false,
            tokenBasedModel: false,
        };
    } else if (accountingModels === 'DollarBased') {
        accountingModelObj = {
            cashBasedModel: true,
            tokenBasedModel: false,
        };
    } else if (accountingModels === 'TokenBased') {
        accountingModelObj = {
            cashBasedModel: false,
            tokenBasedModel: true,
        };
    } else {
        accountingModelObj = {
            cashBasedModel: true,
            tokenBasedModel: true,
        };
    }

    return accountingModelObj;
};

export const getPNLstatus = (pnlDefinition: IProcessingProfitAndLoss, processingProgressData: IAccountDataSummary[]) => {
    const timestamp = processingProgressData.filter(v => v.category === 'Profit and Loss')[0].syncTimestamp;
    if (moment(timestamp).isAfter(moment(pnlDefinition.periodEndDate))) {
        return 'success';
    } else if (moment(timestamp).isBetween(pnlDefinition.periodStartDate, pnlDefinition.periodEndDate)) {
        return 'running';
    } else {
        return 'not-started';
    }
}

export const getPNLDefinitionAction = (
    pnlDefinition: IProcessingProfitAndLoss,
) => {
    let enabledRefresh = false;
    let enabledSpeedUp = false;
    let enabledSchedule = false;
    let enabledStop = false;
    if (pnlDefinition.draft) {
        enabledSchedule = true;
    } else if (pnlDefinition.progress >= 0 && pnlDefinition.progress < 1) {
        enabledStop = true;
        enabledSpeedUp = true;
    } else if (pnlDefinition.progress === 1) {
        enabledRefresh = true;
    }
    return {
        enabledRefresh,
        enabledSpeedUp,
        enabledSchedule,
        enabledStop
    };
};
