import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { ApiService } from '../api/api.service';
import { ConfigurationService } from '../configuration/configuration.service';
import { ConfigurationServiceMock } from '../configuration/configuration.service.mock';

import { WorkersService } from './workers.service';

describe('WorkersService', () => {
    let service: WorkersService;
    let httpMock: HttpTestingController;
    let configuration: ConfigurationService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                WorkersService,
                ApiService,
                {
                    provide: ConfigurationService,
                    useClass: ConfigurationServiceMock,
                },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        TestBed.configureTestingModule({});

        service = TestBed.get(WorkersService);
        configuration = TestBed.get(ConfigurationService);
        httpMock = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
