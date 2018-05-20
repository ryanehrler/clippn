var fs = require('fs');
var ffmpeg = require('fluent-ffmpeg');
var config = require('./config');
// Setting ffmpeg path to ffmpeg binary for os x so that ffmpeg can be packaged with the app.

// ffmpeg.setFfmpegPath("./bin/ffmpeg")
ffmpeg.setFfmpegPath(config.ffmpegPath);

function extractFrames(file, output, cb, cbProgress) {
  // Get duration of video
  ffmpeg.ffprobe(file, function(err, metadata) {
    console.log(metadata);

    var command = ffmpeg(file)
      .on('end', function(files) {
        console.log('screenshots were saved as ' + files);
      })
      .on('error', function(err) {
        console.log('an error happened: ' + err.message);
      })
      .on('progress', function(progress) {
        //  progress // {"frames":null,"currentFps":null,"currentKbps":256,"targetSize":204871,"timemark":"01:49:15.90"}
        console.log(
          'Processing: ' +
            progress.timemark +
            ' done ' +
            progress.targetSize +
            ' kilobytes'
        );
        if (cbProgress) {
          cbProgress(progress);
        }
      })
      .screenshots({
        timestamps: [0],
        filename: '%f__%s.png',
        folder: './clipImages',
        size: '640x480'
      });
  });
  /*
  var command = ffmpeg(file)
    .on('end', function(files) {
      // res.sendfile(file);
      console.log(files);
    })
    .on('progress', function(progress) {
      //  progress // {"frames":null,"currentFps":null,"currentKbps":256,"targetSize":204871,"timemark":"01:49:15.90"}
      console.log(
        'Processing: ' +
          progress.timemark +
          ' done ' +
          progress.targetSize +
          ' kilobytes'
      );
      cbProgress(progress);
    })
    .on('error', function(err) {
      console.log('error', err.message);
      // res.json({
      //     status : 'error',
      //     error : err.message
      // });
    })
    // time for i in {0..39} ;
    // do ffmpeg -accurate_seek -ss `echo $i*60.0 | bc` -i input.mp4
    //  -frames:v 1 period_down_$i.bmp ; done
    .outputOptions([
      '-f image2',
      '-vframes 1',
      '-vcodec png',
      '-f rawvideo',
      '-s 320x240',
      '-ss 00:00:01'
    ])
    .output(file)
    .run();
    */
}

module.exports = extractFrames;
