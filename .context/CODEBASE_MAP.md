# Codebase Navigation Map

Peta navigasi modul, tanggung jawab subsistem, dependensi, dan integrasi untuk repositori **KAnggara75.github.io**.

---

## 1. Root & Runtime Configuration

- **Tanggung Jawab**: Titik masuk konfigurasi build, linting, formatting, tooling, serta orkestrasi skrip pre-build.
- **File Kunci**:
  - `package.json` — Deklarasi dependensi React 19, React Router v7, Tailwind CSS v4, Vite 6, TypeScript 5, dan ESLint 9.
  - `vite.config.ts` — Konfigurasi Vite bundler, integrasi plugin `@tailwindcss/vite`, SWC React plugin, dan strategi manual code-splitting.
  - `run.sh` — Skrip bash pra-build untuk mengekstrak metadata frontmatter dari `pages/*.md`, menghasilkan `public/index.json`, dan mengorganisir hierarki artikel ke `public/pages/`.
  - `eslint.config.js` — Flat config ESLint berbasis TypeScript-ESLint, react-hooks, dan react-refresh.
  - `.prettierrc.json` — Konfigurasi formatting Prettier terintegrasi `prettier-plugin-tailwindcss` dan `tailwindStylesheet`.
  - `tailwind.config.js` — Konfigurasi tema warisan yang dihubungkan ke Tailwind CSS v4 via `@config`.
- **Dependensi**: Bun, Vite, Tailwind CSS v4, TypeScript, Prettier, ESLint.
- **Konsumen**: Developer CLI, skrip `bun run dev`, `bun run build`, dan GitHub Actions CI/CD.

---

## 2. Source Application (`src/`)

- **Tanggung Jawab**: Implementasi antarmuka pengguna SPA (Single Page Application), routing sisi klien, render Markdown, dan tema tampilan (Light/Dark mode).
- **Entry / Key Files**:
  - `src/main.tsx` — Bootstrap aplikasi React dengan React 19 `createRoot`, `StrictMode`, dan `BrowserRouter`.
  - `src/Routers.tsx` — Definisi rute aplikasi (`/`, `/about`, `/post/:yyyy/:mm/:postId`).
  - `src/index.css` — Entry stylesheet Tailwind CSS v4 (`@import "tailwindcss";`), custom variants, dan styling kustom navbar.
  - `src/model/Posts.ts` — Definisi antarmuka TypeScript untuk skema data metadata artikel (`PostsList`, `PostTypes`).
- **Dependencies**: `react`, `react-dom`, `react-router`.
- **Consumers**: Web browser, search engine crawlers.

---

## 3. Komponen Antarmuka (`src/component/`)

- **Tanggung Jawab**: Komponen UI modular berulang yang membentuk tata letak halaman beranda dan artikel.
- **Entry / Key Files**:
  - `src/component/Header.tsx` — Navbar responsif, sticky scroll detector, toggle menu mobile hamburger, dan sistem dark mode switcher.
  - `src/component/Hero.tsx` — Headline profil utama ("Backend & Cloud-Native Engineer"), spesialisasi teknologi, deskripsi, dan tombol Call-to-Action (CTA).
  - `src/component/About.tsx` — Ringkasan fokus rekayasa sistem, arsitektur distributed systems, dan tautan sosial profil pengembang.
  - `src/component/Portofolio.tsx` — Galeri proyek sistem nyata (PakaiWA, kafka-topic-controller, IDXStock, Rest2Kafka / Conflect) dengan tech badges dan link repositori.
  - `src/component/Blog.tsx` — Feed artikel teknis terbaru yang dimuat secara asinkron dari `/index.json`.
  - `src/component/PostThumb.tsx` — Kartu thumbnail artikel blog dengan tags kategori dan tanggal rilis.
  - `src/component/Contact.tsx` — Formulir kontak dan pesan pengunjung.
  - `src/component/Footer.tsx` — Navigasi footer, kategori artikel, tautan sosial, dan atribusi situs.
  - `src/component/BackToTop.tsx` — Tombol pintas navigasi kembali ke bagian paling atas halaman.
  - `src/component/Icons.tsx` — Kumpulan ikon vektor SVG untuk bahasa pemrograman, database, dan media sosial.
  - `src/component/Client.tsx` — Komponen logo klien warisan (saat ini dinonaktifkan dari alur halaman utama).
- **Dependencies**: Tailwind CSS utility classes, `react-router-dom`.
- **Consumers**: Halaman `src/pages/Home.tsx` dan `src/pages/Post.tsx`.

---

## 4. Halaman & Layout (`src/pages/`)

- **Tanggung Jawab**: Tampilan level halaman yang di-mount oleh router aplikasi.
- **Entry / Key Files**:
  - `src/pages/Home.tsx` — Komposisi halaman beranda satu halaman (Hero, About, Projects, Blog, Contact, Footer).
  - `src/pages/Post.tsx` — Pembaca artikel teknis; memuat konten Markdown secara dinamis via `fetch`, parsing frontmatter, dan render styling syntax highlighting.
  - `src/pages/About.tsx` — Halaman About khusus.
  - `src/pages/404.tsx` — Halaman fallback navigasi rute tidak ditemukan (error 404).
- **Dependencies**: `react-markdown`, `react-syntax-highlighter`, `src/config/ReactMarkdownStyle.tsx`.
- **Consumers**: `src/Routers.tsx`.

---

## 5. Konfigurasi Renderer Markdown (`src/config/`)

- **Tanggung Jawab**: Kustomisasi komponen elemen HTML yang dihasilkan oleh `react-markdown` untuk styling Tailwind dan syntax highlighting.
- **Entry / Key Files**:
  - `src/config/ReactMarkdownStyle.tsx` — Pemetaan elemen Markdown (`h1`-`h6`, `p`, `table`, `code`, `blockquote`) ke kelas Tailwind, serta integrasi Prism SyntaxHighlighter dengan tema `vscDarkPlus`.
- **Dependencies**: `react-markdown`, `react-syntax-highlighter`.
- **Consumers**: `src/pages/Post.tsx`.

---

## 6. Konten Artikel Teknis (`pages/` & `public/`)

- **Tanggung Jawab**: Sumber konten blog teknis berbasis Markdown dan aset statis publik.
- **Entry / Key Files**:
  - `pages/*.md` — Artikel sumber berformat Markdown dengan metadata frontmatter YAML (title, subtitle, tags, author, source).
  - `public/index.json` — Indeks metadata artikel yang dihasilkan secara otomatis oleh `run.sh`.
  - `public/img/` — Aset gambar statis, thumbnail, ikon, dan foto profil.
  - `CNAME` — Domain kustom GitHub Pages (`kanggara.my.id`).
  - `robots.txt` & `sitemap.txt` — Pengaturan indeksasi mesin pencari.
- **Dependencies**: Tidak ada (berkas Markdown statis dan aset publik).
- **Consumers**: Browser, skrip `run.sh`, halaman `Post.tsx` dan `Blog.tsx`.

---

## 7. Otomasi CI/CD (`.github/workflows/`)

- **Tanggung Jawab**: Pipeline pengujian dan rilis otomatis situs web ke GitHub Pages.
- **Entry / Key Files**:
  - `.github/workflows/deploy.yml` — Workflow deployment otomatis pada push ke branch `main`: setup Bun, eksekusi `./run.sh`, `bun run build`, upload artefak `./dist`, dan deploy ke GitHub Pages.
  - `.github/workflows/deploy-test.yml` — Workflow validasi build otomatis pada setiap Pull Request.
  - `.github/dependabot.yml` — Konfigurasi pembaruan dependensi otomatis harian untuk npm/yarn ecosystem.
- **Dependencies**: GitHub Actions, `oven-sh/setup-bun`, `actions/deploy-pages`.
- **Consumers**: GitHub repository runner.
