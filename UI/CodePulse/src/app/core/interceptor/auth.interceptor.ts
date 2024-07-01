import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { InvokeFunctionExpr } from '@angular/compiler';
import { Injectable, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';



@Injectable()
export class authInterceptor implements HttpInterceptor {
  constructor(private cookieservice: CookieService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authRequest = req.clone({
      setHeaders: {
        'Authorization' : this.cookieservice.get('Authorization')

      }
    });
    return next.handle(authRequest);
  }
}