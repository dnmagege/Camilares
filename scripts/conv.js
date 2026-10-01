const sharp = require('sharp');
const dir = '/app/public/camila/';
const jobs = [
  ['cam1.png', 'hero.jpg', 1800],
  ['cam2.png', 'lifestyle.jpg', 1300],
  ['cam3.png', 'fashion.jpg', 1200],
  ['cam4.png', 'about.jpg', 1200],
  ['cam5.png', 'travel.jpg', 1200],
];
(async () => {
  for (const [src, out, w] of jobs) {
    await sharp(dir + src).resize({ width: w }).jpeg({ quality: 84, mozjpeg: true }).toFile(dir + out);
    console.log('wrote', out);
  }
})();
