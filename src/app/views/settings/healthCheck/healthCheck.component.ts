import moment from 'moment';

import { Component, OnDestroy, OnInit } from '@angular/core';

import { IColumn } from '../../../interfaces/column.interface';
import {
    IHealthCheckResponse,
    IHealthCheckSchemaInfo,
    IHealthCheckService,
    IHealthCheckWorkerTaskStatus,
} from '../../../interfaces/healthCheck.interface';
import { IRuntimeData } from '../../../interfaces/runtimeData.interface';
import { WormholeService } from '../../../services/wormhole/wormhole.service';
import {
    runtimeInformationDataColumns,
    schemaInformationDataColumns,
    serviceStatusDataColumns,
    workerTasksStatusDataColumns,
} from './healthCheckTables';

@Component({
    selector: 'app-configuration-health-check',
    templateUrl: './healthCheck.component.html',
})
export class HealthCheckComponent implements OnInit, OnDestroy {
    runtimeInformationData: IRuntimeData[] = [];
    runtimeInformationDataColumns: IColumn[] = runtimeInformationDataColumns;

    workerTasksStatusData: IHealthCheckWorkerTaskStatus[] = [];
    workerTasksStatusDataColumns: IColumn[] = workerTasksStatusDataColumns;

    schemaInformationData: IHealthCheckSchemaInfo[] = [];
    schemaInformationDataColumns: IColumn[] = schemaInformationDataColumns;

    serviceStatusData: IHealthCheckService[] = [];
    serviceStatusDataColumns: IColumn[] = serviceStatusDataColumns;

    isHealthCheckLoading = true;
    healthCheckInterval;
    refreshDelay = 60000;

    constructor(public service: WormholeService) {}

    ngOnInit() {
        this.getHealthCheck();
        this.healthCheckInterval = setInterval(() => {
            this.isHealthCheckLoading = true;
            this.getHealthCheck();
        }, this.refreshDelay);
    }

    ngOnDestroy() {
        if (this.healthCheckInterval) {
            clearInterval(this.healthCheckInterval);
        }
    }

    getHealthCheck() {
        this.runtimeInformationData = [];
        this.service.getHealthCheck().subscribe((response) => {
            this.runtimeInformationData = [
                ...this.runtimeInformationData,
                ...this.getRuntimeDataFromHealthCheck(response),
            ];
            this.workerTasksStatusData =
                response.healthcheck.workerTaskHealthcheck;

            this.schemaInformationData =
                response.healthcheck.dbSchemaHealthcheck;
            this.serviceStatusData = response.healthcheck.servicesHealthcheck;
            this.isHealthCheckLoading = false;
        });

        this.service.getVersion().subscribe((response) => {
            this.runtimeInformationData = [
                ...this.runtimeInformationData,
                {
                    field: 'Database Schema Version',
                    value: response.databaseSchemaVersion,
                },
            ];
        });
    }

    getRuntimeDataFromHealthCheck(response: IHealthCheckResponse) {
        return [
            {
                field: 'Last Updated',
                value: moment
                    .utc(response.healthcheck.lastUpdated)
                    .format('DD/MM/YYYY HH:mm:ss'),
            },
            {
                field: 'Uptime',
                value: response.healthcheck.uptime,
            },
        ];
    }
}
