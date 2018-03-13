import { Component, OnInit, Input } from '@angular/core';
import { Poi } from '../../../core/services/clip';

@Component({
  selector: 'clpn-poi-chip',
  templateUrl: './poi-chip.component.html',
  styleUrls: ['./poi-chip.component.scss']
})
export class PoiChipComponent implements OnInit {
  @Input() poi: Poi;

  constructor() {}

  ngOnInit() {}
}
