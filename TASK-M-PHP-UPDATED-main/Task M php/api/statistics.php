<?php
header('Content-Type: application/json');
require_once '../config/database.php';

class Statistics {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getTaskStats($user_id) {
        $stats = [
            'total' => $this->getTotalTasks($user_id),
            'by_priority' => $this->getTasksByPriority($user_id),
            'by_status' => $this->getTasksByStatus($user_id),
            'completion_rate' => $this->getCompletionRate($user_id),
            'monthly_trends' => $this->getMonthlyTrends($user_id)
        ];
        return $stats;
    }

    private function getTotalTasks($user_id) {
        $query = "SELECT COUNT(*) as total FROM tasks WHERE user_id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc()['total'];
    }

    private function getTasksByPriority($user_id) {
        $query = "SELECT priority, COUNT(*) as count FROM tasks 
                 WHERE user_id = ? GROUP BY priority";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }

    private function getTasksByStatus($user_id) {
        $query = "SELECT status, COUNT(*) as count FROM tasks 
                 WHERE user_id = ? GROUP BY status";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }

    private function getCompletionRate($user_id) {
        $query = "SELECT 
                    (COUNT(CASE WHEN status = 'completed' THEN 1 END) * 100.0 / COUNT(*)) as completion_rate 
                 FROM tasks 
                 WHERE user_id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        $result = $stmt->get_result()->fetch_assoc();
        return round($result['completion_rate'] ?? 0, 2);
    }

    private function getMonthlyTrends($user_id) {
        $query = "SELECT 
                    DATE_FORMAT(created_at, '%Y-%m') as month,
                    COUNT(*) as total_tasks,
                    COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_tasks
                 FROM tasks 
                 WHERE user_id = ?
                 GROUP BY DATE_FORMAT(created_at, '%Y-%m')
                 ORDER BY month DESC
                 LIMIT 12";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }
}
