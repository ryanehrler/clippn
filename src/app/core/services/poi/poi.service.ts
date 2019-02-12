import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Poi } from '../clip';

@Injectable({
  providedIn: 'root'
})
export class PoiService {
  private selectedPoiSubject = new BehaviorSubject<Poi>(new Poi());
  selectedPoi: Observable<Poi> = this.selectedPoiSubject.asObservable();

  constructor() {}

  selectPoi(poi: Poi) {
    this.selectedPoiSubject.next(poi);
  }
}
