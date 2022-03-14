import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BASE_URL } from 'src/environments/environment';
import { Device } from '../models/device.model';
import { assignUserRequest } from '../models/Requests/assignUserRequest.model';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private http:HttpClient) { }

  getDevices(): Observable<any> {
    return this.http.get(`${BASE_URL}/Devices`);
  }

  getDevice(id:string):Observable<any> {
    return this.http.get(`${BASE_URL}/Devices/${id}`);
  }

  assignUserToDevice(deviceId: string, userRequest:assignUserRequest): Observable<any> {
    return this.http.post(`${BASE_URL}/Devices/${deviceId}`, userRequest);
  }

}
