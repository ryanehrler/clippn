import { Injectable } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import * as _ from 'lodash';

import {
  EventCategory,
  GoogleAnalyticsService
} from '../google-analytics/index';

import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth/auth.service';
import { FirestoreService } from '../firestore/firestore.service';
import { CaptureProperties } from './capture-properties';
import { Clip } from './clip';

@Injectable()
export class ClipService {
  clips: Clip[];
  clip: Clip;
  clipsRef: AngularFirestoreCollection<Clip>;

  constructor(
    private googleAnalyticsService: GoogleAnalyticsService,
    private db: FirestoreService,
    private authService: AuthService
  ) {
    // this.clipsRef = this.afs.collection('clips', ref => ref.where('uid', '==', this.authService.userId));
  }

  initializeClip(name: string, fileType: string) {
    return this.getClip('test').switchMap(clip => {
      // Get clip from firebase
      if (clip != null) {
        this.clip = clip;
        return Observable.of(clip);
      } else {
        // New up clip.
        this.clip = this.setupDefaultClip(name, fileType);
        return Observable.of(this.clip);
      }
    });
  }

  saveClip(clip: Clip) {
    // GA - SaveClip
    this.googleAnalyticsService.emitEvent(
      EventCategory.ClipService.toString(),
      'SaveClip'
    );
  }

  deleteClip(name: string) {
    // GA - DeleteClip
    this.googleAnalyticsService.emitEvent(
      EventCategory.ClipService.toString(),
      'DeleteClip',
      name
    );

    this.removeClip(name);
  }

  getClip(id: string) {
    // GA - GetClip
    this.googleAnalyticsService.emitEvent(
      EventCategory.ClipService.toString(),
      'GetClip',
      name
    );

    return this.db.doc$<Clip>('clips/' + id);
  }

  getAllClips() {
    // GA - GetAllClips
    this.googleAnalyticsService.emitEvent(
      EventCategory.ClipService.toString(),
      'GetAllClips'
    );

    return this.clips;
  }

  getAllTags() {
    const uniqueTags = [];
    _.forEach(this.clips, clip => {
      _.forEach(clip.killFeed, kill => {
        _.forEach(kill.tags, tag => {
          if (
            _.findIndex(uniqueTags, t => {
              return t === tag.value;
            }) === -1
          ) {
            uniqueTags.push(tag.value);
          }
        });
      });
    });
    return uniqueTags;
  }

  private setupDefaultClip(name: string, fileType: string) {
    const c = new Clip();
    c.name = name;
    c.uid = this.authService.userId;
    c.fileType = fileType;
    c.pois = [];

    return c;
  }
  private removeClip(name: string) {
    _.remove(this.clips, c => {
      return c.name === name;
    });
  }

  //  Delete this.
  private initializeCaptureProperties() {
    const c = new CaptureProperties();
    c.width = 110;
    c.height = 90;
    c.xStart = 979;
    c.yStart = 650;

    c.frameRate = 29.97;
    c.totalFrameCount = 0;
    c.analysisFPS = 5;
    c.missedKillDetectionThreshold = 2;
    c.timeLengthForKill = 1.8;
    c.fireThresholdSeconds = 10;

    c.pixelRedValue = 154;
    c.pixelGreenValue = 47;
    c.pixelBlueValue = 54;
    c.pixelRedTolerance = 15;
    c.pixelGreenTolerance = 15;
    c.pixelBlueTolerance = 35;

    return c;
  }
}
