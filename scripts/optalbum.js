const sharp = require('sharp'); const fs=require('fs');
const dir='/app/public/camila/album/';
(async()=>{
  for(const f of fs.readdirSync(dir).filter(f=>f.endsWith('.jpg'))){
    const buf=await sharp(dir+f).resize({width:1400,withoutEnlargement:true}).jpeg({quality:82,mozjpeg:true}).toBuffer();
    fs.writeFileSync(dir+f,buf);
  }
  console.log('optimized');
})();
