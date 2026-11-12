const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  const imgPath = path.resolve('public/images/inspirezest-logo.jpg');
  const imgBuffer = fs.readFileSync(imgPath);
  const base64 = imgBuffer.toString('base64');
  const dataUrl = `data:image/jpeg;base64,${base64}`;

  const result = await page.evaluate(async (dataUrl) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        const imgData = ctx.getImageData(0, 0, img.naturalWidth, img.naturalHeight);
        const data = imgData.data;

        let minX = img.naturalWidth, minY = img.naturalHeight, maxX = 0, maxY = 0;
        const limitX = 145; // stop strictly before the vertical separator bar
        const limitY = 200; // stop before the green bottom bar
        for (let y = 30; y < limitY; y++) {
          for (let x = 10; x < limitX; x++) {
            const idx = (y * img.naturalWidth + x) * 4;
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];
            if (r < 235 || g < 235 || b < 235) {
              if (x < minX) minX = x;
              if (x > maxX) maxX = x;
              if (y < minY) minY = y;
              if (y > maxY) maxY = y;
            }
          }
        }

        const pad = 4;
        minX = Math.max(0, minX - pad);
        minY = Math.max(0, minY - pad);
        maxX = Math.min(limitX, maxX + pad);
        maxY = Math.min(limitY, maxY + pad);

        const w = maxX - minX;
        const h = maxY - minY;
        const size = Math.max(w, h);

        const iconCanvas = document.createElement('canvas');
        iconCanvas.width = size;
        iconCanvas.height = size;
        const ictx = iconCanvas.getContext('2d');
        const ox = (size - w) / 2;
        const oy = (size - h) / 2;
        ictx.drawImage(img, minX, minY, w, h, ox, oy, w, h);

        const iconData = ictx.getImageData(0, 0, size, size);
        const idata = iconData.data;
        for (let i = 0; i < idata.length; i += 4) {
          const r = idata[i];
          const g = idata[i + 1];
          const b = idata[i + 2];
          if (r > 240 && g > 240 && b > 240) {
            idata[i + 3] = 0;
          }
        }
        ictx.putImageData(iconData, 0, 0);

        resolve({
          w,
          h,
          size,
          iconDataUrl: iconCanvas.toDataURL('image/png')
        });
      };
      img.src = dataUrl;
    });
  }, dataUrl);

  const iconBase64 = result.iconDataUrl.replace(/^data:image\/png;base64,/, '');
  fs.writeFileSync('public/images/inspirezest-icon.png', Buffer.from(iconBase64, 'base64'));
  console.log(`Saved public/images/inspirezest-icon.png (${result.w}x${result.h})`);

  await browser.close();
})();
