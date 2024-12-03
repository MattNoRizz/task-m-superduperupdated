export class DashboardController {
    constructor() {
        this.loadDashboard();
        this.setupEventListeners();
    }

    async loadDashboard() {
        try {
            const response = await fetch('/api/tasks.php');
            const tasks = await response.json();
            
            this.updateTaskCounts(tasks);
            this.renderTasks(tasks);
        } catch (error) {
            console.error('Error loading dashboard:', error);
        }
    }

    updateTaskCounts(tasks) {
        const pending = tasks.filter(t => t.status === 'pending').length;
        const inProgress = tasks.filter(t => t.status === 'in_progress').length;
        const completed = tasks.filter(t => t.status === 'completed').length;

        document.getElementById('pendingCount').textContent = pending;
        document.getElementById('progressCount').textContent = inProgress;
        document.getElementById('completedCount').textContent = completed;
    }

    renderTasks(tasks) {
        const tasksList = document.getElementById('tasksList');
        tasksList.innerHTML = tasks.map(task => `
            <div class="task-item" data-id="${task.id}">
                <div class="d-flex justify-content-between">
                    <h5>${task.title}</h5>
                    <span class="badge bg-${this.getPriorityColor(task.priority)}">
                        ${task.priority}
                    </span>
                </div>
                <p>${task.description}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <small>Due: ${task.due_date}</small>
                    <div class="btn-group">
                        <button class="btn btn-sm btn-outline-primary edit-task">
                            Edit
                        </button>
                        <button class="btn btn-sm btn-outline-danger delete-task">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('.edit-task')) {
                this.handleEditTask(e);
            } else if (e.target.matches('.delete-task')) {
                this.handleDeleteTask(e);
            }
        });
    }
}
