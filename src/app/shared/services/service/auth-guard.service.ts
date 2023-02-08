import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  isLogged: boolean = false;
  constructor(public auth: AuthService, public route: Router) { }
  async canActivate(): Promise<boolean> {
    if (!await this.auth.isAuthenticated()) {
      this.route.navigate(['login'])
      return false
    }
    return true
  }
}
