const deletePostId = document.querySelector('#post-id').value;

const deleteFormHandler = async (event) => {
    await fetch(`/api/posts/${deletePostId}`, {
        method: 'DELETE',
    });
    
    document.location.replace('/dashboard');
};

document
    .querySelector('#post-edits-delete')
    .addEventListener('click', deleteFormHandler);
