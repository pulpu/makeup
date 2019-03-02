import { Component, OnInit, Input  } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
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
export class ModalComponent implements OnInit {
@Input() item: {}

myForm: FormGroup;
state: string;
category: string;

  constructor(    
    private modalService: NgbModal,
    private fb: FormBuilder,
    private route: ActivatedRoute) { }



  ngOnInit() {
    this.myForm = this.fb.group({
      agency: [''],
      company: [''],
      director: [''],
      img: [''],
      smallImg: [''],
      kind: [''],
      order: [''],
      orientation: [''],
      photographer: [''],
    })

    //this is a subscribe to the page category change
    this.route.params.subscribe(
      (params: Params) => {
        this.category = params['category'];
      }
    )
  }

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }


  changeHandler(e) {
    this.state = e;
  }

}
