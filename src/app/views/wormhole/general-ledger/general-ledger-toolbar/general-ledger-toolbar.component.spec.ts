import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatNativeDateModule } from '@angular/material/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AccountingService } from '../../../../services/accounting/accounting.service';
import { ApiService } from '../../../../services/api/api.service';
import { ConfigurationService } from '../../../../services/configuration/configuration.service';

import { GeneralLedgerService } from '../general-ledger.service';

import { GeneralLedgerToolbarComponent } from './general-ledger-toolbar.component';
import { GeneralLedgerView0Component } from '../general-ledger-view0.component';
import { DataQualityCheckService } from '../../../../services/dataQualityCheck/dataQualityCheck.service';

describe('GeneralLedgerToolbarComponent', async () => {
    let fixture: ComponentFixture<GeneralLedgerToolbarComponent>;
    let component: GeneralLedgerToolbarComponent;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [
                    HttpClientTestingModule,
                    RouterTestingModule.withRoutes([
                        {
                            path: 'wormhole/general-ledger/view/0',
                            component: GeneralLedgerView0Component,
                        },
                    ]),
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    MatNativeDateModule,
                    MatButtonModule,
                    MatDatepickerModule,
                    MatFormFieldModule,
                    MatInputModule,
                    MatToolbarModule,
                ],
                declarations: [GeneralLedgerToolbarComponent],
                providers: [
                    AccountingService,
                    ApiService,
                    ConfigurationService,
                    DataQualityCheckService,
                    GeneralLedgerService,
                ],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(GeneralLedgerToolbarComponent);
        component = fixture.debugElement.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
});
