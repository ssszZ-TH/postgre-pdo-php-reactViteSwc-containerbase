<?php
include 'db.php';

try {
    // Read and decode JSON data
    $data = json_decode(file_get_contents("php://input"), true);

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

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $sql = "SELECT * FROM program";
        $stmt = $pdo->query($sql);
        $programs = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($programs);
    }

    parse_str(file_get_contents("php://input"), $_PUT);
    if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
        $code = $_PUT['code'];
        $name = $_PUT['name'];
        $description = $_PUT['description'];
        $duration = $_PUT['duration'];

        $sql = "UPDATE program SET name = ?, description = ?, duration = ? WHERE code = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$name, $description, $duration, $code]);
        echo "Program updated successfully";
    }

    parse_str(file_get_contents("php://input"), $_DELETE);
    if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        $code = $_DELETE['code'];

        $sql = "DELETE FROM program WHERE code = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$code]);
        echo "Program deleted successfully";
    }
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
