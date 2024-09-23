import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditStateService {
  onEdit: Subject<any> = new Subject();
  onUpdate: Subject<any> = new Subject();
  constructor() { }
  public editItem(data) {
    this.onEdit.next(data);
  }
  public updateItem(data) {
    this.onUpdate.next(data);
  }
}
