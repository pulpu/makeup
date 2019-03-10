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
  model = { id:'',order:'', agency: '', company: '', kind: '', authour: '', orientation:'',img:'', smallImg:'' };


  constructor(
    private serverservice: ServerService,
    private route: ActivatedRoute) { }

    ngOnInit() {

      //this is a subscribe to the page path change
      this.route.params.subscribe(
        (params: Params) => {
          this.category = params['category'];
          this.language = params['language'];
  
          this.category = this.route.snapshot.params['category']    // here I take the page categori form the page path
  
         //here I give to de sever service the page categori to make the selection in db
          this.paragraphs = this.serverservice.getData(this.category, 'paragraph');
          this.database = this.serverservice.getData(this.category, 'items');
  
          this.serverservice.getItems(this.category).subscribe(
            (item: Item[]) => {
              this.arr = item;
             this.model.order = String(this.arr.length + 1) 
          });
  
          //make the selection for paragraph
          this.paragraphs.subscribe(result => {
            return result.map(paragraph=>{
              return this.paragraphs = paragraph.paragraph
            })
          })
        }
      )
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

    // ** start ** this is for admim page to add new items
  itemSubmit() {
    this.serverservice.addItem(this.model, this.category);
  }
  onDelete(item) {
    this.serverservice.deleteItem(item, this.category);
  }
// ** end **//
}
