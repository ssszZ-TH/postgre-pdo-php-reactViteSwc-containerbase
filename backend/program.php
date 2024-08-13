<?php
include 'db.php';

try {

    // Set the Content-Type header to application/json for all responses
    header('Content-Type: application/json');

    // Handle CORS
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    // Handle preflight (OPTIONS) requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}
    // Read and decode JSON data
    $data = json_decode(file_get_contents("php://input"), true);

    // POST: Create a new program
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Validate and retrieve data from JSON
        $code = isset($data['code']) ? $data['code'] : null;
        $name = isset($data['name']) ? $data['name'] : null;
        $description = isset($data['description']) ? $data['description'] : null;
        $duration = isset($data['duration']) ? $data['duration'] : null;

        // Ensure required fields are present
        if ($code && $name && $description && $duration !== null) {
            $sql = "INSERT INTO program (code, name, description, duration) VALUES (?, ?, ?, ?)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$code, $name, $description, $duration]);
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['error' => 'Invalid input data']);
        }
    }

    // GET: Retrieve all programs or a single program
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        if (isset($_GET['code'])) {
            // Get a single program by code
            $code = $_GET['code'];
            $sql = "SELECT * FROM program WHERE code = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$code]);
            $program = $stmt->fetch(PDO::FETCH_ASSOC);
            echo json_encode($program ? $program : ['error' => 'Program not found']);
        } else {
            // Get all programs
            $sql = "SELECT * FROM program";
            $stmt = $pdo->query($sql);
            $programs = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($programs);
        }
    }

    // PUT: Update an existing program
    if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
        $code = isset($data['code']) ? $data['code'] : null;
        $name = isset($data['name']) ? $data['name'] : null;
        $description = isset($data['description']) ? $data['description'] : null;
        $duration = isset($data['duration']) ? $data['duration'] : null;

        if ($code && $name && $description && $duration !== null) {
            $sql = "UPDATE program SET name = ?, description = ?, duration = ? WHERE code = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$name, $description, $duration, $code]);

            if ($stmt->rowCount()) {
                echo json_encode(['success' => true, 'message' => 'Program updated successfully']);
            } else {
                echo json_encode(['error' => 'Program not found or no changes made']);
            }
        } else {
            echo json_encode(['error' => 'Invalid input data']);
        }
    }

    // DELETE: Remove a program by code
    if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        $code = isset($data['code']) ? $data['code'] : null;

        if ($code) {
            $sql = "DELETE FROM program WHERE code = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$code]);

            if ($stmt->rowCount()) {
                echo json_encode(['success' => true, 'message' => 'Program deleted successfully']);
            } else {
                echo json_encode(['error' => 'Program not found']);
            }
        } else {
            echo json_encode(['error' => 'Code is required']);
        }
    }
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
$pdo = null;
?>
