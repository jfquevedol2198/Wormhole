import { NgxTippyService } from 'ngx-tippy-wrapper';

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { AccountingService } from '../../../services/accounting/accounting.service';

@Component({
    selector: 'app-dynamic-table-tooltip',
    templateUrl: './dynamic-table-tooltip.component.html',
    styleUrls: ['dynamic-table-tooltip.component.scss'],
})
export class DynamicTableTooltipComponent implements OnInit {
    @Input() title: string;
    @Input() label: string;
    @Input() address: string;
    @Output() refresh = new EventEmitter();

    isEdit = false;
    originalValue = '';

    constructor(
        private accountingService: AccountingService,
        private tippyService: NgxTippyService,
    ) {}

    ngOnInit(): void {
        this.originalValue = this.label;
    }

    save() {
        this.accountingService
            .modifyAddressLabel(this.address, this.label)
            .subscribe(() => this.refresh.emit());
        this.isEdit = true;
        this.tippyService.hideAll();
    }

    toggleEdit() {
        this.isEdit = !this.isEdit;
    }

    cancel(): void {
        this.label = this.originalValue;
        this.isEdit = false;
    }

    handleKeyUp($event: KeyboardEvent) {
        if ($event.key === 'Enter') {
            this.save();
        } else if ($event.key === 'Escape') {
            this.cancel();
        }
    }

    closeTooltip() {
        this.tippyService.hideAll();
    }
}
