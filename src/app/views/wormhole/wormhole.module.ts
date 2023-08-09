import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

import { MainModule } from '../../components/main/main.module';
import { AuthenticatedGuard } from '../../guard/authentication.guard';
import { ConfigurationService } from '../../services/configuration/configuration.service';
import { WormholeRoutingModule } from './wormhole-routing.module';
import { WormholeComponent } from './wormhole.component';

@NgModule({
    declarations: [WormholeComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        MatTabsModule,
        MainModule,
        WormholeRoutingModule,
    ],
    providers: [ConfigurationService, AuthenticatedGuard],
})
export class WormholeModule {}
