import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationService } from '../../services/configuration/configuration.service';
import { ConfigurationServiceMock } from '../../services/configuration/configuration.service.mock';

import { VersionInfoComponent } from './version-info.component';

describe('VersionInfoComponent', () => {
    let component: VersionInfoComponent;
    let fixture: ComponentFixture<VersionInfoComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [VersionInfoComponent],
            providers: [
                {
                    provide: ConfigurationService,
                    useClass: ConfigurationServiceMock,
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(VersionInfoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
