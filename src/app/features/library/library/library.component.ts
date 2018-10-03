import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ClipService } from '../../../core/services/clip/clip.service';
import { Poi } from '../../../core/services/clip/poi';
import { Tag } from '../../../core/services/clip/tag';
import { ClipDetailModalComponent } from '../clip-detail-modal/clip-detail-modal.component';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
  constructor(private clipService: ClipService, public dialog: MatDialog) {}

  clips: any[] = [
    {
      name: 'Clip',
      uid: 1,
      currentProgress: 75,
      isProcessed: false
    },
    {
      name: 'Clip2',
      uid: 2,
      currentProgress: 35,
      isProcessed: false
    },
    {
      name: 'Clip5',
      uid: 2,
      currentProgress: 55,
      isProcessed: false
    },
    {
      name: 'Clip6',
      uid: 2,
      currentProgress: 85,
      isProcessed: false
    },
    {
      name: 'Clip7',
      uid: 2,
      currentProgress: 15,
      isProcessed: false
    },
    {
      name: 'Clip3',
      uid: 2,
      currentProgress: 100,
      isProcessed: true
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

  maxCounts = 200;
  ngOnInit() {
    this.incrementProgressTest();
  }

  async incrementProgressTest() {
    let counts = 0;
    do {
      this.clips
        .filter(
          (clip: any) => clip.currentProgress > -1 && clip.currentProgress < 100
        )
        .forEach(clip => {
          clip.currentProgress++;
          // console.log(clip);
          if (clip.currentProgress === 100) {
            clip.isProcessed = true;
          }
        });

      counts++;
      await new Promise<void>(resolve => {
        setTimeout(resolve, 200);
      });
    } while (counts < this.maxCounts);
  }

  processClip(clip: any) {
    clip.currentProgress = 0;
  }

  openDialog(myClip: any) {
    const dialogRef = this.dialog.open(ClipDetailModalComponent, {
      width: '600px',
      data: {
        clip: myClip
      }
    });
  }
}
