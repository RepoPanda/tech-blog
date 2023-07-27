const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

//if user is logged in, they can create a post
router.post('/', withAuth, async (req, res) => {
    const body = req.body;

    try {
        const createPost = await Post.create({ ...body, user_id: req.session.user_id });
        res.json(createPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

//if user is logged in, they can update their post
router.put('/:id', withAuth, async (req, res) => {
    try {
        const [affectedRows] = await Post.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        if (affectedRows > 0) {
            res.status(200).end();
        } else {
            res.status(404).end();
        }

    } catch (err) {
        res.status(500).json(err);
    }
});

//if user is logged in, they can delete their posts

module.exports = router;