import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(
    private db: AngularFirestore
  ) { }

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
