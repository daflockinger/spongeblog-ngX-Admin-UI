import { AuthenticationService } from './authentication.service';
import { CanActivate, Router } from '@angular/router';
import { Injectable, Inject, Component } from '@angular/core';


@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(@Inject(AuthenticationService)private auth: AuthenticationService,
  @Inject(Router) private router: Router) {}

  canActivate() {
    if (this.auth.isLoggedIn()) {
      return true;
    } else {
      this.router.navigateByUrl('admin/login');
      return false;
    }
  }
}
