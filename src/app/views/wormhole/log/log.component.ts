import { Component } from '@angular/core';

import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { WormholeService } from '../../../services/wormhole/wormhole.service';

@Component({
    selector: 'app-log',
    templateUrl: './log.component.html',
    styleUrls: ['./log.component.scss'],
})
export class LogComponent {
    options = ['Verbose', 'Debug', 'Information', 'Warning', 'Error', 'Fatal'];
    logLevel$: Observable<string>;

    constructor(public service: WormholeService) {
        this.logLevel$ = service.getLogLevel().pipe(debounceTime(1000));
    }

    changeLogLevel(value: string) {
        this.service.changeLogLevel(value);
    }
}
