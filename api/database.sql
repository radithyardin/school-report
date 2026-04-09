-- Database: fasilita
-- Membuat database jika belum ada
CREATE DATABASE IF NOT EXISTS fasilita;
USE fasilita;

-- Table: users
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: reports
CREATE TABLE IF NOT EXISTS reports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    category VARCHAR(50) NOT NULL,
    urgency ENUM('rendah', 'sedang', 'tinggi', 'kritis') DEFAULT 'sedang',
    location VARCHAR(200),
    description TEXT,
    status ENUM('menunggu', 'diproses', 'selesai', 'ditolak') DEFAULT 'menunggu',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Table: report_photos
CREATE TABLE IF NOT EXISTS report_photos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    report_id INT NOT NULL,
    photo_path VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (report_id) REFERENCES reports(id) ON DELETE CASCADE
);

-- Table: notifications
CREATE TABLE IF NOT EXISTS notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT,
    is_read TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Insert sample admin (password: admin)
INSERT INTO users (name, email, password, role) VALUES 
('Administrator', 'admin@sekolah.com', '$2y$10$REQ4QCYgd1uL9lvtWZOL6u.SoMXPBusxW0SyYbO1FvoFDi5S32uxG', 'admin');

-- Insert sample users (password: user123)
INSERT INTO users (name, email, password, role) VALUES 
('User', 'user@sekolah.com', '$2y$10$v2fAH9rvwI4cPpNXYMpHpOwdWKH64VJ6gYcWNr255wGHIr689rqu6', 'user');

-- Sample reports
INSERT INTO reports (user_id, title, category, urgency, location, description, status) VALUES 
(2, 'Kerusakan AC Kelas 10', 'listrik', 'sedang', 'Ruang Kelas 10', 'AC tidak dingin dan berbau tidak sedap', 'diproses'),
(2, 'Keran Air Rembes', 'plumbing', 'tinggi', 'Kamar Mandi Utama', 'Keran air terus menetes tidak bisa ditutup', 'menunggu'),
(2, 'Meja Belajar Rusak', 'furniture', 'rendah', 'Perpustakaan', 'Meja goyah karena sekrup kendor', 'menunggu'),
(2, 'Lampu Koridor Mati', 'listrik', 'sedang', 'Koridor Lantai 2', '3 lampu koridor mati gelap', 'selesai');
