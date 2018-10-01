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

  getData(path): Observable<any> {
    return this.db
    .collection('data')
    .snapshotChanges()
    .pipe(map(docArray =>{
      return docArray[0].payload.doc.data()[path]
    }))
  }
}
