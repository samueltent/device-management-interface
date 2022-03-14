import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/environments/environment';
import { loginRequest } from '../models/Requests/loginRequest.model';
import { registerRequest } from '../models/Requests/registerRequest.model';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient, private tokenStorage:TokenStorageService) {}

  login(data:loginRequest):Observable<any>{
    return this.http.post(`${BASE_URL}/Auth/login`, data);
  }

  register(data:registerRequest):Observable<any> {
    return this.http.post(`${BASE_URL}/Auth/register`, data);
  }

  isLoggedIn(): boolean {
    if(this.tokenStorage.getToken()) {
      return true;
    }
    return false;
  }
   
}
