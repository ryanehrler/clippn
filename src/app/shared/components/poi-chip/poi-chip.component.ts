import { Component, Input, OnInit } from '@angular/core';
import {
  ClipTimeNavigationService,
  ClipTimeService,
  Poi
} from '../../../core/services/clip';

@Component({
  selector: 'clpn-poi-chip',
  templateUrl: './poi-chip.component.html',
  styleUrls: ['./poi-chip.component.scss']
})
export class PoiChipComponent implements OnInit {
  @Input()
  poi: Poi;
  videoTimeIsHere: boolean;

  constructor(
    private clipTimeNavigationService: ClipTimeNavigationService,
    private clipTimeService: ClipTimeService
  ) {}

  ngOnInit() {
    this.clipTimeService.clipTimeObservable.subscribe(time => {
      // if video is currently at this poit time
      const poiTime = Math.floor(this.poi.time);
      time = Math.floor(time);

      if (time - 1 <= poiTime && poiTime <= time + 1) {
        this.videoTimeIsHere = true;
      } else {
        this.videoTimeIsHere = false;
      }
    });
  }

  gotoTime(time: number) {
    this.videoTimeIsHere = true;
    this.clipTimeNavigationService.gotoTime(time);
  }
}
