import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

import { AccountingService } from '../../../../../../services/accounting/accounting.service';
import { ApiService } from '../../../../../../services/api/api.service';
import { AuthenticationService } from '../../../../../../services/authentication/authentication.service';
import { ConfigurationService } from '../../../../../../services/configuration/configuration.service';
import { UserAccountsService } from '../../../../../../services/user-accounts/user-accounts.service';
import { OperationsTableComponent } from './operations-table.component';

describe('OperationsTableComponent', async () => {
    let fixture: ComponentFixture<OperationsTableComponent>;
    let component: OperationsTableComponent;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [
                    HttpClientTestingModule,
                    RouterTestingModule,
                    MatDialogModule,
                ],
                declarations: [OperationsTableComponent],
                providers: [
                    AccountingService,
                    ApiService,
                    ConfigurationService,
                    AuthenticationService,
                    UserAccountsService,
                ],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(OperationsTableComponent);
        component = fixture.debugElement.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
});
