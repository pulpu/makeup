import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection  } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map'
import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  items: Observable<Item[]>;
  itemscollection: AngularFirestoreCollection<Item>;

  constructor(
    public db: AngularFirestore
  ) { 
    this.itemscollection = this.db.collection('data/brides/items', x => x.orderBy('order', 'asc'));

    this.items = this.itemscollection.snapshotChanges().map(
      changes => {
        return changes.map(
          a => {
            const data = a.payload.doc.data() as Item;
            data.id = a.payload.doc.id;
            console.log('data',data)
            return data;
          });
      });
  }

  getItems() {
    return this.items;
  }
  addItem(item) {
    this.itemscollection.add(item);
  }
  deleteItem(item) {
    this.db.doc(`data/brides/items/${item.id}`).delete();
  }
  
  updateItems(item, order, agency, company, kind, photographer, director, orientation, img, smallImg) {
    this.db.doc(`data/brides/items/${item.id}`).update({
      order: order,
      agency: agency,
      company: company,
      kind: kind,
      photographer: photographer,
      director: director,
      orientation: orientation,
      img: img,
      smallImg: smallImg
    })
  }

  getData(docPath, ColectionPath): Observable<any> {
    return this.db
    .collection('data/' + docPath + '/' + ColectionPath)
    .snapshotChanges()
    .pipe(map(docArray =>{
      return  docArray.map(element=>{
        console.log('element: ',element.payload.doc.data())
         return  element.payload.doc.data()
      })
    }))
  };

  getDataSnapshot(docPath, ColectionPath): Observable<any> {
    return this.db
    .collection('data/' + docPath + '/' + ColectionPath)
    .valueChanges();
  }
}
