const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const newUserData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = newUserData.id;
            req.session.logged_in = true;

            res.status(200).json(newUserData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/login', async(req, res) => {
    try {
        const userData = await User.findOne({ where: { username: req.body.username } });

        if(!userData) {
            res
            .status(400)
            .json({ message: 'Incorrect username or password, please try again.'});
            return;
        }

        const validatePassword = userData.checkPassword(req.body.password);
            if(!validatePassword) {
                res
                .status(400)
                .json({ message: 'Incorrect username or password, please try again.'});
                return;
            }

            req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are now logged in.'});
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req,res) => {
    if(req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }else {
        res.status(404).end();
    }
});

module.exports = router;