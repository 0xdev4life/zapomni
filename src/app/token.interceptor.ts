import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {TicketsService} from './tickets.service';

@Injectable()

export class TokenInterceptor implements HttpInterceptor{
  constructor(
    private ticket: TicketsService,
  ) {  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.ticket.isAuthenticated()) {
      // console.log('adding auth token')
      req = req.clone({
        setHeaders: {
          authorization: `Bearer ${this.ticket.getToken()}`
        }
      });
    }
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => this.handleAuthError(error))
    );
  }

  private handleAuthError(error: HttpErrorResponse): Observable<any> {
    // if (error.status === 401) {
    //
    // }
    return throwError(error);
  }
}
