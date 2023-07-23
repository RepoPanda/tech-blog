const loginFormHandler = async (event) => {
    event.preventDefault();

    // Collect values from the login form
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if(username && password) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({
                username: username.value.trim(),
                password: password.value.trim(),
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        if(response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Sorry, something went wrong happened while loggin in. Please try again.');
        }
    }
};

document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);