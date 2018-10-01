import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categorypath : 'brides'

  private subject = new Subject<any>();
 
  sendCategory(categorypath: string) {
      this.subject.next({ text: categorypath });
  }

  clearCategory() {
      this.subject.next();
  }

  getCategory(): Observable<any> {
      return this.subject.asObservable();
  }
}
