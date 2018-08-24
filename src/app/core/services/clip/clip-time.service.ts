import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClipTimeService {
  private clipTimeSubject = new BehaviorSubject<number>(0);
  clipTimeObservable = this.clipTimeSubject.asObservable();

  constructor() {}

  setTime(second: number) {
    this.clipTimeSubject.next(second);
  }
}
