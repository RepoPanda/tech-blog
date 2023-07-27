const router = require('express').Router();
const { Post } = require('../models');
const withAuth = require('../utils/auth');

// GET all posts for dashboard
router.get('/', withAuth, async (req,res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id,
            }
        });

        const posts = postData.map((post) => post.get({plain: true}));

        res.render('admin-page-all-posts', {
            layout: 'dashboard',
            posts,
        });
    }catch (err) {
        res.redirect('login');
    }
});


// if logged in, render create-post from dashboard
router.get('/create', withAuth, (req,res) => {
    res.render('create-post', {
        layout: 'dashboard'
    });
});

// if logged in, render post-edits from dashboard
router.get('/edit/:id', withAuth, async (req,res) => {
    try {
        const postData = await Post.findByPk(req.params.id);

        if (postData) {
            const post = postData.get({plain: true});

            res.render('post-edits', {
                layout: 'dashboard',
                post,
            });
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.redirect('login');
    }
});

module.exports = router;