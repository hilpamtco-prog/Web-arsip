# Catatan Perubahan

## Yang disederhanakan

1. File `8.html` yang sebelumnya memuat semua HTML, CSS, JavaScript, dan logo base64 dipisah menjadi folder.
2. CSS dipindah ke `css/style.css`.
3. JavaScript dipindah ke `js/app.js`.
4. Logo base64 dipindah ke `assets/images/logo.png`.
5. Judul halaman disederhanakan menjadi `Hilpamt Archive`.
6. Komentar yang terlalu panjang disingkat agar lebih mudah dibaca.

## Yang dipertahankan

- Tampilan cyber/glassmorphism.
- Intro screen.
- Password gate.
- Menu dock.
- Arsip tahun.
- Upload area simulasi.
- Modal detail Lajnah.
- Search alert.

## Bagian yang sebaiknya dibenahi berikutnya

- Pisahkan data Lajnah/Proker ke file JSON agar konten mudah diedit tanpa membuka HTML.
- Tambahkan backend bila upload file benar-benar ingin tersimpan permanen.
- Ganti `prompt()` password kedua dengan modal login agar lebih rapi.
