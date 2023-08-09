import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataAdminService, MethodDefinitionData } from 'src/app/services/data-admin/data-admin.service';
import { FormBuilder, FormGroup } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog';
import { SearchPlatformsDialogComponent } from '../../../../components/search-platforms-dialog/search-platforms-dialog.component';
import { AddMethodDefinitionDialogComponent } from '../../../../components/add-method-definition-dialog/add-method-definition-dialog.component';
import { IDataAdminMethodDefinitionsResponse } from '../../../../interfaces/dataadminMethodDefinitions';
import { IDataAdminPlatform } from 'src/app/interfaces/dataadminPlatforms.interface';

@Component({
  selector: 'app-data-admin-method-definitions',
  templateUrl: './data-admin-method-definitions.component.html',
  styleUrls: ['./data-admin-method-definitions.component.scss']
})
export class DataAdminMethodDefinitionsComponent implements OnInit {
    @Input() paginationDisabled: boolean;

    methodDefinitionData: MethodDefinitionData = new MethodDefinitionData();

    editMode: boolean = false

    columnsToDisplay = [
        'status',
        'platformName',
        'contractGroup',
        'methodID',
        'signature',
        'treatment',
        'description',
        'type',
        'firstSeen',
        'count',
        'events',
        'deposit',
        'withdrawal',
        'borrow',
        'repay',
        'claim',
        'swap',
        'action'
    ];

    maxDescLength: number = 70
    isSearchInputOpen: boolean = false;
    searchQuery: string = '';
    filtersForm: FormGroup;
    isFilterOpen: boolean = false;
    accountsDemo = [
        '0x1256fa67c70000986a6',
        '0x1356fa67c70000986a6',
        '0x1456fa67c70000986a6',
        '0x1556fa67c70000986a6',
    ]
    isLoading: boolean = false;
    platforms: IDataAdminPlatform[] = [];
    types: string[] = [
        'Undefined',
        'Investment',
        'Administration'
    ];

    constructor(
        public activatedRoute: ActivatedRoute,
        public platformService: DataAdminService,
        private fb: FormBuilder,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.getList();
        this.initFilterForm();
        this.platformService.getPlatform({}).subscribe(res => {
            this.platforms = res.records;
        });
    }

    getList() {
        this.isLoading = true;
        const { PageIndex, PageSize } = this.methodDefinitionData;
        this.platformService.getMethodDefinitions({
            name: this.searchQuery,
            PageIndex,
            PageSize
        }).subscribe((data: IDataAdminMethodDefinitionsResponse) => {
            this.methodDefinitionData = {
                ...this.methodDefinitionData,
                total: data.recordCount,
                data: data.methodDefinitions
            };
            this.isLoading = false;
        });
    }

    initFilterForm() {
        this.filtersForm = this.fb.group({
            accounts: [[], ],
            treatment: [[]],
            by: ['block'],
            firstSeenHeight: ['12,345'],
            platform: ['curve'],
            methodID: ['0x34567890'],
            types: [['administration']],
            contractGroup: ['not_null'],
            missingOnly: [true]
        });
    }

    onSearchButtonClick() {
        if (this.isSearchInputOpen) {
            this.searchQuery = '';
            this.methodDefinitionData = {
                ...this.methodDefinitionData,
                PageIndex: 0
            };
            this.getList();
        }
        this.isSearchInputOpen = !this.isSearchInputOpen;
    }

    handleKeyUp($event: KeyboardEvent) {
        if ($event.key === 'Enter') {
                this.methodDefinitionData = {
                ...this.methodDefinitionData,
                PageIndex: 0
            };
            this.getList();
        } else if ($event.key === 'Escape') {
            this.isSearchInputOpen = false;
            this.searchQuery = '';
            this.methodDefinitionData = {
                ...this.methodDefinitionData,
                PageIndex: 0
            };
            this.getList();
        }
    }

    page(PageIndex: number, PageSize: number) {
        this.methodDefinitionData = {
            ...this.methodDefinitionData,
            PageIndex,
            PageSize
        };
        this.getList();
    }

    onShowSearchPlatform() {
        this.dialog.open(SearchPlatformsDialogComponent, {
            disableClose: true,
            width: '926px'
        })
    }

    onAddNewMethodDefinition() {
        this.dialog.open(AddMethodDefinitionDialogComponent, {
            disableClose: true,
            width: '874px',
            data: {
                platforms: this.platforms,
                types: this.types
            }
        }).afterClosed().subscribe(data => {
            if (data) {
                this.getList();
            }
        });
    }
}
