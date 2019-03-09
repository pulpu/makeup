import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  private isdevice = new BehaviorSubject('default');
  currentdevice = this.isdevice.asObservable();

  private ismask = new BehaviorSubject(false);
  currentMaskState = this.ismask.asObservable();
  constructor() { }

  changedevice(device: string) {
    this.isdevice.next(device)
  }

  changeMaskState(state: boolean) {
    this.ismask.next(state)
  }

}