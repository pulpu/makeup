import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  private isdevice = new BehaviorSubject('default');
  currentdevice = this.isdevice.asObservable();

  constructor() { }

  changedevice(device: string) {
    this.isdevice.next(device)
  }

}