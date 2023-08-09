import { NgxTippyModule } from 'ngx-tippy-wrapper';
import { DynamicTableModule } from 'src/app/components/dynamic-table/dynamic-table.module';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';

import { ChipModule } from '../../../components/chip/chip.module';
import { NotificationMessageTooltipModule } from '../../../components/interactive-tooltip/notification-message-tooltip/notification-message-tooltip.module';
import { NoDataCommunicateModule } from '../../../components/no-data-communicate/no-data-communicate.module';
import { PaginatorModule } from '../../../components/paginator/paginator.module';
import { TableHeaderModule } from '../../../components/table-header/table-header.module';
import { NotificationsFiltersModule } from './notifications-filters/notifications-filters.module';
import { WormholeNotificationsComponent } from './wormhole-notifications.component';

@NgModule({
    declarations: [WormholeNotificationsComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: WormholeNotificationsComponent,
            },
        ]),
        MatIconModule,
        MatProgressSpinnerModule,
        DynamicTableModule,
        NotificationsFiltersModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatTooltipModule,
        MatTableModule,
        ChipModule,
        MatMenuModule,
        MatCheckboxModule,
        PaginatorModule,
        MatSlideToggleModule,
        MatFormFieldModule,
        NoDataCommunicateModule,
        TableHeaderModule,
        NotificationMessageTooltipModule,
        NgxTippyModule,
    ],
    exports: [WormholeNotificationsComponent],
})
export class WormholeNotificationsModule {}
