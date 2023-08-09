import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme.service';

describe('ThemeService', () => {
    let service: ThemeService;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            providers: [ThemeService],
        }).compileComponents();
    });

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.get(ThemeService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
