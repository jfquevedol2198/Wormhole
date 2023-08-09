import { Moment } from 'moment';

import { Component, EventEmitter, Input, Output } from '@angular/core';

import { IAccountDataSummary } from 'src/app/interfaces/accountDataSummary.interface';

@Component({
    selector: 'app-profit-and-loss-progress',
    templateUrl: './profit-and-loss-progress.component.html',
    styleUrls: ['profit-and-loss-progress.component.scss'],
})
export class ProfitAndLossProgressComponent {
    @Input() pnlDefinitionStartDate: Moment;
    @Input() pnlDefinitionEndDate: Moment;
    @Input() progressData: IAccountDataSummary[];
    @Input() index: number;
    @Input() activeIndex: number;
    @Output() onClick: EventEmitter<number> = new EventEmitter<number>();

    onSelect(index: number) {
        this.activeIndex = index;
        this.onClick.emit(index);
    }
}
