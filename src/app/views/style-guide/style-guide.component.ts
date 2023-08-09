import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { StyleGuideDialogComponent } from './style-guide-dialog.component';

@Component({
    selector: 'app-style-guide',
    templateUrl: './style-guide.component.html',
    styleUrls: ['./style-guide.component.scss'],
})
export class StyleGuideComponent implements OnInit {
    basicTableSource = [
        {
            id: 1,
            data1: 'Example Data 1',
            data2: 'Example Data 2',
        },
        {
            id: 2,
            data1: 'Example Data 3',
            data2: 'Example Data 4',
        },
        {
            id: 3,
            data1: 'Example Data 5',
            data2: 'Example Data 6',
        },
    ];

    basicTableColumns = [
        {
            columnDef: 'id',
            header: 'Id',
            columnType: '',
            cell: (data) => `${data.id}`,
        },
        {
            columnDef: 'example1',
            header: 'Column 1',
            columnType: '',
            cell: (data) => `${data.data1}`,
        },
        {
            columnDef: 'example2',
            header: 'Column 2',
            columnType: '',
            cell: (data) => `${data.data2}`,
        },
    ];
    public formGroup: FormGroup;

    autocompleteOptions: string[] = ['One', 'Two', 'Three'];
    filteredAutocompleteOptions: Observable<string[]>;

    isSearchInputOpen = false;
    searchQuery = '';

    constructor(private fb: FormBuilder, private dialog: MatDialog) {
        this.formGroup = this.fb.group({
            example1: ['', Validators.required],
            autocomplete: '',
            withClearButton: '',
            withClearButtonWithText: 'Example text',
            searchInput: '',
        });
        this.formGroup.markAllAsTouched();
    }

    ngOnInit() {
        this.filteredAutocompleteOptions = this.formGroup.controls[
            'autocomplete'
        ].valueChanges.pipe(
            startWith(''),
            map((value) => this._filter(value)),
        );
    }
    navigate(elem: HTMLElement) {
        elem.scrollIntoView({ behavior: 'smooth' });
    }
    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.autocompleteOptions.filter((option) =>
            option.toLowerCase().includes(filterValue),
        );
    }

    openDialog() {
        this.dialog.open(StyleGuideDialogComponent);
    }

    onSearchButtonClick() {
        this.isSearchInputOpen = true;
    }

    onCloseSearchClick() {
        this.formGroup.controls.searchInput.setValue('');
        this.isSearchInputOpen = false;
        this.searchQuery = this.formGroup.controls.searchInput.value;
    }

    onSearch() {
        this.searchQuery = this.formGroup.controls.searchInput.value;
    }

    handleKeyUp(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            this.onSearch();
        } else if (event.key === 'Escape') {
            this.onCloseSearchClick();
        }
    }
}
