import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { AccountingService } from './services/accounting/accounting.service';
import { ApiService } from './services/api/api.service';
import { ConfigurationService } from './services/configuration/configuration.service';
import { ConfigurationServiceMock } from './services/configuration/configuration.service.mock';
import { DataQualityCheckService } from './services/dataQualityCheck/dataQualityCheck.service';
import { ThemeService } from './services/theme/theme.service';

describe('AppComponent', async () => {
    let fixture: ComponentFixture<AppComponent>;
    let component: AppComponent;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [
                    RouterTestingModule.withRoutes([]),
                    BrowserAnimationsModule,
                    HttpClientTestingModule,
                ],
                declarations: [AppComponent],
                providers: [
                    {
                        provide: ConfigurationService,
                        useClass: ConfigurationServiceMock,
                    },
                    AccountingService,
                    ApiService,
                    ThemeService,
                    DataQualityCheckService,
                ],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.debugElement.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
});
