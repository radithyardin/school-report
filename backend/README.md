# School Report - Backend

Backend aplikasi School Report menggunakan PHP + MySQL.

## Cara Install

1. Pastikan sudah install PHP dan MySQL/XAMPP
2. Import database: `api/database.sql` ke MySQL
3. Konfigurasi koneksi: `api/config/database.php`

## Struktur Folder

```
backend/
└── api/
    ├── admin/        # Endpoint admin
    ├── auth/         # Endpoint autentikasi (login, register)
    ├── config/       # Konfigurasi database
    └── reports/      # Endpoint laporan
```

## Endpoint API

- `POST /api/auth/register.php` - Registrasi user
- `POST /api/auth/login.php` - Login user
- `POST /api/reports/create.php` - Buat laporan
- `GET /api/reports/my-reports.php` - Lihat laporan saya
- `GET /api/admin/reports.php` - Lihat semua laporan (admin)
