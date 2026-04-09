<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

include '../config/database.php';

$title = $_POST['title'] ?? '';
$category = $_POST['category'] ?? '';
$urgency = $_POST['urgency'] ?? 'sedang';
$location = $_POST['location'] ?? '';
$description = $_POST['description'] ?? '';
$userId = $_POST['user_id'] ?? 1;

if (empty($title) || empty($category)) {
    echo json_encode(['success' => false, 'message' => 'Judul dan kategori harus diisi']);
    exit;
}

$stmt = $conn->prepare("INSERT INTO reports (user_id, title, category, urgency, location, description) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param('isssss', $userId, $title, $category, $urgency, $location, $description);

if ($stmt->execute()) {
    $reportId = $stmt->insert_id;
    
    // Handle photo uploads
    $uploadDir = '../uploads/';
    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }
    
    $uploadedPhotos = [];
    if (isset($_FILES['photos']) && is_array($_FILES['photos']['name'])) {
        $photoCount = count($_FILES['photos']['name']);
        for ($i = 0; $i < $photoCount; $i++) {
            if ($_FILES['photos']['error'][$i] === UPLOAD_ERR_OK) {
                $ext = pathinfo($_FILES['photos']['name'][$i], PATHINFO_EXTENSION);
                $filename = $reportId . '_' . ($i + 1) . '.' . $ext;
                $targetPath = $uploadDir . $filename;
                
                if (move_uploaded_file($_FILES['photos']['tmp_name'][$i], $targetPath)) {
                    $photoStmt = $conn->prepare("INSERT INTO report_photos (report_id, photo_path) VALUES (?, ?)");
                    $photoStmt->bind_param('is', $reportId, $filename);
                    $photoStmt->execute();
                    $photoStmt->close();
                    $uploadedPhotos[] = $filename;
                }
            }
        }
    }
    
    // Create notification for admin
    $notifStmt = $conn->prepare("INSERT INTO notifications (user_id, title, message) VALUES (1, ?, ?)");
    $notifTitle = 'Laporan Baru: ' . $title;
    $notifMessage = 'Ada laporan kerusakan baru yang memerlukan verifikasi';
    $notifStmt->bind_param('ss', $notifTitle, $notifMessage);
    $notifStmt->execute();
    $notifStmt->close();
    
    echo json_encode([
        'success' => true,
        'message' => 'Laporan berhasil dibuat',
        'report_id' => $reportId,
        'photos' => $uploadedPhotos
    ]);
} else {
    echo json_encode(['success' => false, 'message' => 'Gagal membuat laporan']);
}

$stmt->close();
$conn->close();
