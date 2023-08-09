import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AccountingService } from '../../../../services/accounting/accounting.service';
import { ApiService } from '../../../../services/api/api.service';
import { ConfigurationService } from '../../../../services/configuration/configuration.service';
import { SubLedgersService } from '../../../../services/sub-ledgers/sub-ledgers.service';
import { SubLedgersMessagesComponent } from './sub-ledgers-messages.component';

describe('SubLedgersMessagesComponent', async () => {
    let fixture: ComponentFixture<SubLedgersMessagesComponent>;
    let component: SubLedgersMessagesComponent;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule, RouterTestingModule],
                declarations: [SubLedgersMessagesComponent],
                providers: [
                    SubLedgersMessagesComponent,
                    SubLedgersService,
                    ApiService,
                    ConfigurationService,
                    AccountingService,
                ],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(SubLedgersMessagesComponent);
        component = fixture.debugElement.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
});
