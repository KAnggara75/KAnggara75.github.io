# Agent Workspace Guidelines & Project Memory

Selamat datang di repositori **KAnggara75.github.io**. Dokumen ini adalah panduan utama bagi AI pair-programmers dan agen cerdas yang bekerja pada proyek ini.

---

## 1. Quick Navigation ke Dokumentasi Arsitektur

Seluruh dokumentasi dasar arsitektur tersimpan terpusat di dalam direktori `.context/`. Gunakan tautan relatif berikut untuk memahami konteks mendalam sebelum melakukan perubahan kode:

- **Navigasi Modul & Peta Kode**: [.context/CODEBASE_MAP.md](.context/CODEBASE_MAP.md)
- **Arsitektur Sistem & Data Flow**: [.context/ARCHITECTURE.md](.context/ARCHITECTURE.md)
- **Konteks Proyek & Glosarium Domain**: [.context/PROJECT_CONTEXT.md](.context/PROJECT_CONTEXT.md)
- **Catatan Keputusan Arsitektur (ADRs)**: [.context/DECISIONS.md](.context/DECISIONS.md)
- **Daftar Utang Teknis & Pekerjaan Mendatang**: [.context/TODO.md](.context/TODO.md)

---

## 2. Tech Stack & Environment

- **Runtime & Package Manager**: [Bun](https://bun.sh) (`v1.4.x+`)
- **Frontend Framework**: React 19 (`react`, `react-dom`)
- **Routing**: React Router v7 (`react-router`, `react-router-dom`)
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`, `@import "tailwindcss";`)
- **Build Tool**: Vite 6 dengan SWC (`@vitejs/plugin-react-swc`)
- **Markdown Reader**: `react-markdown` 10, `react-syntax-highlighter` (Prism vscDarkPlus)
- **Linting & Formatting**: ESLint 9 (Flat Config), Prettier 3 (`prettier-plugin-tailwindcss`)
- **Hosting**: GitHub Pages (`https://kanggara.my.id`)

---

## 3. Workflow & Perintah Esensial

Semua perintah build dan development menggunakan runtime Bun:

```bash
# Menjalankan development server lokal (pre-build indexer + lint check + vite)
bun run dev

# Menjalankan format code & lint fix
bun run fc

# Menjalankan full production build (format/lint check + tsc typecheck + vite build)
bun run build

# Menjalankan pre-build skrip pengindeks artikel Markdown saja
./run.sh
```

---

## 4. Aturan Pengiriman & Standar Kode (Delivery Standards)

1. **Conventional Commits**: Semua commit **wajib** mengikuti spesifikasi Conventional Commits (`feat`, `fix`, `refactor`, `style`, `build`, `docs`, `chore`).
2. **Prioritas Atomic Commit (1 per 1)**: Utamakan pemisahan commit per berkas atau unit kerja atomik untuk menjaga riwayat git tetap bersih dan mudah ditinjau.
3. **Format & Type Safety Wajib Lolos**: Setiap perubahan kode harus lulus validasi `bun fc` dan `tsc -b` tanpa error.
4. **Single Source of Truth**: Konfigurasi di dalam repositori adalah sumber kebenaran teknis tunggal.
5. **Prinsip Tautan Obsidian & Portabilitas**:
   - Selalu gunakan tautan relatif Markdown (misal: `[.context/ARCHITECTURE.md](.context/ARCHITECTURE.md)`).
   - Jangan pernah membuat tautan markdown yang mengarah langsung ke folder tanpa file (misal: hindari `[.context/](.context/)`) untuk mencegah galat _"Folder already exists"_ di Obsidian.
   - Jangan gunakan path absolut lokal (`file:///...`).
