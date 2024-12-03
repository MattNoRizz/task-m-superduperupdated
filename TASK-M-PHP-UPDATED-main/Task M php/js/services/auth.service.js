export class AuthService {
    constructor(){
        this.baseUrl = '/api/auth.php';
        this.token = localStorage.getItem('token');
    }
    async login(email, password) {
        const response = await fetch(this.baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'login',
                email,
                password
            })
        });
        const data = await response.json();
        if(data.success) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
        }
        return data;
    }
    async register(username, email, password) {
        const response = await fetch(this.baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'register',
                username,
                email,
                password
            })
        });
        return await response.json();
    }
    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login.html';
    }
    isAuthenticated() {
        return !!this.token;
    }
}