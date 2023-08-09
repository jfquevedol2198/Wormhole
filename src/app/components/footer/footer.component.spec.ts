import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationService } from '../../services/configuration/configuration.service';
import { ConfigurationServiceMock } from '../../services/configuration/configuration.service.mock';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
    let component: FooterComponent;
    let fixture: ComponentFixture<FooterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FooterComponent],
            providers: [
                {
                    provide: ConfigurationService,
                    useClass: ConfigurationServiceMock,
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FooterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
