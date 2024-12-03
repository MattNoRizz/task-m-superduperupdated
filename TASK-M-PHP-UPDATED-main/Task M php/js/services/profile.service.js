export class ProfileService {
    constructor() {
        this.baseUrl = '/api/profile.php';
    }

    async updateProfile(profileData) {
        const response = await fetch(this.baseUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(profileData)
        });
        return await response.json();
    }

    async updateSettings(settings) {
        const response = await fetch(`${this.baseUrl}/settings`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(settings)
        });
        return await response.json();
    }
}
