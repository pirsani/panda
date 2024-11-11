# Dokumentasi Teknis

## **Prasyarat Sistem**

- **Hardware**

  - Spesifikasi minimum server
    Untuk menjalankan aplikasi dengan stabil, berikut spesifikasi minimum yang direkomendasikan:

    - Prosesor: Quad-core CPU (2.0 GHz atau lebih tinggi)
    - RAM: 16 GB (dapat dinaikkan menjadi 32 GB jika diperlukan)
    - Disk Space: 150 GB ( 50GB untuk system dan 100GB untuk penyimpanan dokumen yang diunggah)
      Sebagai gambaran untuk setiap kegiatan diperlukan kurang lebih 10-20 files pdf. jika masing-masing file pdf rata-rata 2Mb maka diperlukan 20Mb-40Mb untuk setiap kegiatan

    Catatan: Meskipun aplikasi ini dapat berjalan pada versi Windows Server, penggunaan Linux lebih disarankan untuk stabilitas dan kompatibilitas jangka panjang.

- **Software**

  - Sistem operasi yang didukung
    Aplikasi Panda berjalan optimal pada sistem operasi berbasis Linux. Berikut adalah sistem operasi yang direkomendasikan:

    - Ubuntu 24.04 LTS atau lebih baru
    - Debian 10 atau lebih baru
    - CentOS 8 atau lebih baru

  - Dependensi dan pustaka yang diperlukan
    Aplikasi Panda memiliki beberapa dependensi dan pustaka yang harus dipasang sebelum instalasi aplikasi:
    - Node.js: Versi 20 atau lebih baru (Disarankan versi LTS)
    - pnpm: Sebagai package manager untuk manajemen dependensi aplikasi
    - Database Server: PostgreSQL versi 12 atau lebih baru
    - Web Server: NGINX (untuk reverse proxy) atau server web lain yang mendukung konfigurasi reverse proxy
    - Manajemen Proses: PM2 (untuk mengelola aplikasi Node.js di server)

- **Koneksi Internet**
  - Kebutuhan jaringan untuk akses pengguna dan akses ke API Bank Indonesia
    Aplikasi Panda memerlukan koneksi internet yang stabil untuk memastikan akses pengguna dan akses ke API Bank Indonesia yang lancar. Berikut adalah beberapa kebutuhan jaringan:
    - Kecepatan Minimal: 10 Mbps untuk akses standar dan sinkronisasi antar server
    - port 443: Untuk akses web melalui NGINX (HTTPS)
    - Port 5432: Untuk koneksi PostgreSQL jika server database berada di host terpisah atau jika menginginkan database dapat diakses dan dikelola di komputer klien

## Deployment

Panduan ini menjelaskan langkah-langkah untuk melakukan deployment Aplikasi Panda dengan menggunakan **PNPM** sebagai package manager, **PM2** sebagai process manager, **NGINX** sebagai reverse proxy, dan **PostgreSQL** sebagai basis data.

ke halaman [deployment](deploy.md)

## Referensi Teknis

- [React documentation](https://react.dev/learn) - The library for web and native user interfaces
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Prisma ORM Documentatian](https://www.prisma.io/docs/orm/overview/introduction) - learn about Prisma ORM
- [What is Auth.js?](https://authjs.dev/getting-started) - Auth.js is a runtime agnostic library based on standard Web APIs that integrates deeply with multiple modern JavaScript frameworks to provide an authentication experience that’s simple to get started with, easy to extend, and always private and secure!
- [tailwindcss Documentation](https://tailwindcss.com/docs/installation)
- [Shadcn Documentation](https://ui.shadcn.com/docs) - Beautifully designed components that you can copy and paste into your apps.
- [Postgresql Documentation](https://www.postgresql.org/docs/current/index.html) - PostgreSQL is a powerful, open source object-relational database system with over 35 years of active development that has earned it a strong reputation for reliability, feature robustness, and performance.
- [zustand documentation](https://zustand.docs.pmnd.rs/getting-started/introduction) - A small, fast, and scalable bearbones state management solution.
