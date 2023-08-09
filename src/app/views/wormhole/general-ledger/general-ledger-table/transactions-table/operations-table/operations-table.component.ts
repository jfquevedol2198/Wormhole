import { forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { detailExpand } from '../../../../../../animations/detailExpand';
import { TOOLTIP_DEFAULT_PROPS } from '../../../../../../components/app-tooltip/app-tooltip.component';
import { IColumn } from '../../../../../../interfaces/column.interface';
import { IOperation } from '../../../../../../interfaces/operation.interface';
import { IUserRoles } from '../../../../../../interfaces/setting.interface';
import { ITransaction } from '../../../../../../interfaces/transaction.interface';
import { AccountingService } from '../../../../../../services/accounting/accounting.service';
import { AuthenticationService } from '../../../../../../services/authentication/authentication.service';
import { AddOperationDialogComponent } from './add-operation-dialog.component';
import { EditOperationDialogComponent } from './edit-operation-dialog.component';
import {
    operationColumns,
    operationColumnsForDataValidator,
} from './operation-columns';
import { operationColumnsForEditMode } from './operation-columns-for-edit-mode';

@Component({
    selector: 'app-operations-table',
    templateUrl: './operations-table.component.html',
    styleUrls: ['./operations-table.component.scss'],
    animations: [detailExpand],
})
export class OperationsTableComponent implements OnInit {
    @Input() transaction: ITransaction;
    @Input() isEditMode = false;
    @Output() refreshData: EventEmitter<any> = new EventEmitter<any>();

    isOperationsLoading = false;

    columns: IColumn[] = operationColumns;
    displayedColumns: string[];

    constructor(
        private accountingService: AccountingService,
        private dialog: MatDialog,
        private authenticationService: AuthenticationService,
    ) {}
    tippyProps = TOOLTIP_DEFAULT_PROPS;

    ngOnInit() {
        if (!this.transaction.operations) {
            this.refreshOperations();
        }

        this.columns = this.authenticationService.userRoles$
            .getValue()
            .some(
                (userRole) => userRole === IUserRoles.ROLE_USER_DATA_VALIDATOR,
            )
            ? this.isEditMode
                ? operationColumnsForEditMode
                : operationColumnsForDataValidator
            : operationColumns;

        this.displayedColumns = this.columns.map((column) => column.columnDef);
    }

    onDisableOperationClick(operation: IOperation, disabled: boolean) {
        this.accountingService
            .modifyOperationState({
                operationId: operation.operationId,
                enable: !disabled,
            })
            .subscribe(() => {
                operation.enabled = !operation.enabled;
                this.transaction.enabled = !this.isAllOperationsDisabled(
                    this.transaction,
                );
            });
    }

    addOperation() {
        const dialogRef = this.dialog.open(AddOperationDialogComponent, {
            data: this.transaction,
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.refreshOperations();
            }
        });
    }

    removeOperations() {
        this.transaction.operations
            .filter((operations) => operations.isOperationSelected)
            .forEach((operation) => {
                this.accountingService
                    .removeOperation(operation.operationId)
                    .subscribe(() => {});
            });

        this.transaction.operations = this.transaction.operations.filter(
            (operation) => !operation.isOperationSelected,
        );
    }

    restoreOperations() {
        this.isOperationsLoading = true;

        const items = [];
        this.transaction.operations
            .filter((operations) => operations.isOperationSelected)
            .forEach((operation) => {
                if (operation.manual) {
                    items.push(
                        this.accountingService.removeOperation(
                            operation.operationId,
                        ),
                    );
                }
            });

        forkJoin(items)
            .pipe(
                switchMap(() =>
                    this.accountingService.getOperations(
                        this.transaction.transactionId,
                    ),
                ),
            )
            .subscribe((operations) => {
                this.transaction.operations = this.isEditMode
                    ? operations
                    : operations.filter((operation) => operation.enabled);
                if (!operations.some((operation) => operation.manual)) {
                    this.transaction.edited = false;
                }
                this.isOperationsLoading = false;
            });
    }

    selectOperation(operation: IOperation) {
        operation.isOperationSelected = !operation.isOperationSelected;
    }

    areSelectedOperations() {
        return (
            this.transaction.operations.filter(
                (operations) => operations.isOperationSelected === true,
            ).length > 0
        );
    }

    isAllOperationsDisabled(transaction: ITransaction) {
        return !(
            transaction.operations.filter((operation) => operation.enabled)
                .length > 0
        );
    }

    editOperation(selectedOperation: IOperation) {
        const dialogRef = this.dialog.open(EditOperationDialogComponent, {
            data: selectedOperation,
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.refreshOperations();
            }
        });
    }

    refreshOperations() {
        this.isOperationsLoading = true;
        this.accountingService
            .getOperations(this.transaction.transactionId)
            .subscribe((operations) => {
                this.transaction.operations = this.isEditMode
                    ? operations
                    : operations.filter((operation) => operation.enabled);
                this.isOperationsLoading = false;
            });
    }

    areOperationsToRemove() {
        const selectedOperations = this.transaction.operations.filter(
            (operations) => operations.isOperationSelected,
        );

        return (
            selectedOperations.length &&
            !selectedOperations.some((operations) => !operations.manual)
        );
    }
}
