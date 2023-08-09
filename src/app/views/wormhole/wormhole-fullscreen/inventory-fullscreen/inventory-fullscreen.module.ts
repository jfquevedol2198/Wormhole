import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';

import { SelectDateModule } from '../../../../components/select-date/select-date.module';
import { AccountingService } from '../../../../services/accounting/accounting.service';
import { ApiService } from '../../../../services/api/api.service';
import { ConfigurationService } from '../../../../services/configuration/configuration.service';
import { InventoryModule } from '../../general-ledger/inventory/inventory.module';
import { InventoryFullscreenComponent } from './inventory-fullscreen.component';

@NgModule({
    declarations: [InventoryFullscreenComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: InventoryFullscreenComponent,
            },
        ]),
        InventoryModule,
        MatProgressSpinnerModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        SelectDateModule,
    ],
    providers: [AccountingService, ApiService, ConfigurationService],
})
export class InventoryFullscreenModule {}
