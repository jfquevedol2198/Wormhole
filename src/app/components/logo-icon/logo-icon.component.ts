import makeBlockie from 'ethereum-blockies-base64';

import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-logo-icon',
    templateUrl: './logo-icon.component.html',
    styleUrls: ['./logo-icon.component.scss'],
})
export class LogoIconComponent implements OnInit {
    @Input() logo: string;
    @Input() name: string;
    @Input() size = 'small';

    iconSrc: string;

    ngOnInit() {
        this.iconSrc = this.logo || makeBlockie(this.name || 'none');
    }
}
