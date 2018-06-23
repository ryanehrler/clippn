import { Clip } from '../clip';
import { SafeResourceUrl } from '@angular/platform-browser';

export class LocalVideo {
  /**
   *
   */
  constructor(path: string, fileName: string, name: string, clip: Clip) {
    this.path = path;
    this.fileName = fileName;
    this.name = name;
    this.clip = clip;
  }

  path: string;
  fileName: string;
  name: string;
  clip: Clip;
  safeUrl: SafeResourceUrl;
}
