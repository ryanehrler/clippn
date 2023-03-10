import { AppDataFolderInitService } from './core/services/app-data-folder-init/app-data-folder-init.service';
import { AuthService } from './core/services/auth/auth.service';
import { Clip } from './core/services/clip/clip';
import { Component, HostListener, OnInit } from '@angular/core';
import { KeyPressEventService } from './core/services/key-press-event/key-press-event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  clips: any[] = [
    {
      name: 'Clip',
      uid: 1,
      currentProgress: 75
    },
    {
      name: 'Clip2',
      uid: 2,
      currentProgress: 35
    }
  ];
  maxCounts = 200;

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.keyPressEventService.keyPressEvent(event.key);
  }

  constructor(
    public auth: AuthService,
    private router: Router,
    private appDataInit: AppDataFolderInitService,
    private keyPressEventService: KeyPressEventService
  ) {}

  ngOnInit() {
    this.router.navigate(['/login']);

    this.incrementProgressTest();
    this.appDataInit.run();
  }

  async incrementProgressTest() {
    let counts = 0;
    do {
      if (this.clips[0].currentProgress > 100) {
        this.clips[0].currentProgress = 0;
      }
      if (this.clips[1].currentProgress > 100) {
        this.clips[1].currentProgress = 0;
      }

      this.clips[0].currentProgress++;
      this.clips[1].currentProgress++;
      counts++;
      await new Promise<void>(resolve => {
        setTimeout(resolve, 200);
      });
    } while (counts < this.maxCounts);
  }
}
