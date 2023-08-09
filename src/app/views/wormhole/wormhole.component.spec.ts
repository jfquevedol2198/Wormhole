import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterTestingModule } from '@angular/router/testing';

import { WormholeComponent } from './wormhole.component';

describe('WormholeComponent', async () => {
    let fixture: ComponentFixture<WormholeComponent>;
    let component: WormholeComponent;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [RouterTestingModule, MatTabsModule],
                declarations: [WormholeComponent],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(WormholeComponent);
        component = fixture.debugElement.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
});
