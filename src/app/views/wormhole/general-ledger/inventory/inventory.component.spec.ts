import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { AccountingService } from '../../../../services/accounting/accounting.service';
import { ApiService } from '../../../../services/api/api.service';
import { DataQualityCheckService } from '../../../../services/dataQualityCheck/dataQualityCheck.service';
import { GeneralLedgerService } from '../general-ledger.service';
import { InventoryComponent } from './inventory.component';

describe('InventoryComponent', () => {
    let component: InventoryComponent;
    let fixture: ComponentFixture<InventoryComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [InventoryComponent],
            imports: [
                CommonModule,
                HttpClientTestingModule,
                RouterTestingModule,
            ],
            providers: [
                ApiService,
                AccountingService,
                GeneralLedgerService,
                DataQualityCheckService,
                FormBuilder,
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(InventoryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
