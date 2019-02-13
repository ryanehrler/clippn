import * as _ from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { ContextEnum } from './context.enum';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContextService {
  private contextStack = [];
  private currentContextSubject = new BehaviorSubject<ContextEnum>(null);
  currentContext = this.currentContextSubject.asObservable();

  constructor() {}

  addContext(context: ContextEnum) {
    this.contextStack.push(context);
    this.currentContextSubject.next(context);
  }

  popContext() {
    this.contextStack.pop();
    const currentContext = _.last(this.contextStack);
    this.currentContextSubject.next(currentContext);
  }
}
