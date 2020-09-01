import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import { Events} from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  private token = null;

  constructor(
    private http: HttpClient
  ) { }

  init(): Observable<any> {
    return this.http.get<any>('/api/widget/v1/settings', {observe: 'response'})
      .pipe(
        tap(response => {

          const tkn = response.headers.get('x-auth-token');

          localStorage.setItem('x-auth-token', tkn);
          this.setToken(tkn);
      })
      );
  }

  fetch(date: string): Observable<Events[]> {
    return this.http.get<Events[]>(`/api/widget/v1/nearest_events_by_date?date=${date}&date_interval=90`);
  }

  setToken(token: string): void {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }


}
