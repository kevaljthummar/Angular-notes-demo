import { HttpService } from './http.service';
import { Injectable } from '@angular/core';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  // veriable
  public noteData: any = [];
  public noteItem: any = {};
  public addNewCard: boolean;

  constructor(
    public httpService: HttpService,
    public myRoute: Router
  ) { }

  // remove note data
  removeNote(noteId, index) {
    const self = this;

    // Confirm before removing
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this Note!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      // if yes , begin process
      if (result.value) {
        const url = '/note/' + noteId;

        self.httpService.delete(url).then((resp: any) => {
          if (resp.status === 'success') {
            self.noteData.splice(index, 1);
            // this.myRoute.navigate(['list']);
          }
        }).catch(error => {
          console.log(`Error in deleting note : ${error}`);
        });

      }
    });
  }

  // set note data and display edit note form
  editNote(noteItem) {
    this.noteItem = noteItem;
    this.addNewCard = true;
  }

}
