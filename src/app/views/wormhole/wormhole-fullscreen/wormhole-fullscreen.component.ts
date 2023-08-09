import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface IFullscreenTabs {
    name: string;
    link: string;
    queryParams?: { [key: string]: string | number };
    queryParamsStrategy: '' | 'merge' | 'preserve';
}

@Component({
    selector: 'app-wormhole-fullscreen',
    templateUrl: './wormhole-fullscreen.component.html',
    styleUrls: ['./wormhole-fullscreen.component.scss'],
})
export class WormholeFullscreenComponent {
    tabs: IFullscreenTabs[] = [
        {
            name: 'Chart',
            link: '/app/fullscreen/chart',
            queryParamsStrategy: 'preserve',
        },
        {
            name: 'Transactions',
            link: '/app/fullscreen/transactions',
            queryParams: {
                tableView: 'transactions',
                pageIndex: undefined,
                generalTableSorting: undefined,
                sortingDeFiImpactBy: undefined,
                reportPresetId: undefined,
            },
            queryParamsStrategy: 'merge',
        },
        {
            name: 'DeFi Impact',
            link: '/app/fullscreen/de-fi-impact',
            queryParams: {
                tableView: 'de-fi-impact',
                pageIndex: undefined,
                generalTableSorting: undefined,
                sortingDeFiImpactBy: undefined,
                reportPresetId: undefined,
            },
            queryParamsStrategy: 'merge',
        },
        {
            name: 'Inventory',
            link: '/app/fullscreen/inventory',
            queryParamsStrategy: 'preserve',
        },
    ];

    constructor(public router: Router, public activatedRoute: ActivatedRoute) {}

    linkActive(item: IFullscreenTabs) {
        return this.router.url.split('?')[0] === item.link;
    }

    exitFullscreen() {
        this.router.navigate(['/app/general-ledger/view/0'], {
            queryParamsHandling: 'preserve',
        });
    }
}
