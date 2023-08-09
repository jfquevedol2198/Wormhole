import { Component } from '@angular/core';

import {
    ISetting,
    IUpdateSettingFields,
} from '../../../interfaces/setting.interface';
import { WormholeService } from '../../../services/wormhole/wormhole.service';
import { separateStringIntoWords } from '../../../utilities/separateStringIntoWords';

@Component({
    selector: 'app-configuration-shared-settings',
    templateUrl: './sharedSettings.component.html',
})
export class SharedSettingsComponent {
    sharedSettings: ISetting[] = [];

    separateStringIntoWords = separateStringIntoWords;

    constructor(public service: WormholeService) {
        this.service
            .getSettings()
            .subscribe((settings) => (this.sharedSettings = settings));
    }

    updateSharedSetting(event, setting: IUpdateSettingFields) {
        this.service.updateSetting({
            ...setting,
            value: event.target.value,
        });
    }
}
