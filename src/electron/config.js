var ffmpegPath = require('ffmpeg-static').path;

module.exports = {
  ffmpegPath: ffmpegPath.replace('app.asar', 'app.asar.unpacked')
};
