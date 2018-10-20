import { Component, OnInit,Input,ViewEncapsulation  } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServerService } from '../../../../server.service';
import { Item } from '../../../../item';

@Component({
  selector: 'app-admin-modal',
  templateUrl: './admin-modal.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .dark-modal .modal-content {
      background-color: #292b2c;
      color: white;
    }
    .dark-modal .close {
      color: white;
    }
    .light-blue-backdrop {
      background-color: #5cb3fd;
    }
  `]
})
export class AdminModalComponent implements OnInit {
  @Input() item: {}

  arr: Item[] = [];
  model = { id:'',order:'', agency: '', company: '', kind: '', photographer: '', director:'', orientation:'',img:'', smallImg:'' };
 
  ngOnInit() {
    this._data.getItems().subscribe(
      (item: Item[]) => {
        this.arr = item;
        console.log(this.arr);
      }
    );
  }
  constructor(
    private modalService: NgbModal,
    public _data: ServerService,
    private serverservice: ServerService,) { }
  itemSubmit() {
    this._data.addItem(this.model);
    this.model.id = '';
    this.model.order = '';
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
    this._data.deleteItem(item);
  }

  onUpdate(item, order, agency, company, kind, photographer, director, orientation, img, smallImg) {
    this._data.updateItems(item, order, agency, company, kind, photographer, director, orientation, img, smallImg);
  }

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }


}
