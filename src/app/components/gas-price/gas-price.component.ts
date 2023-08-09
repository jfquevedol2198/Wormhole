import { Component, OnDestroy, OnInit } from '@angular/core';
import { from, Subscription, timer } from 'rxjs';

import { IGasPrice } from '../../interfaces/gasPrice.interface';
import { GasPriceService } from '../../services/gas-price/gas-price.service';
import { GeckoPriceService } from '../../services/gecko-price/gecko-price.service';
import { GasPriceChart } from './d3/gas-price-chart.d3js';
import { mergeMap } from 'rxjs/operators';

export const ETH_USED = 21000;

@Component({
    selector: 'app-gas-price',
    templateUrl: './gas-price.component.html',
    styleUrls: ['./gas-price.component.scss'],
})
export class GasPriceComponent implements OnInit, OnDestroy {
    gasPrice: IGasPrice;
    ethToUsdPrice = 0;
    refreshEvery = 5000;

    gasPriceSubscription: Subscription;

    constructor(
        public gasPriceService: GasPriceService,
        public geckoPriceService: GeckoPriceService,
    ) {}

    ngOnInit(): void {
        const graphSmoothFactor = 15;
        const totalWidth = 500;
        const totalHeight = 350;

        this.gasPriceService
            .getGasPriceWithCurrentWeekData(graphSmoothFactor)
            .subscribe((gasPrice) => {
                this.gasPrice = gasPrice;
                // tslint:disable-next-line:no-unused-expression
                new GasPriceChart(
                    '.app-gas-price--chart',
                    totalWidth,
                    totalHeight,
                    gasPrice,
                );
            });

        // create interval to get the gas price
        this.gasPriceSubscription = timer(this.refreshEvery, this.refreshEvery)
            .pipe(mergeMap((data) => this.gasPriceService.getGasPrice()))
            .subscribe((data) => (this.gasPrice = data));

        from(this.geckoPriceService.getETHPrice(true)).subscribe(
            (data) => (this.ethToUsdPrice = data),
        );
    }

    getETHPriceFromGwei(gwei: number): string {
        const gasUsedGwei = gwei * ETH_USED;
        const ether = gasUsedGwei / 1000000000;
        const price = ether * this.ethToUsdPrice;

        return '$' + Math.round((price + Number.EPSILON) * 100) / 100;
    }

    ngOnDestroy() {
        this.gasPriceSubscription.unsubscribe();
    }
}
