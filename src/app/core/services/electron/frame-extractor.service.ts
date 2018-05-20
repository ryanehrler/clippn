import { Injectable } from '@angular/core';
import { NodejsService } from '..';
import { timeout } from 'rxjs/operator/timeout';

@Injectable()
export class FrameExtractorService {
  fps = 5; // Will extract 5 frames(images) per second
  ffmpegCount = 0; // number of ffmpeg instances
  maxFfmpegCount = 2;

  noop = () => {};

  constructor(private nodeService: NodejsService) {}

  extractFrames(file, cbProgress) {
    console.log('Start Probe');
    this.nodeService.ffmpeg.ffprobe(file, (err, metadata) => {
      console.log('Start Extract');
      console.log('meta-data', metadata);
      const totalNumberOfFrames = metadata.format.duration * this.fps;
      const time = new Date().getTime();
      this.extract2(file, metadata.format.duration).then(
        result => {
          console.log('duration: ', time - new Date().getTime());
          console.log('complete: ', result);
        },
        fuck => {
          console.log('rejected: ', fuck);
        }
      );
    });
  }

  private extract2(input: string, duration: number): Promise<string> {
    const t = '-t ' + duration;
    const options = ['-accurate_seek', '-y', '-r .1'];

    return new Promise((resolve, reject) => {
      this.cutVideo(input, './clipImages', 'clip', 3, duration - 100, resolve);
      // let time = 0;
      // setInterval(() => {
      //   if (this.ffmpegCount < this.maxFfmpegCount && time < duration) {
      //     this.nextFrame(input, duration, time);
      //     time++;
      //   } else {
      //     resolve('EXPORT COMPLETE');
      //   }
      // }, 100);
    });
  }
  cutVideo(
    videoPath: string,
    outputFolder: string,
    outputName: string,
    slices: number,
    duration: number,
    onComplete: any
  ) {
    const cmd = this.nodeService
      .ffmpeg(videoPath)
      .on('end', () => {
        console.log('SLICE COMPLETE');
        onComplete('SLICE COMPLETE');
      })
      .on('progress', progress => {
        console.log(progress);
      });

    for (let i = 1; i <= slices; i++) {
      const seekToTime = duration / slices * i;
      console.log('seek-to-time: ', seekToTime);

      cmd
        .output(outputFolder + '/' + outputName + '_' + i + '.mp4')
        .outputOptions('-vcodec copy')
        .noAudio()
        .seek(seekToTime);
    }

    cmd.run();
  }

  nextFrame(videoPath: string, duration: number, time: number) {
    console.log('next-frame', time);
    if (time >= duration) {
      console.log(
        'You specified a time that is greater then the duration of the video.'
      );
      return;
    }
    this.ffmpegCount++;
    const cmd = this.nodeService
      .ffmpeg(videoPath)
      .on('end', () => {
        this.ffmpegCount--;
      })
      .seekInput(time)
      // .inputOptions(['-accurate_seek', '-ss ' + time])
      // .size('360x?')
      .outputOptions(['-frames:v 1'])
      .output('./clipImages/' + time + '.jpeg')
      .run();
  }

  getArray(duration: number): number[] {
    const a = [];

    for (let i = 0; i < duration; i++) {
      a.push(i);
    }

    return a;
  }
}
