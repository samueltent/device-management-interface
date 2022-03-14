import { Component, Input, OnInit } from '@angular/core';
import { Device } from 'src/app/models/device.model';
import { assignDeviceRequest } from 'src/app/models/Requests/assignDeviceRequest.model';
import { assignUserRequest } from 'src/app/models/Requests/assignUserRequest.model';
import { DeviceService } from 'src/app/services/device.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-devices',
  templateUrl: './my-devices.component.html',
  styleUrls: ['./my-devices.component.scss']
})
export class MyDevicesComponent implements OnInit {

  @Input() device:Device = new Device;
  @Input() isDevice: boolean = false;

  constructor(private userService:UserService, private deviceService:DeviceService, private tokenStorage:TokenStorageService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    var user = this.tokenStorage.getUser();
    if(user) {
      var deviceRequest = new assignDeviceRequest;
      deviceRequest.deviceId = this.device.id;
      deviceRequest.removeAssignment = true;
      this.userService.assignDeviceToUser(user.id, deviceRequest).subscribe(data => {
        if(data.success)
        {
          if(user)
          {
            var userRequest = new assignUserRequest;
            userRequest.userId = user.id;
            userRequest.removeAssignment = true;
            this.deviceService.assignUserToDevice(this.device.id, userRequest).subscribe(data => {
            if(data.success)
            {
              window.location.reload();
            }
          });
          }
        }
      });
    }
  }




}
