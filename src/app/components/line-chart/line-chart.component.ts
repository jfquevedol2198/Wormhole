import * as d3 from 'd3';
import * as moment from 'moment';
import { BehaviorSubject, combineLatest, fromEvent, Subscription } from 'rxjs';
import { debounceTime, skip } from 'rxjs/operators';

import {
    AfterViewChecked,
    AfterViewInit,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewContainerRef,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MATERIAL_COLORS } from '../../constants/colors';
import { IPNLPerformanceData } from '../../interfaces/pnlPerformanceData.interface';
import { IRange } from '../../interfaces/range.interface';
import { ISerializedData } from '../../interfaces/serialized-data.interface';
import { ThemeService } from '../../services/theme/theme.service';
import { momentToUtcFormat } from '../../utilities/date-time';
import {
    getFromLocalStorage,
    saveToLocalStorage,
} from '../../utilities/localStorageFunctions';
import { DisplayChart } from './d3/display-chart.d3js';
import { NavigationChart } from './d3/navigation-chart.d3js';

const DEFAULT_TRENDLINE = 'moving-average-24';
const TREND_LINE_LOCALSTORAGE_KEY = 'trendline';

@Component({
    selector: 'app-line-chart',
    templateUrl: './line-chart.component.html',
    styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent
    implements OnInit, AfterViewInit, OnDestroy, AfterViewChecked
{
    @Input() height = 425;
    @Input() svgHeight: string;
    @Input() navigationHeight = 65;
    @Input() fields?: Object;
    @Input() data$: BehaviorSubject<IPNLPerformanceData[]>;
    @Input() loading$: BehaviorSubject<boolean>;
    @Input() selectedDate$: BehaviorSubject<Date> = new BehaviorSubject(
        new Date(),
    );
    @Input() selectedRange$: BehaviorSubject<IRange>;
    @Input() hideDisplay = false;
    @Input() fullscreenMode = false;

    @Output() fullscreen = new EventEmitter();

    daysSelectionOptionsWithIndexesSubtraction = [
        {
            daysSelection: 'All',
            startEndSubtraction: 5739,
            isDisable: false,
        },
        {
            daysSelection: 90,
            startEndSubtraction: 2160,
            isDisable: false,
        },
        {
            daysSelection: 30,
            startEndSubtraction: 720,
            isDisable: false,
        },
        {
            daysSelection: 14,
            startEndSubtraction: 336,
            isDisable: false,
        },
        {
            daysSelection: 7,
            startEndSubtraction: 168,
            isDisable: false,
        },
        {
            daysSelection: 1,
            startEndSubtraction: 24,
            isDisable: false,
        },
    ];

    element: Element;

    subscription$ = new Subscription();
    width$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    width = 0;

    keys: string[];
    indexes: Date[] | number[];
    series: ISerializedData[];

    lineChartControls: FormGroup;

    daysForAverage: number[] = [7, 30, 90];
    averageValues = {};

    selectedDayIndex = 3;
    isCustomDaysSelected = false;

    constructor(
        private readonly fb: FormBuilder,
        private viewContainerRef: ViewContainerRef,
        private themeService: ThemeService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
    ) {
        this.lineChartControls = this.fb.group({
            trendline: [this.getTrendLine(), []],
        });

        this.lineChartControls.controls.trendline.valueChanges.subscribe(
            (trendline) => {
                this.setTrendLine(trendline);

                this.rebuildSvgs();
            },
        );
    }

    getAverageValues(data, day) {
        const right = new Date(this.indexes[this.indexes.length - 1]);
        const left = new Date(
            new Date(this.indexes[this.indexes.length - 1]).getTime() -
                day * 24 * 60 * 60 * 1000,
        );
        const filteredArrByDateRange =
            data &&
            data.filter((item) => {
                return item.date > left && item.date <= right;
            });
        const pnlFilteredValues = filteredArrByDateRange.map((obj) => obj.pnl);
        const getAverage = (array) =>
            array.reduce((a, c) => a + c) / array.length;
        const averageValue = getAverage(pnlFilteredValues);
        this.averageValues[day] = (averageValue / 1000000).toFixed();
    }

    ngOnInit() {
        // @todo maybe it can go to ledger toolbar
        if (this.activatedRoute.snapshot.queryParams.date) {
            const date = moment.utc(
                this.activatedRoute.snapshot.queryParams.date,
            );
            this.selectedDate$.next(date.toDate());
        }

        if (this.fullscreenMode) {
            this.height = window.innerHeight - 120;
        }

        this.loading$.subscribe(
            (loading) =>
                loading &&
                d3
                    .select(this.element)
                    .selectAll('svg')
                    .selectAll('*')
                    .remove(),
        );

        // @todo range is broadcasted even if we select single date
        this.subscription$.add(
            this.selectedRange$
                .pipe(
                    // skip first one to make sure on page refresh we dont remove pageIndex
                    skip(1),
                )
                .subscribe((data) => {
                    if (data) {
                        this.router.navigate([], {
                            queryParams: {
                                fromDate: momentToUtcFormat(moment(data.left)),
                                toDate: momentToUtcFormat(moment(data.right)),
                                pageIndex: undefined,
                            },
                            queryParamsHandling: 'merge',
                        });

                        this.rebuildSvgs();
                    }
                }),
        );

        this.subscription$.add(
            combineLatest([this.width$, this.data$]).subscribe(([_, data]) => {
                if (data && data.length) {
                    this.keys = this.fields
                        ? Object.keys(this.fields)
                        : Object.keys(data[0]);

                    this.indexes = data.map((row) => row[this.keys[0]]);

                    this.series = this.keys.splice(1).map((key, i) => ({
                        name: this.fields ? this.fields[key] : key,
                        values: data.map((row) => row[key]),
                        color:
                            this.keys.length > 2
                                ? MATERIAL_COLORS[i % MATERIAL_COLORS.length]
                                : 'rgb(97, 97, 97)',
                    }));

                    this.loading$.next(false);
                    this.rebuildSvgs();
                } else {
                    this.keys = [];
                    this.indexes = [];
                    this.series = [];

                    d3.select(this.element)
                        .selectAll('svg')
                        .selectAll('*')
                        .remove();
                }
            }),
        );
    }

    ngAfterViewInit() {
        this.element = this.viewContainerRef.element.nativeElement;

        this.subscription$.add(
            fromEvent(window, 'resize')
                .pipe(debounceTime(50))
                .subscribe(() => this.ngAfterViewChecked),
        );

        this.subscription$.add(
            this.data$.subscribe((data) => {
                if (data && data.length) {
                    this.daysForAverage.map((day) => {
                        this.getAverageValues(data, day);
                    });
                }
            }),
        );
    }

    ngAfterViewChecked() {
        const newWidth = this.getElementWidth();

        if (this.width != newWidth && newWidth > 0) {
            this.width = newWidth;

            window.setTimeout(() => this.width$.next(this.width));
        }
    }

    ngOnDestroy() {
        this.subscription$.unsubscribe();
    }

    checkIfCustomDaysIsSelected(start: number, end: number) {
        const startEndSubtraction: number = end - start;
        if (
            startEndSubtraction !==
            this.daysSelectionOptionsWithIndexesSubtraction[
                this.selectedDayIndex
            ].startEndSubtraction
        ) {
            return true;
        }
    }
    rebuildSvgs() {
        if (this.getElementWidth() > 0) {
            if (!this.hideDisplay) {
                this.setIsOptionAvailable();

                const startIndex = this.indexes.findIndex(
                    (i) =>
                        new Date(i).getTime() ===
                        new Date(
                            this.selectedRange$.getValue()?.left,
                        ).getTime(),
                );

                const endIndex = this.indexes.findIndex(
                    (i) =>
                        new Date(i).getTime() ===
                        new Date(
                            this.selectedRange$.getValue()?.right,
                        ).getTime(),
                );

                this.selectedDayIndex = this.whichDayIndexIsSelected(
                    startIndex,
                    endIndex,
                );

                this.isCustomDaysSelected = this.checkIfCustomDaysIsSelected(
                    startIndex,
                    endIndex,
                );
                const indexFilter = (_, i) =>
                    i >= (startIndex === -1 ? 1 : startIndex) &&
                    i <= (endIndex === -1 ? this.indexes.length - 1 : endIndex);

                new DisplayChart(
                    this.element,
                    '.app-line-chart__display',
                    this.getElementWidth(),
                    this.height - (this.selectedRange$ ? 80 : 0),
                    {
                        top: 25,
                        right: this.width > 800 ? 50 : 40,
                        bottom: 20,
                        left: 0,
                    },
                    {
                        keys: this.keys,
                        indexes: this.selectedRange$.getValue()
                            ? (this.indexes as any[]).filter(indexFilter)
                            : this.indexes,
                        series: this.selectedRange$.getValue()
                            ? this.series.map((s) => ({
                                  ...s,
                                  values: s.values.filter(indexFilter),
                              }))
                            : this.series,
                    },
                    this.selectedDate$,
                    this.selectedRange$,
                    this.getTrendLine(),
                    this.themeService.selectedTheme$.getValue(),
                );
            }

            new NavigationChart(
                this.element,
                '.app-line-chart__navigator',
                this.getElementWidth(),
                this.fullscreenMode ? 80 : this.navigationHeight,
                {
                    top: 0,
                    right: this.hideDisplay ? 0 : this.width > 800 ? 50 : 40,
                    bottom: 20,
                    left: 0,
                },
                {
                    keys: this.keys,
                    indexes: this.indexes,
                    series: this.series,
                },
                this.hideDisplay ? undefined : this.selectedDate$,
                this.selectedRange$,
                this.themeService.selectedTheme$.getValue(),
                this.svgHeight,
            );
        }
    }

    setLastDays(days: number | string, index: number) {
        this.selectedDayIndex = index;
        this.isCustomDaysSelected = false;
        let daysValue = days;
        if (days == 'All') {
            daysValue = 0;
        }
        const left = new Date(
            daysValue
                ? new Date(
                      new Date(
                          this.indexes[this.indexes.length - 1],
                      ).getTime() -
                          (daysValue as number) * 24 * 60 * 60 * 1000,
                  )
                : moment(this.indexes[0]).subtract(1, 'h').toDate(),
        );

        const right = new Date(this.indexes[this.indexes.length - 1]);

        this.selectedRange$.next({ left, right });
    }

    private whichDayIndexIsSelected(start: number, end: number): number {
        const startEndSubtraction: number = end - start;

        const findIndex =
            this.daysSelectionOptionsWithIndexesSubtraction.findIndex(
                (item) => item.startEndSubtraction === startEndSubtraction,
            );
        return findIndex > 0 ? findIndex : 0;
    }

    private getElementWidth(): number {
        return this.fullscreenMode
            ? window.innerWidth - 60
            : this.element?.getClientRects().length
            ? this.element.getClientRects()[1].width
            : 0;
    }

    private setTrendLine(trendLine: string) {
        saveToLocalStorage(TREND_LINE_LOCALSTORAGE_KEY, trendLine);
    }

    private getTrendLine(): string {
        const trendLine = getFromLocalStorage(TREND_LINE_LOCALSTORAGE_KEY);

        if (!trendLine) {
            return DEFAULT_TRENDLINE;
        }

        return trendLine;
    }

    private setIsOptionAvailable() {
        const generalStartEndSubtraction =
            this.indexes.findIndex(
                (i) =>
                    new Date(i).getTime() ===
                    new Date(this.indexes[this.indexes.length - 1]).getTime(),
            ) -
            this.indexes.findIndex(
                (i) =>
                    new Date(i).getTime() ===
                    moment(this.indexes[0]).subtract(1, 'h').toDate().getTime(),
            );

        this.daysSelectionOptionsWithIndexesSubtraction.forEach((day) => {
            if (day.daysSelection !== 'All') {
                day.isDisable =
                    day.startEndSubtraction > generalStartEndSubtraction;
            } else {
                day.isDisable = false;
                day.startEndSubtraction = generalStartEndSubtraction;
            }
        });
    }
}
