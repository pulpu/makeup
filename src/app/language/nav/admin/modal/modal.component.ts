import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ServerService } from '../../../../server.service';
import { Observable } from 'rxjs';
import { Item } from '../../../../item';



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
itemOrder: string = '';

database : Observable<any>;
items: Observable<any>;
language: string;
arr: Item[] = [];
arrayOfOrders: any[]
duplicateOrder: any
  constructor(    
    private modalService: NgbModal,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private serverservice:ServerService) { }



  ngOnInit() {
    this.myForm = this.fb.group({
      agency: [''],
      company: [''],
      authour: [''],
      img: [''],
      smallImg: [''],
      kind: [''],
      order: [''],
      orientation: [''],
    })

    //this is a subscribe to the page category change
    this.route.params.subscribe(
      (params: Params) => {
        this.category = params['category'];
      }
    )
   
  }

  openLg(content,event) {
    
    this.modalService.open(content, { size: 'lg' });
    event.stopPropagation();

  }

  changeHandler(e) {
    this.state = e;
  }

  onKey(event: any) { 
    this.itemOrder = event.target.value;
    const initialItemOrder: number = this.item['order'];
    
    //this is a subscribe to the page path change
    this.route.params.subscribe(
      (params: Params) => {
        this.category = params['category'];
        this.language = params['language'];

        this.category = this.route.snapshot.params['category']    // here I take the page categori form the page path

        //here I give to de sever service the page categori to make the selection in db
        this.database = this.serverservice.getData(this.category, 'items');

        this.serverservice.getItems(this.category).subscribe(
          (item: Item[]) => {
            this.arr = item;
        });
      }
    )

    if(this.arr.length > 0){
    this.arrayOfOrders =  this.arr.map((item, index)=>{
          return {'id':item.id,'order': item.order}
      })
      this.duplicateOrder = this.arrayOfOrders.filter(obj=>{
        if(obj.id  !== this.item['id']) {
          return obj.order === this.itemOrder
        }
      })

    this.serverservice.updateItemsOrder(this.duplicateOrder[0]['id'], initialItemOrder, this.category)
    }
  }

  urlParser(url){
    if(typeof url !== 'undefined') {
      const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
      let match = url.match(regExp);
      if (match&&match[7].length==11){
          let youtubeID=match[7];
          return 'https://img.youtube.com/vi/'+ youtubeID + '/hqdefault.jpg'
      }else{
          return url;
      }
    } else {
      return '';
    }
  }



}
