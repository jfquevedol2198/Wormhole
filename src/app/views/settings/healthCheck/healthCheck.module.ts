import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { BasicDynamicTableModule } from '../../../components/basic-dynamic-table/basic-dynamic-table.module';
import { DynamicTableModule } from '../../../components/dynamic-table/dynamic-table.module';
import { WormholeService } from '../../../services/wormhole/wormhole.service';
import { HealthCheckComponent } from './healthCheck.component';

@NgModule({
    declarations: [HealthCheckComponent],
    imports: [
        CommonModule,
        MatCardModule,
        MatIconModule,
        BasicDynamicTableModule,
        MatProgressSpinnerModule,
        DynamicTableModule,
    ],
    providers: [WormholeService],
    exports: [HealthCheckComponent],
})
export class HealthCheckModule {}
