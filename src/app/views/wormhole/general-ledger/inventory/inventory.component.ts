import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { MATERIAL_BACKGROUND_COLORS } from '../../../../constants/background-colors';
import { MATERIAL_COLORS } from '../../../../constants/colors';
import { IAssetPerformance } from '../../../../interfaces/asset.interface';
import { IColumn } from '../../../../interfaces/column.interface';
import { INameWithColors } from '../../../../interfaces/nameWithColor.interface';
import { IPlatformPerformance } from '../../../../interfaces/platform.interface';
import { IPNLPositionDetails } from '../../../../interfaces/pnlPosition.interface';
import { formatValue } from '../../../../utilities/format-value';
import { formatPropertyName } from '../../../../utilities/formatPropertyName';
import { getAssetPerformances } from '../../../../utilities/getAssetPerformances';
import { getPercentagesForInventoryPerformance } from '../../../../utilities/getPercentagesForInventoryPerformance';
import { getPlatformPerformances } from '../../../../utilities/getPlatformPerformances';
import { getSortQuery } from '../../../../utilities/getSortQuery';
import { getTotalInventoryPerformanceBalance } from '../../../../utilities/getTotalInventoryPerformanceBalance';
import { sortInventoryElements } from '../../../../utilities/sortInventoryElements';
import { GeneralLedgerService } from '../general-ledger.service';
import { inventoryColumns } from './invetory-columns';

@Component({
    selector: 'app-inventory',
    templateUrl: './inventory.component.html',
    styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit, OnDestroy {
    @Input() smaller = false;

    public formGroup: FormGroup;

    reloadingDelay = 500;
    lowBalance = 100;

    pnlPositionsPerformance: IPNLPositionDetails[] = [];
    inventorySubscription = new Subscription();
    inventoryPerformance: Array<IPlatformPerformance | IAssetPerformance> = [];

    columns: IColumn[] = inventoryColumns;
    displayedColumns: string[] = [];

    propertiesWithColors: INameWithColors[] = [];

    inventoryLowBalances: 'hidden' | 'visible' = 'visible';
    inventoryView: 'platform' | 'asset' = 'platform';
    isSearchInputOpen = false;

    isToolbarVisible = true;

    formatValue = formatValue;

    constructor(
        public generalLedgerService: GeneralLedgerService,
        public router: Router,
        public activatedRoute: ActivatedRoute,
        private fb: FormBuilder,
    ) {
        this.formGroup = this.fb.group({
            searchInput: '',
        });
    }

    ngOnInit() {
        this.displayedColumns = this.columns.map((column) => column.columnDef);

        this.inventorySubscription.add(
            this.generalLedgerService.pnlPositionDetailsForInventory$
                .pipe(
                    map((pnlPositionPerformance) => {
                        this.pnlPositionsPerformance =
                            pnlPositionPerformance.map((item) => ({
                                ...item,
                                expanded: false,
                            }));
                    }),
                )
                .subscribe(() => {
                    this.inventoryView =
                        this.activatedRoute.snapshot.queryParams
                            .inventoryView || 'platform';
                    this.inventoryLowBalances =
                        this.activatedRoute.snapshot.queryParams
                            .inventoryLowBalances || 'visible';

                    this.formGroup.controls.searchInput.setValue(
                        this.activatedRoute.snapshot.queryParams
                            .inventorySearchQuery || '',
                    );

                    if (this.formGroup.controls.searchInput.value.length) {
                        this.isSearchInputOpen = true;
                    }

                    this.setColorsForProperties();
                    this.getInventoryPerformance();
                    this.checkIsToolbarVisible();
                }),
        );
    }

    ngOnDestroy() {
        this.inventorySubscription.unsubscribe();
    }

    setColorsForProperties() {
        let index = 0;
        [
            'Funding Received',
            'In Wallet',
            'Supply Balance',
            'Stake Balance',
            'Collateral Balance',
            'Borrow Balance',
        ].map((property) => {
            this.propertiesWithColors.push({
                name: property,
                columnDef: formatPropertyName(property).columnDef,
                color: MATERIAL_COLORS[index],
                backgroundColor: MATERIAL_BACKGROUND_COLORS[index],
            });
            index += 1;
        });
    }

    expandInventory(inventory: IPlatformPerformance | IAssetPerformance) {
        inventory.expanded = !inventory.expanded;
    }

    sortPlatformPerformance(
        isButtonPressed: boolean,
        columnDef: string,
        selectedPlatformPerformance: IPlatformPerformance,
    ) {
        const sortQuery = getSortQuery(
            isButtonPressed,
            columnDef,
            selectedPlatformPerformance.sortColumns,
        );

        const sortedPlatformPerformance = {
            ...selectedPlatformPerformance,
            records: selectedPlatformPerformance.records.sort((a, b) =>
                sortInventoryElements(a, b, sortQuery.sortColumns),
            ),
            sortColumns: sortQuery.sortColumns,
        };

        const platformPerformanceIndex = this.inventoryPerformance.indexOf(
            selectedPlatformPerformance,
        );
        this.inventoryPerformance[platformPerformanceIndex] =
            sortedPlatformPerformance;
    }

    sortAssetPerformance(
        isButtonPressed: boolean,
        columnDef: string,
        selectedAssetPerformance: IAssetPerformance,
    ) {
        const sortQuery = getSortQuery(
            isButtonPressed,
            columnDef,
            selectedAssetPerformance.sortColumns,
        );
        const sortedAssetPerformance = {
            ...selectedAssetPerformance,
            records: selectedAssetPerformance.records.sort((a, b) =>
                sortInventoryElements(a, b, sortQuery.sortColumns),
            ),
            sortColumns: sortQuery.sortColumns,
        };

        const assetPerformanceIndex = this.inventoryPerformance.indexOf(
            selectedAssetPerformance,
        );
        this.inventoryPerformance[assetPerformanceIndex] =
            sortedAssetPerformance;
    }

    onHideLowBalancesClick() {
        this.inventoryLowBalances =
            this.inventoryLowBalances === 'hidden' ? 'visible' : 'hidden';
        this.refreshInventoryData({
            inventoryLowBalances: this.inventoryLowBalances,
        });
    }

    openFullscreen() {
        this.activatedRoute.queryParams.subscribe((params) => {
            this.router.navigate(['/app/fullscreen/inventory'], {
                queryParams: params,
            });
        });
    }

    onViewChangeClick(tabIndex: number) {
        this.inventoryView = tabIndex === 0 ? 'platform' : 'asset';
        this.refreshInventoryData({
            inventoryView: this.inventoryView,
        });
    }

    getInventoryPerformance() {
        if (this.inventoryView === 'platform') {
            this.inventoryPerformance = getPlatformPerformances(
                this.pnlPositionsPerformance,
            );
        } else {
            this.inventoryPerformance = getAssetPerformances(
                this.pnlPositionsPerformance,
            );
        }

        this.inventoryPerformance = this.inventoryPerformance.map(
            (inventory) => {
                const percentages = getPercentagesForInventoryPerformance(
                    inventory,
                    false,
                );
                return {
                    ...inventory,
                    ...percentages,
                };
            },
        );

        if (this.formGroup.controls.searchInput.value.length) {
            this.inventoryPerformance = this.searchInventory(
                this.inventoryPerformance,
                this.inventoryView,
                this.formGroup.controls.searchInput.value,
            );
        }

        this.inventoryPerformance = this.updateTotalBalances(
            this.inventoryPerformance,
        );

        if (this.inventoryLowBalances === 'hidden') {
            this.inventoryPerformance = this.hideInventoryWithLowBalances(
                this.inventoryPerformance,
            );
        }

        this.inventoryPerformance.sort(
            (a, b) => Math.abs(b.totalBalance) - Math.abs(a.totalBalance),
        );
    }

    private updateTotalBalances(
        inventoryPerformance: Array<IPlatformPerformance | IAssetPerformance>,
    ): Array<IPlatformPerformance | IAssetPerformance> {
        return inventoryPerformance.map(
            (inventory: IPlatformPerformance | IAssetPerformance) => {
                return {
                    ...inventory,
                    totalBalance:
                        getTotalInventoryPerformanceBalance(inventory)
                            .totalBalance,
                };
            },
        );
    }

    private hideInventoryWithLowBalances(
        inventoryPerformance: Array<IPlatformPerformance | IAssetPerformance>,
    ): Array<IPlatformPerformance | IAssetPerformance> {
        return inventoryPerformance.filter(
            (inventory) => Math.abs(inventory.totalBalance) > this.lowBalance,
        );
    }

    onSearchButtonClick() {
        this.isSearchInputOpen = true;
    }

    handleKeyUp($event: KeyboardEvent) {
        if ($event.key === 'Enter') {
            this.onSearch();
        } else if ($event.key === 'Escape') {
            this.onCloseSearchClick();
        }
    }

    private searchInventory(
        inventoryPerformance: Array<IPlatformPerformance | IAssetPerformance>,
        inventoryView: 'platform' | 'asset',
        inventorySearchQuery: string,
    ) {
        if (inventoryView === 'asset') {
            return inventoryPerformance.filter(
                (assetPerformance: IAssetPerformance) =>
                    assetPerformance.name
                        .toLowerCase()
                        .includes(inventorySearchQuery.toLowerCase()),
            );
        }
        return inventoryPerformance
            .map((platformPerformance: IPlatformPerformance) => {
                const filteredAssets = platformPerformance.records.filter(
                    (asset) =>
                        asset.name
                            .toLowerCase()
                            .includes(inventorySearchQuery.toLowerCase()),
                );
                return {
                    ...platformPerformance,
                    records: filteredAssets,
                };
            })
            .filter((inventory) => inventory.records.length !== 0);
    }

    refreshInventoryData(queryParams: Params) {
        this.generalLedgerService.isInventoryLoading = true;
        this.router
            .navigate([], {
                queryParams,
                queryParamsHandling: 'merge',
            })
            .then(() => {
                setTimeout(() => {
                    this.generalLedgerService.pnlPositionDetailsForInventory$.next(
                        this.generalLedgerService.pnlPositionDetailsForInventory$.getValue(),
                    );
                    this.generalLedgerService.isInventoryLoading = false;
                }, this.reloadingDelay);
            });
    }

    onSearch() {
        this.refreshInventoryData({
            inventorySearchQuery: this.formGroup.controls.searchInput.value,
        });
    }

    onCloseSearchClick() {
        this.formGroup.controls.searchInput.setValue('');
        this.isSearchInputOpen = false;
        this.refreshInventoryData({
            inventorySearchQuery: null,
        });
    }

    checkIsToolbarVisible() {
        this.isToolbarVisible =
            this.inventoryLowBalances === 'hidden' || this.isSearchInputOpen;
    }

    sort(
        isButtonPressed: boolean,
        columnDef: string,
        inventory: IPlatformPerformance | IAssetPerformance,
    ) {
        if (this.inventoryView === 'platform') {
            this.sortPlatformPerformance(isButtonPressed, columnDef, inventory);
        } else {
            this.sortAssetPerformance(isButtonPressed, columnDef, inventory);
        }
    }
}
