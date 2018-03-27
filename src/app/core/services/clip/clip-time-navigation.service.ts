import { Injectable } from '@angular/core';
import { EventEmitter } from 'events';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ClipTimeNavigationService {
  currentTime: number;
  currentTimeSubject: Subject<number> = new Subject();

  constructor() {}

  gotoTime(time: number) {
    this.currentTime = time;
    this.currentTimeSubject.next(time);
  }
}
