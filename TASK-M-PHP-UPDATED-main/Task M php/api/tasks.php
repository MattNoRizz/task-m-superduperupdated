<?php
header('Content-Type: application/json');
require_once '../config/database.php';

class TaskManager {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function createTask($user_id, $data) {
        $query = "INSERT INTO tasks (user_id, title, description, due_date, priority, status) 
                 VALUES (?, ?, ?, ?, ?, 'pending')";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("issss", 
            $user_id, 
            $data['title'], 
            $data['description'], 
            $data['due_date'], 
            $data['priority']
        );
        
        return $stmt->execute();
    }

    public function getTasks($user_id) {
        $query = "SELECT * FROM tasks WHERE user_id = ? ORDER BY due_date ASC";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }

    public function updateTask($task_id, $user_id, $data) {
        $query = "UPDATE tasks SET title = ?, description = ?, due_date = ?, 
                 priority = ?, status = ? WHERE id = ? AND user_id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("sssssii", 
            $data['title'], 
            $data['description'], 
            $data['due_date'], 
            $data['priority'],
            $data['status'],
            $task_id,
            $user_id
        );
        
        return $stmt->execute();
    }

    public function deleteTask($task_id, $user_id) {
        $query = "DELETE FROM tasks WHERE id = ? AND user_id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("ii", $task_id, $user_id);
        return $stmt->execute();
    }
}