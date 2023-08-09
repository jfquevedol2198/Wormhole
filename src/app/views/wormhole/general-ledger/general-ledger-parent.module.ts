import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';

import { CalendarHeatmapModule } from '../../../components/calendar-heatmap/calendar-heatmap.module';
import { GasPriceModule } from '../../../components/gas-price/gas-price.module';
import { LineChartModule } from '../../../components/line-chart/line-chart.module';
import { PieChartModule } from '../../../components/pie-chart/pie-chart.module';
import { PnlProgressModule } from '../../../components/pnl-progress/pnl-progress.module';
import { AccountingService } from '../../../services/accounting/accounting.service';
import { ApiService } from '../../../services/api/api.service';
import { DataQualityCheckService } from '../../../services/dataQualityCheck/dataQualityCheck.service';
import { GeneralLedgerParentComponent } from './general-ledger-parent.component';
import { GeneralLedgerTableModule } from './general-ledger-table/general-ledger-table.module';
import { GeneralLedgerToolbarModule } from './general-ledger-toolbar/general-ledger-toolbar.module';
import { InventoryModule } from './inventory/inventory.module';

@NgModule({
    declarations: [GeneralLedgerParentComponent],
    imports: [
        CommonModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        LineChartModule,
        PieChartModule,
        PnlProgressModule,
        GeneralLedgerToolbarModule,
        InventoryModule,
        GeneralLedgerTableModule,
        CalendarHeatmapModule,
        GasPriceModule,
        RouterModule.forChild([
            {
                path: '',
                redirectTo: 'view',
                pathMatch: 'full',
            },
            {
                path: 'view',
                component: GeneralLedgerParentComponent,
                loadChildren: () =>
                    import('./general-ledger.module').then(
                        (m) => m.GeneralLedgerModule,
                    ),
            },
        ]),
    ],
    providers: [AccountingService, ApiService, DataQualityCheckService],
})
export class GeneralLedgerParentModule {}
