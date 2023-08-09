import { TestBed, waitForAsync } from '@angular/core/testing';
import { ConfigurationService } from 'src/app/services/configuration/configuration.service';
import { ConfigurationServiceMock } from 'src/app/services/configuration/configuration.service.mock';

import { AccountingService } from '../../../services/accounting/accounting.service';
import { ApiService } from '../../../services/api/api.service';
import { ApiServiceMock } from '../../../services/api/api.service.mock';

import { GeneralLedgerService } from './general-ledger.service';
import { RouterTestingModule } from '@angular/router/testing';
import { DataQualityCheckService } from '../../../services/dataQualityCheck/dataQualityCheck.service';

describe('GeneralLedgerService', () => {
    let service: GeneralLedgerService;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                providers: [
                    AccountingService,
                    {
                        provide: ApiService,
                        useClass: ApiServiceMock,
                    },
                    {
                        provide: ConfigurationService,
                        useClass: ConfigurationServiceMock,
                    },
                    DataQualityCheckService,
                    GeneralLedgerService,
                ],
                imports: [RouterTestingModule],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        TestBed.configureTestingModule({});

        service = TestBed.get(GeneralLedgerService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
