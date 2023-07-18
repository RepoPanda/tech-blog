const signupFormHandler = async (event) => {
    event.preventDefault();

    const usernameSignup = document.querySelector('#username-signup');
    const passwordSignup = document.querySelector('#password-signup');

    const response = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({
            username: usernameSignup.value,
            password: passwordSignup.value,
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Sign up has failed.');
    }
};


document
.querySelector('#form-signup')
.addEventListener('submit', signupFormHandler);