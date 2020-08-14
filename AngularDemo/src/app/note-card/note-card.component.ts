import { MainService } from './../services/main.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.css']
})
export class NoteCardComponent implements OnInit {

  // list to be serched
  public fieldsToSearch;

  // dependency injection
  constructor(
    public mainService: MainService
  ) { }

  ngOnInit() {
    this.initlization();
  }

  // init data
  initlization() {
    this.fieldsToSearch = ['title', 'note'];
  }
}
