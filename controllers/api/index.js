const router = require('express').Router();

const userRoutes = require('./userRoutes');
const horseRoutes = require('./horseRoutes');

router.use('/users', userRoutes);
router.use('/horses', horseRoutes);


module.exports = router;
