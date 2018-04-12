import { Clip } from '../clip';

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
}
