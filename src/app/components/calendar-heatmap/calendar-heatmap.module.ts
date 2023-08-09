import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarHeatmapComponent } from './calendar-heatmap.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
    declarations: [CalendarHeatmapComponent],
    imports: [CommonModule, MatProgressSpinnerModule],
    exports: [CalendarHeatmapComponent],
})
export class CalendarHeatmapModule {}
