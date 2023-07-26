const createFormHandler = async (event) => {
    event.preventDefault();

    const createdTitle = document.querySelector('input[name="create-post-title"]').value.trim();
    const createdContent = document.querySelector('textarea[name="create-post-content"]').value.trim();

    await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: createdTitle,
            content: createdContent,
        }),
        headers: { 'Content-Type': 'application/json' },
    });

    document.location.replace('/dashboard');
};

document
    .querySelector('#create-post-form')
    .addEventListener('submit', createFormHandler);