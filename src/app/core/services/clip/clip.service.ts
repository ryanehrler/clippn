import { Injectable, Injector, OnInit } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import * as _ from 'lodash';

import {
  EventCategory,
  GoogleAnalyticsService
} from '../google-analytics/index';

import { Observable, Subject } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

import { Poi } from '.';
import { AuthService } from '../auth/auth.service';
import { FirestoreService } from '../firestore/firestore.service';
import { CaptureProperties } from './capture-properties';
import { Clip } from './clip';

@Injectable()
export class ClipService {
  clips: Clip[];
  userClips: Clip[];
  clip: Clip;
  clipsRef: AngularFirestoreCollection<Clip>;

  private onChangesSubject = new Subject();
  onChanges = this.onChangesSubject.asObservable();

  constructor(
    private googleAnalyticsService: GoogleAnalyticsService,
    private db: FirestoreService,
    private authService: AuthService,
    private injector: Injector
  ) {
    // this.clipsRef = this.afs.collection('clips', ref => ref.where('uid', '==', this.authService.userId));
  }

  initializeClip(name: string, fileType: string, gameTitle: string) {
    console.log('init: ', name);

    return this.getClip(name)
      .pipe(
        map(clip => {
          console.log('init-map-clip:', clip);
          // Get clip from firebase
          if (clip != null && clip.length > 0) {
            this.clip = clip[0];
            this.save();
          } else {
            // New up clip.
            this.clip = this.setupDefaultClip(name, fileType, gameTitle);
            this.saveClip(this.clip);
          }
        })
      )
      .toPromise();
  }

  save() {
    return this.saveClip(this.clip);
  }
  saveClip(clip: Clip) {
    // GA - SaveClip
    this.googleAnalyticsService.emitEvent(
      EventCategory.ClipService.toString(),
      'SaveClip'
    );

    if (clip.id == null) {
      console.log('save-clip-update');
      return this.db
        .add('clips', clip)
        .then(() => {
          console.log('**Added Clip:', clip.name);
          return true;
        })
        .catch(() => {
          return false;
        });
    } else {
      console.log('save-clip-update');
      return this.db
        .update('clips/' + clip.id, clip)
        .then(() => {
          console.log('**Updated Clip:', clip.name);
          return true;
        })
        .catch(() => {
          return false;
        });
    }
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

  getClip(name: string) {
    // GA - GetClip
    this.googleAnalyticsService.emitEvent(
      EventCategory.ClipService.toString(),
      'GetClip',
      name
    );

    console.log('UserId: ', this.authService.userId);
    console.log('name: ', name);

    return this.db
      .colWithIds$<Clip>('clips', ref =>
        ref
          .where('uid', '==', this.authService.userId)
          .where('name', '==', name)
      )
      .pipe(take(1));
  }

  getAllClips() {
    // GA - GetAllClips
    this.googleAnalyticsService.emitEvent(
      EventCategory.ClipService.toString(),
      'GetAllClips'
    );

    return this.clips;
  }

  getClipsByUser() {
    return this.db
      .colWithIds$<Clip>('clips', ref =>
        ref.where('uid', '==', this.authService.userId)
      )
      .pipe(
        take(1),
        map(clips => {
          this.userClips = clips;
        })
      )
      .toPromise();
  }

  getAllTags() {
    const uniqueTags = [];
    _.forEach(this.clips, clip => {
      _.forEach(clip.pois, kill => {
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
  getPercentDone(currentTime: number, duration: number) {
    let percent = Math.round((currentTime / duration) * 100);
    if (percent >= 97) {
      // We don't necessarily process up to the last second since it is done by frames.
      percent = 100;
    }

    return percent;
  }
  addPoi(poi: Poi) {
    this.clip.pois.push(poi);
    this.triggerChange();
  }

  private triggerChange() {
    this.onChangesSubject.next();
  }

  private setupDefaultClip(name: string, fileType: string, gameTitle: string) {
    const c = new Clip();
    c.name = name;
    c.uid = this.authService.userId;
    c.fileType = fileType;
    c.pois = [];
    c.gameTitle = gameTitle;

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
