import * as d3 from 'd3';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { MATERIAL_COLORS } from '../../constants/colors';
import { IPieChartData } from '../../interfaces/piechartData.interface';
import { IPlatformPerformance } from '../../interfaces/platform.interface';
import { formatPropertyName } from '../../utilities/formatPropertyName';
import { getPercentagesForInventoryPerformance } from '../../utilities/getPercentagesForInventoryPerformance';
import { getPlatformPerformances } from '../../utilities/getPlatformPerformances';
import { getTopPlatformsWithAssets } from '../../utilities/getTopPlatformsWithTopAssets';
import { GeneralLedgerService } from '../../views/wormhole/general-ledger/general-ledger.service';
import { PieChart } from './d3/pie-chart.d3js';

@Component({
    selector: 'app-pie-chart',
    templateUrl: './pie-chart.component.html',
    styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit, OnDestroy {
    @Input() alignCenter = false;
    @Input() pieRadius = 58;
    @Input() width = 100;

    platformPerformanceSubscription: Subscription;

    barChartData = [];
    platformNamesWithColors = [];

    constructor(public generalLedgerService: GeneralLedgerService) {}

    ngOnInit() {
        this.platformPerformanceSubscription =
            this.generalLedgerService.pnlPositionDetailsForPieChart$
                .pipe(map((data) => getPlatformPerformances(data)))
                .subscribe((platformPerformances: IPlatformPerformance[]) => {
                    this.removeSVGs();
                    if (platformPerformances.length > 0) {
                        const topPlatforms =
                            getTopPlatformsWithAssets(platformPerformances);
                        const pieChartData = this.getPieChartData(topPlatforms);
                        this.barChartData = this.getBarChartData(topPlatforms);

                        this.platformNamesWithColors =
                            this.setColorsForPlatforms(topPlatforms);

                        setTimeout(
                            () =>
                                new PieChart(
                                    this.pieRadius,
                                    this.width,
                                    pieChartData,
                                    '.app-pie-chart__chart',
                                ),
                        );
                    } else {
                        this.barChartData = [];
                    }
                    this.generalLedgerService.isPieChartLoading = false;
                });
    }

    ngOnDestroy() {
        if (this.platformPerformanceSubscription) {
            this.platformPerformanceSubscription.unsubscribe();
        }
    }

    removeSVGs() {
        d3.selectAll('svg.app-pie-chart__chart').remove();
    }

    setColorsForPlatforms(topPlatformPerformances: IPlatformPerformance[]) {
        let index = 0;
        const platformNamesWithColors = [];
        topPlatformPerformances.map((platform) => {
            platformNamesWithColors.push({
                name: platform.name,
                color: MATERIAL_COLORS[index],
            });
            index += 1;
        });

        return platformNamesWithColors;
    }

    isBarChartForPercentages(name: string) {
        return !['Funding', 'Loss', 'Profit'].includes(name);
    }

    getPieChartData(
        platformPerformances: IPlatformPerformance[],
    ): IPieChartData {
        let totalBalance = 0;
        let sumOfAbsoluteBalances = 0;
        const platformsWithSums = platformPerformances.map((platform) => {
            totalBalance += platform.totalBalance;
            sumOfAbsoluteBalances += Math.abs(platform.totalBalance);

            let sumOfAbsoluteAssetBalances = 0;
            platform.records.map((asset) => {
                sumOfAbsoluteAssetBalances += asset.absoluteTotalBalance;
            });
            return {
                ...platform,
                sumOfAbsolutAssetBalances: sumOfAbsoluteAssetBalances,
            };
        });
        return {
            totalBalance,
            sumOfAbsoluteBalances,
            platforms: platformsWithSums,
        };
    }

    getBarChartData(platformPerformances: IPlatformPerformance[]) {
        const percentagesValues = [];

        platformPerformances.map((platformPerformance) => {
            const platformPercentages =
                getPercentagesForInventoryPerformance(platformPerformance);
            platformPercentages.percentages.map((percentage) => {
                percentagesValues.push({
                    name: formatPropertyName(percentage.name).shortName,
                    platformName: platformPerformance.name,
                    value: percentage.value,
                });
            });
        });

        const groupedPercentagesValues = [];

        percentagesValues.map((value) => {
            const existingValue = groupedPercentagesValues.filter(
                (uniqueValue) => uniqueValue.name === value.name,
            );

            if (existingValue.length) {
                const existingIndex = groupedPercentagesValues.indexOf(
                    existingValue[0],
                );

                groupedPercentagesValues[existingIndex].percentages.push({
                    name: value.platformName,
                    value: value.value,
                });
                groupedPercentagesValues[existingIndex].totalBalance +=
                    Math.abs(value.value);
            } else {
                groupedPercentagesValues.push({
                    name: value.name,
                    percentages: [
                        {
                            name: value.platformName,
                            value: value.value,
                        },
                    ],
                    totalBalance: Math.abs(value.value),
                });
            }
        });

        let total = 0;

        groupedPercentagesValues.map((value) => {
            total += value.totalBalance;
        });

        groupedPercentagesValues.map((value) => {
            value.percentages.sort((a, b) => b.value - a.value);
            value.percentage = (value.totalBalance * 100) / total;

            const valuesWithPercentage = [];
            value.percentages.map((platform) => {
                valuesWithPercentage.push({
                    ...platform,
                    percentage:
                        (Math.abs(platform.value) * 100) /
                        ((value.percentage * total) / 100),
                });
            });
            value.percentages = valuesWithPercentage;
        });

        return groupedPercentagesValues.sort(
            (a, b) => b.totalBalance - a.totalBalance,
        );
    }
}
