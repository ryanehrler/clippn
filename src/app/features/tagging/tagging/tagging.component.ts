import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { Clip, Poi } from '../../../core/services/clip/index';

@Component({
  selector: 'app-tagging',
  templateUrl: './tagging.component.html',
  styleUrls: ['./tagging.component.scss']
})
export class TaggingComponent implements OnInit {
  clips: any[] = [
    {
      name: 'Clip',
      uid: 1,
      currentProgress: 100,
      isProcessed: true
    },
    {
      name: 'Clip2',
      uid: 2,
      currentProgress: 100,
      isProcessed: true
    },
    {
      name: 'Clip5',
      uid: 2,
      currentProgress: 100,
      isProcessed: true
    },
    {
      name: 'Clip6',
      uid: 2,
      currentProgress: 100,
      isProcessed: true,
      gameTitle: 'Pubtacular',
      pois: [
        {
          time: 1,
          displayTime: '2:01',
          fireLevel: 'fire',
          tags: [
            {
              value: 'sniper',
              deleted: false
            },
            {
              value: 'headshot',
              deleted: false
            }
          ],
          deleted: false
        },
        {
          time: 5,
          displayTime: '5:27',
          fireLevel: 'fire',
          tags: [
            {
              value: 'pistol',
              deleted: false
            },
            {
              value: 'headshot',
              deleted: false
            },
            {
              value: 'other tag',
              deleted: false
            }
          ],
          deleted: false
        },
        {
          time: 7,
          displayTime: '7:27',
          fireLevel: 'warm',
          tags: [
            {
              value: 'pistol',
              deleted: false
            }
          ],
          deleted: false
        },
        {
          time: 9,
          displayTime: '9:27',
          fireLevel: 'hot',
          tags: [
            {
              value: 'uzi',
              deleted: false
            }
          ],
          deleted: false
        }
      ]
    },
    {
      name: 'Clip7',
      uid: 2,
      currentProgress: 100,
      isProcessed: true,
      gameTitle: 'Halo 4',
      pois: [
        {
          time: 1,
          displayTime: '2:01',
          fireLevel: 'fire',
          tags: [
            {
              value: 'sniper',
              deleted: false
            },
            {
              value: 'headshot',
              deleted: false
            }
          ],
          deleted: false
        },
        {
          time: 5,
          displayTime: '5:27',
          fireLevel: 'fire',
          tags: [
            {
              value: 'Glock 27',
              deleted: false
            },
            {
              value: 'headshot',
              deleted: false
            },
            {
              value: 'other tag',
              deleted: false
            }
          ],
          deleted: false
        },
        {
          time: 7,
          displayTime: '7:27',
          fireLevel: 'warm',
          tags: [
            {
              value: '1911',
              deleted: false
            }
          ],
          deleted: false
        },
        {
          time: 9,
          displayTime: '9:27',
          fireLevel: 'hot',
          tags: [
            {
              value: 'smg',
              deleted: false
            }
          ],
          deleted: false
        }
      ]
    },
    {
      name: 'Clip3',
      uid: 2,
      currentProgress: 100,
      isProcessed: true,
      gameTitle: 'Halo 5',
      pois: [
        {
          time: 1,
          displayTime: '2:01',
          fireLevel: 'fire',
          tags: [
            {
              value: 'M4 Carbine',
              deleted: false
            },
            {
              value: 'headshot',
              deleted: false
            }
          ],
          deleted: false
        },
        {
          time: 5,
          displayTime: '5:27',
          fireLevel: 'fire',
          tags: [
            {
              value: 'pistol',
              deleted: false
            },
            {
              value: 'headshot',
              deleted: false
            },
            {
              value: 'other tag',
              deleted: false
            }
          ],
          deleted: false
        },
        {
          time: 7,
          displayTime: '7:27',
          fireLevel: 'warm',
          tags: [
            {
              value: 'pistol',
              deleted: false
            }
          ],
          deleted: false
        },
        {
          time: 9,
          displayTime: '9:27',
          fireLevel: 'hot',
          tags: [
            {
              value: 'smg',
              deleted: false
            }
          ],
          deleted: false
        }
      ]
    },
    {
      name: 'Clip4',
      uid: 2,
      currentProgress: 100,
      isProcessed: true,
      gameTitle: 'Call of duty brah',
      pois: [
        {
          time: 1,
          displayTime: '2:01',
          fireLevel: 'fire',
          tags: [
            {
              value: 'sniper',
              deleted: false
            },
            {
              value: 'headshot',
              deleted: false
            }
          ],
          deleted: false
        },
        {
          time: 5,
          displayTime: '5:27',
          fireLevel: 'fire',
          tags: [
            {
              value: 'pistol',
              deleted: false
            },
            {
              value: 'headshot',
              deleted: false
            },
            {
              value: 'other tag',
              deleted: false
            }
          ],
          deleted: false
        },
        {
          time: 7,
          displayTime: '7:27',
          fireLevel: 'warm',
          tags: [
            {
              value: 'pistol',
              deleted: false
            }
          ],
          deleted: false
        },
        {
          time: 9,
          displayTime: '9:27',
          fireLevel: 'hot',
          tags: [
            {
              value: 'smg',
              deleted: false
            }
          ],
          deleted: false
        }
      ]
    }
  ];
  filterInput = '';
  filterValue = '';
  filterArray: any[] = new Array();
  filterMethod = 'or';
  foundTags: any[] = new Array();
  tagArray: any[] = new Array();
  gameArray: any[] = new Array();
  filteredTagArray: Observable<string[]>;
  selectedGame = '';

  myTagControl = new FormControl();

  constructor() {}

  ngOnInit() {
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

  // these probably need better function names -- and this one filters the poi row out
  havePoiMatch(poi: Poi) {
    // or version
    if (this.filterMethod == 'or') {
      if (
        poi.tags.some(r => this.foundTags.indexOf(r.value.toLowerCase()) > -1)
      ) {
        return true;
      } else {
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
