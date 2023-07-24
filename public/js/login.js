const loginFormHandler = async (event) => {
    event.preventDefault();

    // Collect values from the login form
    const usernameLogin = document.querySelector('#username-login');
    const passwordLogin = document.querySelector('#password-login');

    if(usernameLogin && passwordLogin) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({
                username: usernameLogin.value.trim(),
                password: passwordLogin.value.trim(),
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        if(response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Sorry, something went wrong while loggin you in. Please try again.');
        }
    }
};

document
    .querySelector('#form-login')
    .addEventListener('submit', loginFormHandler);