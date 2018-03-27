import { Poi } from '../../../core/services/clip';

export class Interval {
  public position: number;
  public pois: Poi[];
  public poiCount: number;
  public interval: number;
  public totalTime: number;
  public startPoi: Poi;
  public endPoi: Poi;
}
