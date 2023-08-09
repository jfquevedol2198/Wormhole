import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { InventoryFullscreenComponent } from './inventory-fullscreen.component';
import { AccountingService } from '../../../../services/accounting/accounting.service';
import { ApiService } from '../../../../services/api/api.service';
import { ConfigurationService } from '../../../../services/configuration/configuration.service';
import { GeneralLedgerService } from '../../general-ledger/general-ledger.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DataQualityCheckService } from '../../../../services/dataQualityCheck/dataQualityCheck.service';

describe('InventoryFullscreenComponent', async () => {
    let fixture: ComponentFixture<InventoryFullscreenComponent>;
    let component: InventoryFullscreenComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
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
            declarations: [InventoryFullscreenComponent],
            providers: [
                AccountingService,
                ApiService,
                ConfigurationService,
                DataQualityCheckService,
                GeneralLedgerService,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InventoryFullscreenComponent);
        component = fixture.debugElement.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
});
