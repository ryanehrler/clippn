import { ClipTimeNavigationService, ClipTimeService, Poi } from '../../../core/services/clip';
import { Component, Input, OnInit } from '@angular/core';
import { KeyPressEventService } from '../../../core/services/key-press-event.service';
import { log } from 'util';
import { PoiService } from '../../../core/services/poi/poi.service';

@Component({
  selector: 'clpn-poi-chip',
  templateUrl: './poi-chip.component.html',
  styleUrls: ['./poi-chip.component.scss']
})
export class PoiChipComponent implements OnInit {
  @Input()
  poi: Poi;
  videoTimeIsHere: boolean;
  isSelected: boolean;

  constructor(
    private clipTimeNavigationService: ClipTimeNavigationService,
    private clipTimeService: ClipTimeService,
    private keyPressEventService: KeyPressEventService,
    private poiService: PoiService
  ) {
    this.registerKeyPress();
  }

  ngOnInit() {
    // this.clipTimeService.clipTimeObservable.subscribe(time => {
    //   this.videoTimeIsHere = this.videoTimeWithinPoiTime(time);
    // });

    this.poiService.selectedPoi.subscribe((poi: Poi) => {
      this.isSelected = poi.time === this.poi.time;
    });
  }

  gotoTime(time: number) {
    this.poiService.selectPoi(this.poi);
    time = time - 3;
    this.clipTimeNavigationService.gotoTime(time);
  }

  deletePoi() {
    if (this.videoTimeIsHere) {
      this.poi.deleted = true;
    }
  }

  private videoTimeWithinPoiTime(time: number) {
    const poiTime = Math.floor(this.poi.time);
    time = Math.floor(time);

    return time - 1 <= poiTime && poiTime <= time + 1;
  }

  private registerKeyPress() {
    this.keyPressEventService.events.subscribe(key => {
      if (key == 'd') {
        this.deletePoi();
      }
    });
  }
}
