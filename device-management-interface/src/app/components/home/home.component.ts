import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Device } from 'src/app/models/device.model';
import { DeviceService } from 'src/app/services/device.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  addDeviceForm:FormGroup = new FormGroup({});

  ownDevice:Device = new Device;
  isDevice:boolean = false; 

  devices:Device[] = [new Device];
  addDeviceFormVisible: boolean = false;

  constructor(private deviceService:DeviceService, private userService:UserService, private tokenStorage:TokenStorageService) { }

  ngOnInit(): void {
    this.listDevices();
    this.checkOwnDevice()
  }

  initForm() {
    this.addDeviceForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
      ]),
      type: new FormControl(null, [
        Validators.required,
      ]),
      manufacturer: new FormControl(null, [
        Validators.required
      ]),
      os: new FormControl(null, [
        Validators.required
      ]),
      osVersion: new FormControl(null, [
        Validators.required
      ]),
      processor: new FormControl(null, [
        Validators.required
      ]),
      ramAmmount: new FormControl(null, [
        Validators.required
      ])
    });
  }

  listDevices() {
    this.deviceService.getDevices().subscribe(data => {
      if(data.success){
        console.log(data.devices);
        this.devices = data.devices;
        console.log(this.devices);
      }
    });
  }

  checkOwnDevice(){
    var user = this.tokenStorage.getUser();
    if(user) {
      this.userService.getById(user.id).subscribe(data => {
        if(data.success && data.users[0].device)
        {
          this.deviceService.getDevice(data.users[0].device).subscribe(data => {
            if(data.success)
            {
              this.ownDevice = data.devices[0];
              this.isDevice = true;
            }
          })
        }
      });
    }
  }

  toggleAdd(): void{
    this.addDeviceFormVisible = !this.addDeviceFormVisible;
    this.initForm();
  }

}
