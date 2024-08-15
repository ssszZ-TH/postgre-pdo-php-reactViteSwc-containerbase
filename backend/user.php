<?php
// Handle CORS
// กำหนด CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

include 'db.php';

// กำหนดประเภทของ content ให้เป็น JSON
header('Content-Type: application/json');

// ฟังก์ชันสำหรับส่งผลลัพธ์ในรูปแบบ JSON
function sendResponse($status, $data = [], $message = '') {
    echo json_encode([
        'status' => $status,
        'data' => $data,
        'message' => $message
    ]);
    exit;
}

// อ่าน method ของ request ที่เข้ามา
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Handle Read (GET)
        if (isset($_GET['id'])) {
            $id = $_GET['id'];
            $stmt = $pdo->prepare('SELECT * FROM users WHERE id = ?');
            $stmt->execute([$id]);
            $user = $stmt->fetch();
            if ($user) {
                sendResponse('success', $user);
            } else {
                sendResponse('error', [], 'User not found');
            }
        } else {
            $stmt = $pdo->query('SELECT * FROM users');
            $users = $stmt->fetchAll();
            sendResponse('success', $users);
        }
        break;

    case 'POST':
        // Handle Create (POST)
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['firstname'], $data['lastname'], $data['role'], $data['email'])) {
            $stmt = $pdo->prepare('INSERT INTO users (firstname, lastname, role, email) VALUES (?, ?, ?, ?)');
            $stmt->execute([$data['firstname'], $data['lastname'], $data['role'], $data['email']]);
            sendResponse('success', ['id' => $pdo->lastInsertId()], 'User created');
        } else {
            sendResponse('error', [], 'Invalid input');
        }
        break;

    case 'PUT':
        // Handle Update (PUT)
        if (isset($_GET['id'])) {
            $id = $_GET['id'];
            $data = json_decode(file_get_contents('php://input'), true);
            if (isset($data['firstname'], $data['lastname'], $data['role'], $data['email'])) {
                $stmt = $pdo->prepare('UPDATE users SET firstname = ?, lastname = ?, role = ?, email = ? WHERE id = ?');
                $stmt->execute([$data['firstname'], $data['lastname'], $data['role'], $data['email'], $id]);
                sendResponse('success', [], 'User updated');
            } else {
                sendResponse('error', [], 'Invalid input');
            }
        } else {
            sendResponse('error', [], 'No user ID provided');
        }
        break;

    case 'DELETE':
        // Handle Delete (DELETE)
        if (isset($_GET['id'])) {
            $id = $_GET['id'];
            $stmt = $pdo->prepare('DELETE FROM users WHERE id = ?');
            $stmt->execute([$id]);
            sendResponse('success', [], 'User deleted');
        } else {
            sendResponse('error', [], 'No user ID provided');
        }
        break;

    default:
        // Method not supported
        sendResponse('error', [], 'Method not allowed');
        break;
}
?>

?>