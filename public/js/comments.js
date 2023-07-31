const commentsFormHandler = async (event) => {
    event.preventDefault();

    const post_id = document.querySelector('#post-id').value.trim();
    const body = document.querySelector('#body-comment').value.trim();

    if (body) {
        await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ 
                post_id: post_id, 
                comment: body 
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        document.location.reload();
    }

};

document
    .querySelector('#comment-form-new')
    .addEventListener('submit', commentsFormHandler);
