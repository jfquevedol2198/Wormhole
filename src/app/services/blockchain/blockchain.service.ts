import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import { IAccountEstimations } from '../../interfaces/accountEstimations.interface';
import { IWormholePostResponse } from '../../interfaces/response.interface';
import { ApiService } from '../api/api.service';

@Injectable()
export class BlockchainService {
    constructor(private readonly api: ApiService) {}

    getTransactionImportTemplate(
        blockchain: string,
        includeDataDescription: boolean = false,
        includeSampleData: boolean = true,
    ): Observable<Blob> {
        return this.api.downloadFile(
            `Blockchain/GetTransactionImportTemplate/${blockchain}?includeSampleData=${includeSampleData}&includeDataDescription=${includeDataDescription}`,
        );
    }

    getAddressEstimation(
        blockchain: string,
        ledgerAddress: string,
        startDate?: number,
        update?: string,
    ): Observable<IAccountEstimations> {
        const params = {
            ledgerAddress,
            startDate,
            update,
        };
        return this.api.post<IAccountEstimations>(
            `Blockchain/EstimateAddressProcessing/${blockchain}`,
            params,
        );
    }

    importTransactions(
        blockchain: string,
        formData: FormData,
    ): Observable<IWormholePostResponse> {
        return this.api.uploadFile(
            `Blockchain/ImportTransactions/${blockchain}`,
            formData,
        );
    }
}
