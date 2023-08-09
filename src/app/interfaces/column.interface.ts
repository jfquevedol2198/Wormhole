import { IAgent } from './agent.interface';
import {
    IHealthCheckSchemaInfo,
    IHealthCheckService,
    IHealthCheckWorkerTaskStatus,
} from './healthCheck.interface';
import { IOperation } from './operation.interface';
import { IOperationAudit } from './operationAudit.interface';
import { IPlatform } from './platform.interface';
import { IPNLPriceMovement } from './pnlPriceMovement.interface';
import { IProcessingJob, ISpeedUpSource } from './processing-jobs.interface';
import { IProcessingProfitAndLoss, IPNLMethodDefinition, IPNLMissingCurrencyPairs, IPNLReportMessages, IPNLAddressLabel, IPNLTransactionReportMessage } from './processingProfitAndLoss.interface';
import { IRuntimeData } from './runtimeData.interface';
import { ITokenMetric } from './tokenMetric.interface';
import { ITransaction } from './transaction.interface';
import { IWorkerTask } from './workerTask.interface';

export type Row =
    | ITransaction
    | IOperation
    | IPNLPriceMovement
    | ITokenMetric
    | IProcessingProfitAndLoss
    | IPlatform
    | IWorkerTask
    | IAgent
    | IRuntimeData
    | IHealthCheckWorkerTaskStatus
    | IHealthCheckSchemaInfo
    | IHealthCheckService
    | IProcessingJob
    | IOperationAudit
    | ISpeedUpSource
    | IPNLMethodDefinition
    | IPNLMissingCurrencyPairs
    | IPNLReportMessages
    | IPNLAddressLabel
    | IPNLTransactionReportMessage

export interface IColumn extends IInnerColumn {
    header: string;
    isSortable?: boolean;
    subCell?(row: Row): string;
    tooltip?(row: Row, columnDef: string): string;
    textColor?(row: Row): string;
}

export interface IInnerColumn {
    columnDef: string;
    columnType: string;
    cell?(row: Row, columnDef: string): string;
}
