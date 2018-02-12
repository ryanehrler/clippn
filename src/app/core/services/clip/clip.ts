import { Poi } from './poi';

export class Clip {
  name: string;
  uid: string;
  fileType: string;
  archived: boolean;
  gameTitle: string;
  pois: Poi[];
  currentProgress: number;
}
