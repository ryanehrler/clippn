import { Component, Input, OnInit } from '@angular/core';
import { Poi } from '../../../core/services/clip';

import { ClipTimeNavigationService } from '../../../core/services/clip/clip-time-navigation.service';

@Component({
  selector: 'clpn-poi-chip',
  templateUrl: './poi-chip.component.html',
  styleUrls: ['./poi-chip.component.scss']
})
export class PoiChipComponent implements OnInit {
  @Input() poi: Poi;

  constructor(private clipTimeNavigationService: ClipTimeNavigationService) {}

  ngOnInit() {}

  gotoTime(time: number) {
    this.clipTimeNavigationService.gotoTime(time);
  }
}
