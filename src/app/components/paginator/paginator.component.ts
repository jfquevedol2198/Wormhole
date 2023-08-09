import {
    Component,
    Input,
    OnInit,
    Output,
    TemplateRef,
    EventEmitter,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'app-paginator',
    templateUrl: './paginator.component.html',
    styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit {
    @Input() pageIndex;
    @Input() pageSize;
    @Input() pageSizeOptions;
    @Input() length;
    @Output() readonly page = new EventEmitter<PageEvent>();

    formGroup: FormGroup;

    constructor(private dialog: MatDialog, private fb: FormBuilder) {
        this.formGroup = this.fb.group({
            page: ['', Validators.required],
        });
    }

    ngOnInit(): void {
        this.formGroup.controls.page.setValue(+this.pageIndex + 1);
    }

    openPageIndexInput(templateRef: TemplateRef<any>) {
        this.dialog.open(templateRef);
    }

    save() {
        const maxPages = +Math.ceil(this.length / this.pageSize);
        const inputValue = this.formGroup.controls.page.value;

        if (+inputValue > maxPages) {
            this.formGroup.controls.page.setErrors({ incorrect: true });
        } else {
            this.formGroup.controls.page.reset(inputValue);
        }

        this.formGroup.controls.page.markAsTouched();

        if (this.formGroup.valid) {
            this.pageIndex = +inputValue - 1;
            this.emitPageEvent(this.pageIndex, this.pageSize);
            this.dialog.closeAll();
        }
    }

    cancel() {
        this.dialog.closeAll();
    }

    handleKeyUp($event: KeyboardEvent) {
        if ($event.key === 'Enter') {
            this.save();
        } else if ($event.key === 'Escape') {
            this.cancel();
        }
    }

    emitPageEvent(pageIndex: number, pageSize: number) {
        this.page.emit({
            pageIndex,
            pageSize,
            length: this.length,
        });
    }
}
