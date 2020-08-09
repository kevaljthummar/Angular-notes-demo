import { fade } from './../animations';
import { MainService } from './../services/main.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';


@Component({
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
  animations: [
    fade
  ]
})
export class SideBarComponent implements OnInit, OnDestroy {

  constructor(
    public authService: AuthService,
    public mainService: MainService
  ) { }

  // login in Users data
  public UserData;

  ngOnInit() {
    this.initialization();
  }

  initialization() {
    this.UserData = this.authService.getTokan();
    this.mainService.isListViewActive = false;
    this.Subscription();
  }

  Subscription() {
    this.mainService.pubsubService.subscribe('userLoggedIn', UserData => {
      this.UserData = UserData;
    });
  }

  ngOnDestroy() {
    this.UserData = {};
  }

}
