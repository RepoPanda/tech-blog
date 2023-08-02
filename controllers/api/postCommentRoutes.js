const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// creates a new comment with in post
router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.json(newComment);

    }catch(err) {
        res.status(500).json(err);
    }
});

// deletes a comment
router.delete('/:id', withAuth, async (req, res) => {});

module.exports = router;