import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-btns',
  templateUrl: './add-btns.component.html',
  styleUrls: ['./add-btns.component.scss']
})
export class AddBtnsComponent implements OnInit {
  @Output() onAddFolders = new EventEmitter<any>();
  @Output() onAddFiles = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  addFolders() {
    this.onAddFolders.emit(null);
  }
  addFiles() {
    this.onAddFiles.emit(null);
  }
}
