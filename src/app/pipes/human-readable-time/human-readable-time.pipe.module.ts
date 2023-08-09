import { NgModule } from '@angular/core';

import { HumanReadableTimePipe } from './human-readable-time.pipe';

@NgModule({
    declarations: [HumanReadableTimePipe],
    exports: [HumanReadableTimePipe],
})
export class HumanReadableTimePipeModule {}
