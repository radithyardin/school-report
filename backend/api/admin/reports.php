<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

include '../config/database.php';

$status = $_GET['status'] ?? '';

$sql = "
    SELECT r.*, u.name as reporter_name, GROUP_CONCAT(p.photo_path) as photos 
    FROM reports r 
    JOIN users u ON r.user_id = u.id 
    LEFT JOIN report_photos p ON r.id = p.report_id
";

if (!empty($status)) {
    $sql .= " WHERE r.status = ?";
}

$sql .= " GROUP BY r.id ORDER BY r.created_at DESC";

if (!empty($status)) {
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $status);
} else {
    $stmt = $conn->prepare($sql);
}

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
