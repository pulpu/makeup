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
    // server: any[];
    @Input() paragraph: string
    

  onAnimate() {
    // this.state == 'normal' ? this.state = 'highlighted' : this.state = 'normal';
    this.animate == false ? this.animate = true : this.animate = false;
  }

  constructor(
    private route: ActivatedRoute, 
    private router: Router) {
      // router.events.subscribe((val) => {
      // // ----------------- for grid -------------
      //    this.serverService.getServer()
      //      .subscribe(
      //          (server: any[]) => this.server = server[this.user]['paragraph'],
      //          (error) => console.log(error)
      //        );
      //        this.animate = false; // PBI 0006
      //    //-------------- end for grid  ------------
      //    })
 
   }

   ngOnInit() {
    this.pagePath = this.route.snapshot.params['category']
       
       this.route.params.subscribe(
           (params: Params) => {
             this.pagePath = params['category'];
           }
         )    
 
   }

}
