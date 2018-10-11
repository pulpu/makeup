import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ServerService } from '../../../server.service';
import { CategoryService } from '../../../category.service';
import { Subscription } from 'rxjs';

// declare var jquery:any;
// declare var $ :any;

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
  constructor(
    private route: ActivatedRoute,
    private serverservice: ServerService,
  ) { 
  
  }

  ngOnInit() {
    this.category = this.route.snapshot.params['category']    // hier I take the page categori form the page path

    //this is a subscribe to the page path change
    this.route.params.subscribe(
      (params: Params) => {
        this.category = params['category'];
        this.language = params['language'];

        //hier I give to de sever service the page categori to make the selection in db
        this.database = this.serverservice.getData(this.category, 'items');
        this.paragraphs = this.serverservice.getData(this.category, 'paragraph');

        //make the selection for paragraph
        this.paragraphs.subscribe(result => {
          return result.map(paragraph=>{
            return this.paragraphs = paragraph.paragraph
          })
        })


      }
    )
  }

// ngDoCheck() {
//     $(".fancybox-imgw").fancybox();
//     $(document).ready(function() {
//       $(".fancybox-imgw").fancybox();
//     });
//   }
}