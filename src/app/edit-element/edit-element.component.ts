import { Component, OnDestroy, OnInit } from '@angular/core';
import { ItemIcon } from './class/item-icon';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EditStateService } from '../state/edit/edit-state.service';
import { ItemFileManager } from '../class/item-file-manager';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-element',
  templateUrl: './edit-element.component.html',
  styleUrls: ['./edit-element.component.scss']
})
export class EditElementComponent implements OnInit, OnDestroy {
  listIcons: Array<ItemIcon> = [new ItemIcon("attachment", "attachment"),
  new ItemIcon("cloud", "cloud"),
  new ItemIcon("cloud circle", "cloud_circle"),
  new ItemIcon("folder", "folder")
  ];
  modelForm: FormGroup;
  submitted: boolean = false;
  open: boolean = false;
  sub: Subscription = new Subscription();
  constructor(public formBuilder: FormBuilder,
    private editStateService: EditStateService
  ) { }


  ngOnInit() {
    this.modelForm = this.formBuilder.group({
      id: [""],
      name: [
        "",
        [Validators.required]
      ],
      icon: [
        ""
      ],
      type: [""],
    })
    let onEdit = this.editStateService.onEdit.subscribe((res: ItemFileManager) => {
      let data = JSON.parse(JSON.stringify(res));
      this.modelForm.patchValue({ name: data.name, icon: data.icon, id: data.id, type: data.type });
      this.open = true;
    })
    this.sub.add(onEdit);
  }
  onChangeIcon(data) {
    this.modelForm.controls["icon"].setValue(data.value);
  }
  onSubmitModel() {
    this.submitted = true;
    if (this.modelForm.invalid) {
      return;
    }
    this.editStateService.updateItem(this.modelForm.value);
    this.submitted = false;
    this.open = false;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
