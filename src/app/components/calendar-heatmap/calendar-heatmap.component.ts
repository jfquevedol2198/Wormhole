import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';
import * as d3 from 'd3';
import { Subscription } from 'rxjs';

import { ITraderStamina } from '../../interfaces/traderStamina.interface';
import { GeneralLedgerService } from '../../views/wormhole/general-ledger/general-ledger.service';
import { CalendarHeatmap } from './d3/calendar-heatmap.d3js';

@Component({
    selector: 'app-calendar-heatmap',
    templateUrl: './calendar-heatmap.component.html',
    styleUrls: ['./calendar-heatmap.component.scss'],
})
export class CalendarHeatmapComponent implements OnInit, OnDestroy {
    @Input() squareLength = 12;
    @Input() padding = 2;
    @Input() monthLabelHeight = 15;
    @Input() dayLabelLength = 30;
    @Input() legendLabelLength = 25;

    traderStaminaData: ITraderStamina[] = [];
    selector = '.app-calendar-heatmap__chart';
    weekStart = 0;
    colorRange = ['#232323', '#9B9B9B'];

    portfolioId: number;
    subscription: Subscription;

    constructor(public generalLedgerService: GeneralLedgerService) {}

    ngOnInit() {
        this.subscription =
            this.generalLedgerService.traderStaminaData$.subscribe(
                (traderStamina) => {
                    const now = moment().endOf('day').toDate();
                    const yearAgo = moment()
                        .startOf('day')
                        .subtract(1, 'year')
                        .toDate();

                    this.traderStaminaData = d3
                        .timeDays(yearAgo, now)
                        .map((dateElement) => {
                            const traderStaminaForDate = traderStamina.filter(
                                (traderStaminaElement) =>
                                    moment(traderStaminaElement.date)
                                        .startOf('day')
                                        .toDate()
                                        .getTime() === dateElement.getTime(),
                            );

                            return {
                                date: dateElement,
                                transactionCount:
                                    traderStaminaForDate.length > 0
                                        ? traderStaminaForDate[0]
                                              .transactionCount
                                        : 0,
                                nftCount:
                                    traderStaminaForDate.length > 0
                                        ? traderStaminaForDate[0].nftCount
                                        : 0,
                                depositCount:
                                    traderStaminaForDate.length > 0
                                        ? traderStaminaForDate[0].depositCount
                                        : 0,
                                withdrawCount:
                                    traderStaminaForDate.length > 0
                                        ? traderStaminaForDate[0].withdrawCount
                                        : 0,
                                stakeCount:
                                    traderStaminaForDate.length > 0
                                        ? traderStaminaForDate[0].stakeCount
                                        : 0,
                                unStakeCount:
                                    traderStaminaForDate.length > 0
                                        ? traderStaminaForDate[0].unStakeCount
                                        : 0,
                                borrowCount:
                                    traderStaminaForDate.length > 0
                                        ? traderStaminaForDate[0].borrowCount
                                        : 0,
                                repayCount:
                                    traderStaminaForDate.length > 0
                                        ? traderStaminaForDate[0].repayCount
                                        : 0,
                                liquidationCount:
                                    traderStaminaForDate.length > 0
                                        ? traderStaminaForDate[0]
                                              .liquidationCount
                                        : 0,
                                swapCount:
                                    traderStaminaForDate.length > 0
                                        ? traderStaminaForDate[0].swapCount
                                        : 0,
                                rewardCount:
                                    traderStaminaForDate.length > 0
                                        ? traderStaminaForDate[0].rewardCount
                                        : 0,
                            };
                        });
                    setTimeout(
                        () =>
                            new CalendarHeatmap(
                                this.selector,
                                this.weekStart,
                                this.traderStaminaData,
                                this.colorRange,
                                this.squareLength,
                                this.padding,
                                this.monthLabelHeight,
                                this.dayLabelLength,
                                this.legendLabelLength,
                            ),
                    );
                },
            );
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
