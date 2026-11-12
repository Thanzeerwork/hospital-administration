const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  const imgPath = path.resolve('public/images/inspirezest-logo-transparent.png');
  const imgBuffer = fs.readFileSync(imgPath);
  const base64 = imgBuffer.toString('base64');
  const dataUrl = `data:image/png;base64,${base64}`;

  const result = await page.evaluate(async (dataUrl) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        const imgData = ctx.getImageData(0, 0, width, height);
        const data = imgData.data;

        // Create light/white-text version for dark backgrounds:
        // Convert blue text ("InspireZest", "MULTISPECIALITY HEALTHCARE CENTER", and top of cross) to white,
        // OR keep the cross as blue/green and only convert the text to white!
        for (let i = 0; i < data.length; i += 4) {
          const a = data[i + 3];
          if (a === 0) continue; // transparent pixel

          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // Check if it's the vertical line or blue text (x > 140)
          // Keep the cross emblem (x < 140) in its original blue & green!
          const x = (i / 4) % width;
          const y = Math.floor((i / 4) / width);

          // If x > 140 and not in the green "HOSPITAL" badge (green has g > r && g > b)
          const isGreen = g > 130 && g > r * 1.2 && g > b * 1.2;
          if (x > 140 && !isGreen) {
            // It's the blue text or dark separator line: convert to clean white!
            data[i] = 255;
            data[i + 1] = 255;
            data[i + 2] = 255;
          }
        }

        ctx.putImageData(imgData, 0, 0);

        resolve({
          dataUrl: canvas.toDataURL('image/png')
        });
      };
      img.src = dataUrl;
    });
  }, dataUrl);

  const pngBase64 = result.dataUrl.replace(/^data:image\/png;base64,/, '');
  fs.writeFileSync('public/images/inspirezest-logo-light.png', Buffer.from(pngBase64, 'base64'));
  console.log('Saved public/images/inspirezest-logo-light.png (for dark backgrounds)!');

  await browser.close();
})();

