import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Menu } from '../nav/menu.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  menuthree : Observable<any>;

  constructor(
    private db: AngularFirestore
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
    }))
  }


}
