import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { LoadingService } from '../service/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loader: LoadingService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loader.handle(request.url, true);
    return next
      .handle(request)
      .pipe(
        catchError((error: any) => {
          console.log(error);
          this.loader.handle(error.url, false);
          return error;
        })
      )
      .pipe(
        map((evt: any) => {
          if (evt instanceof HttpResponse) {
            this.loader.handle(evt.url ?? "", false)
          }
          return evt;
        })
      )
  }
}
