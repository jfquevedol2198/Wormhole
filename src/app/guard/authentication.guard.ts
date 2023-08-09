import jwt_decode from 'jwt-decode';
import { Observable, of } from 'rxjs';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

import { IUserRoles } from '../interfaces/setting.interface';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { UserAccountsService } from '../services/user-accounts/user-accounts.service';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
    constructor(
        private readonly router: Router,
        private readonly authenticationService: AuthenticationService,
        private readonly userAccountsService: UserAccountsService,
    ) {}

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        const refreshToken = this.authenticationService.getRefreshToken();
        const accessToken = this.authenticationService.getAccessToken();
        if (
            refreshToken &&
            accessToken &&
            this.authenticationService.getRefreshTokenIntervalDelay() > 0
        ) {
            if (this.hasPermission(route)) {
                if (!this.authenticationService.refreshTokenInterval) {
                    this.userAccountsService
                        .refreshToken(accessToken, refreshToken)
                        .subscribe((accessToken) => {
                            this.authenticationService.setUserAuthData(
                                accessToken,
                            );
                        });
                }
                return of(true);
            } else {
                const userRole = jwt_decode(accessToken)['role'];
                if (userRole === IUserRoles.ROLE_USER_DATA_ADMIN) {
                    this.router.navigate(['/app/data-admin']);
                } else if (userRole === IUserRoles.ROLE_USER_ADMINISTRATOR) {
                    this.router.navigate(['/app/settings']);
                } else {
                    this.router.navigate(['/app/portfolio-management']);
                }
            }
        } else {
            this.authenticationService.resetAuthData();
        }

        if (route.routeConfig.path === 'portfolio-management') {
            return of(true);
        }
    }

    hasPermission(route: ActivatedRouteSnapshot): boolean {
        const userRoles = this.authenticationService.getUserRoles();

        if (userRoles) {
            return route.data.availableFor.some((role) =>
                userRoles.includes(role),
            );
        }
        return false;
    }
}
