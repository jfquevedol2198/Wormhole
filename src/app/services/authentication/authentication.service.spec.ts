import { TestBed, waitForAsync } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
    let service: AuthenticationService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            providers: [AuthenticationService],
        }).compileComponents();
    }));

    beforeEach(() => {
        TestBed.configureTestingModule({});

        service = TestBed.get(AuthenticationService);
    });
});
