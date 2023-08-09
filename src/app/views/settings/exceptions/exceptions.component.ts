import { Component } from '@angular/core';

import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { ILogEvent } from '../../../interfaces/logEvent.interface';

import { WormholeService } from '../../../services/wormhole/wormhole.service';

@Component({
    selector: 'app-configuration-exceptions',
    templateUrl: './exceptions.component.html',
    styleUrls: ['./exceptions.component.scss'],
})
export class ExceptionsComponent {
    logEvents$: Observable<ILogEvent[]>;

    constructor(public service: WormholeService) {
        this.logEvents$ = this.service.getExceptions().pipe(debounceTime(1000));
    }
}
