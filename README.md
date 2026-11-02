# Intan & Ferdi — Undangan Pernikahan

Website undangan pernikahan static untuk Intan & Ferdi. Project ini menggunakan React dan Vite dengan desain editorial-romantis, countdown, musik latar, QR Google Maps, galeri foto, serta Wedding Gift.

## Jalankan lokal

```bash
pnpm install
pnpm dev:static
```

Build static production:

```bash
pnpm build:static
```

Output siap hosting berada di `dist/public`.

## Hosting GitHub Pages

Semua foto, QR, dan musik berada di `client/public/assets`, sehingga website tidak bergantung pada server atau storage Manus. Workflow deploy otomatis tersedia di `.github/workflows/deploy-pages.yml`. Ikuti langkah lengkap pada [GITHUB_PAGES.md](./GITHUB_PAGES.md).

Parameter nama tamu tetap didukung, contohnya `?to=Special%20Guest`.

## Pemeriksaan kode

```bash
pnpm check
```
