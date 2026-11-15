# Project TODO & Technical Debt

Daftar inventaris pekerjaan prioritas, catatan teknis, dan perbaikan struktural untuk repositori **KAnggara75.github.io**.

---

## 1. Immediate Tasks

_Tugas operasional mendesak yang mempengaruhi fungsionalitas dan konsistensi._

- [x] `src/component/Contact.tsx`: Implementasi onSubmit mailto handler agar pengunjung dapat mengirim pesan langsung ke `kelvin.kanggara@gmail.com` tanpa backend tambahan.
- [x] `pages/2025-02-09-k8s-nginx-ingress.md`: Perbaiki subtitle artikel agar lebih deskriptif dan konsisten berbahasa Indonesia (`Panduan konfigurasi Nginx Ingress Controller dan routing layanan pada klaster K3s/K8s`). _(Selesai di commit e8d247d)_

---

## 2. Existing Code Annotations (TODO / FIXME)

_Anotasi teknis yang ditemukan langsung di dalam kode sumber._

- _(Tidak ditemukan anotasi `TODO`, `FIXME`, atau `BUG` yang tertinggal di dalam basis kode sumber saat ini)._

---

## 3. Technical Debt & Structural Improvements

_Inisiatif perbaikan arsitektural dan efisiensi jangka menengah/panjang._

- [ ] **Pembersihan Komponen Klien Warisan**: Evaluasi penghapusan permanen berkas `src/component/Client.tsx` jika tidak ada rencana menampilkan testimoni atau logo mitra dalam waktu dekat, untuk menghindari komponen tak terpakai (_dead code_).
- [ ] **Migrasi Skrip Pre-Build ke TypeScript/Node/Bun**: Pertimbangkan untuk memigrasikan skrip bash `run.sh` menjadi skrip TypeScript (`scripts/generate-index.ts`) yang dijalankan via `bun scripts/generate-index.ts`. Ini akan memberikan cross-platform compatibility yang lebih baik (khususnya untuk kontributor Windows) dan parsing YAML frontmatter yang lebih aman menggunakan library parser resmi daripada perintah `sed`.
- [ ] **Optimasi Gambar Portofolio & Open Graph**: Tambahkan metadata Open Graph / Twitter Card pada `index.html` dan `src/pages/Post.tsx` agar tautan artikel yang dibagikan ke media sosial menampilkan cuplikan kartu gambar dan ringkasan yang menarik.
- [ ] **Penyempurnaan Syntax Highlighter Bundle**: Evaluasi pemisahan bahasa pada `react-syntax-highlighter` (misal menggunakan modul `light` alih-alih seluruh bahasa Prism) untuk memangkas ukuran chunk JavaScript `refractor` pada berkas keluaran akhir `dist/`.
