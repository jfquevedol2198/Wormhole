import { Subscription } from 'rxjs';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { detailExpand } from '../../../../../animations/detailExpand';
import { TOOLTIP_DEFAULT_PROPS } from '../../../../../components/app-tooltip/app-tooltip.component';
import {
    IColumn,
    IInnerColumn,
} from '../../../../../interfaces/column.interface';
import { IUserRoles } from '../../../../../interfaces/setting.interface';
import {
    ISortColumn,
    SortDirection,
} from '../../../../../interfaces/sort-column.interface';
import { ITransaction } from '../../../../../interfaces/transaction.interface';
import { AccountingService } from '../../../../../services/accounting/accounting.service';
import { AuthenticationService } from '../../../../../services/authentication/authentication.service';
import { getSortQuery } from '../../../../../utilities/getSortQuery';
import {
    GeneralLedgerService,
    TransactionsData,
} from '../../general-ledger.service';
import {
    innerTransactionColumns,
    transactionColumns,
    transactionColumnsForDataValidator,
} from './transaction-columns';
import { transactionsColumnsForEditMode } from './transactions-columns-for-edit-mode';

@Component({
    selector: 'app-transactions-table',
    templateUrl: './transactions-table.component.html',
    styleUrls: ['./transactions-table.component.scss'],
    animations: [detailExpand],
})
export class TransactionsTableComponent implements OnInit, OnDestroy {
    transactionsTableDataSubscription = new Subscription();
    transactionsData: TransactionsData = new TransactionsData();

    columns: IColumn[] = transactionColumns;
    innerColumns: IInnerColumn[] = innerTransactionColumns;

    tippyProps = TOOLTIP_DEFAULT_PROPS;
    displayedColumns = [];
    displayedInnerColumns = [];

    sortColumns: ISortColumn[] = [];

    constructor(
        private accountingService: AccountingService,
        private router: Router,
        public activatedRoute: ActivatedRoute,
        public generalLedgerService: GeneralLedgerService,
        private authenticationService: AuthenticationService,
    ) {}

    ngOnInit() {
        this.displayedInnerColumns = this.innerColumns.map(
            (column) => column.columnDef,
        );

        this.transactionsTableDataSubscription.add(
            this.generalLedgerService.transactions$.subscribe((data) => {
                this.transactionsData = data;
                this.sortColumns = data.sorting.map((column) => {
                    return {
                        columnDef: column.split(' ')[0],
                        direction: column.split(' ')[1] as SortDirection,
                    };
                });

                this.columns = this.authenticationService.userRoles$
                    .getValue()
                    .some(
                        (userRole) =>
                            userRole === IUserRoles.ROLE_USER_DATA_VALIDATOR,
                    )
                    ? data.isEditMode
                        ? transactionsColumnsForEditMode
                        : transactionColumnsForDataValidator
                    : transactionColumns;

                this.displayedColumns = this.columns.map(
                    (column) => column.columnDef,
                );
            }),
        );
    }

    ngOnDestroy() {
        this.transactionsTableDataSubscription.unsubscribe();
    }

    expandTransaction(transaction: ITransaction) {
        transaction.isExpanded = !transaction.isExpanded;
    }

    refreshDataOnly() {
        this.router.navigate([], {
            queryParams: {
                forceRefresh: new Date().getTime(),
            },
            queryParamsHandling: 'merge',
        });
    }

    sort(isButtonPressed: boolean, columnDef: string) {
        const sortQuery = getSortQuery(
            isButtonPressed,
            columnDef,
            this.sortColumns,
        );

        this.sortColumns = sortQuery.sortColumns;

        this.router.navigate([], {
            queryParams: {
                generalTableSorting: sortQuery.sortQuery,
            },
            queryParamsHandling: 'merge',
        });
    }

    openEtherscan(transaction: ITransaction) {
        if (transaction.transactionHash) {
            window.open(
                `https://etherscan.io/tx/${transaction.transactionHash}`,
                '_blank',
            );
        }

        if (window.getSelection) {
            const sel = window.getSelection();
            sel.removeAllRanges();
        }
    }

    page(pageIndex: number, pageSize: number) {
        this.router.navigate([], {
            queryParams: {
                pageIndex,
                pageSize,
            },
            queryParamsHandling: 'merge',
        });
    }

    onDisableTransactionClick(transaction: ITransaction, disabled: boolean) {
        if (!transaction.operations) {
            this.accountingService
                .getOperations(transaction.transactionId)
                .subscribe((operations) => {
                    transaction.operations = this.transactionsData.isEditMode
                        ? operations
                        : operations.filter((operation) => operation.enabled);
                    this.changeOperationsStateForTransaction(
                        transaction,
                        disabled,
                    );
                });
        } else {
            this.changeOperationsStateForTransaction(transaction, disabled);
        }

        transaction.enabled = !transaction.enabled;
    }

    changeOperationsStateForTransaction(
        transaction: ITransaction,
        disabled: boolean,
    ) {
        transaction.operations
            .filter((operation) => operation.enabled === disabled)
            .map((operation) =>
                this.accountingService
                    .modifyOperationState({
                        operationId: operation.operationId,
                        enable: !disabled,
                    })
                    .subscribe(() => {
                        operation.enabled = !operation.enabled;
                    }),
            );
    }
}
