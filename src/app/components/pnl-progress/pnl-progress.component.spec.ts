import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { FormatValuePipeModule } from '../../pipes/format-value/format-value.pipe.module';
import { HumanReadableTimePipeModule } from '../../pipes/human-readable-time/human-readable-time.pipe.module';

import { AccountingService } from '../../services/accounting/accounting.service';
import { ApiService } from '../../services/api/api.service';
import { ApiServiceMock } from '../../services/api/api.service.mock';
import { DataQualityCheckService } from '../../services/dataQualityCheck/dataQualityCheck.service';

import { PnlProgressComponent } from './pnl-progress.component';

describe('PnlProgressComponent', async () => {
    let fixture: ComponentFixture<PnlProgressComponent>;
    let component: PnlProgressComponent;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [PnlProgressComponent],
                imports: [
                    MatProgressBarModule,
                    MatProgressSpinnerModule,
                    FormatValuePipeModule,
                    HumanReadableTimePipeModule,
                ],
                providers: [
                    AccountingService,
                    {
                        provide: ApiService,
                        useClass: ApiServiceMock,
                    },
                    DataQualityCheckService,
                ],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(PnlProgressComponent);
        component = fixture.debugElement.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
});
