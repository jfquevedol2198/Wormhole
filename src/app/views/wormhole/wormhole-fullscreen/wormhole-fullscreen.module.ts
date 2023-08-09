import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ConfigurationService } from '../../../services/configuration/configuration.service';
import { WormholeFullscreenRoutingModule } from './wormhole-fullscreen-routing.module';
import { WormholeFullscreenComponent } from './wormhole-fullscreen.component';

@NgModule({
    declarations: [WormholeFullscreenComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        WormholeFullscreenRoutingModule,

        MatIconModule,
        MatButtonModule,
        MatTabsModule,
        MatToolbarModule,
    ],
    providers: [ConfigurationService],
})
export class WormholeFullscreenModule {}
