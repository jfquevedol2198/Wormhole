import { Component } from '@angular/core';

import { ThemeService } from '../../services/theme/theme.service';

@Component({
    selector: 'app-theme-toggle',
    templateUrl: './theme-toggle.component.html',
    styleUrls: ['./theme-toggle.component.scss'],
})
export class ThemeToggleComponent {
    constructor(public themeService: ThemeService) {}

    toggleTheme(checked: boolean) {
        return this.themeService.setTheme(checked ? 'Dark' : 'Light');
    }
}
