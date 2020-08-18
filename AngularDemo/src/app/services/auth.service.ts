import { MainService } from './main.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public mainService: MainService,
    private myRoute: Router
  ) { }

  // set localstorage data
  setTokan(token: any) {
    return this.mainService.setLocalStorage('loggedInUser', token);
  }

  // get localstorage data
  getTokan() {
    return this.mainService.getLocalStorage('loggedInUser');
  }

  igLoggdin() {
    return this.getTokan() !== null;
  }

  // remove tokan
  logout() {
    localStorage.removeItem('loggedInUser');
    this.myRoute.navigate(['login']);
  }
}
