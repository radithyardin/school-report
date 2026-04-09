<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

include '../config/database.php';

$userId = $_GET['user_id'] ?? '';

if (empty($userId)) {
    echo json_encode(['success' => false, 'message' => 'User ID diperlukan']);
    exit;
}

$stmt = $conn->prepare("
    SELECT r.*, GROUP_CONCAT(p.photo_path) as photos 
    FROM reports r 
    LEFT JOIN report_photos p ON r.id = p.report_id 
    WHERE r.user_id = ? 
    GROUP BY r.id 
    ORDER BY r.created_at DESC
");
$stmt->bind_param('i', $userId);
$stmt->execute();
$result = $stmt->get_result();

$reports = [];
while ($row = $result->fetch_assoc()) {
    $row['photos'] = $row['photos'] ? explode(',', $row['photos']) : [];
    $reports[] = $row;
}

echo json_encode(['success' => true, 'data' => $reports]);
$stmt->close();
$conn->close();
