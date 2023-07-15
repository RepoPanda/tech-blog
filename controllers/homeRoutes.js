const router = require('express').Router();
const {Comment, Post, User} = require('../models');

// will need to GET all posts for homepage
router.get('/', async (req,res) => {
    try {
        const postData = await Post.findAll({
            include:[User]
        });

        const posts = postData.map((post) => post.get({plain: true}));

        res.render('all-posts', {posts});
    } catch(err) {
        res.status(500).json(err);
    }    
});

// will need to GET a sole post
router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(re.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    if (postData) {
      const post = postData.get({ plain: true });

      res.render("sole-post", { post });
    } else {
      res.status(404).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});



// route to GET login page
router.get('/login', (req,res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// route to GET Sign Up page
router.get('/signup', (req,res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;