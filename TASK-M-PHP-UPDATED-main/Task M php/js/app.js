class App {
    constructor() {
        this.initializeSidebar();
        this.loadContent('dashboard'); // Default page
    }

    initializeSidebar() {
        // Sidebar navigation links
        document.querySelectorAll('.sidebar .nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Handle logout separately
                if (link.id === 'logoutBtn') {
                    this.handleLogout();
                    return;
                }

                // Get the page name from href
                const page = link.getAttribute('href').replace('#/', '');
                
                // Update active state
                this.updateActiveLink(link);
                
                // Load the corresponding content
                this.loadContent(page);
            });
        });
    }

    updateActiveLink(clickedLink) {
        // Remove active class from all links
        document.querySelectorAll('.sidebar .nav-link').forEach(link => {
            link.classList.remove('active');
        });
        // Add active class to clicked link
        clickedLink.classList.add('active');
    }

    async loadContent(page) {
        try {
            const response = await fetch(`views/${page}.html`);
            const content = await response.text();
            document.querySelector('.main-content').innerHTML = content;
        } catch (error) {
            console.error('Error loading page:', error);
        }
    }

    handleLogout() {
        localStorage.removeItem('token');
        window.location.href = 'login.html';
    }
}

// Initialize the app when document is ready
document.addEventListener('DOMContentLoaded', () => {
    new App();
});
