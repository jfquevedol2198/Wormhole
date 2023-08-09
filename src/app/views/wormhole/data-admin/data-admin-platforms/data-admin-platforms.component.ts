import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { detailExpand } from 'src/app/animations/detailExpand';

import { DataAdminService, PlatformsData } from 'src/app/services/data-admin/data-admin.service';
import {
    IDataAdminPlatformResponse,
    IDataAdminPlatform
} from 'src/app/interfaces/dataadminPlatforms.interface';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatDialog } from '@angular/material/dialog';
import { PlatformLogoDialogComponent } from 'src/app/components/platform-logo-dialog/platform-logo-dialog.component';
import { IPlatformLogo } from 'src/app/interfaces/platformLogo.interface';

@Component({
    selector: 'app-data-admin-platforms',
    templateUrl: './data-admin-platforms.component.html',
    styleUrls: ['./data-admin-platforms.component.scss'],
    animations: [detailExpand],
})
export class DataAdminPlatformsComponent implements OnInit, OnDestroy {
    @Input() paginationDisabled: boolean;

    platformData: PlatformsData = new PlatformsData();

    columnsToDisplay = [
        'expand',
        'name',
        'score',
        'scam',
        'platformIcon',
        'action',
    ];

    maxDescLength: number = 70
    isSearchInputOpen: boolean = false;
    searchQuery: string = '';
    isLoading: boolean = true;

    constructor(
        public activatedRoute: ActivatedRoute,
        public platformService: DataAdminService,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.getList();
    }

    getList() {
        this.isLoading = true;
        const { PageIndex, PageSize } = this.platformData;
        this.platformService.getPlatform({
            name: this.searchQuery,
            PageIndex: PageIndex + 1,
            PageSize,
            GetRecordCount: true
        }).subscribe((data: IDataAdminPlatformResponse) => {
            this.platformData = {
                ...this.platformData,
                data: data.records,
                total: data.recordCount
            };
            this.isLoading = false;
        });
    }

    resetData() {
        this.platformData    = {
            ...this.platformData   ,
            PageIndex: 0,
            total: 0
        }
    }

    ngOnDestroy(): void {}

    onSearchButtonClick() {
        if (this.isSearchInputOpen) {
            this.searchQuery = '';
            this.resetData();
            this.getList();
        }
        this.isSearchInputOpen = !this.isSearchInputOpen;
    }

    handleKeyUp($event: KeyboardEvent) {
        if ($event.key === 'Enter') {
            this.resetData();
            this.getList();
        } else if ($event.key === 'Escape') {
            this.isSearchInputOpen = false;
            this.searchQuery = '';
            this.resetData();
            this.getList();
        }
    }

    page(PageIndex: number, PageSize: number) {
        this.platformData = {
            ...this.platformData,
            PageIndex,
            PageSize
        };
        this.getList();
    }

    handleChangeScam(e: MatSlideToggleChange, data: IDataAdminPlatform) {
        this.platformService.updatePlatform({
            ...data,
            scam: e.checked
        }).subscribe(data => {
            console.log('data', data);
        }, _ => {
            e.source.checked = !e.checked;
        })
    }

    handleUpdateLogo(row: IDataAdminPlatform) {
        const { platformIcon } = row;
        this.dialog.open(PlatformLogoDialogComponent, {
            data: { platformIcon },
            width: '900px'
        }).afterClosed().subscribe((res: IPlatformLogo | null) => {
            if (res && res.platformIcon && row.platformIcon !== res.platformIcon) {
                this.platformService.updatePlatform({
                    ...row,
                    platformIcon: res.platformIcon
                }).subscribe(_ => {
                    const { data } = this.platformData;
                    const index = data.findIndex(d => d.platformId === row.platformId);
                    if (index > -1) {
                        data[index].platformIcon = res.platformIcon;
                        this.platformData = {
                            ...this.platformData,
                            data
                        };
                    }
                })
            }
        })
    }
}
