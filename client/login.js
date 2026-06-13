// Global function for the tab switching (called by onclick in HTML)
function switchTab(tab) {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const tabLogin = document.getElementById('tab-login');
    const tabSignup = document.getElementById('tab-signup');

    if (tab === 'login') {
        loginForm.classList.add('active-form');
        signupForm.classList.remove('active-form');
        tabLogin.classList.add('active');
        tabSignup.classList.remove('active');
    } else {
        signupForm.classList.add('active-form');
        loginForm.classList.remove('active-form');
        tabSignup.classList.add('active');
        tabLogin.classList.remove('active');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. HANDLE LOGIN
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const errorMsg = document.getElementById('login-error');

            try {
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    // Save the token and user info
                    localStorage.setItem('foodflux_token', data.token);
                    localStorage.setItem('foodflux_user', JSON.stringify(data.user));
                    
                    // SMART ROUTING: Send them to the right dashboard!
                    if (data.user.role === 'Caterer') {
                        window.location.href = '/caterer.html'; 
                    } else {
                        window.location.href = '/ngo.html'; 
                    }
                } else {
                    errorMsg.innerText = data.message || "Invalid credentials";
                }
            } catch (err) {
                errorMsg.innerText = "Server error. Please try again.";
            }
        });
    }

    // 2. HANDLE REGISTRATION
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const phone = document.getElementById('signup-phone').value;
            const location = document.getElementById('signup-location').value;
            const errorMsg = document.getElementById('signup-error');

            // Find which radio button is selected
            const selectedRoleInput = document.querySelector('input[name="role"]:checked');
            let rawRole = selectedRoleInput ? selectedRoleInput.value : 'ngo';
            
            // Format the role to match your backend schema ('Caterer' or 'NGO')
            let role = rawRole === 'caterer' ? 'Caterer' : 'NGO';

            try {
                const response = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password, role, phone, location })
                });

                const data = await response.json();

                if (response.ok) {
                    // Registration successful, log them in automatically
                    localStorage.setItem('foodflux_token', data.token);
                    localStorage.setItem('foodflux_user', JSON.stringify(data.user));
                    
                    // SMART ROUTING
                    if (data.user.role === 'Caterer') {
                        window.location.href = '/caterer.html';
                    } else {
                        window.location.href = '/ngo.html';
                    }
                } else {
                    errorMsg.innerText = data.message || "Registration failed";
                }
            } catch (err) {
                errorMsg.innerText = "Server error. Please try again.";
            }
        });
    }
});