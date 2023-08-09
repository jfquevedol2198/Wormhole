import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-processing-jobs-filters',
    templateUrl: './processing-jobs-filters.component.html',
    styleUrls: ['./processing-jobs-filters.component.scss'],
})
export class ProcessingJobsFiltersComponent {
    @Input()
    public filtersForm: FormGroup;
    @Output() filterJobs: EventEmitter<any> = new EventEmitter<any>();
    taskStatesOptions = [
        'None',
        'Completed',
        'Scheduled',
        'Running',
        'Failed',
        'Aborted',
        'Terminated',
    ];

    instanceNamesOptions = ['None', 'Blackhole', 'Redhole', 'Greenhole'];
    selectByOptions = ['Block'];
    enabledOptions = ['Active', 'Disabled'];

    reset() {
        this.filtersForm.reset();
        this.filterJobs.emit(this.filtersForm.value);
    }

    filter() {
        this.filterJobs.emit(this.filtersForm.value);
    }
    areFiltersSelected() {
        return (
            !!this.filtersForm.get('taskStates').value ||
            !!this.filtersForm.get('instanceName').value ||
            !!this.filtersForm.get('enabled').value ||
            !!this.filtersForm.get('sessionId').value ||
            !!this.filtersForm.get('workerTaskIds').value
        );
    }
}
