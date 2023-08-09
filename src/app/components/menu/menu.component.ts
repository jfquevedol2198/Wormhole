import { Subscription } from 'rxjs';

import { Component, Input, OnInit } from '@angular/core';
import { RouterLinkActive, Routes } from '@angular/router';

import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
    @Input() routes?: Routes;

    navigation: {
        path: string;
        title: string;
        icon: string;
        disabled: boolean;
    }[];

    subscriptions = new Subscription();

    constructor(private authenticationService: AuthenticationService) {}

    ngOnInit() {
        this.subscriptions.add(
            this.authenticationService.userRoles$.subscribe((userRole) => {
                this.navigation = this.routes
                    .filter(
                        (route) =>
                            !!route.data &&
                            route.data.isMenu &&
                            userRole &&
                            route.data.availableFor.some((role) =>
                                userRole.includes(role),
                            ),
                    )
                    .map((route) => ({
                        path: route.path,
                        title: route.data.title,
                        icon: route.data.icon,
                        disabled: route.data.disabled,
                    }));
            }),
        );
    }

    linkActive(routerLinkActive: RouterLinkActive) {
        return routerLinkActive.isActive;
    }
}
