import { Injectable, EventEmitter  } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';    


@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  invokeFunction = new EventEmitter();    
  subsVar: Subscription;    
  reInitMasonryGrid: Subscription; 
    
  constructor() { }    
    
 
  togleGrid() {    
    this.invokeFunction.emit();    
  }  

}
