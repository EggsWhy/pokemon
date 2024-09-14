const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const loginForm = document.querySelector('.login');
const registerForm = document.querySelector('.register');
const loginMessage = document.getElementById('login-message');
const registerMessage = document.getElementById('register-message');


registerForm.style.display = 'none';


registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');

    // Managing what shows up
    loginForm.style.display = 'none';
    registerForm.style.display = 'flex';

    // Resets the text everytime
    registerMessage.innerText = '';
});

loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
    
    // Managing what shows up
    loginForm.style.display = 'flex';
    registerForm.style.display = 'none';

    // Resets the text everytime
    loginMessage.innerText = '';
});


// Handle Signup
registerForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    const confirmpassword = document.getElementById('register-confirm-password').value;

    // Check if username already exists
    if (localStorage.getItem(username)) {
        registerMessage.innerText = 'Username already exists. Please choose another one.';
    } 
    
    else if (password !== confirmpassword) {
        registerMessage.innerText = 'Your passwords do not match. Please try again';
    } 
    
    else {
        // Store user credentials in localStorage
        localStorage.setItem(username, password);
        registerMessage.innerText = 'Signup successful! You can now log in.';
    }
});

// Handle Login
loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    // Check if username exists and password matches
    const storedPassword = localStorage.getItem(username);

    if (storedPassword === password) {
        loginMessage.innerText = 'Login successful!';
        localStorage.setItem('isLoggedIn', 'true');

        setTimeout(() => {
            window.location.href = 'pokemon.html'; // Redirect to the new page
        }, 1000); // Redirect after 1 second
    } 
    
    else {
        loginMessage.innerText = 'Invalid username or password.';
    }
});

