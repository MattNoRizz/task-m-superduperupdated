export class NotificationService {
    constructor() {
        this.baseUrl = '/api/notifications.php';
        this.initializeNotifications();
    }

    async initializeNotifications() {
        if ('Notification' in window) {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                this.startNotificationPolling();
            }
        }
    }

    async getNotifications() {
        const response = await fetch(this.baseUrl);
        return await response.json();
    }

    startNotificationPolling() {
        setInterval(async () => {
            const notifications = await this.getNotifications();
            this.showNotifications(notifications);
        }, 30000); // Poll every 30 seconds
    }

    showNotifications(notifications) {
        notifications.forEach(notification => {
            if (!notification.read) {
                new Notification('Task Management', {
                    body: notification.message,
                    icon: '/assets/images/notification-icon.png'
                });
            }
        });
    }
}
