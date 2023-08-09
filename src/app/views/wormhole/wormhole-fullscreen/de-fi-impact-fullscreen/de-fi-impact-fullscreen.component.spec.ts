import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterTestingModule } from '@angular/router/testing';

import {
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
} from '@angular-material-components/datetime-picker';

import { AccountingService } from '../../../../services/accounting/accounting.service';
import { ApiService } from '../../../../services/api/api.service';
import { ConfigurationService } from '../../../../services/configuration/configuration.service';
import { DataQualityCheckService } from '../../../../services/dataQualityCheck/dataQualityCheck.service';
import { DeFiImpactTableModule } from '../../general-ledger/general-ledger-table/de-fi-impact-table/de-fi-impact-table.module';
import { DeFiImpactFullscreenComponent } from './de-fi-impact-fullscreen.component';

describe('DeFiImpactFullscreen', async () => {
    let fixture: ComponentFixture<DeFiImpactFullscreenComponent>;
    let component: DeFiImpactFullscreenComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                DeFiImpactTableModule,
                RouterTestingModule,
                ReactiveFormsModule,
                MatFormFieldModule,
                MatInputModule,
                NgxMatDatetimePickerModule,
                NgxMatNativeDateModule,
            ],
            declarations: [DeFiImpactFullscreenComponent],
            providers: [
                AccountingService,
                ApiService,
                ConfigurationService,
                DataQualityCheckService,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DeFiImpactFullscreenComponent);
        component = fixture.debugElement.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
});
