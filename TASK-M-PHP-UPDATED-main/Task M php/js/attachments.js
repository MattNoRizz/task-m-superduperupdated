export class AttachmentHandler {
    constructor() {
        this.maxFileSize = 5 * 1024 * 1024; // 5MB
        this.allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    }

    async uploadFile(taskId, file) {
        if (!this.validateFile(file)) return false;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('task_id', taskId);

        try {
            const response = await fetch('/api/attachments.php', {
                method: 'POST',
                body: formData
            });
            return await response.json();
        } catch (error) {
            console.error('Error uploading file:', error);
            return false;
        }
    }

    validateFile(file) {
        if (file.size > this.maxFileSize) {
            alert('File size exceeds 5MB limit');
            return false;
        }
        if (!this.allowedTypes.includes(file.type)) {
            alert('Invalid file type');
            return false;
        }
        return true;
    }
}
