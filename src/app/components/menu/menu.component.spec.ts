import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AccountingService } from '../../services/accounting/accounting.service';
import { ApiService } from '../../services/api/api.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { ConfigurationService } from '../../services/configuration/configuration.service';
import { UserAccountsService } from '../../services/user-accounts/user-accounts.service';
import { GeneralLedgerService } from '../../views/wormhole/general-ledger/general-ledger.service';
import { childRoutes } from '../../views/wormhole/wormhole.child-routes';
import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
    let component: MenuComponent;
    let fixture: ComponentFixture<MenuComponent>;
    const routes: Routes = childRoutes;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MenuComponent],
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [
                AccountingService,
                ApiService,
                ConfigurationService,
                GeneralLedgerService,
                AuthenticationService,
                UserAccountsService,
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MenuComponent);
        component = fixture.componentInstance;
        component.routes = routes;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
