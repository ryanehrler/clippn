import { Component, OnInit } from '@angular/core';
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

  constructor() {}

  ngOnInit() {
    this.clips = this.clips.filter(x => x.pois != null);
    this.clips = this.clips.filter(x => x.pois.length > 0);
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
        this.filterTags(tag.value);
      });

      // or version
      if (this.filterMethod == 'or') {
        if (poi.tags.some(r => this.foundTags.indexOf(r.value) > -1)) {
          matched = true;
          return true;
        }
      }
      // and version
      if (this.filterMethod == 'and') {
        if (
          this.foundTags.every(r => poi.tags.findIndex(x => x.value == r) > -1)
        ) {
          matched = true;
          return true;
        }
      }

      // i think this could be used for an 'exact' filter version
      // if (poi.tags.every(r => this.foundTags.indexOf(r.value) > -1)) {
      //   matched = true;
      //   return true;
      // }
    });
    return matched;
  }

  // these probably need better function names -- and this one filters the poi row out
  havePoiMatch(poi: Poi) {
    let matched = false;

    // or version
    if (this.filterMethod == 'or') {
      if (poi.tags.some(r => this.foundTags.indexOf(r.value) > -1)) {
        matched = true;
      }
    }

    // and version
    if (this.filterMethod == 'and') {
      if (
        this.foundTags.every(r => poi.tags.findIndex(x => x.value == r) > -1)
      ) {
        matched = true;
        return true;
      }
    }

    return matched;
  }

  filterTags(tag: string) {
    if (tag) {
      tag = tag.toLowerCase();
      if (this.filterArray.length > 0) {
        if (this.filterArray.some(x => tag.indexOf(x) > -1)) {
          if (this.foundTags.indexOf(tag) < 0) {
            this.foundTags.push(tag);
          }
          return true;
        }
        if (this.filterValue != '' && tag.indexOf(this.filterValue) > -1) {
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
