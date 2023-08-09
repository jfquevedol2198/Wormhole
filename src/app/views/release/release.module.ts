import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MatCardModule } from '@angular/material/card';

import { ConfigurationService } from '../../services/configuration/configuration.service';

import { MainModule } from '../../components/main/main.module';

import { ReleaseRoutingModule } from './release-routing.module';

import { ReleaseComponent } from './release.component';

@NgModule({
    declarations: [ReleaseComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        MatCardModule,
        MainModule,
        ReleaseRoutingModule,
    ],
    providers: [ConfigurationService],
})
export class ReleaseModule {}
