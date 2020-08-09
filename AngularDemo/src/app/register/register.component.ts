import { element } from 'protractor';
import { MainService } from './../services/main.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // variables
  public form;
  public isSubmitted: boolean;
  public user: any;

  // Dependency injection
  constructor(
    public Fb: FormBuilder,
    public auth: AuthService,
    public mainService: MainService,
    public myRoute: Router
  ) { }

  ngOnInit() {
    if (this.auth.igLoggdin()) {
      this.myRoute.navigate(['list']);
    }
    this.inisializData();
    this.createForm();
  }

  // init data
  inisializData() {
    this.user = {
      name: '',
      email: '',
      password: ''
    };
    this.isSubmitted = false;
  }

  // creating form
  createForm() {
    this.form = this.Fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  // Signup User
  Register() {
    this.isSubmitted = true;
    if (this.form.valid) {
      console.log(this.user);
      this.mainService.httpService.post('/user', this.user)
        .then((resp: any) => {
          if (resp.status === 'Success') {
            const token = {
              _id: resp.data._id,
              email: resp.data.email,
              name: resp.data.name
            };
            this.auth.setTokan(token);
            this.auth.mainService.pubsubService.publishWithLast('userLoggedIn', token);
            this.myRoute.navigate(['list']);
          }
        }).catch(error => {
          console.log(`Error in creating user: ${error}`);
        });
    }
  }

  // Shorthand for form control for html
  get GetFC() {
    return this.form.controls;
  }

}
