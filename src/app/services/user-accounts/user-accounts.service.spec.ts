import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { ApiService } from '../api/api.service';
import { ConfigurationService } from '../configuration/configuration.service';
import { ConfigurationServiceMock } from '../configuration/configuration.service.mock';
import { UserAccountsService } from './user-accounts.service';

describe('UserAccountsService', () => {
    let service: UserAccountsService;
    let httpMock: HttpTestingController;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule],
                providers: [
                    UserAccountsService,
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

        service = TestBed.get(UserAccountsService);
        httpMock = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call POST on GetOrCreateUserAccount to get or create account', () => {
        const publicAddress = '0xb1';
        const nonceData = {
            id: 1,
            nonce: 'nonce',
            publicAddress: '0xb1',
        };

        service
            .getUserNonce(publicAddress)
            .subscribe((result) => expect(result).toEqual(nonceData));

        httpMock
            .expectOne((req) =>
                req.url.endsWith(
                    `UserAccounts/GetOrCreateUserAccount/Ethereum?publicAddress=${publicAddress}`,
                ),
            )
            .flush(nonceData);
    });

    it('should call POST on Authenticate to get access token', () => {
        const publicAddress = '0xb1';
        const signature = 'signature';
        const accessTokenData = {
            accessToken: 'accessToken',
            refreshToken: 'refreshToken',
        };

        service
            .getAccessToken(publicAddress, signature)
            .subscribe((result) => expect(result).toEqual(accessTokenData));

        httpMock
            .expectOne((req) =>
                req.url.endsWith('UserAccounts/Authenticate/Ethereum'),
            )
            .flush(accessTokenData);
    });

    it('should call POST on Refresh to refresh access token', () => {
        const accessToken = 'accessToken';
        const refreshToken = 'refreshToken';

        const newAccessTokenData = {
            accessToken: 'newAccessToken',
            refreshToken: 'newRefreshToken',
        };

        service
            .refreshToken(accessToken, refreshToken)
            .subscribe((result) => expect(result).toEqual(newAccessTokenData));

        httpMock
            .expectOne((req) => req.url.endsWith('UserAccounts/RefreshToken'))
            .flush(newAccessTokenData);
    });
});
