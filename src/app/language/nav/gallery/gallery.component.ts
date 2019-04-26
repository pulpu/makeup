import { Component, OnInit, ɵConsole } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ServerService } from '../../../server.service';
import { Subscription } from 'rxjs';
import { Masonry, MasonryGridItem } from 'ng-masonry-grid';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  database : Observable<any>;
  paragraphs : Observable<any>;
  items : Observable<any>;
  category : string;
  language: string;
  subscription: Subscription;
  categorypath: any;
  _masonry: Masonry;
  masonryItems: any[]; // NgMasonryGrid Grid item list

  constructor(
    private route: ActivatedRoute,
    private serverservice: ServerService,
  ) { }

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

  ngOnInit() {



    this.category = this.route.snapshot.params['category']    // here I take the page categori form the page path

    //this is a subscribe to the page path change
    this.route.params.subscribe(
      (params: Params) => {
        this.category = params['category'];
        this.language = params['language'];

        //hier I give to de sever service the page categori to make the selection in db
        this.database = this.serverservice.getData(this.category, 'items');
        this.paragraphs = this.serverservice.getData(this.category, 'paragraph');
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>',this.database)
        //make the selection for paragraph
        this.paragraphs.subscribe(result => {
          return result.map(paragraph=>{
            return this.paragraphs = paragraph.paragraph
          })
        })


      }
    )
  }
  reorderItems() {
    if (this._masonry) {
        this._masonry.reOrderItems();
    }
  }

  onNgMasonryInit($event: Masonry) {
    this._masonry = $event;
  }

}