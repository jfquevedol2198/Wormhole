import { Observable } from 'rxjs';

import { Component } from '@angular/core';

import { ConfigurationService } from '../../services/configuration/configuration.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
    apiUrl: Observable<string>;

    constructor(private readonly configuration: ConfigurationService) {
        this.apiUrl = configuration.getWormholeUrl();
    }
}
