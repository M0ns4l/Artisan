// Creates a web-optimized WebP (keeps transparency) from public/Profile/profile.png.
// Run: npm run assets:profile
import { chromium } from '@playwright/test'
import { readFile, writeFile } from 'node:fs/promises'

const SIZE = 900
const src = (await readFile('public/Profile/profile.png')).toString('base64')
const browser = await chromium.launch()
const page = await browser.newPage()
const dataUrl = await page.evaluate(
  async ({ src, size }) => {
    const img = new Image()
    img.src = `data:image/png;base64,${src}`
    await img.decode()
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')
    ctx.imageSmoothingQuality = 'high'
    ctx.drawImage(img, 0, 0, size, size)
    return canvas.toDataURL('image/webp', 0.86)
  },
  { src, size: SIZE },
)
await browser.close()
await writeFile('public/Profile/profile.webp', Buffer.from(dataUrl.split(',')[1], 'base64'))
console.log('Wrote public/Profile/profile.webp')
