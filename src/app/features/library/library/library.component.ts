import { Component, OnInit } from '@angular/core';
import { ClipService } from '../../../core/services/clip/clip.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
  constructor(private clipService: ClipService) {}
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
      currentProgress: -1,
      isProcessed: false
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
          console.log(clip);
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
}
