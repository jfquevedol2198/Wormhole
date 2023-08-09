import {
    Component,
    EventEmitter,
    Output,
    ViewEncapsulation,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
    selector: 'app-paginator-extend',
    templateUrl: './paginator-extend.component.html',
    styleUrls: ['./paginator-extend.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class PaginatorExtendComponent extends MatPaginator {
    @Output() openIndexPageInput = new EventEmitter();

    openSelect() {
        this.openIndexPageInput.emit();
    }

    emitPageEvent() {
        this.page.emit({
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
            length: this.length,
        });
    }
}
