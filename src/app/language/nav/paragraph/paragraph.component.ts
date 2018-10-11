import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Response } from '@angular/http';

@Component({

  selector: 'app-paragraph',
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.css']
})
export class ParagraphComponent implements OnInit {
  public animate = false; // this parameter must be send by
  pagePath: string;
  curentLang :string;

  @Input() paragraphs: string
    

  onAnimate() {
    this.animate == false ? this.animate = true : this.animate = false;
  }

  constructor(private route: ActivatedRoute) { }

   ngOnInit() {
    this.pagePath = this.route.snapshot.params['category']
       
       this.route.params.subscribe(
           (params: Params) => {
             this.pagePath = params['category'];
             this.curentLang = params['language'];
           }
         )    
 
   }

}
