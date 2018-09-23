import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';


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
    private db: AngularFirestore,
    private router: Router, 
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.menuthree = this.db
    .collection('data')
    .snapshotChanges()
    .pipe(map(docArray => {
      return docArray.map(doc => {
        return {
          items: doc.payload.doc.data()['menu']
        }
      })
    }));
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
