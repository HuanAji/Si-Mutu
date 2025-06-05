🚀 Project React + Vite + Flowbite

Ini adalah project React.js yang dibangun menggunakan Vite dan Tailwind CSS, serta menggunakan komponen UI dari Flowbite.

Struktur yang Digunakan :

- React.js
- Vite
- Tailwind CSS
- Flowbite
- Flowbite React


Cara Menjalankan Project

1. Clone Repo Ini

buka git bash terminal kemudian jalankan
git clone https://github.com/HuanAji/Si-Mutu


cd nama-repo
example : cd simutu

2. Install Node.js (jika belum ada)

Unduh dan install dari: https://nodejs.org/

Disarankan versi v16.x atau yang terbaru

3. Install Dependency

npm install

4. Jalankan Project

npm run dev

Lalu buka browser ke: http://localhost:5173


---

⚠️ Konfigurasi Tambahan

✅ Tailwind Config (tailwind.config.js)

Pastikan file ini sudah berisi konfigurasi untuk Flowbite:

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

✅ File .env (Jika Dibutuhkan)

Jika aplikasi ini menggunakan .env, pastikan kamu menyalin dari .env.example:

cp .env.example .env

Lalu sesuaikan isi variabelnya.


---
