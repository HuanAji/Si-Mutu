🚀 Project React + Vite + Flowbite

Ini adalah project React.js yang dibangun menggunakan Vite dan Tailwind CSS, serta menggunakan komponen UI dari Flowbite.

Struktur yang Digunakan yaitu :

- React.js
- Vite
- Tailwind CSS
- Flowbite
- Flowbite React


Cara Menjalankan Project

1. Clone Repo Ini

buka git bash terminal kemudian jalankan
git clone https://github.com/HuanAji/Si-Mutu

2. Kemudian buka project nya ke VSCODE atau editor code lain
3. Open Terminal di editor code
4. Jika folder sudah mengarah ke folder terakhir seperti di bawah ini
![image](https://github.com/user-attachments/assets/dbce9d04-4acd-4873-89ef-d86c8b10ba3c)
jika ingin melihat truktur folder bisa di ketikkan perintah :
$ dir

5. Install Node.js (jika belum ada)

Unduh dan install dari: https://nodejs.org/

Disarankan versi v16.x atau yang terbaru

6. Open Terminal pada VSCODE atau editor code lain 

Jika folder sudah mengarah ke folder terakhir seperti di bawah ini
![image](https://github.com/user-attachments/assets/dbce9d04-4acd-4873-89ef-d86c8b10ba3c)

![image](https://github.com/user-attachments/assets/1be9bc55-563b-409b-b51f-85c8fc03517f)

2. Install Node.js (jika belum ada)

Unduh dan install dari: https://nodejs.org/

Disarankan versi v16.x atau yang terbaru
$ npm run dev
$ cd nama-repo
Contoh --> cd simutu


3. Install Dependency
//ketikkan perintah di bawah ini ke Terminal Git Bash 
npm install

5. Jalankan Project
npm run dev

Kemudian jika sudah seperti di bawah ini 
![image](https://github.com/user-attachments/assets/9a4f01b1-df30-4a8c-a61c-1a29313f4c42)

Lalu buka browser ke: http://localhost:5173 dengan klik kanan dan follow link seperti di gambar ini 
![image](https://github.com/user-attachments/assets/2245b285-4af1-44c9-9696-6b0f819fe1ad)


<< Konfigurasi Tambahan >>

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
