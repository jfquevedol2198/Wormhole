import { NgxTippyService } from 'ngx-tippy-wrapper';

import { Component, Input, OnInit } from '@angular/core';

import { IColumn } from '../../../interfaces/column.interface';
import { IOperationAudit } from '../../../interfaces/operationAudit.interface';
import { AuditService } from '../../../services/audit/audit.service';
import { changeTableColumns } from './change-table-columns';

@Component({
    selector: 'app-edited-transaction-tooltip',
    templateUrl: './edited-transaction-tooltip.component.html',
    styleUrls: ['edited-transaction-tooltip.component.scss'],
})
export class EditedTransactionTooltipComponent implements OnInit {
    @Input() title: string;
    @Input() transactionId: number;

    data: IOperationAudit[] = [];
    paginatedData: IOperationAudit[] = [];
    columns: IColumn[] = changeTableColumns;
    displayedColumns: string[] = [];

    length = 0;
    pageIndex = 0;
    pageSize = 5;

    isLoading = true;

    constructor(
        private auditService: AuditService,
        private tippyService: NgxTippyService,
    ) {}

    ngOnInit(): void {
        this.displayedColumns = this.columns.map((column) => column.columnDef);

        this.auditService
            .getOperationAudits(this.transactionId)
            .subscribe((operationAudits) => {
                this.data = operationAudits;
                this.paginatedData = this.data.slice(
                    this.pageIndex * this.pageSize,
                    (this.pageIndex + 1) * this.pageSize,
                );
                this.isLoading = false;
                this.length = operationAudits.length;
            });
    }

    closeTooltip() {
        this.tippyService.hideAll();
    }

    page(pageIndex: number, pageSize: number) {
        this.pageIndex = pageIndex;
        this.pageSize = pageSize;
        this.paginatedData = this.data.slice(
            this.pageIndex * this.pageSize,
            (this.pageIndex + 1) * this.pageSize,
        );
    }
}
