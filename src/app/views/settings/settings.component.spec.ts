import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSortModule } from '@angular/material/sort';

import { DatePipeModule } from '../../pipes/date/date.pipe.module';

import { ApiService } from '../../services/api/api.service';
import { ConfigurationService } from '../../services/configuration/configuration.service';
import { WorkersService } from '../../services/workers/workers.service';

import { SettingsComponent } from './settings.component';

describe('SettingsComponent', async () => {
    let fixture: ComponentFixture<SettingsComponent>;
    let component: SettingsComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                MatButtonModule,
                MatCardModule,
                MatGridListModule,
                MatInputModule,
                MatTableModule,
                MatToolbarModule,
                MatSortModule,
                DatePipeModule,
            ],
            declarations: [SettingsComponent],
            providers: [ApiService, ConfigurationService, WorkersService],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SettingsComponent);
        component = fixture.debugElement.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
});
