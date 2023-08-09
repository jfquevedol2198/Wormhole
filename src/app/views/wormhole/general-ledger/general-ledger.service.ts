import * as moment from 'moment';
import {
    BehaviorSubject,
    combineLatest,
    Observable,
    of,
    Subscription,
} from 'rxjs';
import {
    distinctUntilChanged,
    filter,
    map,
    switchMap,
    tap,
} from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {
    IDeFiImpactData,
    ICombinedDeFiImpactData,
} from '../../../interfaces/deFiImpactData.interface';
import { IPaginationParams } from '../../../interfaces/paginationParams.interface';
import { IPNLPerformanceData } from '../../../interfaces/pnlPerformanceData.interface';
import { IPNLPositionDetails } from '../../../interfaces/pnlPosition.interface';
import { IPortfolio } from '../../../interfaces/portfolio.interface';
import { IRange } from '../../../interfaces/range.interface';
import { ITraderStamina } from '../../../interfaces/traderStamina.interface';
import {
    IBlockNumberRange,
    ICombinedTransactions,
    ITransactionData,
} from '../../../interfaces/transaction.interface';
import { AccountingService } from '../../../services/accounting/accounting.service';
import { DataQualityCheckService } from '../../../services/dataQualityCheck/dataQualityCheck.service';
import { momentToUtcFormat } from '../../../utilities/date-time';

export class TransactionsData implements ITransactionData {
    data = [];
    pageIndex = 0;
    pageSize = 50;
    isEditMode = false;
    total = 0;
    sorting = ['timestamp asc'];
    reportPresetId = null;
}

export class DeFiImpactData implements IDeFiImpactData {
    data = [];
    pageIndex = 0;
    pageSize = 50;
    total = 0;
    sorting = ['assetName asc'];
    sortingBy: 'usd' | 'diffPercentage' = 'usd';
}

@Injectable({ providedIn: 'root' })
export class GeneralLedgerService {
    subscriptions: Subscription[] = [];
    subscriptionsView: Subscription[] = [];

    isInventoryLoading = true;
    isPieChartLoading = true;
    isTraderStaminaLoading = true;
    isPortfoliosLoaded = false;

    isEditMode$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    portfolioId$: BehaviorSubject<number> = new BehaviorSubject(0);
    portfolios$: BehaviorSubject<IPortfolio[]> = new BehaviorSubject([]);
    selectedDate$: BehaviorSubject<Date> = new BehaviorSubject(undefined);
    selectedRange$: BehaviorSubject<IRange> = new BehaviorSubject(undefined);

    public minDate: Date;
    public maxDate: Date;

    pnlPositionDetailsForPieChart$: BehaviorSubject<IPNLPositionDetails[]> =
        new BehaviorSubject([]);
    pnlPositionDetailsForInventory$: BehaviorSubject<IPNLPositionDetails[]> =
        new BehaviorSubject([]);
    pnlEssentialData$: BehaviorSubject<IPNLPerformanceData[]> =
        new BehaviorSubject([]);
    traderStaminaData$: BehaviorSubject<ITraderStamina[]> = new BehaviorSubject(
        [],
    );

    // @todo maybe make it simple boolean
    pnlEssentialDataLoading$: BehaviorSubject<boolean> = new BehaviorSubject(
        false,
    );

    transactions$: BehaviorSubject<TransactionsData> = new BehaviorSubject(
        new TransactionsData(),
    );
    isTransactionsDataLoading = true;

    deFiImpactData$: BehaviorSubject<DeFiImpactData> = new BehaviorSubject(
        new DeFiImpactData(),
    );
    isDeFiImpactLoading = true;

    view = 0;

    constructor(
        private accountingService: AccountingService,
        private dataQualityCheckService: DataQualityCheckService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
    ) {}

    init() {
        // load portfolios no matter what and deal with portfolioId
        this.dealWithPortfolios();

        // deal with data for pie chart and inventory
        this.dealWithLoadingPNLDetails();

        // when portfolio id is know we load PNL for that portfolio to get date ranges (only load once per portfolio)
        this.dealWithPNLDateRanges();

        // deal with transactions and all params
        this.dealWithTransactions();

        // deal with trader stamina data
        this.dealWithTraderStamina();

        // deal with DeFi impact data
        this.dealWithDeFiImpactData();

        this.broadcastSelectedDateAndRage();
    }

    private dealWithPNLDateRanges() {
        this.subscriptions.push(
            this.portfolioId$
                .pipe(
                    filter((data) => data > 0),
                    tap(() => this.pnlEssentialDataLoading$.next(true)),
                    tap(() => (this.isPieChartLoading = true)),
                    switchMap((portfolioId) =>
                        this.accountingService.getProfitAndLoss(portfolioId),
                    ),
                    map((positions): IPNLPerformanceData[] =>
                        positions.map((position) => ({
                            date: position.date,
                            pnl: position.dollarBasedPnL,
                            fundingReceived: position.fundingReceivedFloating,
                            netWorth: position.netWorth,
                            currentBalance: position.walletBalance,
                            collateralBalance: position.collateralBalance,
                            stakeBalance: position.stakeBalance,
                            supplyBalance: position.supplyBalance,
                        })),
                    ),
                )
                .subscribe((data) => {
                    this.pnlEssentialData$.next(data);
                    this.pnlEssentialDataLoading$.next(false);

                    if (data.length > 0) {
                        this.minDate = data[0].date.toDate();
                        this.maxDate = data[data.length - 1].date.toDate();
                    } else {
                        delete this.minDate;
                        delete this.maxDate;
                        this.isInventoryLoading = false;
                        this.isPieChartLoading = false;
                        this.isTransactionsDataLoading = false;
                        this.isDeFiImpactLoading = false;
                    }
                }),
        );

        // when PNL is known we redirect with query params date, toDate, fromDate
        this.subscriptions.push(
            this.pnlEssentialData$
                .pipe(
                    filter(
                        (data) =>
                            data.length > 0 &&
                            (!this.activatedRoute.snapshot.queryParams.date ||
                                !this.activatedRoute.snapshot.queryParams
                                    .toDate ||
                                !this.activatedRoute.snapshot.queryParams
                                    .fromDate),
                    ),
                )
                .subscribe((data) => {
                    const startDate = data[data.length - 1].date.clone();

                    this.router.navigate([], {
                        queryParams: {
                            date: momentToUtcFormat(startDate),
                            toDate: momentToUtcFormat(startDate),
                            fromDate: momentToUtcFormat(
                                startDate.clone().subtract(2, 'weeks'),
                            ),
                        },
                        queryParamsHandling: 'merge',
                    });
                }),
        );
    }

    public dealWithViewQueryParam(): void {
        this.subscriptionsView.push(
            ...[
                // if there is no view in query params
                this.activatedRoute.queryParams
                    .pipe(
                        // we can have view = 0 so we check for undefined
                        filter((queryParams) => queryParams.view === undefined),
                    )
                    .subscribe(() => {
                        setTimeout(() =>
                            this.router.navigate([], {
                                queryParams: {
                                    view: 0,
                                },
                                queryParamsHandling: 'merge',
                            }),
                        );
                    }),
                // if view exists
                this.activatedRoute.queryParams
                    .pipe(
                        filter((queryParams) => queryParams.view !== undefined),
                        map((queryParams) => +queryParams.view),
                        distinctUntilChanged(),
                    )
                    .subscribe((view) => {
                        this.view = view;
                    }),
            ],
        );
    }

    private getPortfoliosNoMatterWhat() {
        return this.accountingService
            .getPortfolios()
            .pipe(tap(() => (this.isPortfoliosLoaded = true)));
    }

    reset() {
        this.isPieChartLoading = true;
        this.isInventoryLoading = true;
        this.isTransactionsDataLoading = true;
        this.isDeFiImpactLoading = true;
        this.pnlPositionDetailsForPieChart$.next([]);
        this.pnlPositionDetailsForInventory$.next([]);
        this.transactions$.next(new TransactionsData());
        this.deFiImpactData$.next(new DeFiImpactData());
    }

    setView(view = 0) {
        this.view = view;

        return this.router.navigate(['/app/general-ledger/view/' + view], {
            queryParams: {
                view,
            },
            queryParamsHandling: 'merge',
        });
    }

    private dealWithLoadingPNLDetails(): void {
        this.subscriptions.push(
            this.activatedRoute.queryParams
                .pipe(
                    filter(
                        (queryParams) =>
                            queryParams.portfolioId && queryParams.date,
                    ),
                    map((queryParams) => ({
                        portfolioId: queryParams.portfolioId,
                        date: queryParams.date,
                        forceRefresh: queryParams.forceRefresh,
                    })),
                    distinctUntilChanged(
                        (a, b) => JSON.stringify(a) === JSON.stringify(b),
                    ),
                    tap(() => (this.isPieChartLoading = true)),
                    tap(() => (this.isInventoryLoading = true)),
                    switchMap((data) => {
                        return this.accountingService.getProfitAndLossDetails(
                            +data.portfolioId,
                            moment.utc(data.date),
                        );
                    }),
                )
                .subscribe((data) => {
                    this.pnlPositionDetailsForPieChart$.next(data);
                    this.pnlPositionDetailsForInventory$.next(data);
                    this.isInventoryLoading = false;
                }),
        );
    }

    private dealWithPortfolios(): void {
        // get portfolios no matter what
        this.subscriptions.push(
            this.getPortfoliosNoMatterWhat().subscribe((portfolios) => {
                this.portfolios$.next(portfolios);
            }),
        );

        // redirect if there is no portfolioId in the url based on loaded portfolios data
        this.subscriptions.push(
            combineLatest([this.portfolios$, this.activatedRoute.queryParams])
                .pipe(
                    filter(
                        ([portfolios, queryParams]) =>
                            portfolios.length > 0 && !queryParams.portfolioId,
                    ),
                    map(([portfolios]) => portfolios[0].portfolioId),
                )
                .subscribe((portfolioId) => {
                    this.router.navigate([], {
                        queryParams: { portfolioId },
                        queryParamsHandling: 'merge',
                    });
                }),
        );

        // broadcast portfolioId when its in the url
        this.subscriptions.push(
            combineLatest([this.portfolios$, this.activatedRoute.queryParams])
                .pipe(
                    filter(
                        ([portfolios, queryParams]) =>
                            portfolios.length > 0 && queryParams.portfolioId,
                    ),
                    map(
                        ([portfolios, queryParams]) => +queryParams.portfolioId,
                    ),
                    distinctUntilChanged(),
                )
                .subscribe((portfolioId) => {
                    this.portfolioId$.next(portfolioId);
                }),
        );
    }

    unsubscribe() {
        this.subscriptions.map((item) => item.unsubscribe());
        this.subscriptionsView.map((item) => item.unsubscribe());
    }

    unsubscribeView() {
        this.subscriptionsView.map((item) => item.unsubscribe());
    }

    private dealWithTransactions(): void {
        this.subscriptions.push(
            combineLatest([this.isEditMode$, this.activatedRoute.queryParams])
                .pipe(
                    filter(
                        ([isEditMode, queryParams]) =>
                            queryParams.portfolioId &&
                            queryParams.fromDate &&
                            queryParams.toDate &&
                            (!queryParams.tableView ||
                                queryParams.tableView === 'transactions'),
                    ),
                    map(([isEditMode, queryParams]) => [
                        isEditMode,
                        +queryParams.portfolioId,
                        queryParams.fromDate,
                        queryParams.toDate,
                        queryParams.pageIndex ? +queryParams.pageIndex : 0,
                        queryParams.pageSize ? +queryParams.pageSize : 50,
                        queryParams.generalTableSorting
                            ? JSON.parse(queryParams.generalTableSorting)
                            : ['timestamp asc'],
                        queryParams.reportPresetId,
                        queryParams.forceRefresh
                            ? queryParams.forceRefresh
                            : 'anything',
                    ]),
                    distinctUntilChanged(
                        (a, b) => JSON.stringify(a) === JSON.stringify(b),
                    ),
                    tap(() => (this.isTransactionsDataLoading = true)),
                    map(
                        ([
                            isEditMode,
                            portfolioId,
                            fromDate,
                            toDate,
                            pageIndex,
                            pageSize,
                            sorting,
                            reportPresetId,
                        ]): ICombinedTransactions => {
                            return {
                                portfolioId,
                                range: {
                                    left: moment.utc(fromDate).toDate(),
                                    right: moment.utc(toDate).toDate(),
                                },
                                paginationParams: {
                                    pageIndex,
                                    pageSize,
                                },
                                isEditMode,
                                blockNumberRange: {},
                                sorting,
                                reportPresetId,
                            };
                        },
                    ),
                    switchMap((data) =>
                        this.processFromDate(
                            data.portfolioId,
                            data.range,
                            data.paginationParams,
                            data.isEditMode,
                            data.blockNumberRange,
                            data.sorting,
                            data.reportPresetId,
                        ),
                    ),
                    switchMap((data) =>
                        this.processToDate(
                            data.portfolioId,
                            data.range,
                            data.paginationParams,
                            data.isEditMode,
                            data.blockNumberRange,
                            data.sorting,
                            data.reportPresetId,
                        ),
                    ),
                    switchMap((data) => {
                        return this.accountingService.getTransactions(
                            data.portfolioId,
                            data.range,
                            data.paginationParams,
                            data.isEditMode,
                            data.blockNumberRange,
                            data.sorting,
                            data.reportPresetId,
                        );
                    }),
                )
                .subscribe((data) => {
                    this.transactions$.next({
                        data: data.transactions,
                        pageIndex: data.paginationParams.pageIndex,
                        pageSize: data.paginationParams.pageSize,
                        isEditMode: data.isEditMode,
                        total: data.recordCount,
                        sorting: data.sorting,
                        reportPresetId: data.reportPresetId,
                    });
                    this.isTransactionsDataLoading = false;
                }),
        );
    }

    private dealWithDeFiImpactData(): void {
        this.subscriptions.push(
            this.activatedRoute.queryParams
                .pipe(
                    filter(
                        (queryParams) =>
                            queryParams.portfolioId &&
                            queryParams.tableView &&
                            queryParams.tableView === 'de-fi-impact' &&
                            queryParams.date,
                    ),
                    map((queryParams) => [
                        queryParams.portfolioId,
                        queryParams.date,
                        queryParams.pageIndex ? +queryParams.pageIndex : 0,
                        queryParams.pageSize ? +queryParams.pageSize : 50,
                        queryParams.generalTableSorting
                            ? JSON.parse(queryParams.generalTableSorting)
                            : ['assetName asc'],
                        queryParams.sortingDeFiImpactBy
                            ? queryParams.sortingDeFiImpactBy
                            : 'usd',
                    ]),
                    distinctUntilChanged(
                        (a, b) => JSON.stringify(a) === JSON.stringify(b),
                    ),
                    tap(() => (this.isDeFiImpactLoading = true)),
                    map(
                        ([
                            portfolioId,
                            date,
                            pageIndex,
                            pageSize,
                            sorting,
                            sortingBy,
                        ]): ICombinedDeFiImpactData => {
                            return {
                                portfolioId,
                                date: moment.utc(date).toDate(),
                                paginationParams: {
                                    pageIndex,
                                    pageSize,
                                },
                                sorting,
                                sortingBy,
                            };
                        },
                    ),
                    switchMap((data) =>
                        this.dataQualityCheckService.getPNLPriceMovements(
                            data.portfolioId,
                            data.date,
                            data.paginationParams,
                            data.sorting,
                            data.sortingBy,
                        ),
                    ),
                )
                .subscribe((data) => {
                    this.deFiImpactData$.next({
                        data: data.data,
                        pageIndex: data.paginationParams.pageIndex,
                        pageSize: data.paginationParams.pageSize,
                        total: data.recordCount,
                        sorting: data.sorting,
                        sortingBy: data.sortingBy,
                    });
                    this.isDeFiImpactLoading = false;
                }),
        );
    }

    // @todo can be moved to accounting service probably
    private processFromDate(
        portfolioId: number,
        range: IRange,
        paginationParams: IPaginationParams,
        isEditMode: boolean,
        blockNumberRange: IBlockNumberRange,
        sorting: string[],
        reportPresetId?: number,
    ): Observable<ICombinedTransactions> {
        if (range.left) {
            return this.accountingService
                .getBlockNumber(range.left as Date)
                .pipe(
                    map((blockNumber) => {
                        blockNumberRange['left'] = blockNumber;
                        return {
                            portfolioId,
                            range,
                            paginationParams,
                            isEditMode,
                            blockNumberRange,
                            sorting,
                            reportPresetId,
                        };
                    }),
                );
        }

        return of({
            portfolioId,
            range,
            paginationParams,
            isEditMode,
            blockNumberRange,
        });
    }

    private processToDate(
        portfolioId: number,
        range: IRange,
        paginationParams: IPaginationParams,
        isEditMode: boolean,
        blockNumberRange: IBlockNumberRange,
        sorting: string[],
        reportPresetId?: number,
    ): Observable<ICombinedTransactions> {
        if (range.right) {
            return this.accountingService
                .getBlockNumber(range.right as Date)
                .pipe(
                    map((blockNumber) => {
                        blockNumberRange['right'] = blockNumber;
                        return {
                            portfolioId,
                            range,
                            paginationParams,
                            isEditMode,
                            blockNumberRange,
                            sorting,
                            reportPresetId,
                        };
                    }),
                );
        }

        return of({
            portfolioId,
            range,
            paginationParams,
            isEditMode,
            blockNumberRange,
        });
    }

    private dealWithTraderStamina(): void {
        this.subscriptions.push(
            this.portfolioId$
                .pipe(
                    filter((portfolioId) => !!portfolioId),
                    tap(() => (this.isTraderStaminaLoading = true)),
                    switchMap((portfolioId) => {
                        return this.accountingService.getTraderStamina(
                            portfolioId,
                        );
                    }),
                )
                .subscribe((data) => {
                    this.traderStaminaData$.next(data);
                    this.isTraderStaminaLoading = false;
                }),
        );
    }

    private broadcastSelectedDateAndRage() {
        this.subscriptions.push(
            this.activatedRoute.queryParams
                .pipe(
                    filter(
                        (queryParams) =>
                            queryParams.portfolioId &&
                            queryParams.date &&
                            queryParams.fromDate &&
                            queryParams.toDate,
                    ),
                    map((queryParams) => ({
                        portfolioId: +queryParams.portfolioId,
                        date: queryParams.date,
                        fromDate: queryParams.fromDate,
                        toDate: queryParams.toDate,
                        forceRefresh: queryParams.forceRefresh,
                    })),
                    distinctUntilChanged(
                        (a, b) => JSON.stringify(a) === JSON.stringify(b),
                    ),
                )
                .subscribe((queryParams) => {
                    this.selectedDate$.next(
                        moment.utc(queryParams.date).toDate(),
                    );

                    this.selectedRange$.next({
                        left: moment.utc(queryParams.fromDate).toDate(),
                        right: moment.utc(queryParams.toDate).toDate(),
                    });
                }),
        );

        this.subscriptions.push(
            this.selectedDate$
                .pipe(filter((date) => !!date))
                .subscribe((date) => {
                    this.router.navigate([], {
                        queryParams: {
                            date: momentToUtcFormat(moment(date)),
                        },
                        queryParamsHandling: 'merge',
                    });
                }),
        );
    }
}
