import { of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { format } from 'date-fns';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import { IColumn } from '../../../../interfaces/column.interface';
import { GeneralLedgerService } from '../../general-ledger/general-ledger.service';
import {
    ProcessingService,
    ProcessingProfitAndLossData,
} from '../processing.service';
import { AddProfitAndLossDialogComponent } from './add-profit-and-loss-dialog/add-profit-and-loss-dialog.component';
import { addressLabelColumns, methodDefinitionsColumns, missingCurrencyPairsColumns, pnlReportMessagesColumns, profitAndLossColumns, transactionReportMessagesColumns } from './processing-profit-and-loss-columns';
import { PublishProfitAndLossDialogComponent } from './publish-profit-and-loss-dialog/publish-profit-and-loss-dialog.component';
import { IPNLAddressLabel, IPNLMethodDefinition, IPNLMissingCurrencyPairs, IPNLReportMessages, IPNLTransactionReportMessage, IProcessingProfitAndLoss } from 'src/app/interfaces/processingProfitAndLoss.interface';
import moment from 'moment';
import { IAccountDataSummary } from 'src/app/interfaces/accountDataSummary.interface';
import { DataQualityCheckService } from 'src/app/services/dataQualityCheck/dataQualityCheck.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { getPNLDefinitionAction, getPNLstatus } from './helpers';
import { IModifyProfitAndLossDefinition } from 'src/app/interfaces/processing-jobs.interface';
import { PriorityDialogComponent } from './priority-dialog/priority-dialog.component';

@Component({
    selector: 'app-processing-profit-and-loss',
    templateUrl: './processing-profit-and-loss.component.html',
    styleUrls: ['./processing-profit-and-loss.component.scss'],
})
export class ProcessingProfitAndLossComponent implements OnInit {
    @ViewChild(CdkVirtualScrollViewport) viewPort: CdkVirtualScrollViewport;
    viewPortSubscribed = false;
    fadeLeftAmount = 0;
    fadeRightAmount = 100;
    columns: IColumn[] = profitAndLossColumns;

    processingProfitAndLossData: ProcessingProfitAndLossData =
        new ProcessingProfitAndLossData();
    processingProgressData: IAccountDataSummary[];
    pnlDefinitionStartDate: moment.Moment;
    pnlDefinitionEndDate: moment.Moment;
    pnlDefinitionCreateDate: string;
    pnlDefinitionDescription = '';
    pnlDefinitionPublished = false;
    pnlDefinitionDraft = false;
    pnlActionStatus: any;
    definitionIndex = -1;
    progressCategoryIndex = -1;
    prevDefinitionIndex = -1;

    defaultSortingColumn: string;
    defaultSortingOrder: string;

    progressCategoryData: IPNLMethodDefinition[] | IPNLTransactionReportMessage[] | IPNLAddressLabel[] | IPNLReportMessages[] | IPNLMissingCurrencyPairs[] = [];

    pricingCurveOptions = [
        {
            id: 1,
            name: 'MA-1D',
        },
    ];
    scheduleOptions = ['Daily', 'Monthly', 'Weekly', 'Disabled'];
    profitAndLossForm: FormGroup;
    portfolioId;
    userAccountId = 1;
    isPnlDefinitionLoading = false;
    profitAndLossScheduleId;

    period?= 'months';

    pickDateForm: FormGroup;
    minDate: moment.Moment;
    maxDate: moment.Moment;
    profitAndLossStatusForm: FormGroup;

    constructor(
        public generalLedgerService: GeneralLedgerService,
        private processingService: ProcessingService,
        private dataQualityCheckService: DataQualityCheckService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly fb: FormBuilder,
        private dialog: MatDialog,
    ) {
        this.portfolioId =
            this.activatedRoute.snapshot.queryParams['portfolioId'];

        this.profitAndLossForm = this.fb.group({
            portfolioId: [
                { value: this.portfolioId ? +this.portfolioId : 0 },
                [],
            ],
            schedule: [this.scheduleOptions[2], Validators.required],
            cashBasedModel: [''],
            tokenBasedModel: [''],
            pricingCurve: ['', Validators.required],
        });
        this.pickDateForm = this.fb.group({
            startDate: new FormControl(),
            endDate: new FormControl(),
        });
        this.profitAndLossStatusForm = this.fb.group({
            published: new FormControl(),
            draft: new FormControl()
        });

        this.profitAndLossForm.valueChanges.subscribe(x => {
            this.getAndUpdateProfitAndLossSchedule();
        });
        this.pickDateForm.valueChanges.subscribe(x => {
            if (x.startDate === this.minDate && (x.endDate === null || x.endDate === this.maxDate)) return;
            this.onSelectProgressCategory(this.progressCategoryIndex);
        });
    }

    getAndUpdateProfitAndLossSchedule() {
        const { portfolioId, schedule, cashBasedModel, tokenBasedModel, pricingCurve } = this.profitAndLossForm.value;
        let accountingModels = undefined;
        this.isPnlDefinitionLoading = true;
        if (cashBasedModel && tokenBasedModel) {
            accountingModels = undefined;
        } else {
            if (cashBasedModel) accountingModels = 'DollarBased';
            if (tokenBasedModel) accountingModels = 'TokenBased';
        }
        this.processingService
            .getProfitAndLossSchedule({
                portfolioId: portfolioId.value,
                userAccountId: this.userAccountId,
                schedule: schedule,
                pricingCurve: pricingCurve,
                accountingModels: accountingModels
            })
            .pipe(
                switchMap((data) => {
                    if (data.records.length > 0) {
                        const { profitAndLossScheduleId } = data.records[0];
                        return of(profitAndLossScheduleId).pipe(
                            switchMap((profitAndLossScheduleId) =>
                                this.processingService.getProfitAndLossDefinition(
                                    profitAndLossScheduleId,
                                )
                            ),
                            tap((data) => {
                                this.processingProfitAndLossData = {
                                    ...this.processingProfitAndLossData,
                                    data: data,
                                };
                            }),
                            switchMap(() => this.dataQualityCheckService.getPortfolioProgressData(this.portfolioId)),
                        );
                    } else {
                        this.processingProfitAndLossData = {
                            ...this.processingProfitAndLossData,
                            data: [],
                        };
                        return of([]);
                    }
                }),
            )
            .subscribe((data) => {
                this.processingProgressData = data;
                this.onSelectTimeline(this.prevDefinitionIndex > 0 ? this.prevDefinitionIndex : (this.processingProfitAndLossData.data.length > 0 ? 0 : -1));
                this.isPnlDefinitionLoading = false;
            });
    }
    ngOnInit() {
        this.getAndUpdateProfitAndLossSchedule();
    }

    ngAfterContentChecked() {
        if (this.viewPort && !this.viewPortSubscribed) {
            this.viewPortSubscribed = true;
            this.viewPort.elementScrolled().subscribe((x: any) => {
                const { clientWidth, scrollWidth, scrollLeft } = x.target;
                const dWidth = scrollWidth - clientWidth;
                const scrollRight = scrollWidth - clientWidth - scrollLeft;
                this.fadeLeftAmount = scrollLeft > dWidth ? 100 : scrollLeft / dWidth * 100;
                this.fadeRightAmount = scrollRight > dWidth ? 100 : scrollRight / dWidth * 100;
            });
        }
    }

    selectPortfolio(portfolioId: number) {
        this.resetForm();
        this.profitAndLossForm.patchValue({
            portfolioId: {
                value: portfolioId,
            },
        });
    }
    resetForm() {
        this.profitAndLossForm.reset();
        Object.keys(this.profitAndLossForm.controls).forEach((key) => {
            this.profitAndLossForm.controls[key].setErrors(null);
        });
    }
    activatePricingCurve() {
        if (this.profitAndLossForm.valid) {
            this.processingService
                .addProfitAndLossSchedule(this.profitAndLossForm.value)
                .subscribe((data) => {
                    this.isPnlDefinitionLoading = true;
                    this.resetForm();
                });
        }
    }
    openDialog(dialog: string) {
        if (dialog === 'addPnL') {
            this.dialog.open(AddProfitAndLossDialogComponent, {
                data: {
                    profitAndLossScheduleId: this.profitAndLossScheduleId,
                },
            });
        }
        if (dialog === 'speedup') {
            const pnlDefinition = this.processingProfitAndLossData.data[this.definitionIndex];
            this.dialog.open(PriorityDialogComponent, {
                data: {
                    profitAndLossDefinitionId: pnlDefinition.profitAndLossDefinitionId,
                    priority: pnlDefinition.priority,
                },
            });
        }
    }
    toggleRow(profitAndLossDefinitionId: number) {
        this.dialog.open(PublishProfitAndLossDialogComponent, {
            data: profitAndLossDefinitionId,
        });
    }

    onSelectTimeline(definitionIndex: number) {
        this.definitionIndex = definitionIndex;
        if (definitionIndex === -1) return;

        const data = this.processingProfitAndLossData.data[definitionIndex];
        this.minDate = moment(data.periodStartDate);
        this.maxDate = moment(data.periodEndDate);
        this.pnlDefinitionStartDate = moment(data.periodStartDate);
        this.pnlDefinitionEndDate = moment(data.periodEndDate);
        this.pickDateForm.controls['startDate'].setValue(this.minDate);
        this.pickDateForm.controls['endDate'].setValue(this.maxDate);
        this.pnlDefinitionDescription = data.reference;
        this.pnlDefinitionCreateDate = moment(data.createdDate).format('DD/MM/YYYY HH/mm A');
        this.profitAndLossStatusForm.controls['published'].setValue(data.published);
        this.profitAndLossStatusForm.controls['draft'].setValue(data.draft);
        this.pnlActionStatus = getPNLDefinitionAction(data);
        this.onSelectProgressCategory(2);
    }

    onSelectProgressCategory(progressCategoryIndex: number) {
        this.progressCategoryIndex = progressCategoryIndex;
        const startDate = this.pickDateForm.value['startDate'];
        const endDate = this.pickDateForm.value['endDate'];
        const data = {
            PortfolioId: this.portfolioId,
            StartDate: startDate,
            EndDate: endDate
        };
        this.progressCategoryData = [];
        let methodName = '';
        switch (progressCategoryIndex) {
            case 0: break;
            case 1: break;
            case 2:
                methodName = 'getMethodDefinitions';
                this.columns = methodDefinitionsColumns;
                break;
            case 3:
                methodName = 'getTransactionReportMessages';
                this.columns = transactionReportMessagesColumns;
                break;
            case 4:
                methodName = 'getMissingCurrencyPairs';
                this.columns = missingCurrencyPairsColumns;
                break;
            case 5:
                methodName = '';
                break;
            case 6:
                methodName = 'getAddressLabel';
                this.columns = addressLabelColumns;
                break;
            case 7:
                methodName = 'getMissingCurrencyPairs';
                this.columns = missingCurrencyPairsColumns;
                break;
            case 8:
                methodName = 'getPNLReportMessages';
                this.columns = pnlReportMessagesColumns;
                break;
            default: break;
        }
        if (methodName === '') {
            return;
        }
        this.isPnlDefinitionLoading = true;
        this.processingService[methodName](data)
            .subscribe((data) => {
                this.isPnlDefinitionLoading = false;
                this.progressCategoryData = data.records;
            });
    }

    getDefinitionLabel(v: IProcessingProfitAndLoss) {
        const startDate = new Date(v.periodStartDate);
        const endDate = new Date(v.periodEndDate);
        return format(startDate, 'yyyy') + '\n' + format(startDate, 'MMMM') + '\n' + format(startDate, 'dd') + ' - ' + format(endDate, 'dd');
    }

    getPnLstatus(v: IProcessingProfitAndLoss) {
        return getPNLstatus(v, this.processingProgressData);
    }

    onSelectTimelineByButton(prev = true) {
        let definitionIndex = this.definitionIndex;
        if (prev && definitionIndex > 0) definitionIndex--;
        if (!prev && definitionIndex < this.processingProfitAndLossData.data.length - 1) definitionIndex++;
        this.viewPort.scrollToIndex(definitionIndex, 'smooth');
        this.onSelectTimeline(definitionIndex);
    }

    onClickAction(action: string) {
        let modifyParams: IModifyProfitAndLossDefinition;
        const pnlDefinition = this.processingProfitAndLossData.data[this.definitionIndex];
        if (action === 'refresh') {
            modifyParams = {
                profitAndLossDefinitionId:
                    pnlDefinition.profitAndLossDefinitionId,
                update: true,
            };
        }
        else if (action === 'speedup') {
            this.openDialog('speedup');
            return;
        }
        else {
            modifyParams = {
                profitAndLossDefinitionId:
                    pnlDefinition.profitAndLossDefinitionId,
                draft: !pnlDefinition.draft,
            };
        }

        this.isPnlDefinitionLoading = true;
        this.processingService
            .modifyProfitAndLossDefinition(modifyParams)
            .subscribe(() => {
                this.isPnlDefinitionLoading = false;
                this.prevDefinitionIndex = this.definitionIndex;
                this.getAndUpdateProfitAndLossSchedule();
            });
    }
    getWidth(v: number) {
        return `${v * 0.4}%`;
    }
}
