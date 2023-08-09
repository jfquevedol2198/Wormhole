import moment from 'moment';
import { Row } from 'src/app/interfaces/column.interface';
import { IProcessingProfitAndLoss } from 'src/app/interfaces/processingProfitAndLoss.interface';

const getTimeInFormat = (data: Row, columnDef: string) => data[columnDef] ? moment.utc(data[columnDef]).format('DD/MM/YYYY HH:mm:ss') : '';
const getCellData = (data: Row, columnDef: string) => data[columnDef] ? `${data[columnDef]}` : '-';

export const profitAndLossColumns = [
    {
        columnDef: 'integrity',
        header: 'Integrity',
        columnType: 'icon',
        isSortable: false,
        tooltip: (processingProfitAndLoss: IProcessingProfitAndLoss) =>
            `${processingProfitAndLoss.integrity ? 'Successful' : 'Failed'}`,
        cell: (processingProfitAndLoss: IProcessingProfitAndLoss) =>
            `${processingProfitAndLoss.integrity
                ? 'check_circle_outlined'
                : 'highlight_off'
            }`,
        textColor: (processingProfitAndLoss: IProcessingProfitAndLoss) =>
            processingProfitAndLoss.integrity ? 'app-success' : 'app-error',
    },
    {
        columnDef: 'createdDate',
        header: 'Created Date',
        columnType: '',
        isSortable: true,
        cell: (processingProfitAndLoss: IProcessingProfitAndLoss) =>
            moment
                .utc(processingProfitAndLoss.createdDate)
                .format('DD/MM/YYYY HH:mm:ss'),
    },
    {
        columnDef: 'periodStartDate',
        header: 'Start Date',
        columnType: '',
        isSortable: true,
        cell: (processingProfitAndLoss: IProcessingProfitAndLoss) =>
            moment
                .utc(processingProfitAndLoss.periodStartDate)
                .format('DD/MM/YYYY HH:mm:ss'),
    },
    {
        columnDef: 'periodEndDate',
        header: 'End Date',
        columnType: '',
        isSortable: true,
        cell: (processingProfitAndLoss: IProcessingProfitAndLoss) =>
            moment
                .utc(processingProfitAndLoss.periodEndDate)
                .format('DD/MM/YYYY HH:mm:ss'),
    },
    {
        columnDef: 'reference',
        header: 'Reference',
        columnType: '',
        isSortable: true,
        cell: (processingProfitAndLoss: IProcessingProfitAndLoss) => {
            return processingProfitAndLoss.reference
                ? `${processingProfitAndLoss.reference}`
                : '-';
        },
    },
    {
        columnDef: 'issues',
        header: 'Issues',
        columnType: '',
        isSortable: true,
        cell: (processingProfitAndLoss: IProcessingProfitAndLoss) => {
            return processingProfitAndLoss.issues
                ? `${processingProfitAndLoss.issues}`
                : '-';
        },
    },
    {
        columnDef: 'progressPercentage',
        header: 'Progress',
        columnType: 'progress-bar',
        isSortable: true,
    },
    {
        columnDef: 'actions',
        header: 'Actions',
        columnType: 'button',
        isSortable: true,
        cell: (processingProfitAndLoss: IProcessingProfitAndLoss) =>
            `${processingProfitAndLoss.status}`,
    },
    {
        columnDef: 'draft',
        header: 'Published',
        columnType: 'slideToggle',
        isSortable: true,
    },
    {
        columnDef: 'priority',
        header: 'Priority',
        columnType: 'button-dialog',
        isSortable: true,
    },
];

export const methodDefinitionsColumns = [
    {
        columnDef: 'methodDefinitionId',
        header: 'MethodDefinitionId',
        columnType: '',
        isSortable: true,
        tooltip: getCellData,
        cell: getCellData
    },
    {
        columnDef: 'platformName',
        header: 'platformName',
        columnType: '',
        isSortable: true,
        tooltip: getCellData,
        cell: getCellData
    },
    {
        columnDef: 'methodId',
        header: 'MethodId',
        columnType: '',
        isSortable: true,
        tooltip: getCellData,
        cell: getCellData
    },
    {
        columnDef: 'signature',
        header: 'Signature',
        columnType: '',
        isSortable: true,
        tooltip: getCellData,
        cell: getCellData
    },
    {
        columnDef: 'description',
        header: 'Description',
        columnType: '',
        isSortable: true,
        tooltip: getCellData,
        cell: getCellData
    },
    {
        columnDef: 'transactionType',
        header: 'TransactionType',
        columnType: '',
        isSortable: true,
        tooltip: getCellData,
        cell: getCellData
    },
    {
        columnDef: 'treatment',
        header: 'Treatment',
        columnType: '',
        isSortable: true,
        tooltip: getCellData,
        cell: getCellData
    },
    {
        columnDef: 'contractGroup',
        header: 'ContractGroup',
        columnType: '',
        isSortable: true,
        tooltip: getCellData,
        cell: getCellData
    },
    {
        columnDef: 'status',
        header: 'Status',
        columnType: '',
        isSortable: true,
        tooltip: getCellData,
        cell: getCellData
    },
    {
        columnDef: 'firstSeenBlockNumber',
        header: 'FirstSeenBlockNumber',
        columnType: '',
        isSortable: true,
        tooltip: getCellData,
        cell: getCellData
    },
    {
        columnDef: 'firstSeenTimestamp',
        header: 'FirstSeenTimestamp',
        columnType: '',
        isSortable: true,
        tooltip: getTimeInFormat,
        cell: getTimeInFormat
    },
    {
        columnDef: 'transactionHash',
        header: 'TransactionHash',
        columnType: '',
        isSortable: true,
        tooltip: getCellData,
        cell: getCellData
    },
    {
        columnDef: 'transactionCount',
        header: 'TransactionCount',
        columnType: '',
        tooltip: getCellData,
        isSortable: true,
        cell: getCellData
    }
];

export const transactionReportMessagesColumns = [
    {
        columnDef: 'reportMessageId',
        header: 'ReportMessageId',
        columnType: '',
        isSortable: true,
        tooltip: getCellData,
        cell: getCellData
    },
    {
        columnDef: 'workerTaskId',
        header: 'WorkerTaskId',
        columnType: '',
        isSortable: true,
        tooltip: getCellData,
        cell: getCellData
    },
    {
        columnDef: 'ledgerAccountId',
        header: 'LedgerAccountId',
        columnType: '',
        isSortable: true,
        tooltip: getCellData,
        cell: getCellData
    },
    {
        columnDef: 'transactionId',
        header: 'TransactionId',
        columnType: '',
        isSortable: true,
        tooltip: getCellData,
        cell: getCellData
    },
    {
        columnDef: 'reportMessageType',
        header: 'ReportMessageType',
        columnType: '',
        isSortable: true,
        tooltip: getCellData,
        cell: getCellData
    },
    {
        columnDef: 'severity',
        header: 'Severity',
        columnType: '',
        isSortable: true,
        tooltip: getCellData,
        cell: getCellData
    },
    {
        columnDef: 'message',
        header: 'Message',
        columnType: '',
        isSortable: true,
        tooltip: getCellData,
        cell: getCellData
    },
    {
        columnDef: 'notes',
        header: 'Notes',
        columnType: '',
        isSortable: true,
        tooltip: getCellData,
        cell: getCellData
    },
    {
        columnDef: 'dismissed',
        header: 'Dismissed',
        columnType: '',
        isSortable: true,
        tooltip: getCellData,
        cell: getCellData
    },
    {
        columnDef: 'blockNumber',
        header: 'BlockNumber',
        columnType: '',
        isSortable: true,
        tooltip: getCellData,
        cell: getCellData
    },
    {
        columnDef: 'timestamp',
        header: 'Timestamp',
        columnType: '',
        isSortable: true,
        tooltip: getTimeInFormat,
        cell: getTimeInFormat
    },
];

export const missingCurrencyPairsColumns = [
    {
        columnDef: 'status',
        header: 'Status',
        columnType: '',
        isSortable: true,
        tooltip: getCellData,
        cell: getCellData
    },
    {
        columnDef: 'rateCount',
        header: 'RateCount',
        columnType: '',
        isSortable: true,
        tooltip: getCellData,
        cell: getCellData
    },
    {
        columnDef: 'exchangeRatePairId',
        header: 'ExchangeRatePairId',
        columnType: '',
        isSortable: true,
        tooltip: getCellData,
        cell: getCellData
    },
    {
        columnDef: 'pairName',
        header: 'PairName',
        columnType: '',
        isSortable: true,
        tooltip: getCellData,
        cell: getCellData
    },
    {
        columnDef: 'baseTokenContractAddress',
        header: 'BaseTokenContractAddress',
        columnType: '',
        isSortable: true,
        tooltip: getCellData,
        cell: getCellData
    },
    {
        columnDef: 'tokenContractAddress',
        header: 'TokenContractAddress',
        columnType: '',
        isSortable: true,
        tooltip: getCellData,
        cell: getCellData
    },
    {
        columnDef: 'firstSeenBlockNumber',
        header: 'FirstSeenBlockNumber',
        columnType: '',
        isSortable: true,
        tooltip: getCellData,
        cell: getCellData
    },
    {
        columnDef: 'firstSeenTimestamp',
        header: 'FirstSeenTimestamp',
        columnType: '',
        isSortable: true,
        tooltip: getTimeInFormat,
        cell: getTimeInFormat
    },
    {
        columnDef: 'lastSeenBlockNumber',
        header: 'LastSeenBlockNumber',
        columnType: '',
        isSortable: true,
        tooltip: getCellData,
        cell: getCellData
    },
    {
        columnDef: 'lastSeenTimestamp',
        header: 'LastSeenTimestamp',
        columnType: '',
        isSortable: true,
        tooltip: getTimeInFormat,
        cell: getTimeInFormat
    },
    {
        columnDef: 'tokenDependency',
        header: 'TokenDependency',
        columnType: '',
        isSortable: true,
        tooltip: getCellData,
        cell: getCellData
    },
    {
        columnDef: 'requested',
        header: 'Requested',
        columnType: '',
        isSortable: true,
        tooltip: getCellData,
        cell: getCellData
    },
    {
        columnDef: 'active',
        header: 'Active',
        columnType: '',
        isSortable: true,
        tooltip: getCellData,
        cell: getCellData
    },
    {
        columnDef: 'syncedBlockNumber',
        header: 'SyncedBlockNumber',
        columnType: '',
        isSortable: true,
        tooltip: getCellData,
        cell: getCellData
    },
    {
        columnDef: 'syncedTimestamp',
        header: 'SyncedTimestamp',
        columnType: '',
        isSortable: true,
        tooltip: getTimeInFormat,
        cell: getTimeInFormat
    },
    {
        columnDef: 'verifiedBlockNumber',
        header: 'VerifiedBlockNumber',
        columnType: '',
        isSortable: true,
        tooltip: getCellData,
        cell: getCellData
    },
    {
        columnDef: 'verifiedTimestamp',
        header: 'VerifiedTimestamp',
        columnType: '',
        isSortable: true,
        tooltip: getTimeInFormat,
        cell: getTimeInFormat
    },
    {
        columnDef: 'curveTimestamp',
        header: 'CurveTimestamp',
        columnType: '',
        isSortable: true,
        tooltip: getTimeInFormat,
        cell: getTimeInFormat
    },
    {
        columnDef: 'rateSource',
        header: 'RateSource',
        columnType: '',
        isSortable: true,
        tooltip: getCellData,
        cell: getCellData
    },
];

export const addressLabelColumns = [
    {
        columnDef: 'addressLabelId',
        header: 'AddressLabelId',
        columnType: '',
        isSortable: true,
        tooltip: getCellData,
        cell: getCellData
    },
    {
        columnDef: 'platformName',
        header: 'PlatformName',
        columnType: '',
        isSortable: true,
        tooltip: getCellData,
        cell: getCellData
    },
    {
        columnDef: 'name',
        header: 'Name',
        columnType: '',
        isSortable: true,
        tooltip: getCellData,
        cell: getCellData
    },
    {
        columnDef: 'addressType',
        header: 'AddressType',
        columnType: '',
        isSortable: true,
        tooltip: getCellData,
        cell: getCellData
    },
    {
        columnDef: 'assetName',
        header: 'AssetName',
        columnType: '',
        isSortable: true,
        tooltip: getCellData,
        cell: getCellData
    },
    {
        columnDef: 'assetSymbol',
        header: 'AssetSymbol',
        columnType: '',
        isSortable: true,
        tooltip: getCellData,
        cell: getCellData
    },
    {
        columnDef: 'assetDecimals',
        header: 'AssetDecimals',
        columnType: '',
        isSortable: true,
        tooltip: getCellData,
        cell: getCellData
    },
    {
        columnDef: 'assetUri',
        header: 'AssetUri',
        columnType: '',
        isSortable: true,
        tooltip: getCellData,
        cell: getCellData
    },
    {
        columnDef: 'ledgerName',
        header: 'LedgerName',
        columnType: '',
        isSortable: true,
        tooltip: getCellData,
        cell: getCellData
    },
    {
        columnDef: 'tokenId',
        header: 'TokenId',
        columnType: '',
        isSortable: true,
        tooltip: getCellData,
        cell: getCellData
    },
    {
        columnDef: 'score',
        header: 'Score',
        columnType: '',
        isSortable: true,
        tooltip: getCellData,
        cell: getCellData
    },
    {
        columnDef: 'scam',
        header: 'Scam',
        columnType: '',
        isSortable: true,
        tooltip: getCellData,
        cell: getCellData
    },
    {
        columnDef: 'address',
        header: 'Address',
        columnType: '',
        isSortable: true,
        tooltip: getCellData,
        cell: getCellData
    },
    {
        columnDef: 'firstTransactionHash',
        header: 'FirstTransactionHash',
        columnType: '',
        isSortable: true,
        tooltip: getCellData,
        cell: getCellData
    },
    {
        columnDef: 'firstSeenBlockNumber',
        header: 'FirstSeenBlockNumber',
        columnType: '',
        isSortable: true,
        tooltip: getCellData,
        cell: getCellData
    },
    {
        columnDef: 'firstSeenTimestamp',
        header: 'FirstSeenTimestamp',
        columnType: '',
        isSortable: true,
        tooltip: getTimeInFormat,
        cell: getTimeInFormat
    },
    {
        columnDef: 'transactionCount',
        header: 'TransactionCount',
        columnType: '',
        isSortable: true,
        tooltip: getCellData,
        cell: getCellData
    },
];

export const pnlReportMessagesColumns = [
    {
        columnDef: 'reportMessageId',
        header: 'ReportMessageId',
        columnType: '',
        isSortable: true,
        tooltip: getCellData,
        cell: getCellData
    },
    {
        columnDef: 'workerTaskId',
        header: 'WorkerTaskId',
        columnType: '',
        isSortable: true,
        tooltip: getCellData,
        cell: getCellData
    },
    {
        columnDef: 'ledgerAccountId',
        header: 'LedgerAccountId',
        columnType: '',
        isSortable: true,
        tooltip: getCellData,
        cell: getCellData
    },
    {
        columnDef: 'profitAndLossScheduleId',
        header: 'ProfitAndLossScheduleId',
        columnType: '',
        isSortable: true,
        tooltip: getCellData,
        cell: getCellData
    },
    {
        columnDef: 'profitAndLossDefinitionId',
        header: 'ProfitAndLossDefinitionId',
        columnType: '',
        isSortable: true,
        tooltip: getCellData,
        cell: getCellData
    },
    {
        columnDef: 'timestamp',
        header: 'Timestamp',
        columnType: '',
        isSortable: true,
        tooltip: getTimeInFormat,
        cell: getTimeInFormat
    },
    {
        columnDef: 'reportMessageType',
        header: 'ReportMessageType',
        columnType: '',
        isSortable: true,
        tooltip: getCellData,
        cell: getCellData
    },
    {
        columnDef: 'severity',
        header: 'Severity',
        columnType: '',
        isSortable: true,
        tooltip: getCellData,
        cell: getCellData
    },
    {
        columnDef: 'message',
        header: 'Message',
        columnType: '',
        isSortable: true,
        tooltip: getCellData,
        cell: getCellData
    },
    {
        columnDef: 'notes',
        header: 'Notes',
        columnType: '',
        isSortable: true,
        tooltip: getCellData,
        cell: getCellData
    },
    {
        columnDef: 'dismissed',
        header: 'Dismissed',
        columnType: '',
        isSortable: true,
        tooltip: getCellData,
        cell: getCellData
    },
]