import { AccountingService } from 'src/app/services/accounting/accounting.service';
import { AdvancedSearchService } from 'src/app/services/advanced-search/advanced-search.service';
import { ApiService } from 'src/app/services/api/api.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';

import { AdvancedSearchDialogComponent } from './advanced-search-dialog.component';

describe('AdvancedSearchDialogComponent', () => {
    let component: AdvancedSearchDialogComponent;
    let fixture: ComponentFixture<AdvancedSearchDialogComponent>;

    const mockDialogRef = {
        open: jasmine.createSpy('open'),
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AdvancedSearchDialogComponent],
            providers: [
                { provide: MatDialogRef, useValue: mockDialogRef },
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: {
                        title: 'myTitle',
                    },
                },
                AdvancedSearchService,
                AccountingService,
                ApiService,
            ],
            imports: [
                MatButtonModule,
                MatIconModule,
                MatToolbarModule,
                MatInputModule,
                MatFormFieldModule,
                MatSelectModule,
                MatDialogModule,
                ReactiveFormsModule,
                FormsModule,
                MatSlideToggleModule,
                MatDividerModule,
                MatDialogModule,
                HttpClientTestingModule,
                RouterTestingModule,
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AdvancedSearchDialogComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
