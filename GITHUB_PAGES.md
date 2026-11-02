# Deploy ke GitHub Pages

Website ini sudah disiapkan sebagai static site. Foto, musik baru, dan QR code berada di `client/public/assets`, sehingga hasil build tidak bergantung pada storage Manus.

## Cara termudah

1. Buat repository GitHub baru, lalu upload seluruh isi folder project ini.
2. Pastikan branch utama bernama `main`.
3. Buka **Settings → Pages** pada repository.
4. Pada **Build and deployment**, pilih **GitHub Actions**.
5. Push ke branch `main`, atau jalankan workflow **Deploy wedding invitation to GitHub Pages** secara manual dari tab **Actions**.
6. URL website akan muncul pada environment `github-pages` setelah workflow selesai.

Workflow berada di `.github/workflows/deploy-pages.yml`. Build menggunakan `pnpm build:static`, menghasilkan website di `dist/public`. Konfigurasi Vite memakai asset path relatif, sehingga website dapat berjalan pada GitHub Pages project URL tanpa mengubah kode.

Untuk nama tamu, gunakan query parameter seperti:

`https://USERNAME.github.io/NAMA-REPOSITORY/?to=Special%20Guest`

## Menjalankan lokal

```bash
pnpm install
pnpm dev:static
```

Build production lokal:

```bash
pnpm build:static
```
