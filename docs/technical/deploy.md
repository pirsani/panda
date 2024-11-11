# Panduan Deployment Aplikasi Panda

Panduan ini menjelaskan langkah-langkah untuk melakukan deployment Aplikasi Panda dengan menggunakan **PNPM** sebagai package manager, **PM2** sebagai process manager, **NGINX** sebagai reverse proxy, dan **PostgreSQL** sebagai basis data.

## Prasyarat

1. **Server Ubuntu** (atau distribusi Linux lainnya).

2. **Node.js** dan **pnpm** sudah terinstal.
3. **PM2** untuk manajemen proses.
4. **NGINX** sebagai reverse proxy.
5. **PostgreSQL** sebagai basis data.

## Langkah-langkah Deployment

### 1. Persiapan Server

- Perbarui paket-paket yang ada di server:

  ```bash
  sudo apt update && sudo apt upgrade -y
  ```

- Pastikan Node.js telah terinstal. Jika belum, instal Node.js:

  ```bash
  curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
  sudo apt install -y nodejs
  ```

- Instal **pnpm**:

  ```bash
  corepack enable
  corepack prepare pnpm@latest --activate
  ```

- Instal **PM2** secara global:
  ```bash
  pnpm add -g pm2
  ```

### 2. Konfigurasi PostgreSQL

1. Instal PostgreSQL:

   ```bash
   sudo apt install -y postgresql postgresql-contrib
   ```

2. Buat basis data dan pengguna untuk proyek:

   ```bash
   sudo -i -u postgres
   psql
   CREATE DATABASE nama_database;
   CREATE USER nama_pengguna WITH ENCRYPTED PASSWORD 'kata_sandi';
   GRANT ALL PRIVILEGES ON DATABASE nama_database TO nama_pengguna;
   \q
   exit
   ```

3. Simpan konfigurasi basis data ini dalam variabel lingkungan di file `.env` di root Aplikasi Panda Anda:
   ```plaintext
   DATABASE_URL=postgresql://nama_pengguna:kata_sandi@localhost:5432/nama_database
   ```

### 3. Konfigurasi Aplikasi Panda

1. Masuk ke direktori proyek dan instal dependensi menggunakan **pnpm**:

   ```bash
   cd /path/to/your-nextjs-project
   pnpm install
   ```

2. Buat build aplikasi:

   ```bash
   pnpm build
   ```

3. Jalankan aplikasi Next.js menggunakan **PM2**:

   ```bash
   pm2 start pnpm --name "nextjs-app" -- start
   ```

4. Simpan konfigurasi PM2 agar aplikasi dapat dijalankan ulang saat server restart:
   ```bash
   pm2 save
   pm2 startup
   ```

### 4. Konfigurasi NGINX sebagai Reverse Proxy

1. Instal NGINX:

   ```bash
   sudo apt install -y nginx
   ```

2. Konfigurasi NGINX untuk meneruskan permintaan ke aplikasi Next.js Anda. Buat file konfigurasi baru:

   ```bash
   sudo nano /etc/nginx/sites-available/nextjs-app
   ```

3. Tambahkan konfigurasi berikut ke file tersebut:

   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

4. Aktifkan konfigurasi NGINX ini:

   ```bash
   sudo ln -s /etc/nginx/sites-available/nextjs-app /etc/nginx/sites-enabled
   sudo nginx -t
   sudo systemctl restart nginx
   ```

5. (Opsional) Jika Anda menggunakan domain, pastikan untuk memperbarui konfigurasi DNS Anda dan mengarahkan domain ke IP server Anda. Untuk mengamankan koneksi, Anda dapat menggunakan **Certbot** untuk SSL:

   ```bash
   sudo apt install -y certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```

### 5. Mengelola Aplikasi

- **Mulai Ulang Aplikasi**:

  ```bash
  pm2 restart nextjs-app
  ```

- **Lihat Log Aplikasi**:

  ```bash
  pm2 logs nextjs-app
  ```

- **Hentikan Aplikasi**:
  ```bash
  pm2 stop nextjs-app
  ```

## Ringkasan

Dengan mengikuti langkah-langkah ini, Anda seharusnya berhasil melakukan deployment Aplikasi Panda menggunakan **PNPM**, **PM2**, **NGINX**, dan **PostgreSQL** di server Linux.
