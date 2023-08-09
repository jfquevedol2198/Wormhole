import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

import { NoDataCommunicateModule } from '../../../components/no-data-communicate/no-data-communicate.module';
import { WormholeService } from '../../../services/wormhole/wormhole.service';
import { SharedSettingsComponent } from './sharedSettings.component';

@NgModule({
    declarations: [SharedSettingsComponent],
    imports: [
        CommonModule,
        MatCardModule,
        MatInputModule,
        ReactiveFormsModule,
        NoDataCommunicateModule,
    ],
    providers: [WormholeService],
    exports: [SharedSettingsComponent],
})
export class SharedSettingsModule {}
