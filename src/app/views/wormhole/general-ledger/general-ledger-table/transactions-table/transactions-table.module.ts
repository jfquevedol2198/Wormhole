import { NgxTippyModule } from 'ngx-tippy-wrapper';

import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

import { DynamicTableModule } from '../../../../../components/dynamic-table/dynamic-table.module';
import { DynamicTableTooltipModule } from '../../../../../components/interactive-tooltip/dynamic-table-tooltip/dynamic-table-tooltip.module';
import { EditedTransactionTooltipModule } from '../../../../../components/interactive-tooltip/edited-transaction-tooltip/edited-transaction-tooltip.module';
import { LogoIconModule } from '../../../../../components/logo-icon/logo-icon.module';
import { NoDataCommunicateModule } from '../../../../../components/no-data-communicate/no-data-communicate.module';
import { PaginatorModule } from '../../../../../components/paginator/paginator.module';
import { TableHeaderModule } from '../../../../../components/table-header/table-header.module';
import { OperationsTableModule } from './operations-table/operations-table.module';
import { TransactionsTableComponent } from './transactions-table.component';

@NgModule({
    declarations: [TransactionsTableComponent],
    imports: [
        DynamicTableModule,
        CommonModule,
        MatProgressSpinnerModule,
        NoDataCommunicateModule,
        MatTableModule,
        MatSortModule,
        MatIconModule,
        MatTooltipModule,
        LogoIconModule,
        ClipboardModule,
        DynamicTableTooltipModule,
        NgxTippyModule,
        OperationsTableModule,
        MatSlideToggleModule,
        PaginatorModule,
        TableHeaderModule,
        EditedTransactionTooltipModule,
    ],
    exports: [TransactionsTableComponent],
})
export class TransactionsTableModule {}
