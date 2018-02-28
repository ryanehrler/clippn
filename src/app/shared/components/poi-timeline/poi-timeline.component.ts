import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  ViewChild
} from '@angular/core';

import * as _ from 'lodash';
import * as moment from 'moment';

import { Clip, Poi } from '../../../core/services/clip/index';

@Component({
  selector: 'clpn-poi-timeline',
  templateUrl: './poi-timeline.component.html',
  styleUrls: ['./poi-timeline.component.scss']
})
export class PoiTimelineComponent implements OnInit, OnChanges, AfterViewInit {
  private _clip: Clip;
  @Input() // clip
  set clip(value: Clip) {
    this._clip = value;
    // this.setupTimeline();
  }
  get clip(): Clip {
    return this._clip;
  }

  @Input() video: any;

  intervalWidth = 400; // pixels
  intervalTime = 5; // minutes
  intervalTimeSeconds: number; // seconds... duh

  intervalCount: number; // total number of interval lengths in the video.duration
  intervalMinorTickCount = 5; // number of minor ticks between major ones.
  intervalTicks = [];

  poiTicks = [];

  timelineWidth: number; // pixels
  timelineStyle = {};

  pois = [];

  videoNullCheckTimer: any;
  videoCursor = { style: {} };

  mouseCursor = { style: {} };
  mouseCursorX = 0;
  mouseCursorScrollOffset = 0;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.videoNullCheckTimer = setInterval(() => {
      this.setupTimeline();
    }, 250);
  }

  ngAfterViewInit() {
    // I would much rather add a #poi-timeline to the element then find
    //  it with an @ViewChild().  That seems to be a more obvious way
    //  also less error prone.  Since someone could theoretically duplicate
    const timeline = this.elementRef.nativeElement.querySelector(
      '.poi-timeline'
    );
    timeline.addEventListener('mousemove', e => {
      this.setMouseCursor(e.clientX, e.clientY);
    });
    timeline.addEventListener('scroll', e => {
      this.mouseCursorScrollOffset = e.srcElement.scrollLeft;
    });
  }

  ngOnChanges() {
    this.setupTimeline();
  }

  setupTimeline() {
    console.log('setup-timeline');
    if (this.video != null && this.clip != null) {
      console.log('setup-timeline: video set');
      clearInterval(this.videoNullCheckTimer);

      // convert minutes to seconds so we don't need to keep converting
      this.intervalTimeSeconds = moment
        .duration(this.intervalTime, 'minutes')
        .asSeconds();

      // Setup timeline
      const videoDurationMins = moment
        .duration(this.video.duration, 'seconds')
        .asMinutes();

      this.intervalCount =
        Math.floor(videoDurationMins / this.intervalTime) + 1;
      this.timelineWidth = this.intervalCount * this.intervalWidth;

      this.setTimelineStlye();
      this.setIntervalTicks();
      this.setPoiTicks();
      this.setVideoEvents();
    }
  }

  setTimelineStlye() {
    this.timelineStyle = {
      width: this.timelineWidth + 'px'
    };
  }
  // Sets up the interval ticks on the timeline
  setIntervalTicks() {
    this.intervalTicks = [];
    _.times(this.intervalCount, (currentCount: number) => {
      // Add Major ticks
      const majorTickX = currentCount * this.intervalWidth;
      const label = moment('00:00:00', 'HH:mm:ss')
        .seconds(currentCount * this.intervalTimeSeconds)
        .format('HH:mm:ss');
      this.createIntervalTick(majorTickX, ['major'], label);

      // Add Minor ticks
      // add by 1 because we skip the first tick since it overlaps with a major
      const intervalMinorTickCount = this.intervalMinorTickCount + 1;
      _.times(intervalMinorTickCount, (minorTickCount: number) => {
        if (minorTickCount === 0) {
          return;
        } // skip the first tick because it overlaps

        const minorTickX =
          majorTickX +
          minorTickCount * (this.intervalWidth / intervalMinorTickCount);
        this.createIntervalTick(minorTickX, ['minor'], '');
      });
    });
  }

  setPoiTicks() {
    this.poiTicks = [];
    const pois = this.clip.pois;

    _.forEach(pois, (poi: Poi) => {
      // const poiTimeSec = poi.time; // need for conversion
      const tickX = this.getXPositionForSeconds(poi.time);
      this.createPoiTick(tickX, [poi.fireLevel]);
    });
  }
  setVideoEvents() {
    this.video.addEventListener('timeupdate', () => {
      this.setVideoCursor();
    });
  }
  private createIntervalTick(tickX: number, cssClass: any[], label: string) {
    this.intervalTicks.push({
      style: {
        left: tickX + 'px'
      },
      class: cssClass,
      displayLabel: label
    });
  }
  private createPoiTick(tickX, cssClass: any[]) {
    this.poiTicks.push({
      style: {
        left: tickX + 'px'
      },
      class: cssClass
    });
  }
  private setVideoCursor() {
    const x = this.getXPositionForSeconds(this.video.currentTime);
    this.videoCursor.style = {
      left: x + 'px'
    };
  }
  private getXPositionForSeconds(seconds: number) {
    return seconds * (this.intervalWidth / this.intervalTimeSeconds);
  }
  private setMouseCursor(mouseX: number, mouseY: number) {
    this.mouseCursorX = mouseX + this.mouseCursorScrollOffset - 33;
    // why minus thirty three .. I don't know probably need to figure this out someday

    this.mouseCursor.style = {
      left: this.mouseCursorX + 'px'
    };

    // console.log(
    //   'mouse-cursor',
    //   this.mouseCursorX,
    //   'mouse-x',
    //   mouseX,
    //   'scroll-offset',
    //   this.mouseCursorScrollOffset
    // );
  }
}
