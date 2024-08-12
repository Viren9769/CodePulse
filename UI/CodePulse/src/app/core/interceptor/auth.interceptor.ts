import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable()
export class authInterceptor implements HttpInterceptor {
 
 constructor(private cookieservice: CookieService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authrequest = request.clone({
      setHeaders: {
        'Authorization': this.cookieservice.get('Authorization')
      }
    });

    return next.handle(authrequest);
  }
}
