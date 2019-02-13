import { ContextEnum, ContextService } from '../context';
import { Injectable } from '@angular/core';
import { KeyPress } from './keyPressEvent.class';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeyPressEventService {
  private currentContext: ContextEnum;
  private eventSubject = new Subject<KeyPress>();
  events = this.eventSubject.asObservable();

  constructor(private contextService: ContextService) {
    contextService.currentContext.subscribe(currContext => {
      this.currentContext = currContext;
    });
  }

  keyPressEvent(key: string) {
    this.eventSubject.next({
      key,
      context: this.currentContext
    });
  }

  registerContext(context: ContextEnum) {
    this.contextService.addContext(context);
  }
  popContext() {
    this.contextService.popContext();
  }
}
