import { NgxTippyService } from 'ngx-tippy-wrapper';

import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-notification-message-tooltip',
    templateUrl: './notification-message-tooltip.component.html',
    styleUrls: ['notification-message-tooltip.component.scss'],
})
export class NotificationMessageTooltipComponent {
    @Input() title: string;
    @Input() message: string;

    constructor(private tippyService: NgxTippyService) {}

    closeTooltip() {
        this.tippyService.hideAll();
    }
}
