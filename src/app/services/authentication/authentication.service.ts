import { Web3Provider } from '@ethersproject/providers/src.ts/web3-provider';
import { Signer } from 'ethers';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { IAccessTokenData } from '../../interfaces/authentication-data.interface';
import { IUserRoles } from '../../interfaces/setting.interface';
import { SIGNER_ETHERS, WEB3_ETHERS } from '../../utilities/ethers';
import { UserAccountsService } from '../user-accounts/user-accounts.service';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

@Injectable()
export class AuthenticationService {
  publicAddress$: BehaviorSubject<string> = new BehaviorSubject<string>(
    undefined,
  );
  userRoles$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(
    undefined,
  );

  refreshTokenInterval: any;

  constructor(
    @Inject(WEB3_ETHERS) private web3: Web3Provider,
    @Inject(SIGNER_ETHERS) private signer: Signer,
    private userAccountsService: UserAccountsService,
    private router: Router,
  ) { }

  protected isMetamaskInstalled(): boolean {
    return typeof (window as any).ethereum !== 'undefined';
  }

  getAccount(): Observable<string> {
    this.signer.getAddress().then((address) => {
      this.publicAddress$.next(address);
    });
    return from(this.signer.getAddress());
  }

  signMessage(message: string) {
    return from(this.signer.signMessage(message));
  }

  getAccessToken(): string {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  getRefreshToken(): string {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  updateLocalStorageData(accessTokenData: IAccessTokenData) {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessTokenData.accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, accessTokenData.refreshToken);
  }

  cleanLocalStorageData() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }

  getPublicAddress(): string {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (accessToken) {
      return jwt_decode(localStorage.getItem(ACCESS_TOKEN_KEY))[
        'unique_name'
      ];
    }
    return '';
  }

  getRefreshTokenIntervalDelay(): number {
    // Refresh the token one minute before it stops being active
    return (
      new Date(
        jwt_decode(localStorage.getItem(ACCESS_TOKEN_KEY))['exp'] *
        1000 -
        60 * 1000,
      ).getTime() - new Date().getTime()
    );
  }

  setUserAuthData(accessTokenData: IAccessTokenData): void {
    const accessToken = jwt_decode(accessTokenData.accessToken);
    this.publicAddress$.next(accessToken['unique_name']);
    this.userRoles$.next(
      typeof accessToken['role'] === 'string'
        ? [accessToken['role']]
        : accessToken['role'],
    );
    this.updateLocalStorageData(accessTokenData);
    this.setRefreshTokenInterval();
  }

  resetAuthData() {
    this.publicAddress$.next(undefined);
    this.userRoles$.next(undefined);
    this.cleanLocalStorageData();
    clearInterval(this.refreshTokenInterval);
  }

  setRefreshTokenInterval() {
    this.refreshTokenInterval = setInterval(() => {
      this.userAccountsService
        .refreshToken(this.getAccessToken(), this.getRefreshToken())
        .subscribe((accessTokenData) => {
          this.updateLocalStorageData(accessTokenData);
        });
    }, this.getRefreshTokenIntervalDelay());
  }

  logOut() {
    this.resetAuthData();
  }

  authenticationWithMetamask() {
    if (!this.isMetamaskInstalled()) {
      return;
    } else {
      try {
        this.web3.provider
          .request({
            method: 'eth_requestAccounts',
          })
          .then(() => {
            this.getAccount()
              .pipe(
                switchMap((address) =>
                  this.userAccountsService
                    .getUserNonce(address)
                    .pipe(
                      switchMap((nonceData) =>
                        this.signMessage(
                          nonceData.nonce,
                        ).pipe(
                          switchMap((signature) =>
                            this.userAccountsService.getAccessToken(
                              this.publicAddress$.getValue(),
                              signature,
                            ),
                          ),
                        ),
                      ),
                    ),
                ),
              )
              .subscribe((accessTokenData) => {
                if (accessTokenData.accessToken) {
                  this.setUserAuthData(accessTokenData);
                  this.redirectToLandingPage(accessTokenData);
                }
              });
          });
      } catch { }
    }
  }

  getUserRoles(): string[] {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (accessToken) {
      const userRole = jwt_decode(localStorage.getItem(ACCESS_TOKEN_KEY))[
        'role'
      ];
      return typeof userRole === 'string' ? [userRole] : userRole;
    }
    return undefined;
  }

  isPortfolioManager(): boolean {
    const userRoles = this.getUserRoles();
    if (userRoles) {
      return userRoles.some(
        (userRole) =>
          userRole === IUserRoles.ROLE_USER_PORTFOLIO_MANAGER,
      );
    }
    return false;
  }

  isDataValidator(): boolean {
    const userRoles = this.getUserRoles();
    if (userRoles) {
      return userRoles.some(
        (userRole) => userRole === IUserRoles.ROLE_USER_DATA_VALIDATOR,
      );
    }
    return false;
  }

  isDataAdmin(): boolean {
    const userRoles = this.getUserRoles();
    if (userRoles) {
      return userRoles.some(
        (userRole) => userRole === IUserRoles.ROLE_USER_DATA_ADMIN,
      );
    }
    return false;
  }

  isAdministrator(): boolean {
    const userRoles = this.getUserRoles();
    if (userRoles) {
      return userRoles.some(
        (userRole) => userRole === IUserRoles.ROLE_USER_ADMINISTRATOR,
      );
    }
    return false;
  }

  private redirectToLandingPage(accessTokenData: IAccessTokenData) {
    const userRole = jwt_decode(accessTokenData.accessToken)['role'];
    if (userRole === IUserRoles.ROLE_USER_DATA_ADMIN) {
      this.router.navigate(['/app/data-admin']);
    } else if (userRole === IUserRoles.ROLE_USER_ADMINISTRATOR) {
      this.router.navigate(['/app/settings']);
    }
  }
}
