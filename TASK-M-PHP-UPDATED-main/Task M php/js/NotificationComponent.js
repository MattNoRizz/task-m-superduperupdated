export class NotificationComponent {
    constructor() {
        this.notificationService = new NotificationService();
        this.initializeNotifications();
    }

    async initializeNotifications() {
        const notifications = await this.notificationService.getNotifications();
        this.renderNotifications(notifications);
        this.setupEventListeners();
    }

    renderNotifications(notifications) {
        const container = document.getElementById('notificationList');
        container.innerHTML = notifications.map(notification => `
            <div class="notification-item ${notification.read ? '' : 'unread'}" 
                 data-id="${notification.id}">
                <div class="notification-content">
                    <p>${notification.message}</p>
                    <small>${new Date(notification.created_at).toLocaleString()}</small>
                </div>
                <div class="notification-actions">
                    <button class="btn btn-sm btn-outline-primary mark-read">
                        Mark as Read
                    </button>
                    <button class="btn btn-sm btn-outline-danger delete-notification">
                        Delete
                    </button>
                </div>
            </div>
        `).join('');
    }

    setupEventListeners() {
        document.querySelectorAll('.mark-read').forEach(button => {
            button.addEventListener('click', (e) => {
                const notificationId = e.target.closest('.notification-item').dataset.id;
                this.markAsRead(notificationId);
            });
        });

        document.querySelectorAll('.delete-notification').forEach(button => {
            button.addEventListener('click', (e) => {
                const notificationId = e.target.closest('.notification-item').dataset.id;
                this.deleteNotification(notificationId);
            });
        });
    }
}
