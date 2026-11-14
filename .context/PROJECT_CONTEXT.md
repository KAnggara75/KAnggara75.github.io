# Project Context

Konteks bisnis, tujuan proyek, batasan sistem, glosarium domain, dan konvensi pengembangan untuk **KAnggara75.github.io**.

---

## 1. Project Purpose (Tujuan Proyek)

Repositori ini mengelola situs web portofolio profesional dan blog teknis personal milik **Kelvin Anggara** yang dapat diakses di [kanggara.my.id](https://kanggara.my.id).

Tujuan utamanya adalah:

1. **Representasi Profesional**: Menampilkan keahlian teknis nyata dalam bidang _Backend Engineering_, _Distributed Systems_, arsitektur event-driven (Apache Kafka), dan infrastruktur _Cloud-Native_ (Kubernetes/K3s, GitOps).
2. **Pusat Dokumentasi & Tulisan Teknis**: Menyajikan panduan teknis yang dapat diakses publik seputar setup server, Kubernetes networking/ingress, TLS automation, dan arsitektur backend.
3. **Showcase Proyek Open Source**: Menghubungkan pengunjung ke proyek-proyek open source nyata di GitHub (PakaiWA, kafka-topic-controller, IDXStock, Rest2Kafka).

---

## 2. System Boundary (Batasan Sistem)

- **In-Scope**:
  - Presentasi konten web responsif berbasis Single Page Application (SPA).
  - Renderer Markdown dinamis dengan syntax highlighting kode sumber.
  - Skrip pengindeksan metadata artikel lokal (`run.sh`).
  - Dark mode dan light mode switcher yang sinkron dengan preferensi sistem OS.
  - Deployment otomatis ke GitHub Pages.
- **Out-of-Scope**:
  - Content Management System (CMS) berbasis database backend dinamis (semua artikel dikelola sebagai berkas Markdown di dalam repositori git).
  - Sistem komentar publik langsung pada situs (saat ini belum diintegrasikan).
  - Layanan pemrosesan backend aktif untuk formulir pesan (formulir kontak saat ini bersifat presentasional sisi klien).

---

## 3. Main Actors (Aktor Utama)

- **Pengunjung / Recruiter / Engineer**: Membaca artikel teknis, meninjau profil teknis, mengeksplorasi repositori proyek, dan mengirimkan pesan kontak.
- **Developer / Penulis (Kelvin Anggara)**: Menulis artikel baru di `pages/*.md`, memelihara kode komponen, dan memicu deployment otomatis melalui `git push`.
- **GitHub Actions Runner**: Mengotomasi pengujian linting/format, kompilasi TypeScript, pemrosesan aset Vite, dan rilis ke GitHub Pages CDN.

---

## 4. Domain Concepts & Glossary (Glosarium)

- **Frontmatter**: Blok metadata berformat YAML di awal berkas Markdown yang diapit oleh pembatas `---`.
- **Hybrid SPA**: Kombinasi arsitektur di mana pembuatan indeks berkas dilakukan saat pra-build (ahead-of-time) oleh skrip shell, sementara navigasi dan render isi artikel dilakukan secara dinamis oleh React Router di peramban.
- **Cloud-Native**: Pendekatan merancang aplikasi yang memanfaatkan layanan kontainerisasi, Kubernetes, dan otomasi deklaratif.
- **GitOps**: Metodologi operasional infrastruktur di mana repositori Git menjadi _single source of truth_ untuk deklarasi state sistem (misal: Argo CD).

---

## 5. External Systems & Integrations

- **GitHub Pages**: Platform hosting aset statis dan CDN gratis.
- **GitHub API / Repositories**: Tautan sumber kode proyek (`github.com/KAnggara75/*`).
- **Prism / Refractor**: Engine pewarnaan sintaksis kode di dalam pembaca Markdown.

---

## 6. Runtime Environment & Constraints

- **Package Manager & Runtime**: Bun (`v1.4.x+`).
- **Node Engine Compatibility**: Node.js `>= 20` (untuk ekosistem runner standard).
- **Target Browser**: Modern browsers pendukung ES2022+ / Web Standards.
- **Hosting Constraint**: Static file hosting tanpa dukungan komputasi server-side runtime dinamis. URL rewrite untuk routing SPA ditangani oleh file fallback `404.html`.

---

## 7. Coding Conventions & Standards

- **Komponen**: Functional components dengan TypeScript (`.tsx`).
- **Gaya Penulisan Kode**: Diatur ketat oleh Prettier (indentasi tab, double quotes) dan ESLint flat config.
- **CSS Styling**: Utilitas murni Tailwind CSS v4 via `@import "tailwindcss";` tanpa inline style berulang.
- **Pesan Commit**: Mengikuti standar _Conventional Commits_ (`feat`, `fix`, `style`, `build`, `chore`, `docs`).
- **Alur Rilis**: Setiap commit yang masuk ke branch `main` otomatis memicu deploy pipeline ke production.

---

## 8. Known Limitations (Batasan yang Diketahui)

- Penambahan artikel baru mewajibkan penulisan header frontmatter yang valid (`title`, `subtitle`, `author`, `tags`, `source`).
- Menjalankan `bun run build` secara lokal maupun CI otomatis memicu skrip `fc` (formatter and lint check) yang menolak kompilasi jika terdapat pelanggaran linting atau formatting.
