import { Component, OnInit, Input  } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


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

  constructor(    
    private modalService: NgbModal,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      agency: ['', Validators.required],
      career: [''],
      bio: ['']
    })
  }

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }


  changeHandler(e) {
    this.state = e;
  }

}
