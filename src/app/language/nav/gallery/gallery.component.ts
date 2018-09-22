import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Gallery } from './gallery.modale';
import { pipe } from '@angular/core/src/render3/pipe';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  items : Observable<any>;

  constructor(
    private db: AngularFirestore
  ) { }

  ngOnInit() {
    this.items = this.db
    .collection('data')
    .snapshotChanges()
    .pipe(map(docArray =>{
      return docArray[0].payload.doc.data()['brides']['items']
    }))
  }
}