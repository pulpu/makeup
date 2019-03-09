import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {

constructor(private router: Router) { }

  ngOnInit() {
 
  }

  onSelect(language) {
  	let currentUrl = this.router.url; /// this will give you current url
              console.log("currentUrl: " + currentUrl)

  	let res = currentUrl.split("/");
  		  res[2] = language;
              console.log("res: " + res)

  	let newurl = res.join('').toString()
              console.log("newurl: " + newurl)

  	this.router.navigate( [ newurl]);
  };

}
