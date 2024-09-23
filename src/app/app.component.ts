import { Component } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource } from '@angular/material';
import { ItemFileManager } from './class/item-file-manager';
import { EditStateService } from './state/edit/edit-state.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'file-manager';
  list: Array<ItemFileManager> = [];
  private transformer = (node: ItemFileManager, level: number) => {
    return {
      id: node.id,
      type: node.type,
      icon: node.icon,
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this.transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);


  constructor(private editStateService: EditStateService) {
    this.dataSource.data = [];
  }

  ngOnInit() {
    this.editStateService.onUpdate.subscribe((res: ItemFileManager) => {
      let data = JSON.parse(JSON.stringify(res));
      this.list = this.updateElement(this.list, data);
      this.dataSource.data = this.list;
    })
  }
  updateElement(elements: ItemFileManager[], data) {
    return elements.map((element) => {
      if (element.id === data.id) {
        element.update(data.name, data.icon);
        return element;
      } else if (element.children && element.children.length > 0) {
        return { ...element, children: this.updateElement(element.children, data) };
      }
      return element; // No change if element does not match
    });
  }
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  edit(data) {
    this.editStateService.editItem(data);
  }
  findElementById(elements: ItemFileManager[], id: string): ItemFileManager | null {
    for (const element of elements) {
      if (element.id === id) {
        return element; // Found the element
      }

      if (element.children && element.children.length > 0) {
        const found = this.findElementById(element.children, id);
        if (found) {
          return found; // Found in children
        }
      }
    }
    return null; // Element not found
  }
  addFoldersToMainFolder() {
    let start = this.list.length;
    for (let i = start; i < start + 50; i++) {
      this.list.push(new ItemFileManager(uuidv4(), `Folder ${i}`, "folder", "FOLDER"));
    }
    this.dataSource.data = this.list;
  }
  addFolders(node) {
    let item = this.findElementById(this.list, node.id);
    if (!item) return;
    let start = item.children ? item.children.length : 0;
    for (let i = start; i < start + 50; i++) {
      item.children.push(new ItemFileManager(uuidv4(), `Folder ${i}`, "folder", "FOLDER"));
    }
    this.dataSource.data = this.list;
  }
  addFiles(node) {
    let item = this.findElementById(this.list, node.id);
    if (!item) return;
    let start = item.children ? item.children.length : 0;
    for (let i = start; i < start + 50; i++) {
      item.children.push(new ItemFileManager(uuidv4(), `File ${i}`, ""));
    }
    this.dataSource.data = this.list;
  }
  addFilesToMainFolder() {
    let start = this.list.length;
    for (let i = start; i < start + 50; i++) {
      this.list.push(new ItemFileManager(uuidv4(), `File ${i}`, ""));
    }
    this.dataSource.data = this.list;
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.list, event.previousIndex, event.currentIndex);
    this.dataSource.data = this.list;
  }
}
