import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-sort-arrow-component',
    templateUrl: './sort-arrow.component.html',
    styleUrls: ['./sort-arrow.component.scss'],
})
export class SortArrowComponent {
    @Input() isColumnSelected: boolean;
    @Input() isSortAsc: boolean;
}
