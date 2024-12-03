<?php
header('Content-Type: application/json');
require_once '../config/database.php';

class Attachments {
    private $conn;
    private $upload_dir = '../uploads/';

    public function __construct($db) {
        $this->conn = $db;
        if (!file_exists($this->upload_dir)) {
            mkdir($this->upload_dir, 0777, true);
        }
    }

    public function uploadFile($task_id, $file) {
        $file_name = time() . '_' . basename($file['name']);
        $file_path = $this->upload_dir . $file_name;
        
        if (move_uploaded_file($file['tmp_name'], $file_path)) {
            $query = "INSERT INTO task_attachments (task_id, file_name, file_path) 
                     VALUES (?, ?, ?)";
            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("iss", $task_id, $file_name, $file_path);
            return $stmt->execute();
        }
        return false;
    }

    public function getTaskAttachments($task_id) {
        $query = "SELECT * FROM task_attachments WHERE task_id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("i", $task_id);
        $stmt->execute();
        return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }
}
