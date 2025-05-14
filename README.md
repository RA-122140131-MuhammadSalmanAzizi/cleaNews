# CleanNews - Portal Berita dengan Next.js

**CleaNews** adalah portal berita berbasis Next.js 14 dan App Router yang menyajikan berita terbaru secara real-time dari:

- ✅ **Detik.com** — kategori INET, Finance, Health
- ✅ **Kompas.com** — kategori Tekno, Otomotif, Bola
- ✅ **Liputan6.com** — kategori Tekno, Global, Bola

Fitur unggulan:
- Login menggunakan Google (OAuth via NextAuth.js)
- Proteksi halaman dengan session
- UI per portal dengan warna dan animasi unik
- Scraping konten live menggunakan Cheerio
- Spinner loading, konten dinamis, dan layout responsif

---

## 🚀 Cara Menjalankan Project

### 1. Clone repository
```bash
git clone https://github.com/username/cleanews.git
cd newsverse
```

### 2. Install dependencies
```bash
npm install
```

Jika Tailwind belum terpasang:
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Jika belum install Cheerio:
```bash
npm install cheerio
```

---

### 3. Konfigurasi Environment

Buat file `.env.local`:
```bash
cp .env.example .env.local
```

Lalu isi seperti berikut:
```env
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXTAUTH_SECRET=your-random-nextauth-secret
NEXTAUTH_URL=http://localhost:3000
```

---

### 4. Jalankan dalam mode development
```bash
npm run dev
```

Akses project di browser:
[http://localhost:3000](http://localhost:3000)

---

## 📁 Struktur Direktori (berbasis `src/`)

```
src/
├── app/
│   ├── api/
│   │   └── berita/
│   │       ├── detik/route.ts
│   │       ├── kompas/route.ts
│   │       └── liputan6/route.ts
│   ├── berita/
│   │   ├── detik/
│   │   │   ├── page.tsx
│   │   │   └── DetikClient.tsx
│   │   ├── kompas/
│   │   │   ├── page.tsx
│   │   │   └── KompasClient.tsx
│   │   ├── liputan6/
│   │   │   ├── page.tsx
│   │   │   └── Liputan6Client.tsx
│   │   └── LogoutButton.tsx
│   ├── login/
│   │   ├── page.tsx
│   │   └── LoginClient.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── page.module.css
├── components/
│   └── SessionProvider.tsx
```

---

## ⚙️ Teknologi yang Digunakan

- [Next.js 14](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [NextAuth.js](https://next-auth.js.org/)
- [Cheerio](https://cheerio.js.org/)
- TypeScript

---

## 🔒 Keamanan & Konvensi

- File `.env.local` **tidak** diupload ke GitHub (sudah masuk `.gitignore`)
- Dokumentasi variabel environment tersedia di `.env.example`
- Struktur modular dengan pendekatan `App Router`

---

📌 Created with by **Salman Azizi** — Mahasiswa Informatika @ ITERA
