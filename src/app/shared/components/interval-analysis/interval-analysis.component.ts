import * as _ from 'lodash';
import * as moment from 'moment';

import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';

import { MatSort, MatTableDataSource } from '@angular/material';
import { Poi } from '../../../core/services/clip';
import { ClipTimeNavigationService } from '../../../core/services/clip/clip-time-navigation.service';
import { Interval } from './interval';

@Component({
  selector: 'app-interval-analysis',
  templateUrl: './interval-analysis.component.html',
  styleUrls: ['./interval-analysis.component.scss']
})
export class IntervalAnalysisComponent implements OnInit, AfterViewInit {
  intervals: Interval[];
  private _pois: Poi[];
  private _intervalLength = 0;
  private MAX_INTERVAL_COUNT = 10;

  displayedColumns = ['poiCount', 'startPoi', 'endPoi', 'totalTime'];
  dataSource: MatTableDataSource<Interval>;

  @ViewChild(MatSort) sort: MatSort;

  @Input()
  set intervalLength(length: string) {
    this._intervalLength = parseInt(length, 0);
    if (this._pois != null) {
      this.analyzeIntervals(this._pois, this._intervalLength);
    }
  }

  @Input()
  set pois(pois: Poi[]) {
    if (pois != null && pois.length > 0) {
      this._pois = _.chain(pois)
        .filter({ deleted: false })
        .orderBy(['time'], ['asc'])
        .value();
      if (this._intervalLength > 0) {
        this.analyzeIntervals(this._pois, this._intervalLength);
      } else {
        this.analyzeIntervals(this._pois, 80);
      }
    }
  }
  get pois() {
    return this._pois;
  }

  constructor(private clipTimeNavigationService: ClipTimeNavigationService) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  private analyzeIntervals(pois: Poi[], intervalLength: number) {
    this.intervals = [];

    // First, iterate each poi and see how many pois are x seconds in
    //   front of iteratee then add to intervals
    _.forEach(pois, (poi: Poi) => {
      const interval = new Interval();
      interval.pois = [];
      interval.interval = intervalLength;
      // Loop to get pois
      _.forEach(pois, (nextPoi: Poi) => {
        // If nextPoi.time falls in between the original poi time and interval length
        if (
          nextPoi.time > poi.time &&
          nextPoi.time < poi.time + intervalLength
        ) {
          interval.pois.push(nextPoi);
        } else if (nextPoi.time > poi.time + intervalLength) {
          return false; // stop the loop we are donnee
        }
      });

      if (interval.pois.length > 0) {
        interval.poiCount = interval.pois.length;
        interval.startPoi = interval.pois[0];
        interval.endPoi = interval.pois[interval.pois.length - 1];

        const startTime = interval.startPoi.time;
        const endTime = interval.endPoi.time;
        interval.totalTime = Math.round(endTime - startTime);
      }

      this.intervals.push(interval);
    });

    this.intervals = _.remove(this.intervals, i => {
      return i.pois.length > 0;
    });
    // Second, order the array by number of pois for each interval.
    this.intervals = _.orderBy(
      this.intervals,
      [
        o => {
          return o.pois.length;
        }
      ],
      ['desc']
    );

    // Third, Take first interval and delete all other intervals whose start time
    //   falls within the first interval
    // Fourth, Repeat step 3 starting with the second item
    let intervalCount = 0;
    const mainIntervals = [];
    while (
      this.intervals.length > 1 &&
      intervalCount < this.MAX_INTERVAL_COUNT
    ) {
      // Get first Interval
      const currentInterval = this.intervals[0];
      // Register Interval on our final interval list
      mainIntervals.push(currentInterval);
      const f = currentInterval.pois[0].time;
      const fl = currentInterval.pois[currentInterval.pois.length - 1].time;

      this.intervals = _.remove(this.intervals, (nextInterval: Interval) => {
        const nf = nextInterval.pois[0].time;
        const nl = nextInterval.pois[nextInterval.pois.length - 1].time;

        if (nf === f) {
          return false; // Remove
        }
        if (f <= nf && nf <= fl) {
          return false; // Remove
        }
        if (f <= nl && nl <= fl) {
          return false; // Remove
        }

        return true; // Keep
      });
      intervalCount++;
    }

    this.intervals = mainIntervals;

    this.setPositions();
    this.setDataSource();

    console.log(this.intervals);
  }
  setPositions() {
    for (let i = 0; i < this.intervals.length; i++) {
      this.intervals[i].position = i + 1;
    }
  }
  setDataSource() {
    setTimeout(() => {
      this.dataSource = new MatTableDataSource(this.intervals);
      this.dataSource.sort = this.sort;
    }, 100);
  }
  gotoTime(time: number) {
    this.clipTimeNavigationService.gotoTime(time);
  }
}
