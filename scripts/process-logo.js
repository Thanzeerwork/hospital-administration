const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  // Read file as base64
  const imgPath = path.resolve('public/images/inspirezest-logo.jpg');
  const imgBuffer = fs.readFileSync(imgPath);
  const base64 = imgBuffer.toString('base64');
  const dataUrl = `data:image/jpeg;base64,${base64}`;

  // Process image in canvas
  const result = await page.evaluate(async (dataUrl) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;

        // 1. Draw original on canvas to crop extra empty borders if any
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        const imgData = ctx.getImageData(0, 0, width, height);
        const data = imgData.data;

        // Find bounding box of non-white pixels
        let minX = width, minY = height, maxX = 0, maxY = 0;
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const idx = (y * width + x) * 4;
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];
            // If not near pure white
            if (r < 245 || g < 245 || b < 245) {
              if (x < minX) minX = x;
              if (x > maxX) maxX = x;
              if (y < minY) minY = y;
              if (y > maxY) maxY = y;
            }
          }
        }

        // Add padding of 8px
        const pad = 12;
        minX = Math.max(0, minX - pad);
        minY = Math.max(0, minY - pad);
        maxX = Math.min(width, maxX + pad);
        maxY = Math.min(height, maxY + pad);

        const cropW = maxX - minX;
        const cropH = maxY - minY;

        // Cropped original (white bg)
        const croppedCanvas = document.createElement('canvas');
        croppedCanvas.width = cropW;
        croppedCanvas.height = cropH;
        const cropCtx = croppedCanvas.getContext('2d');
        cropCtx.fillStyle = '#FFFFFF';
        cropCtx.fillRect(0, 0, cropW, cropH);
        cropCtx.drawImage(img, minX, minY, cropW, cropH, 0, 0, cropW, cropH);
        const croppedDataUrl = croppedCanvas.toDataURL('image/png');

        // Cropped transparent bg (convert white/near-white to alpha 0)
        const transCanvas = document.createElement('canvas');
        transCanvas.width = cropW;
        transCanvas.height = cropH;
        const transCtx = transCanvas.getContext('2d');
        transCtx.drawImage(img, minX, minY, cropW, cropH, 0, 0, cropW, cropH);
        const transImgData = transCtx.getImageData(0, 0, cropW, cropH);
        const tdata = transImgData.data;

        for (let i = 0; i < tdata.length; i += 4) {
          const r = tdata[i];
          const g = tdata[i + 1];
          const b = tdata[i + 2];
          // Check if white or near white
          if (r > 240 && g > 240 && b > 240) {
            // Smooth alpha falloff for antialiasing
            const brightness = (r + g + b) / 3;
            if (brightness >= 250) {
              tdata[i + 3] = 0;
            } else {
              const alpha = Math.max(0, Math.min(255, (255 - brightness) * 25.5));
              tdata[i + 3] = alpha;
            }
          }
        }
        transCtx.putImageData(transImgData, 0, 0);
        const transDataUrl = transCanvas.toDataURL('image/png');

        resolve({
          width,
          height,
          cropW,
          cropH,
          croppedDataUrl,
          transDataUrl
        });
      };
      img.src = dataUrl;
    });
  }, dataUrl);

  console.log(`Original: ${result.width}x${result.height}, Cropped: ${result.cropW}x${result.cropH}`);

  // Save cropped png
  const croppedBase64 = result.croppedDataUrl.replace(/^data:image\/png;base64,/, '');
  fs.writeFileSync('public/images/inspirezest-logo.png', Buffer.from(croppedBase64, 'base64'));
  console.log('Saved public/images/inspirezest-logo.png');

  // Save transparent png
  const transBase64 = result.transDataUrl.replace(/^data:image\/png;base64,/, '');
  fs.writeFileSync('public/images/inspirezest-logo-transparent.png', Buffer.from(transBase64, 'base64'));
  console.log('Saved public/images/inspirezest-logo-transparent.png');

  await browser.close();
})();

