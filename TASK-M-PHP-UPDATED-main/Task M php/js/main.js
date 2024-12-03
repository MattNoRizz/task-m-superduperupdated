document.addEventListener('DOMContentLoaded', function() {
    // Task form handling
    const taskForm = document.getElementById('taskForm');
    if (taskForm) {
        taskForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(taskForm);
            
            try {
                const response = await fetch('../api/tasks.php', {
                    method: 'POST',
                    body: formData
                });
                const data = await response.json();
                
                if (data.success) {
                    window.location.href = 'dashboard.php';
                } else {
                    alert(data.message);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    }

    // Task status update
    const statusButtons = document.querySelectorAll('.status-update');
    statusButtons.forEach(button => {
        button.addEventListener('click', async (e) => {
            const taskId = e.target.dataset.taskId;
            const newStatus = e.target.dataset.status;
            
            try {
                const response = await fetch('../api/tasks.php', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        task_id: taskId,
                        status: newStatus
                    })
                });
                const data = await response.json();
                
                if (data.success) {
                    location.reload();
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    });
});
