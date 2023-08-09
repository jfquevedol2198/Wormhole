import { AdvancedSearchService } from 'src/app/services/advanced-search/advanced-search.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterTestingModule } from '@angular/router/testing';

import { DatePipeModule } from '../../../../pipes/date/date.pipe.module';
import { AccountingService } from '../../../../services/accounting/accounting.service';
import { ApiService } from '../../../../services/api/api.service';
import { AuthenticationService } from '../../../../services/authentication/authentication.service';
import { ConfigurationService } from '../../../../services/configuration/configuration.service';
import { DataQualityCheckService } from '../../../../services/dataQualityCheck/dataQualityCheck.service';
import { UserAccountsService } from '../../../../services/user-accounts/user-accounts.service';
import { GeneralLedgerService } from '../general-ledger.service';
import { GeneralLedgerTableComponent } from './general-ledger-table.component';

describe('GeneralLedgerTable', async () => {
    let fixture: ComponentFixture<GeneralLedgerTableComponent>;
    let component: GeneralLedgerTableComponent;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [
                    HttpClientTestingModule,
                    MatButtonModule,
                    MatCardModule,
                    MatCheckboxModule,
                    MatIconModule,
                    MatTableModule,
                    MatMenuModule,
                    MatSortModule,
                    DatePipeModule,
                    RouterTestingModule,
                    MatDialogModule,
                ],
                declarations: [GeneralLedgerTableComponent],
                providers: [
                    AccountingService,
                    AdvancedSearchService,
                    ApiService,
                    ConfigurationService,
                    DataQualityCheckService,
                    GeneralLedgerService,
                    UserAccountsService,
                    AuthenticationService,
                    {
                        provide: MAT_DIALOG_DATA,
                        useValue: {
                            title: 'myTitle',
                        },
                    },
                ],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(GeneralLedgerTableComponent);
        component = fixture.debugElement.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
});
