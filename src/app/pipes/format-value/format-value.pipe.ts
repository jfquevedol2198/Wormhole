import { Pipe, PipeTransform } from '@angular/core';

import { formatValue } from '../../utilities/format-value';

@Pipe({
    name: 'formatValue',
})
export class FormatValuePipe implements PipeTransform {
    transform(value: number, symbol = ''): any {
        return value ? formatValue(value, symbol) : `${symbol}0.00`;
    }
}
