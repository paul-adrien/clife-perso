import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth_service';
import { environment } from 'src/environments/environment';

const AUTH_API = '';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthGuardService implements CanActivate {
  content = '';
  constructor(public auth: UserService, public router: Router, private AuthService: AuthService,
    private http: HttpClient) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let res: boolean;

    return this.AuthService.checkIfUserCo()
      .toPromise()
      .then(
        data => {
          if (data['status'] === true) {
            return true;
          } else {
            this.AuthService.logOut();
            return false;
          }
        },
        err => {
          this.AuthService.logOut();
          return false;
        }
      );
  }

  verify(token, id): Observable<any> {
    return this.http.post(
      AUTH_API + "verifyToken",
      {
        id: id,
        token: token,
      },
      httpOptions
    );
  }
}
