import { Component, Input, OnInit } from '@angular/core';
import { Device } from 'src/app/models/device.model';
import { assignDeviceRequest } from 'src/app/models/Requests/assignDeviceRequest.model';
import { assignUserRequest } from 'src/app/models/Requests/assignUserRequest.model';
import { DeviceService } from 'src/app/services/device.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})

export class CardComponent implements OnInit {

  @Input() isDevice: boolean = false;

  @Input() device: Device = new Device;
  owner: string | null = null;

  constructor(private deviceService:DeviceService, private userService:UserService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.showOwner(this.device);
  }

  showOwner(device:Device): void
  {
    if(device.user != null)
    {
      this.userService.getById(device.user).subscribe(data => {
        if(data.success)
        {
          this.owner = data.users[0].name;
        }
      });
    } else {
      this.owner = null;
    }
  }

  onSubmit() {
    var user = this.tokenStorage.getUser();
    if(user)
    {
      var deviceRequest = new assignDeviceRequest;
      deviceRequest.deviceId = this.device.id;
      this.userService.assignDeviceToUser(user.id, deviceRequest).subscribe(data => {
        if(data.success)
        {
          var userRequest = new assignUserRequest;
          if(user)
          {
            userRequest.userId = user.id;
            this.deviceService.assignUserToDevice(this.device.id, userRequest).subscribe(data => {
              if(data.success) {
                window.location.reload();
              }
            });
          }
        }
      });
    }
  }

}
