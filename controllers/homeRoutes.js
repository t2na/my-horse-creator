const router = require('express').Router();
const { horseCharacter } = require('../models');

router.get('/login', (req, res) => {
  res.render('login')
});

router.get('/signup', (req, res) => {
  res.render('signup')
});

router.get('/signup-success', (req, res) => {
  res.render('signup-success');
});

router.get('/login-success', (req, res) => {
  res.render('login-success');
});

//route for getting all horses and displaying to homepage when user is logged in
router.get('/', async (req, res) => {
  try {
    const horseData = await horseCharacter.findAll();

    const horses = horseData.map((horse) => horse.get({ plain: true }));

    res.render('homepage', {
      horses
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//should get 1 horse by its id
router.get('/horseCharacter/:id', async (req, res) => {
  try {
    const horseData = await horseCharacter.findByPk(req.params.id);

    const horse = horseData.get({ plain: true });

    res.render('horsePage', {
      ...horse,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// set up initial horse stats; don't know what this route should be called
router.get('/card', async (req, res) => {
  try {
    // set the initial values for the horse stats
    const initialHorseStats = {
      horse_name: '',
      horse_breed: '',
      horse_power: 5,
      horse_speed: 5,
      horse_smarts: 5,
      horse_weight: 5,
    };

    // render the handlebars template and pass the initialHorseStats object to it
    res.render('card', initialHorseStats);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router; 