import { Pipe, PipeTransform } from '@angular/core';

import { humanReadableTime } from '../../utilities/date-time';

@Pipe({
    name: 'humanReadableTime',
})
export class HumanReadableTimePipe implements PipeTransform {
    transform(seconds: number): string {
        return seconds ? humanReadableTime(seconds) : 'infinity';
    }
}
