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
