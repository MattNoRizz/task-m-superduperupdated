document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const passwordToggle = document.querySelector('.password-toggle');
    const confirmPasswordToggle = document.querySelector('.confirm-password-toggle');

    // Password toggle for password input
    passwordToggle.addEventListener('click', () => {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        passwordToggle.querySelector('i').classList.toggle('fa-eye');
        passwordToggle.querySelector('i').classList.toggle('fa-eye-slash');
    });

    // Password toggle for confirm password input
    confirmPasswordToggle.addEventListener('click', () => {
        const type = confirmPasswordInput.type === 'password' ? 'text' : 'password';
        confirmPasswordInput.type = type;
        confirmPasswordToggle.querySelector('i').classList.toggle('fa-eye');
        confirmPasswordToggle.querySelector('i').classList.toggle('fa-eye-slash');
    });

    const signupForm = document.getElementById('signupForm');
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic validation
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        if (password.length < 8) {
            alert('Password must be at least 8 characters long');
            return;
        }

        // Add your signup logic here
        console.log('Signup submitted');
    });
});
