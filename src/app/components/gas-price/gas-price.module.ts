import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GasPriceComponent } from './gas-price.component';
import { GasPriceService } from '../../services/gas-price/gas-price.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
    declarations: [GasPriceComponent],
    exports: [GasPriceComponent],
    imports: [CommonModule, MatProgressSpinnerModule],
    providers: [GasPriceService],
})
export class GasPriceModule {}
