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
        const width = img.naturalWidth;
        const height = img.naturalHeight;

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        const imgData = ctx.getImageData(0, 0, width, height);
        const data = imgData.data;

        // Bounding box of non-white
        let minX = width, minY = height, maxX = 0, maxY = 0;
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const idx = (y * width + x) * 4;
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];
            if (r < 240 || g < 240 || b < 240) {
              if (x < minX) minX = x;
              if (x > maxX) maxX = x;
              if (y < minY) minY = y;
              if (y > maxY) maxY = y;
            }
          }
        }

        const pad = 10;
        minX = Math.max(0, minX - pad);
        minY = Math.max(0, minY - pad);
        maxX = Math.min(width, maxX + pad);
        maxY = Math.min(height, maxY + pad);

        const cropW = maxX - minX;
        const cropH = maxY - minY;

        const cropCanvas = document.createElement('canvas');
        cropCanvas.width = cropW;
        cropCanvas.height = cropH;
        const cctx = cropCanvas.getContext('2d');
        cctx.drawImage(img, minX, minY, cropW, cropH, 0, 0, cropW, cropH);

        const cImgData = cctx.getImageData(0, 0, cropW, cropH);
        const cdata = cImgData.data;

        // BFS flood fill from all 4 boundaries for background pixels
        const isWhite = (x, y) => {
          if (x < 0 || x >= cropW || y < 0 || y >= cropH) return false;
          const idx = (y * cropW + x) * 4;
          return cdata[idx] > 235 && cdata[idx + 1] > 235 && cdata[idx + 2] > 235;
        };

        const visited = new Uint8Array(cropW * cropH);
        const queue = [];

        // Push all border pixels that are white
        for (let x = 0; x < cropW; x++) {
          if (isWhite(x, 0)) { queue.push(x, 0); visited[0 * cropW + x] = 1; }
          if (isWhite(x, cropH - 1)) { queue.push(x, cropH - 1); visited[(cropH - 1) * cropW + x] = 1; }
        }
        for (let y = 0; y < cropH; y++) {
          if (isWhite(0, y) && !visited[y * cropW + 0]) { queue.push(0, y); visited[y * cropW + 0] = 1; }
          if (isWhite(cropW - 1, y) && !visited[y * cropW + (cropW - 1)]) { queue.push(cropW - 1, y); visited[y * cropW + (cropW - 1)] = 1; }
        }

        let head = 0;
        while (head < queue.length) {
          const x = queue[head++];
          const y = queue[head++];

          // Check 4 neighbors
          const neighbors = [
            [x + 1, y],
            [x - 1, y],
            [x, y + 1],
            [x, y - 1]
          ];
          for (let i = 0; i < 4; i++) {
            const nx = neighbors[i][0];
            const ny = neighbors[i][1];
            if (nx >= 0 && nx < cropW && ny >= 0 && ny < cropH) {
              const nidx = ny * cropW + nx;
              if (!visited[nidx] && isWhite(nx, ny)) {
                visited[nidx] = 1;
                queue.push(nx, ny);
              }
            }
          }
        }

        // Also handle the white counters inside letters 'p', 'e', 'a' of "InspireZest"
        // Notice these are in the top half (y < cropH * 0.7) and surrounded by blue
        // Let's find any enclosed white components:
        for (let y = 0; y < Math.floor(cropH * 0.65); y++) {
          for (let x = 0; x < cropW; x++) {
            const idx = y * cropW + x;
            if (!visited[idx] && isWhite(x, y)) {
              // Check if this white component is surrounded by blue (letters) rather than green (HOSPITAL/cross)
              // Collect the component
              const compQueue = [x, y];
              const compVisited = new Set();
              compVisited.add(idx);
              let compHead = 0;
              let isInsideBlue = true;

              while (compHead < compQueue.length) {
                const cx = compQueue[compHead++];
                const cy = compQueue[compHead++];
                const nbs = [[cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]];
                for (let k = 0; k < 4; k++) {
                  const nx = nbs[k][0];
                  const ny = nbs[k][1];
                  if (nx >= 0 && nx < cropW && ny >= 0 && ny < cropH) {
                    const nidx = ny * cropW + nx;
                    if (isWhite(nx, ny)) {
                      if (!compVisited.has(nidx)) {
                        compVisited.add(nidx);
                        compQueue.push(nx, ny);
                      }
                    } else {
                      // Boundary pixel of this component
                      const pidx = (ny * cropW + nx) * 4;
                      const pr = cdata[pidx];
                      const pg = cdata[pidx + 1];
                      const pb = cdata[pidx + 2];
                      // If green (like inside cross or HOSPITAL badge), it's NOT a letter counter!
                      if (pg > pr && pg > pb && pg > 120) {
                        isInsideBlue = false;
                      }
                    }
                  }
                }
              }

              if (isInsideBlue && compVisited.size < 500) {
                // It's a hollow inside a letter (like inside 'p', 'e')! Make it transparent!
                compVisited.forEach(nidx => {
                  visited[nidx] = 1;
                });
              }
            }
          }
        }

        // Apply alpha to visited pixels with anti-aliasing
        for (let y = 0; y < cropH; y++) {
          for (let x = 0; x < cropW; x++) {
            const nidx = y * cropW + x;
            const pidx = nidx * 4;
            if (visited[nidx]) {
              cdata[pidx + 3] = 0; // Pure transparent background
            } else {
              // Ensure white text (like HOSPITAL or lifeline) is crisp full opacity
              const r = cdata[pidx];
              const g = cdata[pidx + 1];
              const b = cdata[pidx + 2];
              if (r > 240 && g > 240 && b > 240) {
                cdata[pidx] = 255;
                cdata[pidx + 1] = 255;
                cdata[pidx + 2] = 255;
                cdata[pidx + 3] = 255;
              }
            }
          }
        }

        cctx.putImageData(cImgData, 0, 0);

        resolve({
          cropW,
          cropH,
          dataUrl: cropCanvas.toDataURL('image/png')
        });
      };
      img.src = dataUrl;
    });
  }, dataUrl);

  const pngBase64 = result.dataUrl.replace(/^data:image\/png;base64,/, '');
  fs.writeFileSync('public/images/inspirezest-logo.png', Buffer.from(pngBase64, 'base64'));
  fs.writeFileSync('public/images/inspirezest-logo-transparent.png', Buffer.from(pngBase64, 'base64'));
  console.log(`Saved transparent logo (${result.cropW}x${result.cropH}) with preserved white text and lifeline!`);

  await browser.close();
})();

