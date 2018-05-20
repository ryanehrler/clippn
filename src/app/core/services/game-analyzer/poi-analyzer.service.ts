import { Injectable } from '@angular/core';

import * as _ from 'lodash';
import { FireLevels } from '../clip/fire-levels';
import { Poi } from '../clip/poi';
import {
  EventCategory,
  GoogleAnalyticsService
} from '../google-analytics/index';

@Injectable()
export class PoiAnalyzerService {
  constructor(private googleAnalyticsService: GoogleAnalyticsService) {}

  analyzeKillFeed(killFeed: Poi[], fireThresholdSeconds: number) {
    // GA - AnalyzeKillFeed - Start
    this.googleAnalyticsService.emitEvent(
      EventCategory.ClipService.toString(),
      'AnalyzeKillFeed',
      'Start'
    );

    _.each(killFeed, currentKill => {
      const nearbyKills = _.filter(killFeed, kill => {
        return (
          !kill.deleted
          && kill.time !== currentKill.time
          && currentKill.time - fireThresholdSeconds <= kill.time
          && kill.time <= currentKill.time + fireThresholdSeconds
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
      killFeed.length
    );

    return killFeed;
  }
}
