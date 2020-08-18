import { NoteService } from './note.service';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  // variables
  public isListViewActive: boolean;
  public searchText;

  constructor(
    public httpService: HttpService,
    public pubsubService: NgxPubSubService,
    public noteService: NoteService
  ) { }

  // set localstorage with/without data
  setLocalStorage(key, data, isJson: boolean = true) {
    if (isJson === true) {
      data = JSON.stringify(data);
    }
    localStorage.setItem(key, data);
  }

  // get localstorage with/without json data
  getLocalStorage(key, isJson: boolean = true) {
    let data = localStorage.getItem(key);
    if (isJson === true) {
      data = JSON.parse(data);
    }
    return data;
  }

  // to set sweetalert
  Comman_Swal(title, message, type: any = 'error') {
    swal.fire(title, message, type);
  }

}
