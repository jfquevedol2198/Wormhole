import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';

import { AccountingService } from '../../../services/accounting/accounting.service';
import { ApiService } from '../../../services/api/api.service';
import { DataQualityCheckService } from '../../../services/dataQualityCheck/dataQualityCheck.service';
import { WormholeFullscreenComponent } from './wormhole-fullscreen.component';

describe('WormholeFullscreenComponent', async () => {
    let fixture: ComponentFixture<WormholeFullscreenComponent>;
    let component: WormholeFullscreenComponent;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [
                    RouterTestingModule,
                    MatIconModule,
                    MatToolbarModule,
                    MatTabsModule,
                    HttpClientTestingModule,
                ],
                declarations: [WormholeFullscreenComponent],
                providers: [
                    DataQualityCheckService,
                    AccountingService,
                    ApiService,
                ],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(WormholeFullscreenComponent);
        component = fixture.debugElement.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
});
