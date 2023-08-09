import { NgScrollbarModule } from 'ngx-scrollbar';
import { AdvancedSearchService } from 'src/app/services/advanced-search/advanced-search.service';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AdvancedSearchDialogModule } from '../../../../components/advanced-search-dialog/advanced-search-dialog.module';
import { EditModeAlertDialogModule } from '../../../../components/edit-mode-alert-dialog/edit-mode-alert-dialog.module';
import { DeFiImpactTableModule } from './de-fi-impact-table/de-fi-impact-table.module';
import { GeneralLedgerTableComponent } from './general-ledger-table.component';
import { TransactionsTableModule } from './transactions-table/transactions-table.module';

@NgModule({
    declarations: [GeneralLedgerTableComponent],
    imports: [
        CommonModule,
        MatToolbarModule,
        MatTabsModule,
        MatIconModule,
        MatButtonModule,
        TransactionsTableModule,
        MatDialogModule,
        AdvancedSearchDialogModule,
        MatDialogModule,
        NgScrollbarModule,
        MatTooltipModule,
        DeFiImpactTableModule,
        MatSlideToggleModule,
        MatMenuModule,
        EditModeAlertDialogModule,
    ],
    providers: [AdvancedSearchService],
    exports: [GeneralLedgerTableComponent],
})
export class GeneralLedgerTableModule {}
