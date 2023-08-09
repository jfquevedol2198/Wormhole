import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
    IGasPrice,
    IGasPriceWeekData,
    IGasPriceWeekDataItem,
} from '../../interfaces/gasPrice.interface';
import { IGasPriceApi } from '../../interfaces/gasPriceApi.interface';

@Injectable()
export class GasPriceService {
    private gasPriceApiUrl = 'https://api.ethereumdb.com/v1/onchain/gas';

    constructor(private readonly http: HttpClient) {}

    getGasPrice(): Observable<IGasPrice> {
        return this.http
            .get<IGasPriceApi>(this.gasPriceApiUrl)
            .pipe(map((data) => this.mapGasPrices(data)));
    }

    getGasPriceWithCurrentWeekData(
        smoothFactor: number,
    ): Observable<IGasPriceWeekData> {
        return this.http.get<IGasPriceApi>(this.gasPriceApiUrl).pipe(
            map((data) => {
                return {
                    ...this.mapGasPrices(data),
                    data: this.getWeekDataNum(data, smoothFactor),
                };
            }),
        );
    }

    protected getWeekDataNum(
        data: IGasPriceApi,
        smoothFactor: number,
    ): Array<IGasPriceWeekDataItem> {
        const items: Array<IGasPriceWeekDataItem> = [];

        let collectNumbers = [];
        let counter = 0;

        data.thisWeek.average.map((item, index) => {
            if (index % smoothFactor === 0) {
                items.push({
                    timestamp: item[0],
                    value: this.getAverageFromNumbers(
                        collectNumbers,
                        smoothFactor,
                    ),
                });
                counter++;
                collectNumbers = [];
            } else {
                collectNumbers.push(item[1]);
            }

            return item;
        });

        return items.reverse();
    }

    protected mapGasPrices(data: IGasPriceApi): IGasPrice {
        return {
            slow: Math.round(data.current.safeLow * 0.1),
            average: Math.round(data.current.average * 0.1),
            fast: Math.round(data.current.fast * 0.1),
            fastest: Math.round(data.current.fastest * 0.1),
        };
    }

    private getAverageFromNumbers(
        collectNumbers: Array<number>,
        smoothFactor: number,
    ) {
        let addUp = 0;

        collectNumbers.forEach((num) => {
            addUp = addUp + num;
        });

        return Math.round(addUp / smoothFactor) / 10;
    }
}
