import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.registerForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8)
      ]),
      repeatPassword: new FormControl(null, [
        Validators.required
      ]),
      name: new FormControl(null, [
        Validators.required
      ]),
      role: new FormControl(null, [
        Validators.required
      ]),
      location: new FormControl(null, [
        Validators.required
      ])
    });
  }

  onSubmit():void {
    if(this.registerForm.valid)
    {
      this.authService.register(this.registerForm.value).subscribe(data => {
        if(data.success) {
          this.router.navigate(['/login']);
        }
        else {
          alert(data.message);
        }
      });
    }
  }

}
