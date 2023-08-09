import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';

import { DatePipeModule } from '../../pipes/date/date.pipe.module';

import { ApiService } from '../../services/api/api.service';
import { WormholeService } from '../../services/wormhole/wormhole.service';

import { MainModule } from '../../components/main/main.module';

import { ExceptionsModule } from './exceptions/exceptions.module';
import { ExchangeRateProvidersModule } from './exchangeRateProviders/exchangeRateProviders.module';
import { HealthCheckModule } from './healthCheck/healthCheck.module';
import { SharedSettingsModule } from './sharedSettings/sharedSettings.module';
import { WorkerAgentsModule } from './workerAgents/workerAgents.module';
import { WorkerTasksModule } from './workerTasks/workerTasks.module';

import { SettingsRoutesModule } from './settings-routing.module';

import { SettingsComponent } from './settings.component';

@NgModule({
    declarations: [SettingsComponent],
    imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatGridListModule,
        MatSelectModule,
        MatToolbarModule,
        DatePipeModule,
        MainModule,
        ExceptionsModule,
        ExchangeRateProvidersModule,
        HealthCheckModule,
        SharedSettingsModule,
        WorkerAgentsModule,
        WorkerTasksModule,
        SettingsRoutesModule,
    ],
    providers: [ApiService, WormholeService],
})
export class SettingsModule {}
