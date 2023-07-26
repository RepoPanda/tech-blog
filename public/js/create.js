const createFormHandler = async (event) => {
    event.preventDefault();

    const createdTitle = document.querySelector('#create-post-title');
    const createdContent = document.querySelector('#create-post-content');

    await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
            post_title: createdTitle.value,
            body: createdContent.value,
        }),
        headers: { 'Content-Type': 'application/json' },
    });

    document.location.replace('/dashboard');
};

document
    .querySelector('#create-post-form')
    .addEventListener('submit', createFormHandler);