class Router {
    constructor() {
        this.routes = {
            '/': 'views/dashboard.html',
            '/login': 'views/login.html',
            '/signup': 'views/signup.html',
            '/dashboard': 'views/dashboard.html',
            '/create-task': 'views/create-task.html',
            '/notifications': 'views/notifications.html',
            '/statistics': 'views/statistics.html',
            '/tasks': 'views/tasks.html',
            '/profile': 'views/profile.html'
        };

        window.addEventListener('hashchange', () => this.handleRoute());
        window.addEventListener('load', () => this.handleRoute());
    }

    async handleRoute() {
        let path = window.location.hash.slice(1) || '/';
        if (!localStorage.getItem('token') && path !== '/login' && path !== '/signup') {
            window.location.hash = '/login';
            return;
        }
        
        const route = this.routes[path];
        if (route) {
            const content = await this.loadContent(route);
            document.getElementById('main-content').innerHTML = content;
        }
    }

    async loadContent(route) {
        try {
            const response = await fetch(route);
            return await response.text();
        } catch (error) {
            console.error('Error loading content:', error);
            return '<h1>Error loading content</h1>';
        }
    }
}
