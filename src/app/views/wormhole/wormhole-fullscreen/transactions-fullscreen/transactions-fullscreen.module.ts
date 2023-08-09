import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';

import { DateRangeInputsModule } from '../../../../components/date-range-inputs/date-range-inputs.module';
import { EditModeAlertDialogModule } from '../../../../components/edit-mode-alert-dialog/edit-mode-alert-dialog.module';
import { AccountingService } from '../../../../services/accounting/accounting.service';
import { AdvancedSearchService } from '../../../../services/advanced-search/advanced-search.service';
import { ApiService } from '../../../../services/api/api.service';
import { ConfigurationService } from '../../../../services/configuration/configuration.service';
import { TransactionsTableModule } from '../../general-ledger/general-ledger-table/transactions-table/transactions-table.module';
import { TransactionsFullscreenComponent } from './transactions-fullscreen.component';

@NgModule({
    declarations: [TransactionsFullscreenComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: TransactionsFullscreenComponent,
            },
        ]),
        TransactionsTableModule,
        DateRangeInputsModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        MatSlideToggleModule,
        EditModeAlertDialogModule,
    ],
    providers: [
        AccountingService,
        ApiService,
        ConfigurationService,
        AdvancedSearchService,
    ],
})
export class TransactionsFullscreenModule {}
