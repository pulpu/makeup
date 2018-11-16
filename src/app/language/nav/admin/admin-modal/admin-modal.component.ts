import { Component, OnInit,Input,ViewEncapsulation  } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServerService } from '../../../../server.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

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
  customForm: FormGroup;

  arr = this.customForm;
  model = { id:'',order:'', agency: '', company: '', kind: '', photographer: '', director:'', orientation:'',img:'', smallImg:'' };
 
  ngOnInit() {
    this.customForm = this.fb.group({
      order: [''],
      agency: [''],
      company: [''],
      kind: [''],
      photographer: [''],
      director: [''],
      orientation: [''],
      img: [''],
      smallImg: [''],
    })

  }

  updateValues(dataObject: any) {
    this.customForm.patchValue({
      agency: "qsqsqsqsqsqsq11211"
    });
  }


  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    public _data: ServerService) { }

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

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

}
