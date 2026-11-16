// Renders public/og-image.png (1200×630) and public/apple-touch-icon.png (180×180)
// from HTML using Playwright. Run: npm run assets:share
import { chromium } from '@playwright/test'
import { readFile } from 'node:fs/promises'

const photo = (await readFile('public/Profile/profile.webp')).toString('base64')

const og = `<!doctype html><html><head>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500&family=Plus+Jakarta+Sans:wght@500;600&display=block" rel="stylesheet">
<style>
  *{margin:0;box-sizing:border-box}
  body{width:1200px;height:630px;background:#0a0d14;color:#e8ebf1;font-family:'Plus Jakarta Sans',sans-serif;
    display:flex;align-items:center;padding:0 80px;gap:72px;position:relative;overflow:hidden}
  .grid{position:absolute;inset:0;background-image:linear-gradient(to right,#151a25 1px,transparent 1px),linear-gradient(to bottom,#151a25 1px,transparent 1px);background-size:32px 32px;opacity:.7}
  .text{position:relative;flex:1}
  .eyebrow{font-family:'JetBrains Mono',monospace;font-size:20px;letter-spacing:.12em;color:#7ea8ff;text-transform:uppercase}
  h1{font-size:62px;line-height:1.06;font-weight:600;letter-spacing:-.03em;margin-top:26px}
  .who{margin-top:40px;display:flex;align-items:center;gap:16px;font-size:24px}
  .who b{font-weight:600}.who span{color:#a6afbe}
  .mark{width:44px;height:44px;border:2px solid #2b3445;border-radius:8px;display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:17px}
  .photo{position:relative;width:330px;border:1px solid #2b3445;border-radius:16px;overflow:hidden;background:#0f131c}
  .photo .bar{height:34px;border-bottom:1px solid #1d2431;display:flex;gap:7px;align-items:center;padding:0 14px}
  .photo .bar i{width:9px;height:9px;border-radius:50%;background:#2b3445}
  .photo img{display:block;width:100%;height:330px;object-fit:cover;object-position:50% 0;background:#1a2030}
  .accent{position:absolute;left:80px;bottom:0;width:160px;height:4px;background:#7ea8ff}
</style></head><body>
<div class="grid"></div>
<div class="text">
  <p class="eyebrow">Software Engineer · Full-Stack</p>
  <h1>Engineering software that makes complex work simpler.</h1>
  <div class="who"><div class="mark">MD</div><b>Monsal Dawa</b><span>Senior Programmer</span></div>
</div>
<div class="photo"><div class="bar"><i></i><i></i><i></i></div><img src="data:image/webp;base64,${photo}"></div>
<div class="accent"></div>
</body></html>`

const icon = `<!doctype html><html><head>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@600&display=block" rel="stylesheet">
<style>*{margin:0}body{width:180px;height:180px;background:#0a0d14;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:10px}
p{font-family:'JetBrains Mono',monospace;font-size:66px;font-weight:600;color:#e8ebf1;letter-spacing:-3px;line-height:1}
i{display:block;width:40px;height:7px;border-radius:4px;background:#7ea8ff}</style></head>
<body><p>MD</p><i></i></body></html>`

const browser = await chromium.launch()
async function render(html, width, height, path) {
  const page = await browser.newPage({ viewport: { width, height } })
  await page.setContent(html, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path, type: 'png' })
  await page.close()
}
await render(og, 1200, 630, 'public/og-image.png')
await render(icon, 180, 180, 'public/apple-touch-icon.png')
await browser.close()
console.log('Rendered public/og-image.png and public/apple-touch-icon.png')
