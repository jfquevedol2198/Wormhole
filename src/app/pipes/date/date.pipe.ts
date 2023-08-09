import { Pipe, PipeTransform } from '@angular/core';

import { formatDate, timeToString } from '../../utilities/date-time';

@Pipe({
    name: 'date',
})
export class DatePipe implements PipeTransform {
    transform(date: Date, includeTime = false): any {
        return date
            ? `${formatDate(date)}${
                  includeTime ? ` ${timeToString(date)}` : ''
              }`
            : undefined;
    }
}
