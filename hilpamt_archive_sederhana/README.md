# Hilpamt Archive - Versi Sederhana

Versi ini berasal dari file HTML tunggal `8.html`, lalu dirapikan menjadi struktur folder yang lebih mudah diedit.

## Struktur folder

```text
hilpamt_archive_sederhana/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
├── assets/
│   ├── images/
│   │   └── logo.png
│   └── uploads/
│       └── README.md
└── docs/
    └── catatan-perubahan.md
```

## Cara menjalankan

1. Buka `index.html` langsung di browser.
2. PIN default masih: `admin123`.
3. Ubah PIN di file `js/app.js` pada baris `MAIN_PIN`.
4. Ubah warna/tampilan di file `css/style.css`.
5. Ganti logo dengan menimpa file `assets/images/logo.png`.

## Catatan teknis

- CSS tidak lagi berada di dalam HTML.
- JavaScript tidak lagi berada di dalam HTML.
- Logo base64 sudah dipindah menjadi file gambar biasa.
- Struktur ini belum memakai backend/server, jadi fitur upload masih sebatas tampilan browser.
