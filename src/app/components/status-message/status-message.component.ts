import { Component } from '@angular/core';
import { IMessage } from '../../interfaces/message.interface';

export const TIMEOUTS = {
    short: 3000,
    mid: 10000,
    long: 60000,
};

@Component({
    selector: 'app-status-message',
    templateUrl: './status-message.component.html',
    styleUrls: ['./status-message.component.scss'],
})
export class StatusMessageComponent {
    isMessageShowing: boolean;
    timeout: number;
    message: IMessage;

    getIconName(status: string) {
        switch (status) {
            case 'successful':
                return 'check_circle';
            case 'warning':
                return 'error_outline';
            case 'error':
                return 'cancel';
            default:
                return '';
        }
    }

    showMessage(message: IMessage) {
        this.message = message;
        this.isMessageShowing = true;
        if (!message.timeout) {
            this.getTimeout();
        } else {
            this.timeout = message.timeout;
        }
        setTimeout(() => (this.isMessageShowing = false), this.timeout);
    }

    closeMessage() {
        this.isMessageShowing = false;
    }

    getTimeout() {
        this.timeout =
            this.message.status === 'successful'
                ? TIMEOUTS.short
                : this.message.status === 'warning'
                ? TIMEOUTS.mid
                : TIMEOUTS.long;
    }
}
