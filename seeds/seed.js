const sequelize = require('../config/connection');
const {horseCharacter} = require('../models');

const horseStats = require('./horseStats.json');

const seedDatabase = async () => {
    await sequelize.sync ({force: true});
    await horseCharacter.bulkCreate(horseStats);
    process.exit(0);
};

seedDatabase();