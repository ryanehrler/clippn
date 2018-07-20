import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { HttpInterceptor } from '@angular/common/http/src/interceptor';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

// import { Injectable } from '@angular/core';

@Injectable()
export class ClippnHttpInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      url: environment.api + request.url
      // setHeaders: {
      //   'Content-Type': 'application/json',
      //   'Access-Control-Allow-Origin': '*'
      // }
    });
    return next.handle(request);
  }
}
