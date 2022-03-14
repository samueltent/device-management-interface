import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  loggedInUser: string  = "";

  constructor(private tokenStorage:TokenStorageService) { }

  ngOnInit(): void {
  }

  isLoggedIn(): boolean {
    if(this.tokenStorage.getToken()) {
      var user = this.tokenStorage.getUser();
      if(user) {
        this.loggedInUser = user.name;
      }
      return true;
    }
    return false;
  }

  logOut() {
    this.tokenStorage.signOut();
    window.location.reload();
  }

}
