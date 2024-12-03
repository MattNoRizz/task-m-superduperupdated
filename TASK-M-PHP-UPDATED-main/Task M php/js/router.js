export class Router {
    constructor(routes) {
        this.routes = routes;
        this.init();
    }

    init() {
        window.addEventListener('hashchange', () => this.handleRoute());
        window.addEventListener('load', () => this.handleRoute());
    }

    async handleRoute() {
        const hash = window.location.hash || '#/';
        const route = this.routes[hash] || this.routes['#/404'];
        
        try {
            const module = await import(route.component);
            const view = new module.default();
            document.getElementById('app').innerHTML = await view.render();
            if (view.afterRender) await view.afterRender();
        } catch (error) {
            console.error('Error loading view:', error);
        }
    }
}
