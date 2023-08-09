import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { ApiService } from '../../services/api/api.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { ConfigurationService } from '../../services/configuration/configuration.service';
import { ConfigurationServiceMock } from '../../services/configuration/configuration.service.mock';
import { UserAccountsService } from '../../services/user-accounts/user-accounts.service';
import { ThemeToggleModule } from '../theme-toggle/theme-toggle.module';
import { MainComponent } from './main.component';

describe('MainComponent', async () => {
    let fixture: ComponentFixture<MainComponent>;
    let component: MainComponent;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [
                    RouterTestingModule.withRoutes([]),
                    BrowserAnimationsModule,
                    MatButtonModule,
                    MatIconModule,
                    MatToolbarModule,
                    MatDialogModule,
                    MatMenuModule,
                    ThemeToggleModule,
                    HttpClientTestingModule,
                ],
                declarations: [MainComponent],
                providers: [
                    AuthenticationService,
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
        fixture = TestBed.createComponent(MainComponent);
        component = fixture.debugElement.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
});
