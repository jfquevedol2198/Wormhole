import moment, { Moment } from 'moment';

import { Component, Input } from '@angular/core';

import { IAccountDataSummary } from 'src/app/interfaces/accountDataSummary.interface';

@Component({
    selector: 'app-profit-and-loss-progress-category',
    templateUrl: './profit-and-loss-progress-category.component.html',
    styleUrls: ['profit-and-loss-progress-category.component.scss'],
})
export class ProfitAndLossProgressCategoryComponent {
    @Input() categoryData: IAccountDataSummary;
    @Input() isFirst: boolean;
    @Input() isLast: boolean;
    @Input() startDate: Moment;
    @Input() endDate: Moment;

    getIconColor(timestamp: string) {
        if (moment(timestamp).isAfter(moment(this.endDate))) {
            return 'app-success';
        } else if (moment(timestamp).isBetween(this.startDate, this.endDate)) {
            return 'app-error';
        } else {
            return 'app-pending';
        }
    }

    getIcon(timestamp: string) {
        if (moment(timestamp).isAfter(moment(this.endDate))) {
            return 'check_circle_outlined';
        } else if (moment(timestamp).isBetween(this.startDate, this.endDate)) {
            return 'cancel';
        } else {
            return 'radio_button_unchecked_outlined';
        }
    }
}
