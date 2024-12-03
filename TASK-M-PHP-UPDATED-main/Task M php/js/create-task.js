document.addEventListener('DOMContentLoaded', () => {
    const createTaskForm = document.getElementById('createTaskForm');
    const dueDateInput = document.getElementById('dueDate');

    // Set minimum date as today
    const today = new Date().toISOString().split('T')[0];
    dueDateInput.setAttribute('min', today);

    createTaskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic form validation
        if (!createTaskForm.checkValidity()) {
            createTaskForm.classList.add('was-validated');
            return;
        }

        // Collect form data
        const formData = {
            title: document.getElementById('taskTitle').value,
            description: document.getElementById('taskDescription').value,
            dueDate: document.getElementById('dueDate').value,
            priority: document.getElementById('priority').value,
            category: document.getElementById('category').value,
            tags: document.getElementById('tags').value
        };

        // Add your task creation logic here
        console.log('Task created:', formData);
    });
});

function resetForm() {
    const createTaskForm = document.getElementById('createTaskForm');
    createTaskForm.reset();
    createTaskForm.classList.remove('was-validated');
}
