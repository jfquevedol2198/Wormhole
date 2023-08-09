import { MomentDatePipeModule } from 'src/app/pipes/moment-date/moment-date.module';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';

import { CalendarDialogComponent } from './calendar-dialog.component';

@NgModule({
    declarations: [CalendarDialogComponent],
    imports: [
        CommonModule,
        MatDialogModule,
        MatTableModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        MomentDatePipeModule,
    ],
    providers: [],
    exports: [CalendarDialogComponent],
})
export class CalendarDialogModule {}
