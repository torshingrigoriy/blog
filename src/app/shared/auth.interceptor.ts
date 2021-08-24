import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {AuthService} from "../admin/shared/services/auth.service";
import {Router} from "@angular/router";
import {catchError, tap} from "rxjs/operators";

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private _auth: AuthService,
    private _router: Router
  ) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this._auth.isAuthenticated()) {
      req = req.clone({
        setParams: {
          auth: this._auth.token
        }
      })
    }
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse)=>{
          console.log(error)
          if(error.status == 401) {
            this._auth.logout()
            this._router.navigate(['/admin', 'login'], {
              queryParams: {
                authFailed: true
              }
            })
          }
          return throwError(error)
        })
      );
  }

}
