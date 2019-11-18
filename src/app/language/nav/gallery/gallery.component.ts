import { Component, OnInit, ɵConsole  } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ServerService } from '../../../server.service';
import { Subscription } from 'rxjs';
import { Masonry, MasonryGridItem } from 'ng-masonry-grid';
import { ISubscription } from 'rxjs/Subscription';
import { EventEmitterService } from '../../../event-emitter.service';    
import { DataService } from "../../../data.service";


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit  {
  database : Observable<any>;
  paragraphs : Observable<any>;
  items : Observable<any>;
  category : string;
  language: string;
  subscription: Subscription;
  categorypath: any;
  reRenderGrid: boolean = true;

  _masonry: Masonry;
  private _removeAllSubscription: ISubscription;
  private _removeItemSubscription: ISubscription;
  private _removeFirstItemSubscription: ISubscription;
  public ismask: boolean;


  constructor(
    private route: ActivatedRoute,
    private serverservice: ServerService,
    private eventEmitterService: EventEmitterService,
    private data: DataService
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
    if (this.eventEmitterService.reInitMasonryGrid==undefined) {    
      this.eventEmitterService.reInitMasonryGrid = this.eventEmitterService.    
      invokeFunction.subscribe((name:string) => {    
        this.toggleMasonryGrid();    
      });    
    }    

    this.data.currentMaskState.subscribe(ismask => this.ismask = ismask)

    
    this.category = this.route.snapshot.params['category']    // here I take the page categori form the page path

    //this is a subscribe to the page path change
    this.route.params.subscribe(
      (params: Params) => {
        this.category = params['category'];
        this.language = params['language'];

        //hier I give to de sever service the page categori to make the selection in db
        this.database = this.serverservice.getData(this.category, 'items');
        this.paragraphs = this.serverservice.getData(this.category, 'paragraph');
        //console.log('>>>>>>>>>>>>>>>>>>>>>>>>',this.database)
        //make the selection for paragraph
        this.paragraphs.subscribe(result => {
          return result.map(paragraph=>{
            return this.paragraphs = paragraph.paragraph
          })
        })
             }
    )
  }

   
  onNgMasonryInit($event: Masonry) {
   console.log($event);
   this._masonry = $event;
  }


  toggleMasonryGrid() {
    this.reRenderGrid = false;
    setTimeout(()=>{
      this.reRenderGrid = true;
    },0)
  }

}