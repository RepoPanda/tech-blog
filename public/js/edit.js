const postId = document.querySelector('#post-id').value;

const editFormHandler = async function(event) {
    event.preventDefault();

    const editTitle = document.querySelector('#post-edits-title').value;
    const editBody = document.querySelector('#post-edits-body').value;

    await fetch(`/api/post/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({
            post_title: editTitle,
            body: editBody,
        }),
        headers: { 'Content-Type': 'application/json' 
    },
    });

    document.location.replace('/dashboard');
};

document
    .querySelector('#post-edits-form')
    .addEventListener('submit', editFormHandler);
