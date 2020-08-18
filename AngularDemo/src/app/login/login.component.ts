import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form;
  public isSubmitted: boolean;
  public user: any;

  constructor(
    private Fb: FormBuilder,
    private myRoute: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {

    // redirect user if alrady logedin
    if (this.auth.igLoggdin()) {
      this.myRoute.navigate(['list']);
    }

    this.inisilazeData();
  }

  inisilazeData() {
    // init user data
    this.user = {
      email: '',
      password: ''
    };

    // to hide error on from load
    this.isSubmitted = false;

    // create login reactive form
    this.CreateForm();
  }

  // create login reactive form
  CreateForm() {
    this.form = this.Fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    // set flag to show error
    this.isSubmitted = true;

    if (this.form.valid) {

      // hit url
      this.auth.mainService.httpService
        .post('/user/login', this.user).then((resp: any) => {

          // if res was success
          if (resp.status === 'Success') {

            // create tokan to store it in local storage
            const token = {
              _id: resp.data._id,
              email: resp.data.email,
              name: resp.data.name
            };

            // set token via auth
            this.auth.setTokan(token);

            // publish event to reset user data
            this.auth.mainService.pubsubService.publishWithLast('userLoggedIn', token);

            // redirect to list
            this.myRoute.navigate(['list']);

          } else {
            // display error message
            this.auth.mainService.Comman_Swal('Error', 'Invalid Login Credentials');
          }

        }).catch(error => {
          console.log(`Error in login : ${error}`);
        });

    }
  }

  // shorthand of form controls for html
  get FormCon() {
    return this.form.controls;
  }

}
