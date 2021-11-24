// @ts-ignore
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree, CanActivateChild} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';


@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
    if (localStorage.getItem("token") !== null) {
      return true;
    } else {
      return this.router.navigate(['']);
    }
  }
}
