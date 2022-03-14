import { Injectable } from '@angular/core';
import { User } from '../models/user.model';


const AUTH_TOKEN = 'auth-token';
const USER_DATA = 'auth-user';

@Injectable({
  providedIn: 'root'
})

export class TokenStorageService {

  constructor() { }

  signOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(AUTH_TOKEN);
    window.sessionStorage.setItem(AUTH_TOKEN, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(AUTH_TOKEN);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_DATA);
    window.sessionStorage.setItem(USER_DATA, JSON.stringify(user));
  }

  public getUser(): User | null {
    const user = window.sessionStorage.getItem(USER_DATA);
    if(user) {
      return JSON.parse(user);
    }

    return null;
  }

}
