import * as Sentry from '@sentry/angular';
import { Integrations } from '@sentry/tracing';

import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, NgZone } from '@angular/core';

import { ConfigurationService } from '../services/configuration/configuration.service';
import { ErrorMessageService } from '../services/error-message/error-message.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(
        private errorMessageService: ErrorMessageService,
        private zone: NgZone,
        private configurationService: ConfigurationService,
    ) {
        this.configurationService.config$.subscribe((data) => {
            if (data.sentryDsn !== undefined && data.sentryDsn !== '') {
                Sentry.init({
                    dsn: data.sentryDsn,
                    integrations: [
                        new Integrations.BrowserTracing({
                            routingInstrumentation:
                                Sentry.routingInstrumentation,
                        }),
                    ],
                    tracesSampleRate: 1.0,
                });
            }
        });
    }

    handleError(error: Error) {
        this.zone.run(() => {
            if (error instanceof HttpErrorResponse) {
                this.errorMessageService.showErrorMessage(
                    `${error.error.message || error.message}` ||
                        'Undefined error',
                );
            } else {
                console.error(error);
            }
        });
    }
}
