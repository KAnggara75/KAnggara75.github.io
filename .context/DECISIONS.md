# Architecture Decision Records (ADRs)

Dokumentasi keputusan arsitektur teknis yang bersifat _append-only_. Keputusan historis tidak boleh ditimpa; perubahan keputusan dicatat sebagai ADR baru yang menggantikan (supersede) ADR sebelumnya.

---

## ADR-001: Penggunaan Arsitektur Hybrid SPA & Pre-build Static Indexer

- **Status**: Accepted
- **Date**: 2025-02-01
- **Source**: Codebase evidence (`run.sh`, `src/Routers.tsx`, `public/index.json`)
- **Context**: Situs membutuhkan performa tinggi, navigasi halus tanpa reload (SPA), kemudahan menulis artikel menggunakan Markdown standar, dan kapabilitas hosting gratis tanpa backend aktif pada GitHub Pages.
- **Decision**: Menggunakan pendekatan hybrid: skrip shell `run.sh` bertindak sebagai pre-build compiler yang mem-parse metadata frontmatter YAML menjadi `public/index.json`, sementara antarmuka klien menggunakan React SPA dengan dynamic routing.
- **Consequences**:
  - _Positif_: Tidak memerlukan framework SSR berat (seperti Next.js), biaya hosting nol, performa muat sangat cepat via CDN.
  - _Negatif_: Pembaruan feed artikel mewajibkan eksekusi `./run.sh` sebelum build.

---

## ADR-002: Migrasi ke Bun Package Manager & Runtime Tooling

- **Status**: Accepted
- **Date**: 2025-02-11
- **Source**: Git commit history (`6ebb479`, `46de694`, `bun.lock`)
- **Context**: Instalasi dependensi dan eksekusi task runner menggunakan npm/yarn tradisional membutuhkan waktu lebih lama dan konsumsi storage besar pada runner CI.
- **Decision**: Mengganti npm dengan Bun (`v1.4.x`) sebagai package manager utama untuk manajemen dependensi, script execution (`bun run build`, `bun fc`), dan runner di GitHub Actions workflow (`oven-sh/setup-bun`).
- **Consequences**:
  - _Positif_: Kecepatan install dan build meningkat drastis, integritas dependency tree terjaga via `bun.lock`.
  - _Negatif_: Memerlukan `bun` terpasang di mesin developer lokal.

---

## ADR-003: Upgrade ke Tailwind CSS v4 dengan Plugin Resmi `@tailwindcss/vite`

- **Status**: Accepted
- **Date**: 2026-11-14
- **Source**: Codebase evidence (`vite.config.ts`, `src/index.css`, PR #53)
- **Context**: Tailwind CSS merilis versi 4 dengan arsitektur baru berbasis CSS-first, LightningCSS, dan plugin Vite native yang jauh lebih cepat daripada integrasi PostCSS warisan.
- **Decision**:
  - Meng-upgrade `tailwindcss` ke `^4.3.5` dan memasang `@tailwindcss/vite`.
  - Menghapus dependensi dan berkas konfigurasi `postcss.config.js`, `postcss`, dan `autoprefixer`.
  - Mengonfigurasi `src/index.css` menggunakan `@import 'tailwindcss';` dan layer kompatibilitas border default.
  - Memasang `prettier-plugin-tailwindcss@0.7.2` untuk kestabilan sorting utility classes Tailwind v4.
- **Consequences**:
  - _Positif_: Waktu kompilasi stylesheet menurun menjadi di bawah 2 detik, pipeline build lebih ringkas tanpa dependensi PostCSS tambahan.
  - _Negatif_: Beberapa utilitas warisan (seperti `bg-opacity-*`) digantikan dengan modifier modern (`bg-slate-200/70`).

---

## ADR-004: Pembaruan Modern Stack (React 19, React Router v7, ESLint Flat Config)

- **Status**: Accepted
- **Date**: 2026-11-14
- **Source**: Codebase evidence (`package.json`, `eslint.config.js`, PR #43, PR #51)
- **Context**: Memastikan repositori terbebas dari security vulnerability, deprecated runtime warnings, dan memanfaatkan standar ekosistem React terkini.
- **Decision**:
  - Meng-upgrade `react` dan `react-dom` ke `^19.3.1`.
  - Meng-upgrade `react-router` dan `@react-router/*` ke `^7.18.5`.
  - Meng-upgrade `react-markdown` ke `^10.1.0` (PR #43).
  - Meng-upgrade `globals` ke `^16.5.0` (PR #51) pada ESLint flat config.
- **Consequences**:
  - _Positif_: Ekosistem up-to-date, linting dan type checking lebih ketat dan reliabel.
  - _Negatif_: Perubahan perilaku API minor pada library Markdown diakomodasi melalui pengujian menyeluruh.

---

## ADR-005: Transformasi Portofolio Menjadi Engineering System Showcase

- **Status**: Accepted
- **Date**: 2026-11-14
- **Source**: Developer prompt & task refinement
- **Context**: Situs web pribadi sebelumnya menggunakan placeholder template dan belum mencerminkan identitas teknis nyata developer sebagai _Backend & Cloud-Native Engineer_.
- **Decision**:
  - Menghapus template statis (_Tribute Page_, _E-Commerce_) dan bagian _Clients_ yang belum siap.
  - Mengganti showcase dengan 4 proyek sistem nyata: **PakaiWA**, **kafka-topic-controller**, **IDXStock**, dan **Rest2Kafka / Conflect**.
  - Menyelaraskan navigasi utama menjadi 5 pilar: `Home`, `About`, `Projects`, `Blog`, dan `Contact`.
- **Consequences**:
  - _Positif_: Meningkatkan kredibilitas profesional di hadapan evaluator teknis dan audiens industri rekayasa perangkat lunak.
  - _Negatif_: Bagian Clients dinonaktifkan sementara sampai ada data mitra/klien yang dapat dipublikasikan secara resmi.

---

## ADR-006: Eliminasi Dead Dependencies, Zero Attack Surface & Penutupan Dependabot Alert #5

- **Status**: Accepted
- **Date**: 2026-11-15
- **Source**: Dependabot Alert #5 (`GHSA-3g3m-2fjr-6pw4` / `CVE-2026-118773`) & Dependency Audit
- **Context**:
  - GitHub Dependabot mendeteksi kerentanan tingkat Medium pada pustaka `glob` (`>= 9.0.0, <= 14.0.1`) terkait unhandled AbortSignal filesystem traversal.
  - Audit kode menunjukkan `glob` adalah _dead dependency_ yang sama sekali tidak pernah di-import dalam basis kode.
  - Selain `glob`, ditemukan paket _dummy/polyfill_ usang (`path`), paket SSR yang tidak relevan dengan static SPA (`@react-router/node`, `@react-router/serve`, `@react-router/dev`), paket tipe kadaluarsa (`@types/react-router-dom`), serta duplikasi paket routing (`react-router-dom`).
- **Decision**:
  - Menghapus pustaka `glob` sepenuhnya (`bun remove glob`), menutup Dependabot Alert #5 tanpa perlu menambah overhead versi baru.
  - Menghapus paket polyfill `path` dan beralih ke native `node:path`.
  - Menghapus seluruh dependensi SSR React Router (`@react-router/node`, `@react-router/serve`, `@react-router/dev`).
  - Menghapus `react-router-dom` dan `@types/react-router-dom`, lalu menyatukan seluruh impor routing (komponen `Link`, `Routes`, dll.) langsung ke `react-router` v7.
  - Membersihkan deklarasi `trustedDependencies: ["@swc/core"]` yang sudah usang.
- **Consequences**:
  - _Positif_: Dependabot Alert tertutup, _attack surface_ berkurang drastis, `package.json` hanya menyisakan 5 dependensi runtime esensial, ukuran `node_modules` dan `bun.lock` jauh lebih ramping, serta instalasi CI lebih cepat.
  - _Negatif_: Tidak ada. Seluruh fungsi SPA tetap berjalan normal.

---

## ADR-007: Upgrade ke Vite 8 dan Migrasi ke `@vitejs/plugin-react` (Rolldown/OXC Native)

- **Status**: Accepted
- **Date**: 2026-11-15
- **Source**: Developer environment diagnostics & Vite deprecation warning
- **Context**:
  - Lingkungan runtime modern menggunakan Vite 8 yang bertransisi ke engine Rolldown dan parser OXC.
  - Penggunaan `__dirname` di `vite.config.ts` memicu peringatan deprecation dari `configLoader: 'native'`.
  - Plugin lama `@vitejs/plugin-react-swc` menyuntikkan opsi konfigurasi `esbuild: { ... }` yang ditandai _deprecated_ oleh Vite 8 demi `oxc`.
- **Decision**:
  - Mengganti `__dirname` dengan standar resmi ES Module: `import.meta.dirname` pada `vite.config.ts`.
  - Meng-upgrade `vite` ke versi mayor terbaru `^8.3.8`.
  - Memigrasikan plugin React dari `@vitejs/plugin-react-swc` ke plugin resmi Vite 8: `@vitejs/plugin-react@^6.3.0` yang mendukung OXC & Rolldown secara native.
- **Consequences**:
  - _Positif_: Waktu kompilasi produksi menurun drastis menjadi ~280ms (peningkatan kecepatan ~6x lipat), bebas peringatan deprecation (0 warnings), konfigurasi _future-proof_ siap untuk native config loading.
  - _Negatif_: Memerlukan kompatibilitas Node `>= 20.11` / Bun modern untuk dukungan native `import.meta.dirname`.

---

## ADR-008: Implementasi Halaman Kurasi Artikel Berdasarkan Tag (`/tags/:tag`) dan Normalisasi URL Absolut

- **Status**: Accepted
- **Date**: 2026-11-15
- **Source**: GitHub Issue #36 (PR #54, PR #55) & Codebase evidence (`src/pages/Tags.tsx`, `src/Routers.tsx`, `run.sh`)
- **Context**:
  - Pengunjung membutuhkan kemampuan memfilter artikel berdasarkan topik/tag spesifik (misal: `/tags/Kubernetes`, `/tags/linux`).
  - Sebelumnya, tautan tag pada kartu artikel mengarah ke rute `/tags/:tag` yang belum terdaftar di React Router, memicu halaman 404.
  - URL thumbnail gambar di `public/index.json` awalnya bersifat relatif (`img/default.jpeg`), sehingga pada rute bersarang browser salah mencari `/tags/img/default.jpeg` (HTTP 404).
- **Decision**:
  - Membuat halaman baru `src/pages/Tags.tsx` yang mengekstrak tag via `useParams()`, melakukan filter _case-insensitive_ terhadap `index.json`, menyajikan topic badge selector interaktif dengan jumlah artikel, dan menampilkan Empty State bila tidak ada hasil.
  - Mendaftarkan rute dinamis `tags/:tag` dan fallback `tags` di `src/Routers.tsx`.
  - Mengubah generator `run.sh` dan normalisasi defensif pada `PostThumb.tsx` agar seluruh path gambar menggunakan leading slash absolut (`/img/...`).
- **Consequences**:
  - _Positif_: Pengalaman eksplorasi artikel meningkat drastis, SPA routing berjalan mulus tanpa reload halaman, aset gambar terbebas dari galat 404 pada rute bersarang.
  - _Negatif_: Memerlukan sinkronisasi rute pada `404.html` GitHub Pages SPA handler agar direct deep-linking tetap berfungsi.

---

## ADR-009: Otomasi Verifikasi Deployment & Healthcheck Pasca-Deploy (`test.sh` & GitHub Actions)

- **Status**: Accepted
- **Date**: 2026-11-15
- **Source**: GitHub Issue #29 (PR #56) & Codebase evidence (`test.sh`, `.github/workflows/deploy.yml`, `.github/workflows/check-deployment.yml`)
- **Context**:
  - Job `test` sebelumnya di `deploy.yml` mengalami kondisi _false positive_ (selalu hijau meskipun gagal) karena variabel `$base_url` kosong, runner terpisah tidak memiliki folder `dist/`, dan ketiadaan exit code kegagalan (`exit 1`).
  - Propagasi CDN Cloudflare dan Fastly pada GitHub Pages memerlukan jeda beberapa detik setelah step deployment selesai.
- **Decision**:
  - Memodernisasi `test.sh` dengan mekanisme polling & retry (hingga 6 kali percobaan @ 10 detik interval).
  - Memvalidasi HTTP status code 200 pada root page, bundel JavaScript/CSS live (mencocokkan hash build dengan HTML live), data `index.json`, SPA fallback `404.html`, dan thumbnail default.
  - Menerapkan strict exit code (`exit 1` bila gagal) dan menghubungkan output `page_url` serta `asset_hash` dari job `deploy` ke job `test`.
  - Menambahkan workflow mandiri `.github/workflows/check-deployment.yml` dengan trigger `workflow_dispatch` manual dan penjadwalan cron harian (`0 0 * * *`).
- **Consequences**:
  - _Positif_: Menghilangkan _false positive_, memberikan umpan balik status deployment yang akurat, memantau kesehatan situs publik secara berkala.
  - _Negatif_: Pipeline deploy membutuhkan tambahan waktu ~15-30 detik untuk step healthcheck.

---

## ADR-010: Standardisasi SEO, Social Embeds, Sitemap XML Otomatis, dan Contact Form Mailto Handler

- **Status**: Accepted
- **Date**: 2026-11-15
- **Source**: Developer request & PR #57 / commit follow-up
- **Context**:
  - Kartu preview tautan (link preview) di Discord dan media sosial tampak anonim karena ketiadaan `og:site_name`, `og:image`, `theme-color`, dan `description`.
  - Berkas `sitemap.txt` warisan menggunakan format teks usang dan tidak dikenali optimal oleh mesin pencari Google/Bing.
  - Direktori `public/` belum menampung aset statis root (`CNAME`, `ads.txt`, `robots.txt`, `.nojekyll`), sehingga berisiko tidak ter-bundle ke `dist/` oleh Vite.
  - Formulir kontak sebelumnya menggunakan `action=""` tanpa event handler interaktif.
- **Decision**:
  - Menambahkan metadata SEO lengkap di `index.html` (`meta description`, `og:site_name`, `og:title`, `og:description`, `og:image`, `og:url`, `theme-color: #0ea5e9`, dan `twitter:card`).
  - Menggantikan `sitemap.txt` dengan generator otomatis `sitemap.xml` di `run.sh` yang memetakan seluruh rute inti, kategori tag, dan artikel dengan atribut `<lastmod>`.
  - Mengonfigurasi `robots.txt` dengan direktif perayapan standar (`Allow: /`) dan deklarasi `Sitemap: https://kanggara.my.id/sitemap.xml`.
  - Mengintegrasikan sinkronisasi aset statis root (`CNAME`, `ads.txt`, `robots.txt`, `sitemap.xml`, `.nojekyll`) langsung ke dalam direktori `public/` via `run.sh`.
  - Mengubah formulir `Contact.tsx` menjadi controlled input React dengan handler `onSubmit` yang secara otomatis menyusun tautan protokol `mailto:kelvin.kanggara@gmail.com`.
- **Consequences**:
  - _Positif_: Tampilan link embed di Discord/Slack tampil kaya dan profesional, perayapan mesin pencari terarah dan otomatis, formulir kontak dapat langsung digunakan tanpa dependensi backend eksternal, aset statis produksi di `dist/` terjamin lengkap.
  - _Negatif_: Pengiriman pesan bergantung pada ketersediaan klien email lokal pengunjung.
