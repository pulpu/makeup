import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ServerService } from '../../../server.service';
import { Item } from '../../../item';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  database : Observable<any>;
  paragraphs : Observable<any>;
  items : Observable<any>;
  category : string;
  language: string;
  subscription: Subscription;
  categorypath: any;

  arr: Item[] = [];
  model = { id:'',order:'', agency: '', company: '', kind: '', photographer: '', director:'', orientation:'',img:'', smallImg:'' };

  ngOnInit() {
    // this._data.getItems('brides').subscribe(
    //   (item: Item[]) => {
    //     this.arr = item;
    //   }
    // );



    //this is a subscribe to the page path change
    this.route.params.subscribe(
      (params: Params) => {
        this.category = params['category'];
        this.language = params['language'];

        this.category = this.route.snapshot.params['category']    // here I take the page categori form the page path
        console.log('>>>>',this.category)

       //here I give to de sever service the page categori to make the selection in db
        this.paragraphs = this.serverservice.getData(this.category, 'paragraph');
        this.database = this.serverservice.getData(this.category, 'items');

        this._data.getItems(this.category).subscribe(
          (item: Item[]) => {
            this.arr = item;
        });

        
        //make the selection for paragraph
        this.paragraphs.subscribe(result => {
          console.log('xxx',result)
          return result.map(paragraph=>{
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


    // ** start ** this is for admim page to add new items
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
// ** end **//
}
