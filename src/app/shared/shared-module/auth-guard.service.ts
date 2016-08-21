import {
  Injectable
} from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import {
  AuthService
} from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.authService.user) {
      this.authService.initUser();
    }
    if (this.authService.user && this.authService.user.email && this.authService.user.emailVerified) {
      return true;
    };
    this.authService.redirectUrl = state.url;
    this.router.navigate(['/sign']);
  }
}

