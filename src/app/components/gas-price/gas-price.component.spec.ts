import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { GasPriceComponent } from './gas-price.component';
import { GasPriceService } from '../../services/gas-price/gas-price.service';

describe('GasPriceComponent', () => {
    let component: GasPriceComponent;
    let fixture: ComponentFixture<GasPriceComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GasPriceComponent],
            imports: [CommonModule, HttpClientTestingModule],
            providers: [GasPriceService],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GasPriceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('it should validate gas prices when data exists', () => {
        component.gasPrice = {
            slow: 50,
            average: 75,
            fast: 100,
            fastest: 150,
        };
        component.ethToUsdPrice = 2100.5;
        fixture.detectChanges();

        const titleSelector = '.app-gas-price--title';
        const mainTextSelector = '.app-gas-price h2';
        const footerTextSelector = '.app-gas-price--footer';
        const title = fixture.debugElement.queryAll(By.css(titleSelector));
        const mainText = fixture.debugElement.queryAll(
            By.css(mainTextSelector),
        );
        const footerText = fixture.debugElement.queryAll(
            By.css(footerTextSelector),
        );

        expect(title.length).toBe(3);

        expect(title[0].nativeElement.innerText).toBe('Slow');
        expect(mainText[0].nativeElement.innerText).toBe('50 gwei');
        expect(footerText[0].nativeElement.innerText).toBe('$2.21 < 10mins');

        expect(title[1].nativeElement.innerText).toBe('Average');
        expect(mainText[1].nativeElement.innerText).toBe('75 gwei');
        expect(footerText[1].nativeElement.innerText).toBe('$3.31 ~3mins');

        expect(title[2].nativeElement.innerText).toBe('Fast');
        expect(mainText[2].nativeElement.innerText).toBe('100 gwei');
        expect(footerText[2].nativeElement.innerText).toBe('$4.41 ~1min');
    });
});
