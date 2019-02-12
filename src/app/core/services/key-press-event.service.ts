import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeyPressEventService {
  private eventSubject = new Subject();
  events = this.eventSubject.asObservable();

  constructor() {}

  keyPressEvent(key: string) {
    console.log('key-pressed', key);
    this.eventSubject.next(key);
  }
}
