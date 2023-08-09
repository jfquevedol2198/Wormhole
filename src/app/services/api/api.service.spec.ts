import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { ConfigurationService } from '../configuration/configuration.service';
import { ConfigurationServiceMock } from '../configuration/configuration.service.mock';

import { ApiService } from './api.service';

describe('ApiService', () => {
    let service: ApiService;
    let httpMock: HttpTestingController;
    let configuration: ConfigurationService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
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

        service = TestBed.get(ApiService);
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
