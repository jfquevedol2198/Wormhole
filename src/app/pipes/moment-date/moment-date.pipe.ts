import * as moment from 'moment';
import { dateAndTimeFormat } from 'src/app/utilities/date-time';

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'momentDate',
})
export class MomentDatePipe implements PipeTransform {
    transform(date: Date | string): string | Date {
        if (!date) {
            return '';
        }
        return moment.utc(date).format(dateAndTimeFormat);
    }
}
