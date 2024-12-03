class Navigation {
    constructor() {
        this.initializeNavigation();
        this.handleActiveLink();
    }

    initializeNavigation() {
        // Handle sidebar navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                if (link.id === 'logoutBtn') {
                    this.handleLogout();
                    return;
                }
                
                // Remove active class from all links
                document.querySelectorAll('.nav-link').forEach(l => 
                    l.classList.remove('active'));
                
                // Add active class to clicked link
                link.classList.add('active');
            });
        });
    }

    handleActiveLink() {
        // Set active link based on current URL
        const currentPath = window.location.hash.slice(1) || '/dashboard';
        const activeLink = document.querySelector(`a[href="#${currentPath}"]`);
        if (activeLink) {
            document.querySelectorAll('.nav-link').forEach(l => 
                l.classList.remove('active'));
            activeLink.classList.add('active');
        }
    }

    handleLogout() {
        localStorage.removeItem('token');
        window.location.href = '#/login';
    }
}
