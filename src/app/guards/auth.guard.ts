import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private auth: AuthService) {
  }

  /**
   * Only allow users that have already been successfully authenticated.
   * @param route Activated Route Snapshot.
   */
  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    const isAuth = await this.auth.isAuthenticated();
    if (!isAuth) {
      this.router.navigateByUrl('/login');
      return false;
    } else {
      return true;
    }
  }

}
