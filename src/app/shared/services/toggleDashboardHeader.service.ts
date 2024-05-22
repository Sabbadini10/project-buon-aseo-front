import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleDashboardHeaderService {
  private booleanSource = new Subject<boolean>();
  booleanValue$ = this.booleanSource.asObservable();

  constructor(){}
  
  updateBooleanValue(value: boolean) {
    this.booleanSource.next(value);
  }
 
}
