import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterTestingModule } from '@angular/router/testing';

import { AccountingService } from '../../services/accounting/accounting.service';
import { ApiService } from '../../services/api/api.service';
import { ConfigurationService } from '../../services/configuration/configuration.service';
import { DataQualityCheckService } from '../../services/dataQualityCheck/dataQualityCheck.service';
import { GeneralLedgerService } from '../../views/wormhole/general-ledger/general-ledger.service';
import { DateRangeInputsComponent } from './date-range-inputs.component';

describe('DateRangeInputsComponent', () => {
    let component: DateRangeInputsComponent;
    let fixture: ComponentFixture<DateRangeInputsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                CommonModule,
                FormsModule,
                ReactiveFormsModule,
                MatNativeDateModule,
                MatDatepickerModule,
                MatFormFieldModule,
                MatInputModule,
            ],
            declarations: [DateRangeInputsComponent],
            providers: [
                AccountingService,
                ApiService,
                ConfigurationService,
                DataQualityCheckService,
                GeneralLedgerService,
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DateRangeInputsComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
