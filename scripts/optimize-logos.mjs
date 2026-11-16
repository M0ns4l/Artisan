// Trims the Artisan logos to their visible edges and writes web-sized assets:
//   public/logo/wordmark-{light,dark}.png  (header/footer, 2x for crisp display)
//   public/favicon-{light,dark}.png         (browser tab, per OS theme)
//   public/apple-touch-icon.png             (home-screen icon, on a white tile)
// "light" files are the black mark (for light backgrounds); "dark" are white.
// Run: npm run assets:logo
import { chromium } from '@playwright/test'
import { readFile, writeFile } from 'node:fs/promises'

const load = async (f) => `data:image/png;base64,${(await readFile(f)).toString('base64')}`
const inputs = {
  wordLight: await load('public/logo/artisan-light.png'),
  wordDark: await load('public/logo/artisan-dark.png'),
  iconLight: await load('public/logo/artisan-icon-light.png'),
  iconDark: await load('public/logo/artisan-icon-dark.png'),
}

const browser = await chromium.launch()
const page = await browser.newPage()
const out = await page.evaluate(async (inputs) => {
  async function loadImg(src) {
    const img = new Image()
    img.src = src
    await img.decode()
    return img
  }
  // Bounding box of pixels that are visible (alpha) and differ from a white/transparent backdrop.
  function bbox(img, ink) {
    const c = document.createElement('canvas')
    c.width = img.width
    c.height = img.height
    const ctx = c.getContext('2d')
    ctx.drawImage(img, 0, 0)
    const { data } = ctx.getImageData(0, 0, c.width, c.height)
    let minX = c.width, minY = c.height, maxX = 0, maxY = 0
    for (let y = 0; y < c.height; y++) {
      for (let x = 0; x < c.width; x++) {
        const i = (y * c.width + x) * 4
        const a = data[i + 3]
        const lum = (data[i] + data[i + 1] + data[i + 2]) / 3
        const isInk = a > 40 && (ink === 'dark' ? lum < 128 : lum > 128)
        if (isInk) {
          if (x < minX) minX = x
          if (y < minY) minY = y
          if (x > maxX) maxX = x
          if (y > maxY) maxY = y
        }
      }
    }
    const corner = data[3]
    return { x: minX, y: minY, w: maxX - minX + 1, h: maxY - minY + 1, cornerAlpha: corner }
  }
  // Redraw only the ink (recoloured solid) so any baked-in white backdrop becomes transparent.
  function render(img, box, { width, height, pad = 0, color, ink, bg }) {
    const c = document.createElement('canvas')
    c.width = width
    c.height = height
    const ctx = c.getContext('2d')
    if (bg) {
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, width, height)
    }
    const scale = Math.min((width - pad * 2) / box.w, (height - pad * 2) / box.h)
    const dw = box.w * scale
    const dh = box.h * scale
    // Draw the mark into an offscreen canvas, then keep only ink pixels in the target colour.
    const o = document.createElement('canvas')
    o.width = Math.ceil(dw)
    o.height = Math.ceil(dh)
    const octx = o.getContext('2d')
    octx.imageSmoothingQuality = 'high'
    octx.drawImage(img, box.x, box.y, box.w, box.h, 0, 0, dw, dh)
    const id = octx.getImageData(0, 0, o.width, o.height)
    const [r, g, b] = color
    for (let i = 0; i < id.data.length; i += 4) {
      const lum = (id.data[i] + id.data[i + 1] + id.data[i + 2]) / 3
      const a = id.data[i + 3] / 255
      // Coverage: how "inky" the pixel is (dark ink on light, or light ink on dark).
      const cover = (ink === 'dark' ? 1 - lum / 255 : lum / 255) * a
      id.data[i] = r
      id.data[i + 1] = g
      id.data[i + 2] = b
      id.data[i + 3] = Math.round(Math.max(0, Math.min(1, (cover - 0.08) / 0.84)) * 255)
    }
    octx.putImageData(id, 0, 0)
    ctx.drawImage(o, (width - dw) / 2, (height - dh) / 2)
    return c.toDataURL('image/png')
  }

  const [wl, wd, il, idk] = await Promise.all([inputs.wordLight, inputs.wordDark, inputs.iconLight, inputs.iconDark].map(loadImg))
  const bWord = bbox(wl, 'dark')
  const bWordD = bbox(wd, 'light')
  const bIcon = bbox(il, 'dark')
  const bIconD = bbox(idk, 'light')
  const wordH = 112
  const wordW = Math.round((bWord.w / bWord.h) * wordH)
  const black = [14, 17, 22]
  const white = [238, 240, 244]
  return {
    boxes: { bWord, bWordD, bIcon, bIconD },
    wordLight: render(wl, bWord, { width: wordW, height: wordH, color: black, ink: 'dark' }),
    wordDark: render(wd, bWordD, { width: wordW, height: wordH, color: white, ink: 'light' }),
    favLight: render(il, bIcon, { width: 64, height: 64, pad: 3, color: black, ink: 'dark' }),
    favDark: render(idk, bIconD, { width: 64, height: 64, pad: 3, color: white, ink: 'light' }),
    apple: render(il, bIcon, { width: 180, height: 180, pad: 36, color: black, ink: 'dark', bg: '#ffffff' }),
    wordSize: [wordW, wordH],
  }
}, inputs)
await browser.close()

const save = (file, dataUrl) => writeFile(file, Buffer.from(dataUrl.split(',')[1], 'base64'))
await save('public/logo/wordmark-light.png', out.wordLight)
await save('public/logo/wordmark-dark.png', out.wordDark)
await save('public/favicon-light.png', out.favLight)
await save('public/favicon-dark.png', out.favDark)
await save('public/apple-touch-icon.png', out.apple)
console.log('boxes', JSON.stringify(out.boxes))
console.log('wordmark size', out.wordSize.join('x'))
