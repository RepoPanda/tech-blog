const router = require('express').Router();
const {Comment, Post, User} = require('../models');

// will need to GET all posts for homepage
router.get('/', async (req,res) => {
    try {
        const postData = await Post.findAll({
            include:[User]
        });

        const posts = postData.map((post) => post.get({plain: true}));

        res.render('all-post', {posts});
    } catch(err) {
        res.status(500).json(err);
    }    
});

// will need to GET one post

// will need to GET all posts from logged in user


// exports all from home-router
module.exports = router;