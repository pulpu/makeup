import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ServerService } from './../../server.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {
  menuthree : Observable<any>;
  public categorys: any[];
  public categoryid;
  public menu;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private serverservice: ServerService,
  ) { }

  ngOnInit() {
    //hier I give to de sever service the page categori to make the selection in db
    this.menuthree = this.serverservice.getDataSnapshot('menu', 'en');
  }

   
  onClick(category) {
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


}
