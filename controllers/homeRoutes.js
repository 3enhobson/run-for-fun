const router = require('express').Router();
const { Run, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    console.log('homeroutes present');

    try {
        const runData = await Run.findAll({
            include: [{ model: User }],
        });

        const runs = runData.map(run => {
            return run.get({ plain: true })
        });

        console.log(runs)
        res.render('home',
            {
                runs,
                logged_in: req.session.logged_in,
            });
    } catch (error) {
        res.status(500).end()
    }
});

router.get('/login', async (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }
    res.render('login')
});

router.get('/profile', withAuth, async (req, res) => {
    console.log('here');
    try {
        const userData = await User.findByPk(
            req.session.user_id)
            console.log('still here ');
        const user = userData.get({ plain: true });

        const runData = await Run.findAll({
            where: { user_id: req.session.user_id, },
        },
            {
                include: [{ model: User }]
            });
        const runs = runData.map(run => {
            return run.get({ plain: true })
        });
        console.log(runs)
        const dates = [];
        const distance = []; 
        runs.forEach(run => {
            dates.push(run.createdAt);
            distance.push(run.distance);
        });
        console.table({dates, distance}); 
        res.render('profile',
            {
                runs, user, dates, distance
            });
    } catch (error) {
        res.status(500).end()
        console.log(error);
    }
});

module.exports = router;

