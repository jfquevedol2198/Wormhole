import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';

import { AdvancedSearchDialogModule } from 'src/app/components/advanced-search-dialog/advanced-search-dialog.module';
import { StatusMessageModule } from 'src/app/components/status-message/status-message.module';
import { AdvancedSearchService } from 'src/app/services/advanced-search/advanced-search.service';
import { ApiService } from 'src/app/services/api/api.service';
import { ReportHistoryService } from 'src/app/services/report-history/report-history.service';
import { WormholeService } from 'src/app/services/wormhole/wormhole.service';
import { ReportHistoryRoutesModule } from './report-history-routing.module';
import { ReportHistoryTableModule } from './report-history-table/report-history-table.module';
import { ReportHistoryComponent } from './report-history.component';

describe('ReportHistory', async () => {
    let fixture: ComponentFixture<ReportHistoryComponent>;
    let component: ReportHistoryComponent;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [
                    HttpClientTestingModule,
                    FormsModule,
                    RouterModule.forRoot([]),
                    ReactiveFormsModule,
                    CommonModule,
                    MatSelectModule,
                    MatToolbarModule,
                    ReportHistoryRoutesModule,
                    MatButtonModule,
                    MatIconModule,
                    MatInputModule,
                    MatProgressSpinnerModule,
                    ReactiveFormsModule,
                    FormsModule,
                    MatExpansionModule,
                    AdvancedSearchDialogModule,
                    MatDialogModule,
                    MatTooltipModule,
                    ReportHistoryTableModule,
                    StatusMessageModule,
                    MatFormFieldModule,
                ],
                declarations: [ReportHistoryComponent],
                providers: [
                    ApiService,
                    WormholeService,
                    AdvancedSearchService,
                    ReportHistoryService,
                ],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(ReportHistoryComponent);
        component = fixture.debugElement.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
});
