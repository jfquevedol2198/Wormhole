import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HighchartsChartModule } from 'highcharts-angular';
import { ChipModule } from 'src/app/components/chip/chip.module';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatListModule } from '@angular/material/list';
import { DynamicTableModule } from 'src/app/components/dynamic-table/dynamic-table.module';
import { PaginatorModule } from '../../../components/paginator/paginator.module';
import { ImportAddressDialogModule } from '../../../components/import-address-dialog/import-address-dialog.module';
import { SearchPlatformsDialogModule } from '../../../components/search-platforms-dialog/search-platforms-dialog.module';
import { AddMethodDefinitionDialogModule } from '../../../components/add-method-definition-dialog/add-method-definition-dialog.module';
import { CoinGekoErrorDialogModule } from '../../../components/coin-geko-error-dialog/coin-geko-error-dialog.module';
import { DependencyDiagramModule } from '../../../components/dependency-diagram/dependency-diagram.module';
import { DismissProcessLogDialogModule } from '../../../components/dismiss-process-log-dialog/dismiss-process-log-dialog.module';

import { DataAdminPlatformsComponent } from './data-admin-platforms/data-admin-platforms.component';
import { DataAdminRoutingModule } from './data-admin-routing.module';
import { DataAdminComponent } from './data-admin.component';
import { DataAdminAddressLabelsComponent } from './data-admin-address-labels/data-admin-address-labels.component';
import { DataAdminAddressLabelsJobsComponent } from './data-admin-address-labels/data-admin-address-labels-jobs/data-admin-address-labels-jobs.component';
import { DataAdminMethodDefinitionsComponent } from './data-admin-method-definitions/data-admin-method-definitions.component';
import { DataAdminMethodDefinitionsJobsComponent } from './data-admin-method-definitions/data-admin-method-definitions-jobs/data-admin-method-definitions-jobs.component';
import { DataAdminMarketDataProvidersComponent } from './data-admin-market-data/data-admin-market-data-providers/data-admin-market-data-providers.component';
import { DataAdminMarketDataProvidersJobsComponent } from './data-admin-market-data/data-admin-market-data-providers-jobs/data-admin-market-data-providers-jobs.component';
import { DataAdminCurrencyPairsComponent } from './data-admin-market-data/data-admin-currency-pairs/data-admin-currency-pairs.component';
import { DataAdminCurrencyPairsPairSummaryComponent } from './data-admin-market-data/data-admin-currency-pairs/data-admin-currency-pairs-pair-summary/data-admin-currency-pairs-pair-summary.component';
import { DataAdminCurrencyPairsDependenciesComponent } from './data-admin-market-data/data-admin-currency-pairs/data-admin-currency-pairs-dependencies/data-admin-currency-pairs-dependencies.component';
import { DataAdminCurrencyPairsUsageComponent } from './data-admin-market-data/data-admin-currency-pairs/data-admin-currency-pairs-usage/data-admin-currency-pairs-usage.component';
import { DataAdminCurrencyPairsJobsComponent } from './data-admin-market-data/data-admin-currency-pairs/data-admin-currency-pairs-jobs/data-admin-currency-pairs-jobs.component';
import { DataAdminCurrencyPairsProcessingJobsComponent } from './data-admin-market-data/data-admin-currency-pairs/data-admin-currency-pairs-processing-jobs/data-admin-currency-pairs-processing-jobs.component';
import { DataAdminMarketDataMarketToMarketComponent } from './data-admin-market-data/data-admin-market-data-market-to-market/data-admin-market-data-market-to-market.component';
import { PlatformLogoDialogModule } from 'src/app/components/platform-logo-dialog/platform-logo-dialog.module';
import { DataAdminService } from 'src/app/services/data-admin/data-admin.service';
@NgModule({
    declarations: [
        DataAdminComponent,
        DataAdminPlatformsComponent,
        DataAdminAddressLabelsComponent,
        DataAdminAddressLabelsJobsComponent,
        DataAdminMethodDefinitionsComponent,
        DataAdminMethodDefinitionsJobsComponent,
        DataAdminMarketDataProvidersComponent,
        DataAdminMarketDataProvidersJobsComponent,
        DataAdminCurrencyPairsComponent,
        DataAdminCurrencyPairsPairSummaryComponent,
        DataAdminCurrencyPairsDependenciesComponent,
        DataAdminCurrencyPairsUsageComponent,
        DataAdminCurrencyPairsJobsComponent,
        DataAdminCurrencyPairsProcessingJobsComponent,
        DataAdminMarketDataMarketToMarketComponent
    ],
    exports: [DataAdminComponent],
    imports: [
        CommonModule,
        PaginatorModule,
        ImportAddressDialogModule,
        SearchPlatformsDialogModule,
        AddMethodDefinitionDialogModule,
        CoinGekoErrorDialogModule,
        MatExpansionModule,
        DependencyDiagramModule,
        DataAdminRoutingModule,
        MatTabsModule,
        MatIconModule,
        MatTableModule,
        MatSelectModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatListModule,
        MatInputModule,
        MatProgressSpinnerModule,
        NgxMaterialTimepickerModule,
        DynamicTableModule,
        MatMenuModule,
        ChipModule,
        MatSlideToggleModule,
        FormsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatToolbarModule,
        MatCheckboxModule,
        HighchartsChartModule,
        PlatformLogoDialogModule,
        DismissProcessLogDialogModule
    ],
    providers: [ DataAdminService ],
})
export class DataAdminModule {}
