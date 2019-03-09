import { Component, OnInit, DoCheck, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ServerService } from './../../server.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { DataService } from "../../data.service";


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
        left: '-1100px'
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
  ismask: boolean;
  isdevice: string;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private serverservice: ServerService,
    private data: DataService
  ) { }


  changeState() {
    if(this.isdevice !== 'desktop') {
      this.currentState = this.currentState === 'initial' ? 'final' : 'initial';
    }
    this.data.changeMaskState(false) ;
  }

  ngOnInit() {
    this.menuthree = this.serverservice.getDataSnapshot('menu', 'en');
    this.data.currentdevice.subscribe(isdevice => this.isdevice = isdevice)
    this.data.currentMaskState.subscribe(ismask => this.ismask = ismask)
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

ngDoCheck() {
    $(".fancybox-imgw").fancybox();
  }


}
