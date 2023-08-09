import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CalendarHeatmapModule } from '../../../components/calendar-heatmap/calendar-heatmap.module';
import { GasPriceModule } from '../../../components/gas-price/gas-price.module';
import { LineChartModule } from '../../../components/line-chart/line-chart.module';
import { PieChartModule } from '../../../components/pie-chart/pie-chart.module';
import { PnlProgressModule } from '../../../components/pnl-progress/pnl-progress.module';
import { AccountingService } from '../../../services/accounting/accounting.service';
import { ApiService } from '../../../services/api/api.service';
import { AuditService } from '../../../services/audit/audit.service';
import { DataQualityCheckService } from '../../../services/dataQualityCheck/dataQualityCheck.service';
import { GeneralLedgerRoutesModule } from './general-ledger-routing.module';
import { GeneralLedgerSimpleViewComponent } from './general-ledger-simple-view.component';
import { GeneralLedgerTableModule } from './general-ledger-table/general-ledger-table.module';
import { GeneralLedgerToolbarModule } from './general-ledger-toolbar/general-ledger-toolbar.module';
import { GeneralLedgerView0Component } from './general-ledger-view0.component';
import { GeneralLedgerView1Component } from './general-ledger-view1.component';
import { GeneralLedgerView2Component } from './general-ledger-view2.component';
import { InventoryModule } from './inventory/inventory.module';

@NgModule({
    declarations: [
        GeneralLedgerView0Component,
        GeneralLedgerView1Component,
        GeneralLedgerView2Component,
        GeneralLedgerSimpleViewComponent,
    ],
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
        GeneralLedgerRoutesModule,
        CalendarHeatmapModule,
        GasPriceModule,
    ],
    providers: [
        AccountingService,
        ApiService,
        DataQualityCheckService,
        AuditService,
    ],
})
export class GeneralLedgerModule {}
