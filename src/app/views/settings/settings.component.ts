import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Component } from '@angular/core';

import { environment } from '../../../environments/environment';
import { IWormhole } from '../../interfaces/wormhole.interface';
import { ConfigurationService } from '../../services/configuration/configuration.service';
import { WorkersService } from '../../services/workers/workers.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
})
export class SettingsComponent {
    wormholes: IWormhole[] = environment.wormholes;
    wormhole$: Observable<string>;

    constructor(
        public workers: WorkersService,
        public configuration: ConfigurationService,
    ) {
        const wormhole = this.configuration.selectedWormhole();

        this.wormhole$ = wormhole
            ? of(wormhole.name)
            : this.configuration
                  .getWormholeUrl()
                  .pipe(
                      map(
                          (wormholeUrl) =>
                              this.wormholes.find(
                                  (wormhole) => wormhole.url === wormholeUrl,
                              )?.name,
                      ),
                  );
    }

    setWormhole(wormhole: string) {
        this.configuration.selectWormhole(wormhole);
    }
    enableAgent() {
        this.workers.enableAgent().subscribe();
    }
}
