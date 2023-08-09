import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

import { DatePipeModule } from '../../../pipes/date/date.pipe.module';

import { AccountingService } from '../../../services/accounting/accounting.service';
import { ApiService } from '../../../services/api/api.service';
import { ConfigurationService } from '../../../services/configuration/configuration.service';
import { DataQualityCheckService } from '../../../services/dataQualityCheck/dataQualityCheck.service';

import { GeneralLedgerService } from './general-ledger.service';

import { GeneralLedgerToolbarModule } from './general-ledger-toolbar/general-ledger-toolbar.module';

import { GeneralLedgerView0Component } from './general-ledger-view0.component';

describe('GeneralLedgerComponent', async () => {
    let fixture: ComponentFixture<GeneralLedgerView0Component>;
    let component: GeneralLedgerView0Component;

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
                    MatCardModule,
                    MatGridListModule,
                    DatePipeModule,
                    GeneralLedgerToolbarModule,
                ],
                declarations: [GeneralLedgerView0Component],
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
        fixture = TestBed.createComponent(GeneralLedgerView0Component);
        component = fixture.debugElement.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
});
