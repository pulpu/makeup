import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../../server.service';
import { Item } from '../../../item';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  arr: Item[] = [];
  model = { agency: '', company: '', kind: '', photographer: '', director:'', orientation:'',img:'', smallImg:'' };

  ngOnInit() {
    this._data.getItems().subscribe(
      (item: Item[]) => {
        this.arr = item;
        console.log(this.arr);
      }
    );
  }

  constructor(public _data: ServerService) { }

  itemSubmit() {
    this._data.addItem(this.model);
    this.model.agency = '';
    this.model.company = '';
    this.model.kind = '';
    this.model.photographer = '';
    this.model.director = '';
    this.model.orientation = '';
    this.model.img = '';
    this.model.smallImg = '';
  }
  onDelete(item) {
    console.log('item', item)
    this._data.deleteItem(item);
  }

  onUpdate(item) {
    this._data.updateItems(item);
  }

}
