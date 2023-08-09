import { Component, Input } from '@angular/core';

type Size = 'small' | '';
type Type = 'info' | 'warning' | 'error' | 'success' | 'process';

@Component({
    selector: 'app-chip',
    templateUrl: './chip.component.html',
    styleUrls: ['./chip.component.scss'],
})
export class ChipComponent {
    @Input() type: Type;
    @Input() size: Size = '';
    @Input() text: string;
    @Input() tooltipText: string;
}
