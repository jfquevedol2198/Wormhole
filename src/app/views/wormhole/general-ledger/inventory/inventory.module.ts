import { NgScrollbarModule } from 'ngx-scrollbar';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { DynamicTableModule } from '../../../../components/dynamic-table/dynamic-table.module';
import { LogoIconModule } from '../../../../components/logo-icon/logo-icon.module';
import { NoDataCommunicateModule } from '../../../../components/no-data-communicate/no-data-communicate.module';
import { PieChartModule } from '../../../../components/pie-chart/pie-chart.module';
import { StackedRowModule } from '../../../../components/stacked-row/stacked-row.module';
import { DatePipeModule } from '../../../../pipes/date/date.pipe.module';
import { FormatValuePipeModule } from '../../../../pipes/format-value/format-value.pipe.module';
import { AccountingService } from '../../../../services/accounting/accounting.service';
import { ApiService } from '../../../../services/api/api.service';
import { InventoryPerformanceTableModule } from './inventory-performance-table/inventory-performance-table.module';
import { InventoryComponent } from './inventory.component';

@NgModule({
    declarations: [InventoryComponent],
    imports: [
        CommonModule,
        MatCardModule,
        MatExpansionModule,
        MatProgressSpinnerModule,
        DatePipeModule,
        FormatValuePipeModule,
        DynamicTableModule,
        MatTooltipModule,
        PieChartModule,
        StackedRowModule,
        MatToolbarModule,
        MatTabsModule,
        MatButtonModule,
        MatIconModule,
        MatSlideToggleModule,
        NgScrollbarModule,
        LogoIconModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        NoDataCommunicateModule,
        ReactiveFormsModule,
        InventoryPerformanceTableModule,
    ],
    providers: [ApiService, AccountingService],
    exports: [InventoryComponent],
})
export class InventoryModule {}
