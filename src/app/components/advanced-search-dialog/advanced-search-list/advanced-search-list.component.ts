import { AdvancedSearchService } from 'src/app/services/advanced-search/advanced-search.service';

import { Component, EventEmitter, Input, Output } from '@angular/core';

import { IPreset } from '../../../interfaces/advancedSearch.interface';

@Component({
    selector: 'app-advanced-search-list',
    templateUrl: './advanced-search-list.component.html',
    styleUrls: ['./advanced-search-list.component.scss'],
})
export class AdvancedSearchListComponent {
    @Output() updatedPreset = new EventEmitter<IPreset>();
    @Output() removedPreset = new EventEmitter<IPreset>();
    @Input() title: string;
    @Input() presetsList;

    constructor(public advancedSearchService: AdvancedSearchService) {}

    delete(preset: IPreset) {
        this.removedPreset.emit(preset);
    }
    update(preset: IPreset) {
        this.updatedPreset.emit(preset);
    }
}
