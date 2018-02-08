import { Injectable } from '@angular/core';

import * as _ from 'lodash';
import {
  EventCategory,
  GoogleAnalyticsService
} from '../google-analytics/index';

import { FireLevels } from './fire-levels';
import { Poi } from './poi';

@Injectable()
export class ClipAnalyzerService {
  constructor(private googleAnalyticsService: GoogleAnalyticsService) {}

  analyzePois(pois: Poi[], fireThresholdSeconds: number) {
    // GA - AnalyzeKillFeed - Start
    this.googleAnalyticsService.emitEvent(
      EventCategory.ClipService.toString(),
      'AnalyzeKillFeed',
      'Start'
    );

    _.each(pois, currentKill => {
      const nearbyKills = _.filter(pois, kill => {
        return (
          !kill.deleted &&
          kill.time !== currentKill.time &&
          currentKill.time - fireThresholdSeconds <= kill.time &&
          kill.time <= currentKill.time + fireThresholdSeconds
        );
      });

      const numberOfNearbyKills = nearbyKills.length;

      if (numberOfNearbyKills >= 3) {
        currentKill.fireLevel = FireLevels[FireLevels.fire];
      } else if (numberOfNearbyKills === 2) {
        currentKill.fireLevel = FireLevels[FireLevels.hot];
      } else if (numberOfNearbyKills === 1) {
        currentKill.fireLevel = FireLevels[FireLevels.warm];
      } else {
        currentKill.fireLevel = '';
      }
    });

    // GA - AnalyzeKillFeed - End
    this.googleAnalyticsService.emitEvent(
      EventCategory.Analyzer.toString(),
      'AnalyzeKillFeed',
      'End',
      pois.length
    );

    return pois;
  }
}
