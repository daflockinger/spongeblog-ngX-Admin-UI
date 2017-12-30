import { AuthenticationService } from './../../service/auth/authentication.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private BACKEND_LOGIN_TARGET = 'http://localhost:8081/login';
  private LOGIN_REDIRECTION_TARGET = 'admin';

  success: boolean;

  constructor(
  @Inject(ActivatedRoute) activeRouter: ActivatedRoute,
  @Inject(AuthenticationService) private authService: AuthenticationService,
  @Inject(Router) private router: Router) {

    activeRouter.queryParams.subscribe((params: any) => {
      const token = params[AuthenticationService.TOKEN_PARAM];
      this.doLogin(token);
    });
  }

  private doLogin(token: string) {
    if (token != null) {
        this.authService.updateToken(token);
        this.router.navigate([this.LOGIN_REDIRECTION_TARGET]);
        this.success = true;
      } else {
        this.success = false;
        window.location.href = this.BACKEND_LOGIN_TARGET;
      }
  }

  ngOnInit() {
  }
}
