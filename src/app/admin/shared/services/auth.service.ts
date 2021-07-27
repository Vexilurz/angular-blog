import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FbAuthResponse, User } from '../interfaces';
import { Observable, ObservableInput, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class AuthService {

  public error$: Subject<string> = new Subject<string>()

  constructor(private http: HttpClient) { }
  
  get token(): string {
    let ed = localStorage.getItem('fb-token-exp')    
    const expDate = ed ? new Date(ed) : new Date();
    if (new Date() >= expDate) {
      this.logout()
      return ''
    }
    const t = localStorage.getItem('fb-token');
    return t ? t : ''
  }

  login(user: User): Observable<any> {
    user.returnSecureToken = true;
    return this.http.post<FbAuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      )
  }

  logout() {
    this.setToken(null)
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  private handleError(err: HttpErrorResponse) {
    const {message} = err.error.error
    switch (message) {
      case 'INVALID_PASSWORD':
        this.error$.next('Invalid password!')
        break;
      case 'INVALID_EMAIL':
        this.error$.next('Invalid email!')
        break;  
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Email not found!')
        break;    
      default:
        break;
    }
    return throwError(err)
  }

  private setToken(response: FbAuthResponse | null) {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-exp', expDate.toISOString());
    } else {
      localStorage.clear();
    }
  }
}