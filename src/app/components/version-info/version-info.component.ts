import { Component } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ConfigurationService } from '../../services/configuration/configuration.service';

import { version } from '../../../../package.json';

@Component({
    selector: 'app-version-info',
    templateUrl: './version-info.component.html',
    styleUrls: ['./version-info.component.scss'],
})
export class VersionInfoComponent {
    build$: Observable<string>;
    version = version;

    constructor(private config: ConfigurationService) {
        this.build$ = this.config.config$.pipe(map((config) => config.build));
    }
}
