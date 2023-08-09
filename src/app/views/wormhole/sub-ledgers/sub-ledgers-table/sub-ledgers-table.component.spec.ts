import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ApiService } from '../../../../services/api/api.service';
import { ConfigurationService } from '../../../../services/configuration/configuration.service';
import { SubLedgersService } from '../../../../services/sub-ledgers/sub-ledgers.service';
import { SubLedgersTableComponent } from './sub-ledgers-table.component';

describe('SubLedgersTableComponent', async () => {
    let fixture: ComponentFixture<SubLedgersTableComponent>;
    let component: SubLedgersTableComponent;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule, RouterTestingModule],
                declarations: [SubLedgersTableComponent],
                providers: [
                    SubLedgersTableComponent,
                    SubLedgersService,
                    ApiService,
                    ConfigurationService,
                ],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(SubLedgersTableComponent);
        component = fixture.debugElement.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
});
