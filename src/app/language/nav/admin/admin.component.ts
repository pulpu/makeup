import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ServerService } from '../../../server.service';
import { Item } from '../../../item';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  paragraphs : Observable<any>;
  category : string;
  language: string;

  arr: Item[] = [];
  model = { id:'',order:'', agency: '', company: '', kind: '', photographer: '', director:'', orientation:'',img:'', smallImg:'' };

  ngOnInit() {
    this._data.getItems().subscribe(
      (item: Item[]) => {
        this.arr = item;
        console.log(this.arr);
      }
    );

    this.category = this.route.snapshot.params['category']    // hier I take the page categori form the page path

    //this is a subscribe to the page path change
    this.route.params.subscribe(
      (params: Params) => {
        this.category = params['category'];
        this.language = params['language'];


        //hier I give to de sever service the page categori to make the selection in db
        this.paragraphs = this.serverservice.getData(this.category, 'paragraph');

        //make the selection for paragraph
        this.paragraphs.subscribe(result => {
          return result.map(paragraph=>{
            console.log(":::::::::",paragraph)
            return this.paragraphs = paragraph.paragraph
          })
        })


      }
    )
  }

  constructor(
    public _data: ServerService,
    private serverservice: ServerService,
    private route: ActivatedRoute,) { }

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
    console.log('item', item)
    this._data.deleteItem(item);
  }

  onUpdate(item) {
    this._data.updateItems(item);
  }


  //from hier are starting the methods for new item
  count: number = 1;
  countEl = (<HTMLInputElement>document.getElementById('order'));

  plus(){
    console.log(this)
      this.count++;
      console.log( this.countEl)
      // this.countEl.value = '' + this.count;
  }
  minus(){
    if (this.count > 1) {
      this.count--;
      this.countEl.value = '' + this.count;
    }  
  }

}
