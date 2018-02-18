import { Poi } from './poi';

export class Clip {
  // firebase fields
  id: string;
  createdAt: Date;

  // clip fields
  name: string;
  uid: string;
  fileType: string;
  archived: boolean;
  gameTitle: string;
  pois: Poi[];
  currentProgress: number;
}
