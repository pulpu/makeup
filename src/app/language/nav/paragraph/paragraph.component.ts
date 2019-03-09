import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Response } from '@angular/http';
import { DataService } from "../../../data.service";
import * as Rx from "rxjs";

@Component({

  selector: 'app-paragraph',
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.css']
})
export class ParagraphComponent implements OnInit {
 // public animate = false; // this parameter must be send by
  pagePath: string;
  curentLang :string;
  public ismask: boolean;
  @Input() paragraphs: string
  subject = new Rx.Subject();
    

  onAnimate() {
    if(this.ismask == false) {
      this.data.changeMaskState(true);
      return this.ismask
    } else {
      this.data.changeMaskState(false);
      return this.ismask
    }
  }

  constructor(
    private route: ActivatedRoute,
    private data: DataService) { }

   ngOnInit() {
      this.data.currentMaskState.subscribe(ismask => {
        this.ismask = ismask
      }
    )

    this.pagePath = this.route.snapshot.params['category']
       
    this.route.params.subscribe(
        (params: Params) => {
          this.pagePath = params['category'];
          this.curentLang = params['language'];
        }
      )    
   }


}
