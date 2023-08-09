import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-no-data-communicate',
    templateUrl: './no-data-communicate.component.html',
    styleUrls: ['./no-data-communicate.component.scss'],
})
export class NoDataCommunicateComponent {
    @Input() data: string;
}
