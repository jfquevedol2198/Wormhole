import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';

import { SelectDateModule } from '../../../../components/select-date/select-date.module';
import { AccountingService } from '../../../../services/accounting/accounting.service';
import { ApiService } from '../../../../services/api/api.service';
import { ConfigurationService } from '../../../../services/configuration/configuration.service';
import { DeFiImpactTableModule } from '../../general-ledger/general-ledger-table/de-fi-impact-table/de-fi-impact-table.module';
import { DeFiImpactFullscreenComponent } from './de-fi-impact-fullscreen.component';

@NgModule({
    declarations: [DeFiImpactFullscreenComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: DeFiImpactFullscreenComponent,
            },
        ]),
        ReactiveFormsModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatInputModule,

        DeFiImpactTableModule,
        SelectDateModule,
    ],
    providers: [AccountingService, ApiService, ConfigurationService],
})
export class DeFiImpactFullscreenModule {}
