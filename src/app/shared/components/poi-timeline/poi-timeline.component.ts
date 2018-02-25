import { Component, Input, OnInit } from '@angular/core';

import * as _ from 'lodash';
import * as moment from 'moment';

import { Clip } from '../../../core/services/clip/index';

@Component({
  selector: 'clpn-poi-timeline',
  templateUrl: './poi-timeline.component.html',
  styleUrls: ['./poi-timeline.component.scss']
})
export class PoiTimelineComponent implements OnInit {
  @Input() clip: Clip;
  @Input() video: any;

  intervalWidth = 400; // pixels
  intervalTime = 5; // minutes
  intervalTimeSeconds = moment
    .duration(this.intervalTime, 'minutes')
    .asSeconds();

  intervalCount: number; // total number of interval lengths in the video.duration
  intervalMinorTickCount = 4; //number of minor ticks between major ones
  intervalTicks = [];

  timelineWidth: number; // pixels
  timelineStyle = {};

  pois = [];

  videoNullCheckTimer: any;

  constructor() {}

  ngOnInit() {
    this.videoNullCheckTimer = setInterval(() => {
      this.setupTimeline();
    }, 250);
  }

  setupTimeline() {
    console.log('setup-timeline');
    if (this.video != null) {
      console.log('setup-timeline: video set');
      clearInterval(this.videoNullCheckTimer);

      // Setup timeline
      const videoDurationMins = moment
        .duration(this.video.duration, 'seconds')
        .asMinutes();

      this.intervalCount =
        Math.floor(videoDurationMins / this.intervalTime) + 1;
      this.timelineWidth = this.intervalCount * this.intervalWidth;

      this.setTimelineStlye();
      this.setIntervalTicks();
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
      this.intervalTicks.push({
        style: {
          left: majorTickX + 'px'
        },
        class: ['major']
      });
      // Add Minor ticks
      _.times(this.intervalMinorTickCount, (minorTickCount: number) => {
        const minorTickX =
          majorTickX +
          minorTickCount * (this.intervalWidth / this.intervalMinorTickCount);

        this.intervalTicks.push({
          style: {
            left: minorTickX + 'px'
          },
          class: ['minor']
        });
      });
    });
  }
}
