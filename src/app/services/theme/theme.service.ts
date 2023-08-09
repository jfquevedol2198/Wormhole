import { BehaviorSubject } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import {
    getFromLocalStorage,
    saveToLocalStorage,
} from 'src/app/utilities/localStorageFunctions';

@Injectable()
export class ThemeService {
    constructor(@Inject(DOCUMENT) private document: Document) {}
    selectedTheme$ = new BehaviorSubject<any>('Dark');
    isDarkTheme$ = new BehaviorSubject<any>(false);

    getTheme() {
        const theme = getFromLocalStorage('theme');
        this.setTheme(theme);
        this.selectedTheme$.next(theme);

        if (!theme) {
            this.setTheme('Dark');
            this.selectedTheme$.next('Dark');
        }
    }

    setTheme(themeToSet: string) {
        if (themeToSet === 'Dark' || themeToSet === 'Light') {
            saveToLocalStorage('theme', 'Dark');
            this.document.body.classList.remove('LSD-theme');
            this.document.body.classList.add('dark-theme');
        }
        // TODO: Uncomment after light theme improvement

        // else if (themeToSet === 'Light') {
        //     saveToLocalStorage('theme', 'Light');
        //     this.document.body.classList.remove('LSD-theme');
        //     this.document.body.classList.remove('dark-theme');
        // }
        else {
            saveToLocalStorage('theme', 'LSD');
            this.document.body.classList.add('LSD-theme');
            this.document.body.classList.remove('dark-theme');
        }
    }
}
