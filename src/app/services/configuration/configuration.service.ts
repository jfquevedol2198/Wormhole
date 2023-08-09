import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

import { environment } from './../../../environments/environment';

import { IKeyValuePair } from '../../interfaces/keyvaluepair.interface';
import { IWormhole } from '../../interfaces/wormhole.interface';

import {
    getFromLocalStorage,
    saveToLocalStorage,
} from 'src/app/utilities/localStorageFunctions';

@Injectable({ providedIn: 'root' })
export class ConfigurationService {
    config$: Observable<IKeyValuePair>;

    configSubject$: BehaviorSubject<IKeyValuePair> =
        new BehaviorSubject<IKeyValuePair>(undefined);

    constructor(private readonly http: HttpClient) {
        this.config$ = this.configSubject$.pipe(
            filter((config) => !!config),
            take(1),
        );

        this.reload();
    }

    reload() {
        this.http.get<IKeyValuePair>('/config.json').subscribe((config) => {
            Object.keys(config).map((key) => {
                const value = getFromLocalStorage(key);

                if (value) {
                    config[key] = value;
                }
            });

            this.configSubject$.next(config);
        });
    }

    getConfig(key): Observable<string> {
        return this.config$.pipe(map((config) => config[key]));
    }

    selectWormhole(wormhole: string) {
        saveToLocalStorage('wormhole', wormhole);
    }

    selectedWormhole(): IWormhole {
        const wormhole = getFromLocalStorage('wormhole');

        return (
            wormhole && environment.wormholes.find((w) => w.name === wormhole)
        );
    }

    getWormholeUrl(): Observable<string> {
        const wormholeUrl = this.selectedWormhole()?.url;

        return wormholeUrl ? of(wormholeUrl) : this.getConfig('wormholeUrl');
    }
}
