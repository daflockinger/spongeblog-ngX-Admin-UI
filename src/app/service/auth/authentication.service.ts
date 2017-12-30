import { LocalStorageService } from 'angular-2-local-storage';
import { Injectable, Inject } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import * as _ from 'lodash';


@Injectable()
export class AuthenticationService {
  public static TOKEN_PARAM = 'token';

  constructor(@Inject(LocalStorageService) private localStorageService: LocalStorageService,
              @Inject(JwtHelper) private jwtHelper: JwtHelper) {
  }


  public updateToken(tokenValue: string) {
    this.localStorageService.set(AuthenticationService.TOKEN_PARAM, tokenValue);
  }

  public isLoggedIn() {
    const token = this.getToken();
    let isLoggedIn = false;

    if (token != null && !_.isEmpty(token)) {
      isLoggedIn = !this.jwtHelper.isTokenExpired(this.getToken());
    }
    return isLoggedIn;
  }

  public getToken() {
    const token = this.localStorageService.get<string>(AuthenticationService.TOKEN_PARAM);
    return (token != null) ? token : '';
  }

  public getUserEmail() {
    const token = this.getToken();
    return this.jwtHelper.decodeToken(token)['email'];
  }
}
