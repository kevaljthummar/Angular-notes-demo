import { FormBuilder, Validators } from '@angular/forms';
import { MainService } from './../services/main.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {

  // ref to Dom element
  @ViewChild('takeNewNote', { static: false }) takeNewNote: ElementRef;

  // vatiable
  public form;
  public isSubmited: boolean;

  constructor(
    public fb: FormBuilder,
    public mainService: MainService
  ) { }

  ngOnInit() {
    this.initilization();
    this.createForm();
    this.bindEventKey();
    this.getnoteData();
  }

  // init data
  initilization() {
    this.mainService.noteService.noteItem = { title: '', note: '' };
    this.mainService.noteService.addNewCard = false;
    this.isSubmited = false;
  }

  //  createReactive form
  createForm() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      note: ['', Validators.required]
    });
  }

  // bind keybord key
  bindEventKey() {
    document.addEventListener('keyup', (e: KeyboardEvent) => {
      // tslint:disable-next-line: deprecation
      if (e.keyCode === 27) {
        if (this.mainService.noteService.noteItem.title && this.mainService.noteService.noteItem.note) {
          // add new note
          this.addNewNote();
        } else {
          this.initilization();
        }
      }
    });
  }

  // get current user logedin data
  getnoteData() {
    const userData: any = this.mainService.getLocalStorage('loggedInUser');
    // tslint:disable-next-line: no-shadowed-variable
    const url = '/note/' + userData.email;

    this.mainService.httpService.get(url).then((resp: any) => {
      // this.mainService.noteService.noteData = resp.data; // not working
      // console.log(this.mainService.noteService.noteData);
      // console.log(`${this.mainService.noteService.noteData.length}`);
      // console.log(resp.data);
      this.mainService.noteService.noteData.push(resp.data);
      console.log(this.mainService.noteService.noteData.length);
    }).catch(error => {
      console.log(`Error while geting notes: ${error}`);
    });
  }

  // add new note
  addNewNote() {
    this.isSubmited = true;

    // return if form is invalid
    if (!this.form.valid) { return; }

    // get loacl userData
    const userData: any = this.mainService.getLocalStorage('loggedInUser');

    let Url = '/note';

    // push note
    // console.log(this.mainService.noteService.noteItem);
    if (this.mainService.noteService.noteItem.hasOwnProperty('_id')) {
      // console.log(this.mainService.noteService.noteItem._id);
      // tslint:disable-next-line: no-string-literal
      Url += '/' + this.mainService.noteService.noteItem['_id'];
      this.mainService.httpService.put(Url, this.mainService.noteService.noteItem)
        .then(resp => {
          this.mainService.noteService.noteData.push(this.mainService.noteService.noteItem);
          this.initilization();
        }).catch(error => {
          console.log(`Error in creating note: ${error}`);
        });
    } else {
      this.mainService.noteService.noteItem.email = userData.email;
      this.mainService.httpService.post(Url, this.mainService.noteService.noteItem).then(resp => {
        this.mainService.noteService.noteData.push(this.mainService.noteService.noteItem);
        this.initilization();
      }).catch(error => {
        console.log(`Error in creating note : ${error}`);
      });
    }

  }

  // when user starts typing in Take a note field
  // show create new note panel
  enableAddNewNote() {
    this.mainService.noteService.addNewCard = true;
    setTimeout(() => {
      this.takeNewNote.nativeElement.focus();
    }, 100);
  }

  // Shorthand of form controls
  get List_FC() {
    return this.form.controls;
  }

  // testing
  // removeNoteData($event) { console.log($event); }

}
