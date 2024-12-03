export class TaskService {
    constructor() {
        this.baseUrl = '/api/tasks.php';
    }
    async getAllTasks() {
        const response = await fetch(this.baseUrl, {
            headers: this.getHeaders ()
        });
        return await response.json();
    }
    async createTask(taskData) {
        const response = await fetch(this.baseUrl, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(taskData)
        });
    }
    async updateTask(taskId, taskData) {
        const response = await fetch('${this.baseUrl}/${taskId}', {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify(taskData)
        });
        return await response.json();
    }
    async deleteTask(taskId) {
        const response = await fetch('${this.baseUrl}/${taskId}', {
            method: 'DELETE',
            headers: this.getHeaders()
        });
        return await response.json();
    }
    getHeaders() {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        };
    }
}