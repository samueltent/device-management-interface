import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/environments/environment';
import { assignDeviceRequest } from '../models/Requests/assignDeviceRequest.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  getById(id: string): Observable<any> {
    return this.http.get(`${BASE_URL}/Users/${id}`);
  }

  assignDeviceToUser(userId: string, deviceRequest: assignDeviceRequest):Observable<any>
  {
    return this.http.post(`${BASE_URL}/Users/${userId}`, deviceRequest);
  }
}
