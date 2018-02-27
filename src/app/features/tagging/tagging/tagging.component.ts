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
  filterValue = '';
  constructor() {}

  ngOnInit() {
    this.clips = this.clips.filter(x => x.pois != null);
    this.clips = this.clips.filter(x => x.pois.length > 0);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // default to lowercase
    this.filterValue = filterValue;
  }

  haveMatch(clip: Clip) {
    let matched = false;
    clip.pois.forEach(poi => {
      if (
        poi.tags.some(x => x.value.toLowerCase().indexOf(this.filterValue) > -1)
      ) {
        matched = true;
        return true;
      }
    });
    return matched;
  }

  havePoiMatch(poi: Poi) {
    let matched = false;
    if (
      poi.tags.some(x => x.value.toLowerCase().indexOf(this.filterValue) > -1)
    ) {
      matched = true;
    }
    return matched;
  }
}
