import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-progress-tooltip',
    templateUrl: './progress-tooltip.component.html',
})
export class ProgressTooltipComponent {
    @Input() progressPercentage;
    @Input() periodEndDate;
}
