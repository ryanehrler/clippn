import { Clip } from '../clip';

export class LocalVideo {
  /**
   *
   */
  constructor(path: string, clip: Clip) {
    this.path = path;
    this.clip = clip;
  }

  path: string;
  clip: Clip;
}
