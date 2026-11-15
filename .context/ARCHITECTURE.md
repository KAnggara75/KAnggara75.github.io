# System Architecture

Arsitektur sistem, alur pemrosesan data, model eksekusi runtime, dan pipeline pengiriman untuk situs web portofolio & blog teknis **KAnggara75.github.io**.

---

## 1. Component Architecture & Diagram

Sistem beroperasi sebagai Single Page Application (SPA) modern berbasis React 19 dan Vite 8 (Rolldown/OXC), yang di-host secara serverless pada infrastruktur GitHub Pages dengan domain kustom `kanggara.my.id`.

```mermaid
graph TD
    subgraph BuildTime ["Build Time (GitHub Actions / Local CLI)"]
        RawPages["pages/*.md<br/>(Markdown + Frontmatter)"]
        RunSh["run.sh<br/>(Metadata Parser & Indexer)"]
        IndexJSON["public/index.json<br/>(Compiled Feed)"]
        PublicPages["public/pages/YYYY/MM/*.md<br/>(Body Content)"]
        ViteBuild["Vite 8 + Rolldown/OXC + Tailwind v4<br/>(Static Bundling)"]
        DistFolder["./dist<br/>(Optimized Production Assets)"]

        RawPages --> RunSh
        RunSh --> IndexJSON
        RunSh --> PublicPages
        IndexJSON --> ViteBuild
        PublicPages --> ViteBuild
        ViteBuild --> DistFolder
    end

    subgraph ClientBrowser ["Client Browser Runtime"]
        Browser["User Browser"]
        Router["React Router v7"]
        HomePage["Home View<br/>(Hero, About, Projects, Blog)"]
        PostPage["Post View<br/>(react-markdown + Prism)"]

        Browser --> Router
        Router -->|/| HomePage
        Router -->|/post/:yyyy/:mm/:postId| PostPage
        HomePage -->|Fetch index.json| IndexJSON
        PostPage -->|Fetch .md file| PublicPages
    end

    subgraph Hosting ["Hosting Platform"]
        GH["GitHub Pages<br/>(CDN / Edge Storage)"]
        DistFolder -.->|Deploy| GH
    end
```

---

## 2. Request & Data Lifecycle

### 2.1 Alur Pre-Build (Penyusunan Metadata Artikel)

1. Developer menambahkan atau memperbarui dokumen artikel di direktori `pages/*.md`.
2. Skrip `run.sh` membaca header frontmatter YAML (`title`, `subtitle`, `author`, `tags`, `source`).
3. Baris frontmatter dipisahkan dari isi artikel, lalu artikel dipindahkan ke direktori `public/pages/YYYY/MM/DD-name`.
4. Berkas metadata agregat dihasilkan pada `public/index.json` untuk konsumsi feed klien.

### 2.2 Alur Runtime Klien (Client-Side Rendering)

1. **Initial Load**: Pengunjung mengakses `https://kanggara.my.id`. GitHub Pages menyajikan `index.html` dan bundel JavaScript/CSS hasil optimasi Vite.
2. **Beranda (`Home.tsx`)**:
   - Komponen `Blog.tsx` mengeksekusi `fetch('/index.json')`.
   - Data feed di-parse ke tipe antarmuka `PostsList`.
   - Enam tulisan terbaru diekstrak dan dirender menggunakan komponen `PostThumb`.
3. **Pembaca Artikel (`Post.tsx`)**:
   - Parameter URL diekstrak via hook `useParams()` dari React Router (`yyyy`, `mm`, `postId`).
   - Browser melakukan dua panggilan HTTP `fetch` paralel:
     - Mengambil konten teks mentah Markdown dari `/pages/YYYY/MM/postId.md`.
     - Mengambil `/index.json` untuk mendapatkan metadata pendukung (judul, tanggal format, tags).
   - Konten Markdown diteruskan ke komponen `<ReactMarkdown>`, di mana `src/config/ReactMarkdownStyle.tsx` melakukan render elemen kustom dan pewarnaan kode via `react-syntax-highlighter` (Prism).

---

## 3. Concurrency & Resource Management

### 3.1 Model Threading & Runtime Browser

- **Event Loop & Asynchronous Fetching**: Menggunakan API standar browser `Promise` dan `fetch` untuk pengambilan aset konten. Tidak ada backend server dinamis yang aktif pada sisi runtime hosting.
- **Client Caching**: Konten Markdown dan feed `index.json` di-cache oleh browser serta CDN GitHub Pages sesuai header Cache-Control standar.

### 3.2 Code Splitting & Chunking

Konfigurasi `vite.config.ts` mengimplementasikan strategi pemecahan chunk vendor manual:

- Dependensi eksternal di dalam `node_modules` dipisahkan menjadi chunk terisolasi (misalnya `react`, `react-dom`, `react-router`, `refractor`, `micromark`).
- Ukuran bundel utama dijaga tetap ringkas untuk meminimalkan First Contentful Paint (FCP) dan Time to Interactive (TTI).

---

## 4. Error Handling & Fault Tolerance

1. **404 Handling**:
   - Jika rute URL klien tidak terdaftar, `Routers.tsx` mengarahkan ke komponen fallback `src/pages/404.tsx`.
   - `404.html` statis disediakan di root repositori untuk menangkap navigasi langsung (deep-linking) pada GitHub Pages yang tidak mendukung server-side rewrite secara native.
2. **Deteksi Respons HTML Tak Valid di Pembaca Artikel**:
   - Jika file artikel Markdown tidak ditemukan dan server mengembalikan dokumen fallback HTML 404, pemeriksaan `content.startsWith("<!doctype html>")` pada `src/pages/Post.tsx` mendeteksi anomali ini dan langsung merender komponen `<ErrorNotFound />`.
3. **Graceful Fallback Formatter**:
   - Skrip `run.sh` memverifikasi keberadaan header `---` pada artikel. Jika header tidak valid atau tag kosong, skrip memunculkan peringatan konsol dan melewati dokumen tersebut untuk mencegah pembuatan JSON korup.

---

## 5. Observability & Telemetry

- **Static Access Logging**: Akses dan bandwidth dicatat secara native oleh analitik repositori GitHub dan metrik Cloudflare/GitHub Pages.
- **Client Console Diagnostics**: Kesalahan runtime atau kegagalan fetch dicatat ke `console.error()` pada browser.
- **SEO & Metadata**: Dilengkapi `sitemap.txt`, `robots.txt`, dan `CNAME` untuk monitoring perayapan mesin pencari.

---

## 6. Data & Domain Boundaries

```
[Markdown Frontmatter] (Raw Text Files)
         │
         ▼ (Parsed by run.sh)
[public/index.json] (Serialized JSON DTO)
         │
         ▼ (Consumed via fetch)
[src/model/Posts.ts] (TypeScript Interfaces: PostsList, PostTypes)
         │
         ▼ (Rendered via React Components)
[DOM View Layer] (HTML5 semantic tags + Tailwind v4 classes)
```

- **Separation of Concerns**: Konten murni berada di dalam format Markdown (`pages/*.md`), terisolasi dari logika presentasi dan styling yang dikelola sepenuhnya oleh React dan Tailwind CSS.
