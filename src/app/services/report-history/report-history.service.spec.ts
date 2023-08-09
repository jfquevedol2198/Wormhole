import {
    HttpTestingController,
    HttpClientTestingModule,
} from '@angular/common/http/testing';
import { waitForAsync, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { ApiService } from '../api/api.service';
import { ConfigurationService } from '../configuration/configuration.service';
import { ConfigurationServiceMock } from '../configuration/configuration.service.mock';
import { WorkersService } from '../workers/workers.service';
import { ReportHistoryService } from './report-history.service';

const REPORT_DEFINITIONS_DATA = require('../../../mocks/reportDefinitions.json');
const REPORTS = require('../../../mocks/reports.json');

describe('ReportHistory', () => {
    let service: ReportHistoryService;
    let httpMock: HttpTestingController;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule],
                providers: [
                    ReportHistoryService,
                    ApiService,
                    FormBuilder,
                    WorkersService,

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

        service = TestBed.get(ReportHistoryService);
        httpMock = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call GET on getReports to get list of all reports ', () => {
        const testObj = {
            name: 'test1',
            description: 'test2',
            schedule: 'Weekly',
        };
        const fb = new FormBuilder();
        const form = fb.group(testObj);

        service.getReportDefinitionWithForm(fb).subscribe((result) => {
            REPORT_DEFINITIONS_DATA.records.map((report) => {
                const reportResult = {
                    ...report,
                    isEdited: false,
                    formGroup: form,
                    isExpanded: false,
                    reportDefinitionItems: [],
                };

                const nameFromResult =
                    reportResult.formGroup.controls['name'].value;
                const descriptionFromResult =
                    reportResult.formGroup.controls['description'].value;
                const scheduleFromResult =
                    reportResult.formGroup.controls['schedule'].value;

                expect(nameFromResult).toEqual(testObj.name);
                expect(descriptionFromResult).toEqual(testObj.description);
                expect(scheduleFromResult).toEqual(testObj.schedule);
                return reportResult;
            });
        });

        httpMock
            .expectOne((req) => req.url.endsWith('/GetReportDefinitions'))
            .flush(REPORT_DEFINITIONS_DATA);
        httpMock
            .expectOne((req) =>
                req.url.endsWith('/GetReports?ReportDefinitionId=12'),
            )
            .flush(REPORTS);
    });

    it('should call POST on addReportDefinition to add new reportDefinition', () => {
        const reportForm = {
            reportPresetId: 3,
            name: 'test1',
            description: 'test2',
            schedule: 'Weekly',
        };

        service
            .addReportDefinition(reportForm)
            .subscribe((result) =>
                expect(result).toEqual({ id: 1, message: 'string' }),
            );

        const request = httpMock.expectOne((req) =>
            req.url.endsWith(`/AddReportDefinition`),
        );

        expect(request.request.method).toEqual('POST');
        request.flush({ id: 1, message: 'string' });
    });

    it('should call DELETE on removeReportDefintion to remove new reportDefinition', () => {
        const reportDefinitionId = 1;

        service
            .removeReportDefinition(reportDefinitionId)
            .subscribe((result) => expect(result).toEqual(''));

        const request = httpMock.expectOne((req) =>
            req.url.endsWith(`/RemoveReportDefinition`),
        );

        expect(request.request.method).toEqual('DELETE');
        request.flush('');
    });
});
