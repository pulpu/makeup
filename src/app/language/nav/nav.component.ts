import { Component, OnInit, DoCheck } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ServerService } from './../../server.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  animations: [
    trigger('changeDivSize', [
      state('initial', style({
        left: '0px'
      })),
      state('final', style({
        left: '-500px'
      })),
      transition('initial=>final', animate('0.9s 500ms ease-in')),
      transition('final=>initial', animate('0.9s 500ms ease-out'))
    ]),
  ]
})

export class NavComponent implements OnInit, DoCheck {
  menuthree : Observable<any>;
  public categorys: any[];
  public categoryid;
  public menu;
  currentState = 'initial';


  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private serverservice: ServerService,
  ) { }

  changeState() {
    console.log('>>>>', this.currentState)
    this.currentState = this.currentState === 'initial' ? 'final' : 'initial';
    console.log('<<<<<',this.currentState)
  }


  ngOnInit() {
    //hier I give to de sever service the page categori to make the selection in db
    this.menuthree = this.serverservice.getDataSnapshot('menu', 'en');
  }

   
  onClickCategory(category) {
    let currentUrl = this.router.url; /// this will give you current url

    var res = currentUrl.split("/");
    console.log("res: ", res);
        res = res.slice(0, 3);
              console.log("res2: ", res);

    var resUrl = res.join("/");
          console.log("resUrl: ", resUrl);


   this.categorys = ["cover", "editorial", "video", "brides", "print", "backstage", "makingoff", "caracters", "contact"];

    if(this.categorys.find((element)=>{ return element === category}) === undefined ) {
      this.router.navigate( [ "/.404"], {relativeTo: this.route, queryParamsHandling: 'preserve'});
    }
    else {
        this.router.navigate( [resUrl, category], {relativeTo: this.route, queryParamsHandling: 'preserve'});  // {relativeTo: this.route} nu cred ca este necesar aici si queryParamsHandling: 'preserve'
   // this.router.navigate( [resUrl, category], {queryParams: {allowEdit: '1'}, fragment: 'loader'}); //this is an exemple that has queryParams and fragmanet
        this.categoryid = category;
    }

  }

//   buttonHamburger() { // this is the hambuger button for mobile (hiding and showing the menu)
//     console.log('asadsas')
//     let nav: any = document.getElementById('nav');
//     let test:number =Number(window.getComputedStyle(nav).left.replace('px', '')) ;
//    let screenWith = document.documentElement.clientWidth;

//    if (test === 0) {
//           nav.style.left = test - screenWith + 'px' ;
//        } else {
//         nav.style.left = '-40px';
//        }
//  }
ngDoCheck() {
    $(".fancybox-imgw").fancybox();
  }


}
