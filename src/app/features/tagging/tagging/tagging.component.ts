import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { DragulaService } from 'ng2-dragula';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { ClipService } from '../../../core/services/clip/clip.service';
import { Clip, Poi, Tag } from '../../../core/services/clip/index';
import {
  EventCategory,
  GoogleAnalyticsService
} from '../../../core/services/google-analytics/index';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-tagging',
  templateUrl: './tagging.component.html',
  styleUrls: ['./tagging.component.scss']
})
export class TaggingComponent implements OnInit {
  clips: any[] = new Array();
  clip: Clip;
  filterInput = '';
  filterValue = '';
  filterArray: any[] = new Array();
  filterMethod = 'or';
  foundTags: any[] = new Array();
  tagArray: any[] = new Array();
  gameArray: any[] = new Array();
  filteredTagArray: Observable<string[]>;
  contextMenuWatch: Observable<boolean>;
  selectedGame = '';
  public newVideo: string[] = [];
  contextMenuSubject = new Subject<boolean>();
  contextMenu = false;
  contextMenuX = 0;
  contextMenuY = 0;
  contextPoi: Poi;
  tagging: any;
  myTagControl = new FormControl();
  mouseCursorScrollOffset = 0;

  private onScroll: (e) => void;
  constructor(
    private clipService: ClipService,
    private dragulaService: DragulaService,
    private googleAnalyticsService: GoogleAnalyticsService,
    private elementRef: ElementRef
  ) {
    this.onScroll = event => {
      this.mouseCursorScrollOffset = event.srcElement.scrollTop;
    };

    const bag: any = this.dragulaService.find('first-bag');
    if (bag !== undefined) {
      this.dragulaService.destroy('first-bag');
    }
    dragulaService.setOptions('first-bag', {
      // copy: true,
      copySortSource: true,
      copy: (el: Element, source: Element): boolean => {
        return source.id !== 'content';
      },
      removeOnSpill: (el: Element, source: Element): boolean => {
        return source.id === 'content';
      },
      accepts(el, target, source, sibling) {
        if (target.id == 'content') {
          // dragged to a container that should add the element
          return true;
        }
      }
    });
    dragulaService.drop.subscribe(value => {
      this.onDrop(value);
    });

    dragulaService.remove.subscribe(value => {
      this.onRemove(value);
    });

    this.contextMenuWatch = this.contextMenuSubject.asObservable(); //Observable.of(this.contextMenu);
  }

  ngOnInit() {
    this.clipService.getClipsByUser().then(() => {
      this.clips = this.clipService.userClips;
      this.clips = this.clips.filter(x => x.pois != null);
      this.clips = this.clips.filter(x => x.pois.length > 0);
      this.clips.forEach(clip => {
        if (this.gameArray.indexOf(clip.gameTitle) < 0) {
          this.gameArray.push(clip.gameTitle);
        }
      });
      this.filteredTagArray = this.myTagControl.valueChanges.pipe(
        startWith(''),
        map(val => this.filterAutocomplete(val))
      );
    });

    this.contextMenuWatch.subscribe(value => {
      if (value == false && this.clip) {
        this.saveClip(this.clip);
      }
    });
  }

  ngAfterViewInit() {
    this.tagging = this.elementRef.nativeElement.offsetParent;
    this.tagging.addEventListener('scroll', this.onScroll);
  }

  ngOnDestroy() {
    //this.saveClip(this.clip);
    this.tagging.removeEventListener('scroll', this.onScroll);
  }

  // (0 - bagname, 1 - el, 2 - container, 3 - source)
  private onRemove(value) {
    this.newVideo = this.newVideo.filter(x => x != value[1].id);
  }

  // (0 - bagname, 1 - el, 2 - target, 3 - source, 4 - sibling)
  private onDrop(value) {
    if (value[2] != value[3] && this.newVideo.includes(value[1].id)) {
      this.newVideo = Array.from(new Set(this.newVideo));
      value[1].remove();
      return;
    }
    if (value[2] == null) {
      // dragged outside any of the bags
      return;
    }
    if (value[2].id !== 'content') {
      // dragged to a container that should not add the element
      value[1].remove();
      return;
    }
    this.newVideo.push(value[1].id);
  }

  saveClip(clip: Clip) {
    // GA - SaveClip
    this.googleAnalyticsService.emitEvent(
      EventCategory.Analyzer.toString(),
      'SaveClip'
    );

    if (clip != null) {
      console.log(clip);
      this.clipService.saveClip(clip);
    }
  }

  receivedCloseEvent(event: any) {
    this.contextMenuSubject.next(event);
  }

  filterAutocomplete(val: string): string[] {
    return this.tagArray.filter(
      option => option.toLowerCase().indexOf(val.toLowerCase()) === 0
    );
  }

  applyFilter(filterInput: string) {
    this.filterValue = filterInput;
    // this.filterValue = this.filterValue.trim();
    // Remove whitespace -- removed for now since i think including spaces in search is useful in this case
    this.filterValue = this.filterValue.toLowerCase(); // default to lowercase
  }

  // these probably need better function names but this filters the main clip white box
  haveMatch(clip: Clip) {
    let matched = false;
    clip.pois.forEach(poi => {
      poi.tags.forEach(tag => {
        this.filterTags(tag.value.toLowerCase());
      });
    });

    if (this.selectedGame) {
      if (clip.gameTitle != this.selectedGame) {
        matched = false;
        return matched;
      }
    }

    clip.pois.some(poi => {
      if (this.havePoiMatch(poi)) {
        matched = true;
        return true;
      } else {
        matched = false;
        return false;
      }
    });
    return matched;
  }

  onRightClick(event: any, poi: Poi, clip: Clip) {
    this.contextMenuX = event.clientX;
    this.contextMenuY = event.clientY + this.mouseCursorScrollOffset - 65; // event.layerY + event.screenY - event.offsetY;
    this.contextMenuSubject.next(true);
    this.contextMenu = true;
    this.clip = clip;
    this.contextPoi = poi;
    return false;
  }

  // disables the menu
  disableContextMenu() {
    if (this.contextMenu == true) {
      this.contextMenuSubject.next(false);
      this.contextMenu = false;
    }
  }

  // these probably need better function names -- and this one filters the poi row out
  havePoiMatch(poi: Poi) {
    // or version
    if (this.filterMethod == 'or') {
      if (
        this.foundTags.length < 1 &&
        (!this.filterValue && this.filterArray.length < 1)
      ) {
        return true;
      }
      if (
        poi.tags.some(r => this.foundTags.indexOf(r.value.toLowerCase()) > -1)
      ) {
        return true;
      } else {
        if (
          poi.tags.length < 1 &&
          (!this.filterValue && this.filterArray.length < 1)
        ) {
          return true;
        }
        return false;
      }
    }

    // and version list of sniper tags list of 'he' tags and then at least one match from each tag to trigger true
    if (this.filterMethod == 'and') {
      if (this.filterArray.length > 0) {
        // loop through poi tags if tag hits index of all in array then we're good. filter array and found tags find one of each
        if (
          this.filterArray.every(
            r =>
              poi.tags.findIndex(x => x.value.toLowerCase().indexOf(r) > -1) >
              -1
          )
        ) {
          if (this.filterValue) {
            if (
              poi.tags.findIndex(
                x => x.value.toLowerCase().indexOf(this.filterValue) > -1
              ) > -1
            ) {
              return true;
            } else {
              return false;
            }
          }
          return true;
        }
        return false;
      }
      if (this.filterValue) {
        if (
          poi.tags.findIndex(
            x => x.value.toLowerCase().indexOf(this.filterValue) > -1
          ) > -1
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    }

    // i think this could be used for an 'exact' filter version
    // if (poi.tags.every(r => this.foundTags.indexOf(r.value) > -1)) {
    //   matched = true;
    //   return true;
    // }
  }
  tagSelected(tagOption: any) {
    this.filterValue = tagOption.option.value;
  }

  filterTags(tag: string) {
    if (tag) {
      tag = tag.toLowerCase();
      if (this.tagArray.indexOf(tag) < 0) {
        this.tagArray.push(tag);
      }
      if (this.filterArray.length > 0) {
        if (this.filterArray.some(x => tag.indexOf(x) > -1)) {
          if (this.foundTags.indexOf(tag) < 0) {
            this.foundTags.push(tag);
          }
          return true;
        }
        if (this.filterValue && tag.indexOf(this.filterValue) > -1) {
          if (this.foundTags.indexOf(tag) < 0) {
            this.foundTags.push(tag);
          }
          return true;
        }
      } else {
        if (tag.indexOf(this.filterValue) > -1) {
          if (this.foundTags.indexOf(tag) < 0) {
            this.foundTags.push(tag);
          }
          return true;
        }
      }
    }
    this.foundTags = this.foundTags.filter(z => z !== tag);
    return false;
  }

  addSearchTag(tag: string) {
    if (tag) {
      this.filterInput = '';
      this.filterValue = '';
      this.filterArray.push(tag);
      document.getElementById('filterInput').focus();
    }
  }

  remove(filter: any): void {
    const index = this.filterArray.indexOf(filter);

    if (index >= 0) {
      this.filterArray.splice(index, 1);
    }
  }
}
