// Genererar PNG-ikoner från public/icon.svg: node scripts/icons.mjs
import sharp from 'sharp'
import { readFile } from 'node:fs/promises'

const svg = await readFile(new URL('../public/icon.svg', import.meta.url))
const out = (f) => new URL(`../public/${f}`, import.meta.url).pathname

await sharp(svg).resize(192, 192).png().toFile(out('icon-192.png'))
await sharp(svg).resize(512, 512).png().toFile(out('icon-512.png'))
await sharp(svg).resize(180, 180).png().toFile(out('apple-touch-icon.png'))
// Maskable: lägg ikonen i den säkra zonen (80 %) på bakgrundsfärg
const inner = await sharp(svg).resize(410, 410).png().toBuffer()
await sharp({ create: { width: 512, height: 512, channels: 4, background: '#0d0f1c' } })
  .composite([{ input: inner, gravity: 'center' }])
  .png()
  .toFile(out('icon-512-maskable.png'))
console.log('Ikoner klara')
