import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';

import { BasicDynamicTableModule } from '../../components/basic-dynamic-table/basic-dynamic-table.module';
import { ChipModule } from '../../components/chip/chip.module';
import { MainModule } from '../../components/main/main.module';
import { PaginatorModule } from '../../components/paginator/paginator.module';
import { ConfigurationService } from '../../services/configuration/configuration.service';
import { StyleGuideDialogComponent } from './style-guide-dialog.component';
import { StyleGuideRoutingModule } from './style-guide-routing.module';
import { StyleGuideComponent } from './style-guide.component';

@NgModule({
    declarations: [StyleGuideComponent, StyleGuideDialogComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        MatCardModule,
        MainModule,
        StyleGuideRoutingModule,
        MatSidenavModule,
        MatDialogModule,
        ChipModule,
        MatButtonModule,
        MatInputModule,
        BasicDynamicTableModule,
        MatSlideToggleModule,
        MatProgressBarModule,
        MatButtonToggleModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        PaginatorModule,
        MatIconModule,
        ReactiveFormsModule,
        MatTooltipModule,
    ],
    entryComponents: [StyleGuideDialogComponent],
    providers: [ConfigurationService],
})
export class StyleGuideModule {}
