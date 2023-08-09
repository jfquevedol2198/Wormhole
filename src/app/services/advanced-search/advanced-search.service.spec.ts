import { IPreset } from 'src/app/interfaces/advancedSearch.interface';

import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { ApiService } from '../api/api.service';
import { ConfigurationService } from '../configuration/configuration.service';
import { ConfigurationServiceMock } from '../configuration/configuration.service.mock';
import { AdvancedSearchService } from './advanced-search.service';

const REPORT_PRESETS_PERSISTENT_DATA = require('../../../mocks/reportPresetsPersistent.json');
const REPORT_PRESETS_TRANSIENT_DATA = require('../../../mocks/reportPresetsTransient.json');
const PLATFORM_DATA = require('../../../mocks/platform.json');

describe('AdvancedSearchService', () => {
    let service: AdvancedSearchService;
    let httpMock: HttpTestingController;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule],
                providers: [
                    AdvancedSearchService,
                    ApiService,
                    {
                        provide: ConfigurationService,
                        useClass: ConfigurationServiceMock,
                    },
                ],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        TestBed.configureTestingModule({});

        service = TestBed.get(AdvancedSearchService);
        httpMock = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call GET on GetReportPreset with Persistent value to get list of persistent presets', () => {
        service
            .getReportPresets()
            .subscribe((result) =>
                expect(result).toEqual(REPORT_PRESETS_PERSISTENT_DATA.records),
            );

        httpMock
            .expectOne((req) =>
                req.url.endsWith(
                    `GetReportPreset?Persistence=Persistent&Scope=User`,
                ),
            )

            .flush(REPORT_PRESETS_PERSISTENT_DATA);
    });
    it('should call GET on GetReportPreset with Transient value to get list of transient presets', () => {
        service
            .getReportPresets('Transient')
            .subscribe((result) =>
                expect(result).toEqual(REPORT_PRESETS_TRANSIENT_DATA.records),
            );
        httpMock
            .expectOne((req) =>
                req.url.endsWith(
                    `GetReportPreset?Persistence=Transient&Scope=User`,
                ),
            )
            .flush(REPORT_PRESETS_TRANSIENT_DATA);
    });

    it('should call POST on AddReportPreset to add new report preset', () => {
        const obj = {
            presetName: 'test1',
        };
        const transience = 'Transient';

        service
            .addReportPreset(obj, transience)
            .subscribe((result) =>
                expect(result).toEqual({ id: 1, message: 'string' }),
            );

        const request = httpMock.expectOne((req) =>
            req.url.endsWith(`/AddReportPreset`),
        );

        expect(request.request.method).toEqual('POST');
        request.flush({ id: 1, message: 'string' });
    });

    it('should call PUT on ModifyReportPreset to modify preset', () => {
        const preset: IPreset = {
            createdDate: 'string',
            name: 'string',
            persistence: 'Transient',
            reportPresetId: 1,
            scope: 'User',
            userAccountId: 1,
            definition: {
                startBlock: 0,
            },
        };
        service
            .modifyReportPreset(preset)
            .subscribe((result) => expect(result).toEqual(''));

        const request = httpMock.expectOne((req) =>
            req.url.endsWith(`/ModifyReportPreset`),
        );

        expect(request.request.method).toEqual('PUT');

        request.flush('');
    });

    it('should call DELETE on RemovePortfolio to remove preset', () => {
        const reportPresetId = 1;

        service
            .removeReportPreset(reportPresetId)
            .subscribe((result) => expect(result).toEqual(''));

        const request = httpMock.expectOne((req) =>
            req.url.endsWith(`/RemoveReportPreset`),
        );

        expect(request.request.method).toEqual('DELETE');

        request.flush('');
    });
    it('should call GET on GetPlatforms to get list of all platforms', () => {
        service
            .getPlatforms()
            .subscribe((result) =>
                expect(result).toEqual(PLATFORM_DATA.records),
            );
        httpMock
            .expectOne((req) => req.url.endsWith(`GetPlatforms`))
            .flush(PLATFORM_DATA);
    });
});
