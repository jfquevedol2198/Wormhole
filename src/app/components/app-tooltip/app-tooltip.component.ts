import { NgxTippyProps } from 'ngx-tippy-wrapper';

import { Component } from '@angular/core';

export const TOOLTIP_DEFAULT_PROPS: NgxTippyProps = {
    interactive: true,
    allowHTML: true,
    maxWidth: 'none',
    delay: 500,
    appendTo: () => document.body,
    trigger: 'mouseenter focus', // change to 'click' for debugging
};

@Component({
    selector: 'app-tooltip',
    templateUrl: './app-tooltip.component.html',
    styleUrls: ['./app-tooltip.component.scss'],
})
export class AppTooltipComponent {}
